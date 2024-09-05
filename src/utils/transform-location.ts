import type { ElevatorQRCODELocation } from "@prisma/client";

export default function transformLocation(
  location: ElevatorQRCODELocation | undefined,
) {
  const locationMap: Record<ElevatorQRCODELocation, string> = {
    KABIN_USTU: "Kabin Üstü",
    KUYU_DIBI: "Kuyu Dibi",
    MAKINE_DAIRESI: "Makine Dairesi",
  };

  return location ? locationMap[location] : "Bilinmiyor";
}
