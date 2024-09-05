import AdminPageLayout from "./admin-page/admin-page-layout";
import LandingPageLayout from "./landing-page/landing-page-layout";
import MainLayout from "./main-page/main-layout";
import NoLayout from "./no-layout";

export const Layouts = {
  LandingPage: LandingPageLayout,
  Main: MainLayout,
  Admin: AdminPageLayout,
  NoLayout: NoLayout,
};
export type LayoutKeys = keyof typeof Layouts;
