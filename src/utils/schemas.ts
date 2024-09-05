import { CompanyType } from "@prisma/client";
import { z } from "zod";

export const adminJwtPayloadSchema = z.object({
  companyId: z.string(),
});

export type AdminJwtPayloadType = z.infer<typeof adminJwtPayloadSchema>;

export const ownerJwtPayloadSchema = z.object({
  companyId: z.string(),
  expiresAt: z.date(),
  // staffId: z.string(),
});

export type OwnerJwtPayloadType = z.infer<typeof ownerJwtPayloadSchema>;

export const newCompanySchema = z.object({
  token: z.string({ required_error: "Token gereklidir." }),
  companyInfo: z.object({
    email: z
      .string({ required_error: "E-mail gereklidir." })
      .email({
        message: "E-mail formatına uygun bir e-mail girmeniz gerekmektedir.",
      })
      .min(1, { message: "E-mail boş bırakılamaz." }),
    name: z.string({ required_error: "Firma ismi gereklidir." }),
    companyType: z.nativeEnum(CompanyType),
    taxId: z.string({
      required_error:
        "Vergi kimlik numarası gereklidir. (Yoksa TC No girebilirsiniz)",
    }),
    phone: z.string({
      required_error: "Kişisel telefon numarası gereklidir.",
    }),
    logo: z.string().optional(),
    address: z.string({ required_error: "Firma adresi gereklidir." }),
    city: z.string({ required_error: "Firma şehri gereklidir." }),
    district: z.string({ required_error: "Firma ilçesi gereklidir." }),
  }),
  userInfo: z.object({
    firstName: z.string({ required_error: "İsim gereklidir." }),
    lastName: z.string({ required_error: "Soyisim gereklidir." }),
    email: z
      .string({ required_error: "E-mail gereklidir." })
      .email({
        message: "E-mail formatına uygun bir e-mail girmeniz gerekmektedir.",
      })
      .min(1, { message: "E-mail boş bırakılamaz." }),
    phone: z.string({ required_error: "Telefon numarası gereklidir." }),
    avatar: z.string().optional(),
  }),
});

export type NewCompanyType = z.infer<typeof newCompanySchema>;

export interface CompanyInfo {
  companyInfo: {
    name: string;
    logo: string;
    city: string;
    isActive: boolean;
  };
  role: "OWNER" | "OFFICE_STAFF" | "FIELD_STAFF";
}

export const updateCompanySchema = z.object({
  owner: z.object({
    firstName: z.string({ required_error: "İsim gereklidir." }),
    lastName: z.string({ required_error: "Soyisim gereklidir." }),
    phone: z.string({ required_error: "Telefon numarası gereklidir." }),
  }),
  company: z.object({
    name: z.string({ required_error: "Firma ismi gereklidir." }),
    companyType: z.nativeEnum(CompanyType),
    taxId: z.string({
      required_error:
        "Vergi kimlik numarası gereklidir. (Yoksa TC No girebilirsiniz)",
    }),
    phone: z.string({
      required_error: "Kişisel telefon numarası gereklidir.",
    }),
    email: z
      .string({ required_error: "E-mail gereklidir." })
      .email({
        message: "E-mail formatına uygun bir e-mail girmeniz gerekmektedir.",
      })
      .min(1, { message: "E-mail boş bırakılamaz." }),
    logo: z.string().optional(),
    city: z.string({ required_error: "Firma şehri gereklidir." }),
    district: z.string({ required_error: "Firma ilçesi gereklidir." }),
    address: z.string({ required_error: "Firma adresi gereklidir." }),
  }),
});

