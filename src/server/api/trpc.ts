/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

import { prisma } from "@/server/db";

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = (opts: CreateNextContextOptions) => {
  const { req } = opts;
  const sesh = getAuth(req);
  const userId = sesh.userId;

  return {
    req,
    prisma,
    user: {
      id: userId,
    },
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer.
 */
import { initTRPC, TRPCError } from "@trpc/server";
// import superjson from "superjson";
import { getAuth } from "@clerk/nextjs/server";
import { createTRPCUpstashLimiter } from "@trpc-limiter/upstash";
import { ZodError } from "zod";
import { type NextApiRequest } from "next";
import { transformer } from "@/utils/transformer";

const t = initTRPC.context<typeof createTRPCContext>().create({
  // transformer: superjson,
  transformer,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

const getFingerprint = (req: NextApiRequest) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? (typeof forwarded === "string" ? forwarded : forwarded[0])?.split(/, /)[0]
    : req.socket.remoteAddress;
  return ip ?? "127.0.0.1";
};

export const rateLimiter = createTRPCUpstashLimiter({
  root: t,
  fingerprint: (ctx, _input) => getFingerprint(ctx.req),
  windowMs: 10000,
  message: (hitInfo) =>
    // client side'da bu mesajı karşılamak için onError kullanacağım
    `Çok fazla istek attınız. ${Math.ceil(
      (hitInfo.reset - Date.now()) / 1000,
    )} saniye sonra tekrar deneyin.`,
  max: 10,
});

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      user: {
        id: ctx.user.id,
      },
    },
  });
});

const enforceUserIsAdmin = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Giriş yapmalısınız.",
    });
  }

  const user = await ctx.prisma.user.findUnique({
    where: {
      userId: ctx.user.id,
      role: "ADMIN",
    },
    select: {
      role: true,
    },
  });

  if (!user || user.role !== "ADMIN") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Admin değilsiniz!",
    });
  }

  return next({
    ctx: {
      user: {
        id: ctx.user.id,
        role: user.role,
      },
    },
  });
});

const enforceUserIsOwner = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  const user = await ctx.prisma.user.findUnique({
    where: {
      userId: ctx.user.id,
      role: "OWNER",
    },
    select: {
      role: true,
      isActive: true,
      ownerCompany: {
        select: {
          id: true,
          isActive: true,
        },
      },
    },
  });

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Bu işlemi yapmaya yetkiniz bulunmamaktadır.",
    });
  }

  if (!user.isActive) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Hesabınız aktif değil!",
    });
  }

  if (!user.ownerCompany?.isActive) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Şirketiniz aktif değil",
    });
  }

  return next({
    ctx: {
      user: {
        id: ctx.user.id,
        companyId: user.ownerCompany?.id,
      },
    },
  });
});

const commonRoles = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Giriş yapmalısınız.",
    });
  }

  const user = await ctx.prisma.user.findUnique({
    where: {
      userId: ctx.user.id,
      role: { in: ["OWNER", "FIELD_STAFF", "OFFICE_STAFF"] },
    },
    select: {
      ownerCompany: {
        select: {
          id: true,
          isActive: true,
        },
      },
      staffCompany: {
        select: {
          id: true,
          isActive: true,
        },
      },
      role: true,
      isActive: true,
    },
  });

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Bu işlemi yapmaya yetkiniz bulunmamaktadır.",
    });
  }

  if (!user.isActive) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Hesap aktif değil!",
    });
  }

  if (user?.ownerCompany && user?.ownerCompany?.isActive === false) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Şirketiniz aktif değil!",
    });
  }

  if (user?.staffCompany && user?.staffCompany?.isActive === false) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Şirketiniz aktif değil!",
    });
  }

  let companyId;

  if (user.role === "OWNER") {
    companyId = user.ownerCompany?.id;
  } else {
    companyId = user.staffCompany?.id;
  }

  return next({
    ctx: {
      user: {
        id: ctx.user.id,
        role: user.role,
        companyId,
      },
    },
  });
});

export const adminProcedure = t.procedure.use(enforceUserIsAdmin);

export const privateProcedure = t.procedure.use(enforceUserIsAuthed);

export const commonProcedure = t.procedure.use(commonRoles);
export const ownerProcedure = t.procedure.use(enforceUserIsOwner);

// gerektiği takdirde kullanılacak
export const rateLimitedAdminProcedure = adminProcedure.use(rateLimiter);

export const rateLimitedPublicProcedure = publicProcedure.use(rateLimiter);

export const rateLimitedPrivateProcedure = privateProcedure.use(rateLimiter);

export const rateLimitedCommonProcedure = commonProcedure.use(rateLimiter);
export const rateLimitedOwnerProcedure = ownerProcedure.use(rateLimiter);
