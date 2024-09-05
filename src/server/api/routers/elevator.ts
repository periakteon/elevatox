import { z } from "zod";
import {
  createTRPCRouter,
  rateLimitedCommonProcedure,
  rateLimitedOwnerProcedure,
} from "@/server/api/trpc";
import { ElevatorQRCODELocation, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { addElevatorSchema, updateElevatorSchema } from "@/utils/schemas";

export const elevatorRouter = createTRPCRouter({
  /**
   * @url -> /asansor/ekle
   *
   * @param zod: addElevatorSchema
   *
   * @description Asansör ekler
   *
   * @returns void
   * */
  addElevator: rateLimitedCommonProcedure
    .input(addElevatorSchema)
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
        await ctx.prisma.elevator.create({
          data: {
            buildingResponsiblePersonId:
              input.elevator.buildingResponsiblePerson.id,
            companyId: ctx.user.companyId,
            elevatorToStaff: {
              create: {
                staffId: input.elevator.staff.id,
              },
            },
            elevatorInstallationDate: input.elevator.elevatorInstallationDate,
            elevatorLastMaintenanceDate:
              input.elevator.elevatorLastMaintenanceDate,
            elevatorSerialNumber: input.elevator.elevatorSerialNumber,
            elevatorType: input.elevator.elevatorType,
            isActive: true,
            maintenanceFee: input.elevator.maintenanceFee,
            elevatorCapacityKg: input.elevator.elevatorCapacityKg,
            elevatorCapacityPerson: input.elevator.elevatorCapacityPerson,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `Bu asansör zaten eklenmiş.`,
            });
          }

          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Asansör eklenirken bir hata oluştu: ${error.message}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Asansör eklenirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /asansor
   * @url -> /asansor/duzenle
   *
   * @description Asansör listesini getirir
   *
   * @returns void
   * */
  getElevatorList: rateLimitedCommonProcedure.query(async ({ ctx }) => {
    try {
      const elevatorList = await ctx.prisma.elevator.findMany({
        where: {
          companyId: ctx.user.companyId,
        },
        select: {
          buildingResponsiblePerson: {
            select: {
              firstName: true,
              lastName: true,
              phone: true,
              buildingName: true,
              city: true,
              district: true,
              area: true,
              citizenshipId: true,
              taxId: true,
              address: true,
              buildingFloor: true,
            },
          },
          id: true,
          elevatorToStaff: {
            select: {
              staffId: true,
              id: true,
            },
          },
          companyId: true,
          elevatorCapacityKg: true,
          elevatorCapacityPerson: true,
          elevatorInstallationDate: true,
          elevatorLastMaintenanceDate: true,
          elevatorSerialNumber: true,
          elevatorType: true,
          maintenanceFee: true,
        },
      });

      return elevatorList;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Asansörler getirilirken bir hata oluştu: ${error.message}}`,
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Asansörler getirilirken bir hata oluştu.`,
      });
    }
  }),

  /**
   * @url -> /asansor/sil
   *
   * @description Silinmesi için asansör listesini getirir
   *
   * @returns asansör listesi
   * */
  getElevatorListToDelete: rateLimitedCommonProcedure.query(async ({ ctx }) => {
    if (ctx.user.role === "FIELD_STAFF") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Bu işlemi yapmaya yetkiniz bulunmamaktadır.",
      });
    }

    try {
      const elevatorList = await ctx.prisma.elevator.findMany({
        where: {
          companyId: ctx.user.companyId,
        },
        select: {
          buildingResponsiblePerson: {
            select: {
              buildingName: true,
              city: true,
              district: true,
              area: true,
            },
          },
          id: true,
          companyId: true,
          elevatorSerialNumber: true,
          elevatorType: true,
          maintenanceFee: true,
        },
      });

      return elevatorList;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Asansörler getirilirken bir hata oluştu: ${error.message}}`,
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Asansörler getirilirken bir hata oluştu.`,
      });
    }
  }),

  /**
   * @url -> /asansor
   *
   * @param elevatorToUserId: string
   *
   * @description Verilen id'ye göre ElevatorToUser tablosundan many-to-many ilişkisini getirir
   * @description TanStack Table'da Excel export'u için SEÇİLİ bakım sorumlusunun bilgilerini getirmek kullanılıyor
   *
   * @returns user
   * */
  getElevatorToUserByStaffId: rateLimitedCommonProcedure
    .input(z.object({ elevatorToUserId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: input.elevatorToUserId,
          },
          select: {
            firstName: true,
            lastName: true,
          },
        });

        return user;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Kullanıcı getirilirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Kullanıcı getirilirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /asansor/duzenle
   *
   * @param array: string[]
   *
   * @description Verilen id'ler ile ElevatorToUser tablosundan many-to-many ilişkisini getirir
   * @description TanStack Table'da Excel export'u için TÜM bakım sorumlularının bilgilerini getirmek kullanılıyor
   *
   * @returns user[]
   * */
  getElevatorToUserByStaffIds: rateLimitedCommonProcedure
    //get by staffId
    .input(z.object({ elevatorToUserIds: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      try {
        const users = await ctx.prisma.user.findMany({
          where: {
            id: {
              in: input.elevatorToUserIds,
            },
          },
          select: {
            firstName: true,
            lastName: true,
            id: true,
          },
        });

        return users;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Kullanıcılar getirilirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Kullanıcılar getirilirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /asansor
   * @url -> /asansor/sil
   *
   * @param elevatorId: string
   * @param companyId: string
   *
   * @description Verilen id'ye göre asansörü siler
   *
   * @returns void
   * */
  deleteElevator: rateLimitedOwnerProcedure
    .input(z.object({ elevatorId: z.string(), companyId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.companyId !== input.companyId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Bu işlemi yapmaya yetkiniz bulunmamaktadır.",
        });
      }

      try {
        await ctx.prisma.elevator.delete({
          where: {
            id: input.elevatorId,
            companyId: input.companyId,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Asansör silinirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Asansör silinirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /asansor (MODAL)
   * @url -> /asansor/duzenle (MODAL)
   *
   * @param zod: updateElevatorSchema
   *
   * @description Verilen id'ye göre asansörü günceller
   *
   * @returns void
   * */
  updateElevator: rateLimitedCommonProcedure
    .input(updateElevatorSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role === "FIELD_STAFF") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Bu işlemi yapmaya yetkiniz bulunmamaktadır.",
        });
      }

      try {
        if (input.elevator.staff.id === "" || !input.elevator.staff.id) {
          // bu kontrolü yapma sebebimiz şu:
          // asansör eklenirken asansöre atanan bakım personeli şirketten ayrılırsa veya
          // bir şekilde kaydı (user) silinirse, asansörün bakım personeli boş kalıyor.
          // bu durumda asansörü güncellerken bakım personeli boş ise yeni bir kayıt oluşturuyoruz (yeni bir bakım personeli atıyoruz)
          const newElevatorToUser = await ctx.prisma.elevatorToUser.create({
            data: {
              elevatorId: input.elevator.id,
              staffId: input.elevator.staff.staffId,
            },
          });

          await ctx.prisma.elevator.update({
            where: {
              id: input.elevator.id,
            },
            data: {
              elevatorToStaff: {
                update: {
                  where: {
                    id: newElevatorToUser.id,
                  },
                  data: {
                    staffId: newElevatorToUser.staffId,
                  },
                },
              },
              buildingResponsiblePerson: {
                update: {
                  firstName: input.buildingResponsiblePerson.firstName,
                  lastName: input.buildingResponsiblePerson.lastName,
                  phone: input.buildingResponsiblePerson.phone,
                  buildingName: input.buildingResponsiblePerson.buildingName,
                  city: input.buildingResponsiblePerson.city,
                  district: input.buildingResponsiblePerson.district,
                  area: input.buildingResponsiblePerson.area,
                  citizenshipId: input.buildingResponsiblePerson.citizenshipId,
                  taxId: input.buildingResponsiblePerson.taxId,
                  address: input.buildingResponsiblePerson.address,
                  buildingFloor: input.buildingResponsiblePerson.buildingFloor,
                },
              },
              elevatorCapacityKg: input.elevator.elevatorCapacityKg,
              elevatorCapacityPerson: input.elevator.elevatorCapacityPerson,
              elevatorInstallationDate: input.elevator.elevatorInstallationDate,
              elevatorLastMaintenanceDate:
                input.elevator.elevatorLastMaintenanceDate,
              elevatorSerialNumber: input.elevator.elevatorSerialNumber,
              maintenanceFee: input.elevator.maintenanceFee,
              elevatorType: input.elevator.elevatorType,
            },
          });
        } else {
          await ctx.prisma.elevator.update({
            where: {
              id: input.elevator.id,
            },
            data: {
              elevatorToStaff: {
                update: {
                  where: {
                    id: input.elevator.staff.id,
                  },
                  data: {
                    staffId: input.elevator.staff.staffId,
                  },
                },
              },
              buildingResponsiblePerson: {
                update: {
                  firstName: input.buildingResponsiblePerson.firstName,
                  lastName: input.buildingResponsiblePerson.lastName,
                  phone: input.buildingResponsiblePerson.phone,
                  buildingName: input.buildingResponsiblePerson.buildingName,
                  city: input.buildingResponsiblePerson.city,
                  district: input.buildingResponsiblePerson.district,
                  area: input.buildingResponsiblePerson.area,
                  citizenshipId: input.buildingResponsiblePerson.citizenshipId,
                  taxId: input.buildingResponsiblePerson.taxId,
                  address: input.buildingResponsiblePerson.address,
                  buildingFloor: input.buildingResponsiblePerson.buildingFloor,
                },
              },
              elevatorCapacityKg: input.elevator.elevatorCapacityKg,
              elevatorCapacityPerson: input.elevator.elevatorCapacityPerson,
              elevatorInstallationDate: input.elevator.elevatorInstallationDate,
              elevatorLastMaintenanceDate:
                input.elevator.elevatorLastMaintenanceDate,
              elevatorSerialNumber: input.elevator.elevatorSerialNumber,
              maintenanceFee: input.elevator.maintenanceFee,
              elevatorType: input.elevator.elevatorType,
            },
          });
        }
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Asansör güncellenirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Asansör güncellenirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bakim/qr
   *
   * @description QR kod için asansör listesini getirir
   *
   * @returns elevatorList[]
   * */
  getElevatorListForQRCode: rateLimitedCommonProcedure.query(
    async ({ ctx }) => {
      try {
        const elevatorList = await ctx.prisma.elevator.findMany({
          where: {
            companyId: ctx.user.companyId,
          },
          select: {
            buildingResponsiblePerson: {
              select: {
                firstName: true,
                lastName: true,
                buildingName: true,
                city: true,
                district: true,
                area: true,
                address: true,
              },
            },
            id: true,
            elevatorSerialNumber: true,
          },
        });

        return elevatorList;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Asansörler getirilirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Asansörler getirilirken bir hata oluştu.`,
        });
      }
    },
  ),

  /**
   * @url -> /bakim/:id
   *
   * @param elevatorId: string
   *
   * @description Verilen id'ye göre QR kod getirir
   *
   * @returns elevator
   * */
  checkQRCodes: rateLimitedCommonProcedure
    .input(z.object({ elevatorId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const elevator = await ctx.prisma.elevator.findUnique({
          where: {
            id: input.elevatorId,
          },
          select: {
            elevatorQRCode: true,
            company: {
              select: {
                logo: true,
                name: true,
                phone: true,
              },
            },
            buildingResponsiblePerson: {
              select: {
                firstName: true,
                lastName: true,
                buildingName: true,
                city: true,
                district: true,
                area: true,
                address: true,
              },
            },
            elevatorSerialNumber: true,
            elevatorCapacityKg: true,
            elevatorCapacityPerson: true,
            elevatorInstallationDate: true,
            elevatorLastMaintenanceDate: true,
            maintenanceFee: true,
          },
        });

        return elevator;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `QR kod kontrol edilirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `QR kod kontrol edilirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bakim/:id
   *
   * @param elevatorId: string
   *
   * @description Verilen id'ye göre QR kod oluşturur
   *
   * @returns maintenance
   * */
  createQRCode: rateLimitedCommonProcedure
    .input(z.object({ elevatorId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user.companyId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Yetkisiz erişim.",
        });
      }

      const locations: ElevatorQRCODELocation[] = [
        ElevatorQRCODELocation.KABIN_USTU,
        ElevatorQRCODELocation.KUYU_DIBI,
        ElevatorQRCODELocation.MAKINE_DAIRESI,
      ];

      try {
        const qrCodeCreations = locations.map(async (location) => {
          return await ctx.prisma.elevatorQRCode.create({
            data: {
              elevatorId: input.elevatorId,
              elevatorLocation: location,
            },
          });
        });

        const qrCodePromise = await Promise.allSettled(qrCodeCreations);

        qrCodePromise.forEach((promise, index) => {
          if (promise.status === "rejected") {
            async function deleteCreatedQRCodes(): Promise<void> {
              const qrCodes = await ctx.prisma.elevatorQRCode.findMany({
                where: {
                  elevatorId: input.elevatorId,
                },
              });

              const qrCodeIds = qrCodes.map((qrCode) => qrCode.id);

              await ctx.prisma.elevatorQRCode.deleteMany({
                where: {
                  id: {
                    in: qrCodeIds,
                  },
                },
              });
            }

            void deleteCreatedQRCodes();

            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: `QR Kod oluşturulurken bir hata oluştu. Index: ${index}`,
            });
          }
        });

        try {
          await ctx.prisma.maintenance.create({
            data: {
              elevatorId: input.elevatorId,
              companyId: ctx.user.companyId,
            },
          });
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: `Bakım tablosu oluşturulurken bir hata oluştu: ${error.message}}`,
            });
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Bakım tablosu oluşturulamadı.`,
          });
        }
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `Bu asansör için zaten QR Kod veya bakım tablosu oluşturulmuş.`,
            });
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `QR Kod oluşturulurken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `QR Kod oluşturulurken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bakim/:id
   *
   * @param qrCodeId: string
   *
   * @description Verilen id'ye göre QR kod getirir
   *
   * @returns location
   * */
  checkQRCodeLocation: rateLimitedCommonProcedure
    .input(z.object({ qrCodeId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const location = await ctx.prisma.elevatorQRCode.findUnique({
          where: {
            id: input.qrCodeId,
          },
          select: {
            elevatorLocation: true,
            elevator: {
              select: {
                id: true,
                maintenance: {
                  select: {
                    id: true,
                  },
                },
                buildingResponsiblePerson: {
                  select: {
                    buildingName: true,
                  },
                },
              },
            },
          },
        });

        return location;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `QR kod konumu getirilirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `QR kod konumu getirilirken bir hata oluştu.`,
        });
      }
    }),
});