export const staffDataSchema = z.array(
  z.object({
    id: z.string(),
    userId: z.string({ required_error: "Kullanıcı ID'si gereklidir" }),
    firstName: z.string({ required_error: "İsim gereklidir." }),
    lastName: z.string({ required_error: "Soyisim gereklidir." }),
    email: z
      .string({ required_error: "E-mail gereklidir." })
      .email({
        message: "E-mail formatına uygun bir e-mail girmeniz gerekmektedir.",
      })
      .min(1, { message: "E-mail boş bırakılamaz." }),
    phone: z.string({ required_error: "Telefon numarası gereklidir." }),
    avatar: z.string().optional(),
    role: z.enum(["OFFICE_STAFF", "FIELD_STAFF"]),
    staffCompanyId: z.string(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export type StaffDataType = z.infer<typeof staffDataSchema>;

export const createStaffSchema = z.object({
  userId: z.string({ required_error: "Kullanıcı ID'si gereklidir" }),
  magicToken: z.string({ required_error: "Magic token gereklidir" }),
  firstName: z.string({ required_error: "İsim gereklidir." }),
  lastName: z.string({ required_error: "Soyisim gereklidir." }),
  email: z.string({ required_error: "E-mail gereklidir." }).email({
    message: "E-mail formatına uygun bir e-mail girmeniz gerekmektedir.",
  }),
  companyId: z.string({ required_error: "Firma ID'si gereklidir." }),
  avatar: z.string().optional(),
  phone: z.string({ required_error: "Telefon numarası gereklidir." }),
  role: z.enum(["OFFICE_STAFF", "FIELD_STAFF"]),
});

export const updateStaffSchema = z.object({
  userId: z.string({ required_error: "Kullanıcı ID'si gereklidir" }),
  firstName: z.string({ required_error: "İsim gereklidir." }),
  lastName: z.string({ required_error: "Soyisim gereklidir." }),
  avatar: z.string().optional(),
  phone: z.string({ required_error: "Telefon numarası gereklidir." }),
  role: z.enum(["OWNER", "OFFICE_STAFF", "FIELD_STAFF"]),
  isActive: z.boolean(),
});

export const addBuildingResponsiblePersonSchema = z.object({
  person: z.object({
    firstName: z.string({
      required_error: "Binadan sorumlu kişinin ismi gereklidir.",
    }),
    lastName: z.string({
      required_error: "Binadan sorumlu kişinin soyismi gereklidir.",
    }),
    tcNo: z.string({
      required_error: "Binadan sorumlu kişinin TC numarası gereklidir.",
    }),
    vergiKimlikNo: z.string({
      required_error:
        "Binadan sorumlu kişinin vergi kimlik numarası gereklidir. (Yoksa TC No girebilirsiniz)",
    }),
    phone: z.string({
      required_error: "Binadan sorumlu kişinin telefon numarası gereklidir.",
    }),
    city: z.string({
      required_error: "Binadan sorumlu kişinin şehri gereklidir.",
    }),
    district: z.string({
      required_error: "Binadan sorumlu kişinin ilçesi gereklidir.",
    }),
    area: z.string({
      required_error: "Binadan sorumlu kişinin bölgesi gereklidir.",
    }),
    address: z.string({
      required_error: "Binadan sorumlu kişinin adresi gereklidir.",
    }),
    buildingName: z.string({ required_error: "Binanın adı gereklidir." }),
    buildingFloor: z.string({
      required_error: "Binanın kat sayısı gereklidir.",
    }),
  }),
});

export const updateBuildingResponsiblePersonSchema = z.object({
  person: z.object({
    id: z.string({
      required_error: "Binadan sorumlu kişinin ID'si gereklidir.",
    }),
    firstName: z.string({
      required_error: "Binadan sorumlu kişinin ismi gereklidir.",
    }),
    lastName: z.string({
      required_error: "Binadan sorumlu kişinin soyismi gereklidir.",
    }),
    tcNo: z.string({
      required_error: "Binadan sorumlu kişinin TC numarası gereklidir.",
    }),
    vergiKimlikNo: z.string({
      required_error:
        "Binadan sorumlu kişinin vergi kimlik numarası gereklidir. (Yoksa TC No girebilirsiniz)",
    }),
    phone: z.string({
      required_error: "Binadan sorumlu kişinin telefon numarası gereklidir.",
    }),
    city: z.string({
      required_error: "Binadan sorumlu kişinin şehri gereklidir.",
    }),
    district: z.string({
      required_error: "Binadan sorumlu kişinin ilçesi gereklidir.",
    }),
    area: z.string({
      required_error: "Binadan sorumlu kişinin bölgesi gereklidir.",
    }),
    address: z.string({
      required_error: "Binadan sorumlu kişinin adresi gereklidir.",
    }),
    buildingName: z.string({ required_error: "Binanın adı gereklidir." }),
    buildingFloor: z.string({
      required_error: "Binanın kat sayısı gereklidir.",
    }),
  }),
});

export const addElevatorSchema = z.object({
  elevator: z.object({
    maintenanceFee: z.string({
      required_error: "Bakım ücreti gereklidir.",
    }),
    elevatorSerialNumber: z.string({
      required_error: "Asansör seri numarası gereklidir.",
    }),
    elevatorType: z.enum(["INSAN", "YUK"], {
      required_error: "Asansör türü gereklidir.",
    }),
    elevatorCapacityKg: z.string().optional(),
    elevatorCapacityPerson: z.string().optional(),

    buildingResponsiblePerson: z.object({
      id: z.string({
        required_error: "Binadan sorumlu kişinin seçilmesi gerekmektedir.",
      }),
    }),
    staff: z.object({
      id: z.string({
        required_error: "Personelin seçilmesi gerekmektedir.",
      }),
    }),
    elevatorInstallationDate: z.date({
      required_error: "Asansör kurulum tarihi gereklidir.",
    }),
    elevatorLastMaintenanceDate: z.date({
      required_error: "Asansörün son bakım tarihi gereklidir.",
    }),
  }),
});

export type AddElevatorType = z.infer<typeof addElevatorSchema>;

export const updateElevatorSchema = z.object({
  elevator: z.object({
    maintenanceFee: z.string({
      required_error: "Bakım ücreti gereklidir.",
    }),
    elevatorSerialNumber: z.string({
      required_error: "Asansör seri numarası gereklidir.",
    }),
    elevatorType: z.enum(["INSAN", "YUK"], {
      required_error: "Asansör türü gereklidir.",
    }),
    elevatorCapacityKg: z.string().optional(),
    elevatorCapacityPerson: z.string().optional(),
    elevatorInstallationDate: z.date({
      required_error: "Asansör kurulum tarihi gereklidir.",
    }),
    elevatorLastMaintenanceDate: z.date({
      required_error: "Asansörün son bakım tarihi gereklidir.",
    }),
    id: z.string({
      required_error: "Asansör ID'si gereklidir.",
    }),
    staff: z.object({
      // asansör update ederken ElevatorToUser tablosunda "WHERE" ile relation'ı bulmak için
      // id: DB'de bulunan ElevatorToUser tablosundaki ID'ye işaret ediyor.
      // staffId: ElevatorToUser tablosundaki staffId'ye işaret ediyor.
      id: z.string({
        required_error: "ElevatorToUser ID gereklidir.",
      }),
      staffId: z.string({
        required_error: "Personel ID gereklidir.",
      }),
    }),
  }),
  buildingResponsiblePerson: z.object({
    firstName: z.string({
      required_error: "Binadan sorumlu kişinin ismi gereklidir.",
    }),
    lastName: z.string({
      required_error: "Binadan sorumlu kişinin soyismi gereklidir.",
    }),
    area: z.string({
      required_error: "Binadan sorumlu kişinin bölgesi gereklidir.",
    }),
    city: z.string({
      required_error: "Binadan sorumlu kişinin şehri gereklidir.",
    }),
    district: z.string({
      required_error: "Binadan sorumlu kişinin ilçesi gereklidir.",
    }),
    address: z.string({
      required_error: "Binadan sorumlu kişinin adresi gereklidir.",
    }),
    buildingName: z.string({ required_error: "Binanın adı gereklidir." }),
    buildingFloor: z.string({
      required_error: "Binanın kat sayısı gereklidir.",
    }),
    phone: z.string({
      required_error: "Binadan sorumlu kişinin telefon numarası gereklidir.",
    }),
    citizenshipId: z.string({
      required_error: "Binadan sorumlu kişinin TC numarası gereklidir.",
    }),
    taxId: z.string({
      required_error:
        "Binadan sorumlu kişinin vergi kimlik numarası gereklidir. (Yoksa TC No girebilirsiniz)",
    }),
  }),
});

export const kabinUstuMaintenanceSchema = z.object({
  maintenanceId: z.string(),
  additionalNote: z.string().optional(),
  speedRegulator: z.boolean(),
  counterWeight: z.boolean(),
  elevatorCabin: z.boolean(),
  stationEntrance: z.boolean(),
  elevatorCabinDoor: z.boolean(),
  floorLevel: z.boolean(),
  borderSecurityBreaker: z.boolean(),
  emergencyAlarm: z.boolean(),
  stopControls: z.boolean(),
});

export type KabinUstuMaintenanceType = z.infer<
  typeof kabinUstuMaintenanceSchema
>;

export const kuyuDibiMaintenanceSchema = z.object({
  maintenanceId: z.string(),
  additionalNote: z.string().optional(),
  speedRegulator: z.boolean(),
  borderSecurityBreaker: z.boolean(),
  emergencyAlarm: z.boolean(),
});

export type KuyuDibiMaintenanceType = z.infer<typeof kuyuDibiMaintenanceSchema>;

export const makineDairesiMaintenanceSchema = z.object({
  maintenanceId: z.string(),
  additionalNote: z.string().optional(),
  propulsionMotor: z.boolean(),
  gearBox: z.boolean(),
  switchBoard: z.boolean(),
});

export type MakineDairesiMaintenanceType = z.infer<
  typeof makineDairesiMaintenanceSchema
>;

export const contactFormSchema = z.object({
  firstName: z.string({ required_error: "İsim gereklidir." }),
  lastName: z.string({ required_error: "Soyisim gereklidir." }),
  email: z
    .string({ required_error: "E-mail gereklidir." })
    .email({
      message: "E-mail formatına uygun bir e-mail girmeniz gerekmektedir.",
    })
    .min(1, { message: "E-mail boş bırakılamaz." }),
  phone: z.string({ required_error: "Telefon numarası gereklidir." }),
  message: z.string({ required_error: "Mesaj gereklidir." }),
});

export const addPaymentSchema = z.object({
  buildingResponsiblePersonId: z.string({
    required_error: "Bina sorumlusu ID gereklidir.",
  }),
  payment: z.object({
    amount: z.string({ required_error: "Tutar gereklidir." }).min(1, {
      message: "Tutar boş bırakılamaz.",
    }),
    date: z.date({ required_error: "Tarih gereklidir." }),
    additionalNote: z.string().optional(),
  }),
});

export const updatePaymentSchema = z.object({
  payment: z.object({
    id: z.string({ required_error: "Tahsilat ID gereklidir." }),
    amount: z.string({ required_error: "Tutar gereklidir." }).min(1, {
      message: "Tutar boş bırakılamaz.",
    }),
    date: z.date({ required_error: "Tarih gereklidir." }),
    additionalNote: z.string().optional(),
  }),
});
