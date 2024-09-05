import { createTRPCRouter } from "@/server/api/trpc";
import { adminRouter } from "./routers/admin";
import { companyRouter } from "./routers/company";
import { buildingResponsiblePersonRouter } from "./routers/buildingResponsiblePerson";
import { elevatorRouter } from "./routers/elevator";
import { maintenanceRouter } from "./routers/maintenance";
import { paymentRouter } from "./routers/payment";

export const appRouter = createTRPCRouter({
  admin: adminRouter,
  company: companyRouter,
  buildingResponsiblePerson: buildingResponsiblePersonRouter,
  elevator: elevatorRouter,
  maintenance: maintenanceRouter,
  payment: paymentRouter,
});

export type AppRouter = typeof appRouter;
