import { z } from "zod";
import {
  createTRPCRouter,
  rateLimitedPrivateProcedure,
  rateLimitedOwnerProcedure,
  rateLimitedCommonProcedure,
  rateLimitedPublicProcedure,
} from "@/server/api/trpc";
import {
  newCompanySchema,
  updateCompanySchema,
  type OwnerJwtPayloadType,
  type StaffDataType,
  createStaffSchema,
  updateStaffSchema,
  contactFormSchema,
  type CompanyInfo,
} from "@/utils/schemas";
import { TRPCError } from "@trpc/server";
import { env } from "@/env.mjs";
import * as jose from "jose";
import { Prisma } from "@prisma/client";
import { addWeeks } from "date-fns";

export const companyRouter = createTRPCRouter({
  /**
   * @url -> /iletisim
   *
   * @description İletişim formundan gelen mesajı kaydeder.
   *
   * @returns {void}
   * */
  sendContactMessage: rateLimitedPublicProcedure
    .input(
      z.object({
        captchaToken: z.string(),
        ...contactFormSchema.shape,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await fetch(
          `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET_KEY}&response=${input.captchaToken}`,
          {
            method: "POST",
          },
        );

        const data = (await response.json()) as { success: boolean };

        if (!data.success) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Captcha doğrulanamadı.`,
          });
        }

        await ctx.prisma.contactMessages.create({
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone,
            message: input.message,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Mesaj gönderilirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /firma/kayit
   *
   * @description Şirket kaydı yapar.
   *
   * @returns {CompanyInfo}
   *
   * */
  initialCompanySetup: rateLimitedPrivateProcedure
    .input(newCompanySchema)
    .mutation(async ({ ctx, input }) => {
      const secret = new TextEncoder().encode(env.ADMIN_JWT_SECRET_KEY);
      const verifiedToken = await jose.jwtVerify(input.token, secret);
      const payload = verifiedToken.payload as OwnerJwtPayloadType;

      try {
        await ctx.prisma.company.update({
          where: {
            id: payload.companyId,
          },
          data: {
            name: input.companyInfo.name,
            companyType: input.companyInfo.companyType,
            taxId: input.companyInfo.taxId,
            address: input.companyInfo.address,
            city: input.companyInfo.city,
            district: input.companyInfo.district,
            logo: input.companyInfo.logo,
            isActive: true,
            phone: input.companyInfo.phone,
            email: input.companyInfo.email,
            owner: {
              update: {
                email: input.userInfo.email,
                firstName: input.userInfo.firstName,
                lastName: input.userInfo.lastName,
                isActive: true,
                phone: input.userInfo.phone,
                role: "OWNER",
                userId: ctx.user.id,
                avatar: input.userInfo.avatar,
                staffCompanyId: payload.companyId,
              },
            },
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `Bu şirket zaten eklenmiş.`,
            });
          }

          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Şirket eklenirken bir hata oluştu: ${error.message}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Şirket eklenirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @file -> main-layout.tsx
   *
   * @description Şirket bilgilerini getirir.
   *
   * @returns {CompanyInfo}
   * */
  getCompanyInfo: rateLimitedCommonProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.prisma.user.findUnique({
        where: {
          userId: ctx.user.id,
        },
        select: {
          role: true,
          ownerCompany: {
            select: {
              name: true,
              logo: true,
              city: true,
              isActive: true,
            },
          },
          staffCompany: {
            select: {
              name: true,
              logo: true,
              city: true,
              isActive: true,
            },
          },
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Şirket bulunamadı",
        });
      }

      return {
        companyInfo: user.ownerCompany ?? user.staffCompany,
        role: user.role,
      } as unknown as CompanyInfo;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Şirket bilgileri getirilirken bir hata oluştu: ${error.message}}`,
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Şirket bilgileri getirilirken bir hata oluştu.`,
      });
    }
  }),

  /**
   * @url -> /personel (liste için)
   * @url -> /asansor/duzenle
   * @url -> /asansor/ekle
   * @url -> /personel/duzenle
   * @url -> /personel/sil
   *
   * @description Şirket çalışanlarını getirir.
   *
   * @returns {StaffDataType}
   * */
  getCompanyStaffList: rateLimitedCommonProcedure.query(async ({ ctx }) => {
    try {
      const company = await ctx.prisma.company.findUnique({
        where: {
          id: ctx.user.companyId,
        },
        include: {
          staff: true,
          owner: {
            select: {
              ownerCompany: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      return {
        staff: company?.staff as unknown as StaffDataType,
        companyName: company?.owner?.ownerCompany?.name,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Şirket çalışanları getirilirken bir hata oluştu: ${error.message}}`,
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Şirket çalışanları getirilirken bir hata oluştu.`,
      });
    }
  }),

  /**
   * @url -> /firma/duzenle
   *
   * @description Şirket detaylarını getirir.
   *
   * @returns Company Details
   * */
  getCompanyDetails: rateLimitedOwnerProcedure.query(async ({ ctx }) => {
    try {
      const company = await ctx.prisma.user.findUnique({
        where: {
          userId: ctx.user.id,
        },
        select: {
          ownerCompany: {
            select: {
              name: true,
              companyType: true,
              taxId: true,
              logo: true,
              city: true,
              district: true,
              address: true,
              phone: true,
              email: true,
              owner: {
                select: {
                  firstName: true,
                  lastName: true,
                  role: true,
                  phone: true,
                },
              },
            },
          },
        },
      });

      if (!company) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Şirket bulunamadı",
        });
      }

      return company;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Şirket detayları getirilirken bir hata oluştu: ${error.message}}`,
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Şirket detayları getirilirken bir hata oluştu.`,
      });
    }
  }),

  updateCompanyInfo: rateLimitedOwnerProcedure
    .input(updateCompanySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        if (input.company.logo) {
        }

        await ctx.prisma.company.update({
          where: {
            ownerId: ctx.user.id,
          },
          data: {
            name: input.company.name,
            companyType: input.company.companyType,
            taxId: input.company.taxId,
            city: input.company.city,
            district: input.company.district,
            address: input.company.address,
            phone: input.company.phone,
            email: input.company.email,
            logo: input.company.logo,
            owner: {
              update: {
                firstName: input.owner.firstName,
                lastName: input.owner.lastName,
                phone: input.owner.phone,
              },
            },
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Şirket güncellenirken bir hata oluştu: ${error.message}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Şirket güncellenirken bir hata oluştu.`,
        });
      }
    }),

  createMagicLinkForStaff: rateLimitedOwnerProcedure.mutation(
    async ({ ctx }) => {
      try {
        const company = await ctx.prisma.company.findUnique({
          where: {
            ownerId: ctx.user.id,
          },
        });

        if (!company) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Şirket bulunamadı.",
          });
        }

        const isMagicLinkExists = await ctx.prisma.magicLink.findFirst({
          where: {
            companyId: company.id,
          },
        });

        if (isMagicLinkExists) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Yalnızca bir kayıt linki oluşturabilirsiniz.",
          });
        }

        const now = new Date();

        const newMagicLink = await ctx.prisma.magicLink.create({
          data: {
            companyId: company.id,
            token: "",
            expiresAt: addWeeks(now, 1),
          },
        });

        const jwt: OwnerJwtPayloadType = {
          companyId: company.id,
          expiresAt: addWeeks(now, 1),
        };

        const secret = new TextEncoder().encode(env.OWNER_JWT_SECRET_KEY);
        const token = await new jose.SignJWT(jwt)
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("1w")
          .sign(secret);

        const updatedToken = await ctx.prisma.magicLink.update({
          where: {
            id: newMagicLink.id,
          },
          data: {
            token,
          },
        });

        return {
          success: true,
          token: updatedToken.token,
          expiresAt: updatedToken.expiresAt,
        };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Magic link oluşturulurken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Magic link oluşturulurken bir hata oluştu.`,
        });
      }
    },
  ),

  getMagicLinks: rateLimitedOwnerProcedure.query(async ({ ctx }) => {
    try {
      const magicLink = await ctx.prisma.magicLink.findFirst({
        where: {
          companyId: ctx.user.companyId,
        },
      });

      return magicLink;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Magic linkler getirilirken bir hata oluştu: ${error.message}}`,
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Magic linkler getirilirken bir hata oluştu.`,
      });
    }
  }),

  deleteMagicLink: rateLimitedOwnerProcedure
    .input(z.object({ magicLinkId: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.magicLink.delete({
          where: {
            id: input.magicLinkId,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Magic link silinirken bir hata oluştu: ${error.message}}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Magic link silinirken bir hata oluştu.`,
        });
      }
    }),

  createStaff: rateLimitedPrivateProcedure
    .input(createStaffSchema)
    .mutation(async ({ ctx, input }) => {
      const secret = new TextEncoder().encode(env.OWNER_JWT_SECRET_KEY);
      const verifiedToken = await jose.jwtVerify(input.magicToken, secret);
      const payload = verifiedToken.payload as OwnerJwtPayloadType;

      if (!verifiedToken || !payload.companyId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Geçersiz token",
        });
      }

      if (new Date() > payload.expiresAt) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Geçersiz token",
        });
      }

      try {
        const isStaffHasCompany = await ctx.prisma.user.findUnique({
          where: {
            userId: ctx.user.id,
          },
        });

        if (isStaffHasCompany) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Zaten bir firmaya kayıtlısınız.",
          });
        }

        await ctx.prisma.user.create({
          data: {
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
            phone: input.phone,
            userId: ctx.user.id,
            staffCompanyId: payload.companyId,
            isActive: true,
            avatar: input.avatar,
            role: input.role,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `Bu kullanıcı zaten eklenmiş.`,
            });
          }

          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Kullanıcı eklenirken bir hata oluştu: ${error.message}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Kullanıcı eklenirken bir hata oluştu.`,
        });
      }
    }),

  deleteStaff: rateLimitedOwnerProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.id === input.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Kendinizi silemezsiniz.",
        });
      }

      try {
        const staff = await ctx.prisma.user.findUnique({
          where: {
            userId: input.userId,
          },
        });

        if (staff?.role === "OWNER") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Şirket sahibini silemezsiniz.",
          });
        }

        const company = await ctx.prisma.company.findUnique({
          where: {
            ownerId: ctx.user.id,
          },
        });

        if (staff?.staffCompanyId !== company?.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Başka bir şirketin kullanıcısını silemezsiniz.",
          });
        }

        await ctx.prisma.user.delete({
          where: {
            userId: input.userId,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Bakım sorumlusu silinirken bir hata oluştu: ${error.message}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bakım sorumlusu silinirken bir hata oluştu.`,
        });
      }
    }),

  updateStaff: rateLimitedCommonProcedure
    .input(updateStaffSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role === "FIELD_STAFF") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Düzenleme için yetkiniz yok.",
        });
      }

      if (input.role === "OWNER" && ctx.user.role !== "OWNER") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Şirketin tek bir sahibi olabilir.",
        });
      }

      if (input.isActive === false && input.role == "OWNER") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Şirket sahibini pasif yapamazsınız.",
        });
      }

      // IN THE FUTURE
      // TODO: input'tan prevRole alıp prevRole === "OWNER" && input.role !== "OWNER" ise hata fırlat.
      // gereksiz yere db'ye gitme.
      // ayrıca isActive kontrolü de yap, prevRole === "OWNER" && isActive === false ise hata fırlat.
      const oldStaff = await ctx.prisma.user.findUnique({
        where: {
          userId: input.userId,
        },
        select: {
          role: true,
        },
      });

      if (oldStaff?.role === "OWNER" && input.role !== "OWNER") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Şirket sahibinin rolünü değiştiremezsiniz.",
        });
      }

      try {
        await ctx.prisma.user.update({
          where: {
            userId: input.userId,
          },
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            phone: input.phone,
            avatar: input.avatar,
            role: input.role,
            isActive: input.isActive,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Kullanıcı güncellenirken bir hata oluştu: ${error.message}`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Kullanıcı güncellenirken bir hata oluştu.`,
        });
      }
    }),

  /**
   * @url -> /dashboard
   *
   * @description Her gün için asansör bakım sayısını getirir.
   *
   * @returns {Array<{date: string, count: number}>}
   * */
  getDailyMaintenanceCount: rateLimitedCommonProcedure.query(
    async ({ ctx }) => {
      try {
        const companyCount = await ctx.prisma.company.findUnique({
          where: {
            id: ctx.user.companyId,
          },
          select: {
            _count: {
              select: {
                staff: true,
                elevators: true,
                buildingResponsiblePerson: true,
              },
            },
            maintenance: {
              select: {
                _count: {
                  select: {
                    kabinUstuMaintenance: true,
                    kuyuDibiMaintenance: true,
                    makineDairesiMaintenance: true,
                  },
                },
                kabinUstuMaintenance: {
                  select: {
                    createdAt: true,
                  },
                },
                kuyuDibiMaintenance: {
                  select: {
                    createdAt: true,
                  },
                },
                makineDairesiMaintenance: {
                  select: {
                    createdAt: true,
                  },
                },
              },
            },
          },
        });

        if (companyCount?.maintenance[0]) {
          const array = companyCount?.maintenance[0];
          const totalCount =
            array._count.kabinUstuMaintenance +
            array._count.kuyuDibiMaintenance +
            array._count.makineDairesiMaintenance;

          /**
           * @description Her gün için toplam bakım sayısını key-value olarak döndürür.
           * @param {Array<{createdAt: Date}>} maintenanceArray
           * @returns {Record<string, number>}
           * */
          function reduceMaintenanceArray(
            maintenanceArray: {
              createdAt: Date;
            }[],
          ): Record<string, number> {
            return maintenanceArray.reduce(
              (acc, curr) => {
                const date = curr.createdAt.toISOString().split("T")[0];

                if (!date) return acc;

                if (acc[date]) {
                  acc[date] += 1;
                } else {
                  acc[date] = 1;
                }

                return acc;
              },
              {} as Record<string, number>,
            );
          }

          const concatArray = array.kabinUstuMaintenance.concat(
            array.kuyuDibiMaintenance,
            array.makineDairesiMaintenance,
          );

          const reducedArray = reduceMaintenanceArray(concatArray);

          /**
           * @description reduced array'in key-value pairlerini array olarak döndürür.
           **/
          const arrayEntries = Object.entries(reducedArray).map(
            ([day, value]) => ({
              day,
              value,
            }),
          );

          /**
           * @description Tüm bakım sayılarını tek bir array'de toplar ve her birinin günü aynı olmaz.
           **/
          const reducedArrayEntries = arrayEntries.reduce(
            (acc, curr) => {
              const date = curr.day;

              if (!date) return acc;

              if (acc[date]) {
                acc[date] += curr.value;
              } else {
                acc[date] = curr.value;
              }

              return acc;
            },
            {} as Record<string, number>,
          );

          /**
           * @description reduced array'in key-value pairlerini array olarak döndürür.
           **/
          const mappedEntries = Object.entries(reducedArrayEntries).map(
            ([day, value]) => ({
              day,
              value,
            }),
          );

          /**
           * @description Son olarak tüm bakım sayılarını gününe göre sıralar.
           **/
          const sortedEntries = mappedEntries.sort((a, b) => {
            return new Date(a.day).getTime() - new Date(b.day).getTime();
          });

          return {
            values: sortedEntries,
            totalMaintenanceCount: totalCount,
            staffCount: companyCount?._count.staff,
            elevatorCount: companyCount?._count.elevators,
            buildingResponsiblePersonCount:
              companyCount?._count.buildingResponsiblePerson,
          };
        }

        return {
          values: [],
          totalMaintenanceCount: 0,
          staffCount: companyCount?._count.staff,
          elevatorCount: companyCount?._count.elevators,
          buildingResponsiblePersonCount:
            companyCount?._count.buildingResponsiblePerson,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Bakım sayıları getirilirken bir hata oluştu.`,
        });
      }
    },
  ),
});
