import { z } from "zod";
import {
  createTRPCRouter,
  rateLimitedOwnerProcedure,
  rateLimitedCommonProcedure,
} from "@/server/api/trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { addPaymentSchema, updatePaymentSchema } from "@/utils/schemas";

export const paymentRouter = createTRPCRouter({
  /**
   * @url -> /tahsilat
   * @url -> /tahsilat/duzenle
   * @url -> /tahsilat/ekle
   * @url -> /tahsilat/sil
   *
   * @description Bina sorumlularını getirir.
   *
   * @returns Bina sorumluları
   * */
  getBuildingResponsiblePersonList: rateLimitedCommonProcedure.query(
    async ({ ctx }) => {
      try {
        const responsiblePersonList =
          await ctx.prisma.buildingResponsiblePerson.findMany({
            where: {
              companyId: ctx.user.companyId,
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              buildingName: true,
              area: true,
              address: true,
              city: true,
              district: true,
            },
          });

        return responsiblePersonList;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Bina sorumluları getirilirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bina sorumluları getirilirken bir hata oluştu.`,
        });
      }
    },
  ),

  /**
   * @url -> /tahsilat/ekle
   *
   * @description Tahsilat kaydı oluşturur.
   *
   * @returns void
   * */
  addPayment: rateLimitedCommonProcedure
    .input(addPaymentSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Kullanıcı bilgileri alınamadı.",
        });
      }

      if (!ctx.user.companyId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Şirket bilgileri alınamadı.",
        });
      }

      try {
        const buildingResponsiblePerson =
          await ctx.prisma.buildingResponsiblePerson.findUnique({
            where: {
              id: input.buildingResponsiblePersonId,
              companyId: ctx.user.companyId,
            },
          });

        if (!buildingResponsiblePerson) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Bina sorumlusu bulunamadı.",
          });
        }

        if (buildingResponsiblePerson.companyId !== ctx.user.companyId) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message:
              "Bina sorumlusu şirkete ait değil. Yetkisiz işlem yaptınız.",
          });
        }

        await ctx.prisma.payment.create({
          data: {
            staffId: ctx.user.id,
            companyId: ctx.user.companyId,
            buildingResponsiblePersonId: input.buildingResponsiblePersonId,
            paymentAmount: input.payment.amount,
            paymentDate: input.payment.date,
            paymentDescription: input.payment.additionalNote,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Tahsilat kaydı oluşturulurken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Tahsilat kaydı oluşturulurken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /tahsilat/liste
   * @url -> /tahsilat/liste/[id]
   *
   * @description Tahsilat listesi getirir.
   *
   * @returns Tahsilat listesi
   * */
  getPaymentList: rateLimitedCommonProcedure
    .input(
      z.object({
        buildingResponsiblePersonId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Kullanıcı bilgileri alınamadı.",
        });
      }

      if (!ctx.user.companyId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Şirket bilgileri alınamadı.",
        });
      }

      try {
        const paymentList = await ctx.prisma.payment.findMany({
          where: {
            companyId: ctx.user.companyId,
            buildingResponsiblePersonId: input.buildingResponsiblePersonId,
          },
          select: {
            id: true,
            paymentAmount: true,
            paymentDate: true,
            paymentDescription: true,
            buildingResponsiblePerson: {
              select: {
                firstName: true,
                lastName: true,
                buildingName: true,
                address: true,
              },
            },
            staff: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        });

        return paymentList;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Tahsilat kayıtları getirilirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Tahsilat kayıtları getirilirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /tahsilat/sil
   * @url -> /tahsilat/liste/[id]
   *
   * @description Tahsilat kayıtları siler
   *
   * @returns void
   * */
  deleteMultiplePayments: rateLimitedOwnerProcedure
    .input(
      z.object({
        paymentIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Kullanıcı bilgileri alınamadı.",
        });
      }

      if (!ctx.user.companyId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Şirket bilgileri alınamadı.",
        });
      }

      try {
        await ctx.prisma.payment.deleteMany({
          where: {
            id: {
              in: input.paymentIds,
            },
            companyId: ctx.user.companyId,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Tahsilat kayıtları silinirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Tahsilat kayıtları silinirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /tahsilat/duzenle
   * @url -> /tahsilat/liste/[id]
   *
   * @description Tahsilat kaydı günceller.
   *
   * @returns void
   * */
  updatePayment: rateLimitedCommonProcedure
    .input(updatePaymentSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Kullanıcı bilgileri alınamadı.",
        });
      }

      if (!ctx.user.companyId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Şirket bilgileri alınamadı.",
        });
      }

      try {
        await ctx.prisma.payment.update({
          where: {
            id: input.payment.id,
            companyId: ctx.user.companyId,
          },
          data: {
            paymentAmount: input.payment.amount,
            paymentDate: input.payment.date,
            paymentDescription: input.payment.additionalNote,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Tahsilat kaydı düzenlenirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Tahsilat kaydı düzenlenirken bir hata oluştu.`,
        });
      }
    }),
});
