import { z } from "zod";
import {
  createTRPCRouter,
  rateLimitedOwnerProcedure,
  rateLimitedCommonProcedure,
} from "@/server/api/trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  addBuildingResponsiblePersonSchema,
  updateBuildingResponsiblePersonSchema,
} from "@/utils/schemas";

export const buildingResponsiblePersonRouter = createTRPCRouter({
  /**
   * @url -> /bina-sorumlulari/ekle
   *
   * @param zod: addBuildingResponsiblePersonSchema
   *
   * @description Bina sorumlusu ekler
   *
   * @returns void
   * */
  addBuildingResponsiblePerson: rateLimitedCommonProcedure
    .input(addBuildingResponsiblePersonSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role === "FIELD_STAFF") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Bu işlemi yapmaya yetkiniz bulunmamaktadır.",
        });
      }

      if (!ctx.user.companyId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Şirket bulunamadı.",
        });
      }

      try {
        await ctx.prisma.buildingResponsiblePerson.create({
          data: {
            firstName: input.person.firstName,
            lastName: input.person.lastName,
            phone: input.person.phone,
            address: input.person.address,
            city: input.person.city,
            district: input.person.district,
            area: input.person.area,
            isActive: true,
            buildingFloor: input.person.buildingFloor,
            buildingName: input.person.buildingName,
            citizenshipId: input.person.tcNo,
            taxId: input.person.vergiKimlikNo,
            companyId: ctx.user.companyId,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `Bu bina sorumlusu zaten eklenmiş.`,
            });
          }

          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Bina sorumlusu eklenirken bir hata oluştu: ${error.message}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bina sorumlusu eklenirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bina-sorumlulari
   * @url -> /bina-sorumlulari/duzenle
   * @url -> /bina-sorumlulari/ekle
   * @url -> /bina-sorumlulari/sil
   *
   * @url -> /asansor/ekle
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
              buildingFloor: true,
              area: true,
              taxId: true,
              citizenshipId: true,
              phone: true,
              address: true,
              city: true,
              district: true,
              createdAt: true,
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
   * @url -> /bina-sorumlulari
   * @url -> /bina-sorumlulari/sil
   *
   * @param userId: string
   *
   * @description Bina sorumlusunu siler
   *
   * @returns void
   * */
  deleteBuildingResponsiblePerson: rateLimitedOwnerProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.buildingResponsiblePerson.delete({
          where: {
            id: input.userId,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Bina sorumlusu silinirken bir hata oluştu: ${error.message}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bina sorumlusu silinirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bina-sorumlulari/duzenle
   *
   * @param zod: updateBuildingResponsiblePersonSchema
   *
   * @description Bina sorumlusunu günceller
   *
   * @returns void
   * */
  editBuildingResponsiblePerson: rateLimitedCommonProcedure
    .input(updateBuildingResponsiblePersonSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role === "FIELD_STAFF") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Bu işlemi yapmaya yetkiniz bulunmamaktadır.",
        });
      }

      try {
        await ctx.prisma.buildingResponsiblePerson.update({
          where: {
            id: input.person.id,
          },
          data: {
            firstName: input.person.firstName,
            lastName: input.person.lastName,
            phone: input.person.phone,
            address: input.person.address,
            city: input.person.city,
            district: input.person.district,
            area: input.person.area,
            buildingFloor: input.person.buildingFloor,
            buildingName: input.person.buildingName,
            citizenshipId: input.person.tcNo,
            taxId: input.person.vergiKimlikNo,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Bina sorumlusu güncellenirken bir hata oluştu: ${error.message}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bina sorumlusu güncellenirken bir hata oluştu.`,
        });
      }
    }),
});
