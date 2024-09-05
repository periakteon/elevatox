import React, { useEffect, type PropsWithChildren } from "react";
import MainSidebar from "./main-sidebar";
import { Raleway } from "next/font/google";
import { useUser } from "@clerk/nextjs";
import { api } from "@/utils/api";
import MainPageFallback from "./main-page-fallback";
import { toast } from "@/components/ui/use-toast";
import { emitter } from "@/utils/emitter";
import UnauthorizedError from "@/components/unauthorized";
import { useAtom } from "jotai";
import { companyInfoAtom, roleAtom } from "@/utils/atom";

const raleway = Raleway({ subsets: ["latin"] });

const MainLayout = (props: PropsWithChildren) => {
  const [, setCompanyInfoAtom] = useAtom(companyInfoAtom);
  const [role, setRole] = useAtom(roleAtom);

  const user = useUser();

  const getInfo = api.company.getCompanyInfo.useQuery(undefined, {
    retry: false,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Firma bilgileri alınırken bir hata oluştu!",
        description: error.message,
      });
    },
  });

  useEffect(() => {
    if (getInfo.data) {
      setCompanyInfoAtom(getInfo.data);
      setRole(getInfo.data.role);
    }
  }, [getInfo.data, setCompanyInfoAtom, setRole]);

  if (!user) {
    return <UnauthorizedError />;
  }

  if (getInfo.isLoading || role === undefined || role === null) {
    return <MainPageFallback />;
  }

  if (!getInfo.data) {
    return <UnauthorizedError />;
  }

  if (getInfo.data.companyInfo.isActive === false) {
    return <UnauthorizedError />;
  }

  emitter.subscribe("showNotification", (message) => {
    toast({
      variant: "default",
      title: message as string,
    });
  });

  return (
    <>
      <main className={raleway.className}>
        <MainSidebar companyData={getInfo.data} />
        {props.children}
      </main>
    </>
  );
};

export default MainLayout;
