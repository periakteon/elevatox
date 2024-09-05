import React, { type PropsWithChildren } from "react";
import AdminNavbar from "./navbar";
import { Raleway } from "next/font/google";
import { useUser } from "@clerk/nextjs";
import { api } from "@/utils/api";
import MainPageFallback from "../main-page/main-page-fallback";
import { toast } from "@/components/ui/use-toast";
import UnauthorizedError from "@/components/unauthorized";
import AuthCheckFallback from "@/components/fallback/auth-check";

const raleway = Raleway({ subsets: ["latin"] });

const AdminPageLayout = ({ children }: PropsWithChildren) => {
  const user = useUser();

  if (user === undefined) {
    return <MainPageFallback />;
  }

  const isAdmin = api.admin.checkIsAdmin.useQuery(undefined, {
    retry: false,
    onError: (error) => {
      toast({
        variant: "destructive",
        description: `${error.message}`,
      });
    },
  });

  if (isAdmin.isLoading) {
    return <AuthCheckFallback />;
  }

  if (isAdmin.isError || isAdmin.data.role !== "ADMIN") {
    return <UnauthorizedError />;
  }

  if (!isAdmin.isLoading && !isAdmin.isError && isAdmin.data.role === "ADMIN") {
    return (
      <>
        <main className={raleway.className}>
          <AdminNavbar />
          {children}
        </main>
      </>
    );
  }
};
export default AdminPageLayout;
