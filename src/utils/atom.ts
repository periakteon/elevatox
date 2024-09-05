import { atom } from "jotai";
import { type CompanyInfo } from "./schemas";

export const companyInfoAtom = atom<CompanyInfo | null>(null);

export const roleAtom = atom<"OWNER" | "OFFICE_STAFF" | "FIELD_STAFF" | null>(
  null,
);
