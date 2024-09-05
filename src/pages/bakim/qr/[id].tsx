import { type MyPage } from "@/components/layouts/types";
import MakineDairesiMaintenanceForm from "@/components/(maintenance-forms)/makine-dairesi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import KabinUstuMaintenanceForm from "@/components/(maintenance-forms)/kabin-ustu";
import KuyuDibiMaintenanceForm from "@/components/(maintenance-forms)/kuyu-dibi";
import MaintenanceFormFallback from "@/components/fallback/maintenance-form/maintenance-form-fallback";
import { useAtomValue } from "jotai";
import { companyInfoAtom } from "@/utils/atom";
import Head from "next/head";
import ErrorComponent from "@/components/error";
import transformLocation from "@/utils/transform-location";

const MaintenanceIndex: MyPage = () => {
  const companyInfo = useAtomValue(companyInfoAtom);

  const router = useRouter();

  const { id: params } = router.query;

  const { isLoading, isError, isLoadingError, error, data } =
    api.elevator.checkQRCodeLocation.useQuery({
      qrCodeId: params as string,
    });

  if (isLoading) {
    return <MaintenanceFormFallback />;
  }

  if (isError || isLoadingError) {
    return (
      <ErrorComponent error={error.message} errorCode={error.data?.code} />
    );
  }

  if (!data?.elevator) {
    return <NotFoundData />;
  }

  return (
    <>
      <Head>
        <title>
          {transformLocation(data?.elevatorLocation)} Bakım Kaydı Oluştur |{" "}
          {companyInfo?.companyInfo.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <div className="text-center text-lg shadow-xl dark:border dark:border-slate-800">
              <div
                className="h-auto rounded-lg bg-cover bg-center object-fill px-10 py-16 text-white"
                style={{
                  backgroundImage: "url(/maintenance-form.png)",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  backgroundBlendMode: "overlay",
                }}
              >
                <div className="md:w-1/2">
                  <p className="text-5xl font-bold uppercase">Bakım Formu</p>
                  <p className="mt-5 text-2xl font-bold">Bina:</p>
                  <p className="mb-5 text-xl leading-none">
                    {data?.elevator.buildingResponsiblePerson.buildingName}
                  </p>
                  <p className="mt-5 text-2xl font-bold">Bakım Yeri:</p>
                  <p className="mb-5 text-xl leading-none">
                    {transformLocation(data?.elevatorLocation)}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              {data.elevatorLocation === "MAKINE_DAIRESI" ? (
                <MakineDairesiMaintenanceForm
                  maintenanceId={data?.elevator.maintenance[0]?.id}
                  buildingName={
                    data?.elevator.buildingResponsiblePerson.buildingName
                  }
                />
              ) : null}
              {data.elevatorLocation === "KABIN_USTU" ? (
                <KabinUstuMaintenanceForm
                  maintenanceId={data?.elevator.maintenance[0]?.id}
                  buildingName={
                    data?.elevator.buildingResponsiblePerson.buildingName
                  }
                />
              ) : null}
              {data.elevatorLocation === "KUYU_DIBI" ? (
                <KuyuDibiMaintenanceForm
                  maintenanceId={data?.elevator.maintenance[0]?.id}
                  buildingName={
                    data?.elevator.buildingResponsiblePerson.buildingName
                  }
                />
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default MaintenanceIndex;
MaintenanceIndex.Layout = "Main";

function NotFoundData() {
  const router = useRouter();
  return (
    <>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <section className="bg-white dark:bg-slate-900">
            <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
              <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-blue-600 dark:text-blue-500 lg:text-9xl">
                  404
                </h1>
                <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                  Böyle bir sayfa bulunamadı.
                </p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                  Üzgünüz ama aradığınız sayfayı bulamadık.
                </p>
                <Button
                  className="my-4 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                  onClick={() => void router.back()}
                >
                  Geri Dön
                </Button>
              </div>
            </div>
          </section>
        </Card>
      </div>
    </>
  );
}
