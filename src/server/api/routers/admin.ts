import { env } from "@/env.mjs";
import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { type AdminJwtPayloadType } from "@/utils/schemas";
import { TRPCError } from "@trpc/server";
import * as jose from "jose";

export const adminRouter = createTRPCRouter({
  checkIsAdmin: adminProcedure.query(({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: `Kullanıcı bulunamadı.`,
      });
    }

    try {
      if (ctx.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: `Yetkisiz erişim: Admin değilsiniz.`,
        });
      }

      return { role: ctx.user.role };
    } catch (error) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: `Admin değilsiniz.`,
      });
    }
  }),

  generateCompanyJwt: adminProcedure.mutation(async ({ ctx }) => {
    const company = await ctx.prisma.company.create({
      data: {
        address: "",
        logo: "",
        name: "",
        companyType: "LIMITED_COMPANY",
        taxId: "",
        phone: "",
        city: "",
        district: "",
        email: "",
        isActive: true,
        owner: {
          create: {
            email: "",
            firstName: "",
            lastName: "",
            isActive: true,
            phone: "",
            role: "OWNER",
            userId: "",
            avatar: "",
          },
        },
      },
    });

    const jwt: AdminJwtPayloadType = {
      companyId: company.id,
    };

    const secret = new TextEncoder().encode(env.ADMIN_JWT_SECRET_KEY);
    const token = await new jose.SignJWT(jwt)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1w")
      .sign(secret);

    return {
      success: true,
      token,
    };
  }),
});
