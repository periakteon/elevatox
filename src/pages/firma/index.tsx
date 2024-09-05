import { type MyPage } from "@/components/layouts/types";
import { useRouter } from "next/router";
import { useEffect } from "react";

const FirmaIndex: MyPage = () => {
  const router = useRouter();

  useEffect(() => {
    void router.push("/");
  }, [router]);
  return <div></div>;
};

export default FirmaIndex;
FirmaIndex.Layout = "LandingPage";
