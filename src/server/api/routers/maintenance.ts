import { z } from "zod";
import {
  createTRPCRouter,
  rateLimitedCommonProcedure,
  rateLimitedOwnerProcedure,
} from "@/server/api/trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  kabinUstuMaintenanceSchema,
  kuyuDibiMaintenanceSchema,
  makineDairesiMaintenanceSchema,
} from "@/utils/schemas";

export const maintenanceRouter = createTRPCRouter({
  /**
   * @url -> /bakim/liste/:id
   *
   * @param elevatorId: string
   *
   * @description Kabin üstü bakım kayıtlarını getirir.
   *
   * @returns Kabin üstü bakım kayıtları
   */
  getKabinUstuMaintenanceList: rateLimitedCommonProcedure
    .input(z.object({ elevatorId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const maintenanceList = await ctx.prisma.elevator.findUnique({
          where: {
            id: input.elevatorId,
            companyId: ctx.user.companyId,
          },
          select: {
            buildingResponsiblePerson: {
              select: {
                buildingName: true,
                address: true,
              },
            },
            maintenance: {
              where: {
                elevatorId: input.elevatorId,
              },
              include: {
                // "Bakım Ekle" butonunda router push yapmak için kullanılıyor.
                elevator: {
                  select: {
                    maintenance: {
                      select: {
                        id: true,
                      },
                    },
                    elevatorQRCode: {
                      select: {
                        id: true,
                        elevatorLocation: true,
                      },
                    },
                  },
                },
                kabinUstuMaintenance: {
                  include: {
                    staff: {
                      select: {
                        firstName: true,
                        lastName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        return maintenanceList;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Kabin üstü bakım kayıtları getirilirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Kabin üstü bakım kayıtları getirilirken bir hata oluştu.`,
        });
      }
    }),
  /**
   * @url -> /bakim/liste/:id
   *
   * @param elevatorId: string
   *
   * @description Kabin üstü bakım kayıtlarını getirir.
   *
   * @returns Kabin üstü bakım kayıtları
   */
  getKuyuDibiMaintenanceList: rateLimitedCommonProcedure
    .input(z.object({ elevatorId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const maintenanceList = await ctx.prisma.elevator.findUnique({
          where: {
            id: input.elevatorId,
            companyId: ctx.user.companyId,
          },
          select: {
            buildingResponsiblePerson: {
              select: {
                buildingName: true,
                address: true,
              },
            },
            maintenance: {
              where: {
                elevatorId: input.elevatorId,
              },
              include: {
                elevator: {
                  select: {
                    id: true,
                  },
                },
                kuyuDibiMaintenance: {
                  include: {
                    staff: {
                      select: {
                        firstName: true,
                        lastName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        return maintenanceList;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Kabin üstü bakım kayıtları getirilirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Kabin üstü bakım kayıtları getirilirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bakim/liste/:id
   *
   * @param elevatorId: string
   *
   * @description Makine dairesi bakım kayıtlarını getirir.
   *
   * @returns Makine dairesi bakım kayıtları
   */
  getMakineDairesiMaintenanceList: rateLimitedCommonProcedure
    .input(z.object({ elevatorId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const maintenanceList = await ctx.prisma.elevator.findUnique({
          where: {
            id: input.elevatorId,
            companyId: ctx.user.companyId,
          },
          select: {
            buildingResponsiblePerson: {
              select: {
                buildingName: true,
                address: true,
              },
            },
            maintenance: {
              where: {
                elevatorId: input.elevatorId,
              },
              include: {
                elevator: {
                  select: {
                    id: true,
                  },
                },
                makineDairesiMaintenance: {
                  include: {
                    staff: {
                      select: {
                        firstName: true,
                        lastName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        return maintenanceList;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Kabin üstü bakım kayıtları getirilirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Kabin üstü bakım kayıtları getirilirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bakim/liste/:id
   *
   * @param kabinUstuMaintenanceId: string
   *
   * @description Tablodaki kabin üstü bakım kaydını siler.
   *
   * @returns void
   */
  deleteKabinUstuMaintenance: rateLimitedOwnerProcedure
    .input(
      z.object({
        kabinUstuMaintenanceId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.kabinUstuMaintenance.delete({
          where: {
            id: input.kabinUstuMaintenanceId,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Bakım kaydı silinirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bakım kaydı silinirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bakim/liste/:id
   *
   * @param id: string
   * @param schema: kabinUstuMaintenanceSchema
   *
   * @description Tablodaki kabin üstü bakım kaydını günceller.
   *
   * @returns void
   */
  updateKabinUstuMaintenance: rateLimitedCommonProcedure
    .input(
      z.object({
        id: z.string(),
        ...kabinUstuMaintenanceSchema.shape,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...rest } = input;

        await ctx.prisma.kabinUstuMaintenance.update({
          where: {
            id,
          },
          data: rest,
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Bakım düzenlenirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bakım düzenlenirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bakim/liste/:id
   *
   * @param kuyuDibiMaintenanceId: string
   *
   * @description Tablodaki kuyu dibi bakım kaydını siler.
   *
   * @returns void
   */
  deleteKuyuDibiMaintenance: rateLimitedOwnerProcedure
    .input(
      z.object({
        kuyuDibiMaintenanceId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.kuyuDibiMaintenance.delete({
          where: {
            id: input.kuyuDibiMaintenanceId,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Bakım kaydı silinirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bakım kaydı silinirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bakim/liste/:id
   *
   * @param id: string
   * @param schema: kuyuDibiMaintenanceSchema
   *
   * @description Tablodaki kuyu dibi bakım kaydını günceller.
   *
   * @returns void
   */
  updateKuyuDibiMaintenance: rateLimitedCommonProcedure
    .input(
      z.object({
        id: z.string(),
        ...kuyuDibiMaintenanceSchema.shape,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...rest } = input;

        await ctx.prisma.kuyuDibiMaintenance.update({
          where: {
            id,
          },
          data: rest,
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Bakım düzenlenirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bakım düzenlenirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bakim/liste/:id
   *
   * @param kuyuDibiMaintenanceId: string
   *
   * @description Tablodaki kuyu dibi bakım kaydını siler.
   *
   * @returns void
   */
  deleteMakineDairesiMaintenance: rateLimitedOwnerProcedure
    .input(
      z.object({
        makineDairesiMaintenanceId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.makineDairesiMaintenance.delete({
          where: {
            id: input.makineDairesiMaintenanceId,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Bakım kaydı silinirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bakım kaydı silinirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bakim/liste/:id
   *
   * @param id: string
   * @param schema: kuyuDibiMaintenanceSchema
   *
   * @description Tablodaki kuyu dibi bakım kaydını günceller.
   *
   * @returns void
   */
  updateMakineDairesiMaintenance: rateLimitedCommonProcedure
    .input(
      z.object({
        id: z.string(),
        ...makineDairesiMaintenanceSchema.shape,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...rest } = input;

        await ctx.prisma.makineDairesiMaintenance.update({
          where: {
            id,
          },
          data: rest,
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Bakım düzenlenirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bakım düzenlenirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bakim/:id (MAINTENANCE FORM)
   *
   * @param schema: makineDairesiMaintenanceSchema
   *
   * @description Makine dairesi bakım kaydı oluşturur.
   *
   * @returns maintenance
   * */
  createMakineDairesiMaintenance: rateLimitedCommonProcedure
    .input(makineDairesiMaintenanceSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Bakım oluşturmak için giriş yapmalısınız.",
        });
      }

      try {
        const company = await ctx.prisma.company.findUnique({
          where: {
            id: ctx.user.companyId,
          },
        });

        if (!company) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Şirket bulunamadı.",
          });
        }

        if (company?.id !== ctx.user.companyId) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Bakım oluşturmak için yetkiniz yok.",
          });
        }

        const maintenance = await ctx.prisma.makineDairesiMaintenance.create({
          data: {
            staffId: ctx.user.id,
            maintenanceId: input.maintenanceId,
            gearBox: input.gearBox,
            propulsionMotor: input.propulsionMotor,
            switchBoard: input.switchBoard,
            additionalNote: input.additionalNote,
          },
        });

        return maintenance;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Bakım kaydı yapılırken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bakım kaydı oluşturulamadı.`,
        });
      }
    }),

  /**
   * @url -> /bakim/:id (MAINTENANCE FORM)
   *
   * @param schema: kuyuDibiMaintenanceSchema
   *
   * @description Kuyu dibi bakım kaydı oluşturur.
   *
   * @returns maintenance
   * */
  createKuyuDibiMaintenance: rateLimitedCommonProcedure
    .input(kuyuDibiMaintenanceSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Bakım oluşturmak için giriş yapmalısınız.",
        });
      }

      try {
        const company = await ctx.prisma.company.findUnique({
          where: {
            id: ctx.user.companyId,
          },
        });

        if (!company) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Şirket bulunamadı.",
          });
        }

        if (company?.id !== ctx.user.companyId) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Bakım oluşturmak için yetkiniz yok.",
          });
        }

        const maintenance = await ctx.prisma.kuyuDibiMaintenance.create({
          data: {
            staffId: ctx.user.id,
            maintenanceId: input.maintenanceId,
            additionalNote: input.additionalNote,
            borderSecurityBreaker: input.borderSecurityBreaker,
            emergencyAlarm: input.emergencyAlarm,
            speedRegulator: input.speedRegulator,
          },
        });

        return maintenance;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Bakım kaydı yapılırken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bakım kaydı oluşturulamadı.`,
        });
      }
    }),

  /**
   * @url -> /bakim/:id (MAINTENANCE FORM)
   *
   * @param schema: kabinUstuMaintenanceSchema
   *
   * @description Kabin üstü bakım kaydı oluşturur.
   *
   * @returns maintenance
   * */
  createKabinUstuMaintenance: rateLimitedCommonProcedure
    .input(kabinUstuMaintenanceSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Bakım oluşturmak için giriş yapmalısınız.",
        });
      }

      try {
        const company = await ctx.prisma.company.findUnique({
          where: {
            id: ctx.user.companyId,
          },
        });

        if (!company) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Şirket bulunamadı.",
          });
        }

        if (company?.id !== ctx.user.companyId) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Bakım oluşturmak için yetkiniz yok.",
          });
        }

        const maintenance = await ctx.prisma.kabinUstuMaintenance.create({
          data: {
            staffId: ctx.user.id,
            maintenanceId: input.maintenanceId,
            borderSecurityBreaker: input.borderSecurityBreaker,
            emergencyAlarm: input.emergencyAlarm,
            counterWeight: input.counterWeight,
            elevatorCabin: input.elevatorCabin,
            additionalNote: input.additionalNote,
            elevatorCabinDoor: input.elevatorCabinDoor,
            floorLevel: input.floorLevel,
            speedRegulator: input.speedRegulator,
            stationEntrance: input.stationEntrance,
            stopControls: input.stopControls,
          },
        });

        return maintenance;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Bakım kaydı yapılırken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bakım kaydı oluşturulamadı.`,
        });
      }
    }),

  /**
   * @url -> /bakim/:id (MAINTENANCE FORMLARIN TAMAMINDA)
   *
   * @param maintenanceId: string
   *
   * @description PDF olarak yazdırmak üzere son bakım kayıtlarını getirir.
   *
   * @returns void
   * */
  getLastMaintenanceList: rateLimitedCommonProcedure
    .input(z.object({ maintenanceId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      try {
        const maintenanceList = await ctx.prisma.maintenance.findUnique({
          where: {
            id: input.maintenanceId,
            companyId: ctx.user.companyId,
          },
          select: {
            company: {
              select: {
                taxId: true,
              },
            },
            kabinUstuMaintenance: {
              include: {
                maintenance: {
                  select: {
                    createdAt: true,
                  },
                },
              },
              take: 1,
              orderBy: {
                createdAt: "desc",
              },
            },
            kuyuDibiMaintenance: {
              include: {
                maintenance: {
                  select: {
                    createdAt: true,
                  },
                },
              },
              take: 1,
              orderBy: {
                createdAt: "desc",
              },
            },
            makineDairesiMaintenance: {
              include: {
                maintenance: {
                  select: {
                    createdAt: true,
                  },
                },
              },
              take: 1,
              orderBy: {
                createdAt: "desc",
              },
            },
            elevator: {
              select: {
                company: {
                  select: {
                    owner: {
                      select: {
                        firstName: true,
                        lastName: true,
                        phone: true,
                        email: true,
                      },
                    },
                    logo: true,
                    phone: true,
                    name: true,
                    city: true,
                    district: true,
                    address: true,
                  },
                },
              },
            },
          },
        });

        return maintenanceList;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Bakım kayıtları getirilirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bakım kaydı getirilirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bakim
   * @url -> /bakim/ekle
   * @url -> /bakim/duzenle
   * @url -> /bakim/sil
   *
   * @description Bakım kaydı eklemek için kullanılan QR kodları getirir.
   *
   * @returns void
   * */
  getQRCodesToAddMaintenance: rateLimitedCommonProcedure.query(
    async ({ ctx }) => {
      try {
        const elevators = await ctx.prisma.elevator.findMany({
          where: {
            companyId: ctx.user.companyId,
          },
          select: {
            id: true,
            buildingResponsiblePerson: {
              select: {
                buildingName: true,
                address: true,
                city: true,
                area: true,
              },
            },
            elevatorQRCode: {
              select: {
                elevatorLocation: true,
                id: true,
              },
            },
          },
        });

        return elevators;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `QR Kodlar getirilirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `QR Kodlar getirilirken bir hata oluştu.`,
        });
      }
    },
  ),

  /**
   * @url -> /bakim/liste/:id
   *
   * @description Toplu bakım kaydı silmek için
   *
   * @returns void
   * */
  deleteMultipleKabinUstuMaintenance: rateLimitedOwnerProcedure
    .input(
      z.object({
        maintenanceId: z.array(z.string()),
        kabinUstuMaintenanceIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.kabinUstuMaintenance.deleteMany({
          where: {
            maintenanceId: {
              in: input.maintenanceId,
            },
            id: {
              in: input.kabinUstuMaintenanceIds,
            },
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Bakım kaydı silinirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bakım kaydı silinirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bakim/liste/:id
   *
   * @description Toplu bakım kaydı silmek için
   *
   * @returns void
   * */
  deleteMultipleKuyuDibiMaintenance: rateLimitedOwnerProcedure
    .input(
      z.object({
        maintenanceId: z.array(z.string()),
        kuyuDibiMaintenanceIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.kuyuDibiMaintenance.deleteMany({
          where: {
            maintenanceId: {
              in: input.maintenanceId,
            },
            id: {
              in: input.kuyuDibiMaintenanceIds,
            },
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Bakım kaydı silinirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bakım kaydı silinirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /bakim/liste/:id
   *
   * @description Toplu bakım kaydı silmek için
   *
   * @returns void
   * */
  deleteMultipleMakineDairesiMaintenance: rateLimitedOwnerProcedure
    .input(
      z.object({
        maintenanceId: z.array(z.string()),
        makineDairesiMaintenanceIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.makineDairesiMaintenance.deleteMany({
          where: {
            maintenanceId: {
              in: input.maintenanceId,
            },
            id: {
              in: input.makineDairesiMaintenanceIds,
            },
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Bakım kaydı silinirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bakım kaydı silinirken bir hata oluştu.`,
        });
      }
    }),
});
