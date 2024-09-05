import { type MyPage } from "@/components/layouts/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DataTable as KabinUstuDataTable } from "@/components/tanstack-table/firma-bakim/params-liste/kabin-ustu/data-table";
import { columns as kabinUstuColumns } from "@/components/tanstack-table/firma-bakim/params-liste/kabin-ustu/columns";
import { DataTable as KuyuDibiDataTable } from "@/components/tanstack-table/firma-bakim/params-liste/kuyu-dibi/data-table";
import { columns as kuyuDibiColumns } from "@/components/tanstack-table/firma-bakim/params-liste/kuyu-dibi/columns";
import { DataTable as MakineDairesiDataTable } from "@/components/tanstack-table/firma-bakim/params-liste/makine-dairesi/data-table";
import { columns as makineDairesiColumns } from "@/components/tanstack-table/firma-bakim/params-liste/makine-dairesi/columns";
import TableFallback from "@/components/fallback/table/table-fallback";
import NoData from "@/components/no-data";
import { useAtomValue } from "jotai";
import { companyInfoAtom } from "@/utils/atom";
import ErrorComponent from "@/components/error";
import transformLocation from "@/utils/transform-location";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MaintenanceToPdf from "@/components/(maintenance-forms)/maintenance-to-pdf";
import { Download } from "lucide-react";
import MaintenanceToThermalPrinter from "@/components/(maintenance-forms)/maintenance-to-thermal-printer";

const MaintenanceByParams: MyPage = () => {
  const companyInfo = useAtomValue(companyInfoAtom);

  const [selectedTab, setSelectedTab] = useState<
    "kabinUstu" | "kuyuDibi" | "makineDairesi"
  >("kabinUstu");

  const router = useRouter();

  const { id: params } = router.query;

  const kabinUstuMaintenanceList =
    api.maintenance.getKabinUstuMaintenanceList.useQuery(
      {
        elevatorId: params as string,
      },
      {
        enabled: selectedTab === "kabinUstu",
      },
    );

  const kuyuDibiMaintenanceList =
    api.maintenance.getKuyuDibiMaintenanceList.useQuery(
      {
        elevatorId: params as string,
      },
      {
        enabled: selectedTab === "kuyuDibi",
      },
    );

  const makineDairesiMaintenanceList =
    api.maintenance.getMakineDairesiMaintenanceList.useQuery(
      {
        elevatorId: params as string,
      },
      {
        enabled: selectedTab === "makineDairesi",
      },
    );

  const {
    data: kabinUstuMaintenanceListData,
    isLoading: kabinUstuMaintenanceListLoading,
    isLoadingError: kabinUstuMaintenanceListLoadingError,
    isError: kabinUstuMaintenanceListError,
    error: kabinUstuMaintenanceListErrorData,
  } = kabinUstuMaintenanceList;

  const todayMaintenanceList = api.maintenance.getLastMaintenanceList.useQuery(
    {
      maintenanceId: kabinUstuMaintenanceListData?.maintenance[0]?.id,
    },
    {
      enabled: !!kabinUstuMaintenanceListData?.maintenance[0]?.id,
    },
  );

  const {
    data: kuyuDibiMaintenanceListData,
    isLoading: kuyuDibiMaintenanceListLoading,
    isLoadingError: kuyuDibiMaintenanceListLoadingError,
    isError: kuyuDibiMaintenanceListError,
    error: kuyuDibiMaintenanceListErrorData,
  } = kuyuDibiMaintenanceList;

  const {
    data: makineDairesiMaintenanceListData,
    isLoading: makineDairesiMaintenanceListLoading,
    isLoadingError: makineDairesiMaintenanceListLoadingError,
    isError: makineDairesiMaintenanceListError,
    error: makineDairesiMaintenanceListErrorData,
  } = makineDairesiMaintenanceList;

  const sortedQRCode =
    kabinUstuMaintenanceList.data?.maintenance[0]?.elevator.elevatorQRCode.sort(
      (a, b) => {
        if (a.elevatorLocation < b.elevatorLocation) {
          return -1;
        }
        if (a.elevatorLocation > b.elevatorLocation) {
          return 1;
        }
        return 0;
      },
    );

  return (
    <>
      <Head>
        <title>
          {
            kabinUstuMaintenanceList.data?.buildingResponsiblePerson
              .buildingName
          }{" "}
          Bakım Kaydı Listesi | {companyInfo?.companyInfo.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>
              {
                kabinUstuMaintenanceList.data?.buildingResponsiblePerson
                  .buildingName
              }
            </CardTitle>
            <CardDescription>
              <span className="block">
                {
                  kabinUstuMaintenanceList.data?.buildingResponsiblePerson
                    .address
                }
              </span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="mt-4 flex w-full justify-center bg-green-600 text-center font-bold text-white hover:bg-green-500 focus:ring-green-200 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800 sm:w-3/4 md:w-2/4 lg:w-1/4">
                    BAKIM EKLE
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex flex-col">
                    {sortedQRCode?.map((item) => (
                      <Button
                        variant={"ghost"}
                        key={item.id}
                        className="flex justify-between"
                        onClick={() => void router.push(`/bakim/qr/${item.id}`)}
                      >
                        <span className="font-medium">
                          {transformLocation(item.elevatorLocation)}
                        </span>
                      </Button>
                    ))}
                    {!kabinUstuMaintenanceList.data?.maintenance[0]?.elevator
                      .elevatorQRCode[0] ? (
                      <>
                        <span className="text-center text-sm">
                          Bakım eklemek için öncelikle QR kod oluşturmanız
                          gerekmektedir.
                        </span>
                        <Button
                          className="mt-2 w-full"
                          onClick={() =>
                            void router.push(`/bakim/${params as string}`)
                          }
                        >
                          <span className="font-medium">QR Kod Oluştur</span>
                        </Button>
                      </>
                    ) : null}
                  </div>
                </PopoverContent>
              </Popover>
              {todayMaintenanceList.data &&
              todayMaintenanceList.data?.kabinUstuMaintenance?.length > 0 &&
              todayMaintenanceList.data?.kuyuDibiMaintenance?.length > 0 &&
              todayMaintenanceList.data?.makineDairesiMaintenance?.length > 0 &&
              kabinUstuMaintenanceList.data?.buildingResponsiblePerson
                .buildingName ? (
                <>
                  <Button
                    variant={"link2"}
                    type="button"
                    className="mt-2 flex w-full justify-center text-center sm:mt-4 sm:w-3/4 md:w-2/4 lg:w-1/4"
                  >
                    <PDFDownloadLink
                      className="ml-1 inline"
                      document={
                        <MaintenanceToPdf
                          props={todayMaintenanceList.data}
                          buildingName={
                            kabinUstuMaintenanceList.data
                              ?.buildingResponsiblePerson.buildingName
                          }
                        />
                      }
                      fileName={`bakim-kaydi-${new Date().toLocaleDateString()}.pdf`}
                    >
                      <span className="ml-1 flex">
                        <span className="mt-1 font-bold">
                          SON 3 BAKIMI İNDİR
                        </span>
                        <Download className="ml-2" />
                      </span>
                    </PDFDownloadLink>
                  </Button>
                  <Button
                    variant={"link2"}
                    type="button"
                    className="mt-2 flex w-full justify-center text-center sm:mt-4 sm:w-3/4 md:w-2/4 lg:w-1/4"
                  >
                    <PDFDownloadLink
                      className="ml-1 inline"
                      document={
                        <MaintenanceToThermalPrinter
                          props={todayMaintenanceList.data}
                          buildingName={
                            kabinUstuMaintenanceList.data
                              ?.buildingResponsiblePerson.buildingName
                          }
                        />
                      }
                      fileName={`bakim-kaydi-${new Date().toLocaleDateString()}.pdf`}
                    >
                      <span className="ml-1 flex">
                        <span className="mt-1 font-bold">
                          TERMAL YAZICI ÇIKTISI
                        </span>
                        <Download className="ml-2" />
                      </span>
                    </PDFDownloadLink>
                  </Button>
                </>
              ) : null}
              <Tabs defaultValue="kabinUstu" className="mt-4 w-full">
                <TabsList className="flex">
                  <TabsTrigger
                    value="kabinUstu"
                    className="flex-1"
                    onClick={() => setSelectedTab("kabinUstu")}
                  >
                    Kabin Üstü
                  </TabsTrigger>
                  <TabsTrigger
                    value="kuyuDibi"
                    className="flex-1"
                    onClick={() => setSelectedTab("kuyuDibi")}
                  >
                    Kuyu Dibi
                  </TabsTrigger>
                  <TabsTrigger
                    value="makineDairesi"
                    className="flex-1"
                    onClick={() => setSelectedTab("makineDairesi")}
                  >
                    Makine Dairesi
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="kabinUstu" className="w-full">
                  {kabinUstuMaintenanceListLoading ? (
                    <TableFallback />
                  ) : kabinUstuMaintenanceListError ||
                    kabinUstuMaintenanceListLoadingError ? (
                    <ErrorComponent
                      error={kabinUstuMaintenanceListErrorData.message}
                      errorCode={kabinUstuMaintenanceListErrorData.data?.code}
                    />
                  ) : !kabinUstuMaintenanceListLoading &&
                    kabinUstuMaintenanceListData?.maintenance[0]
                      ?.kabinUstuMaintenance.length === 0 ? (
                    <NoData />
                  ) : !kabinUstuMaintenanceListLoading &&
                    kabinUstuMaintenanceListData?.maintenance[0]
                      ?.kabinUstuMaintenance ? (
                    <KabinUstuDataTable
                      columns={kabinUstuColumns}
                      data={
                        kabinUstuMaintenanceListData.maintenance[0]
                          .kabinUstuMaintenance
                      }
                    />
                  ) : null}
                </TabsContent>
                <TabsContent value="kuyuDibi" className="w-full">
                  {kuyuDibiMaintenanceListLoading ? (
                    <TableFallback />
                  ) : kuyuDibiMaintenanceListError ||
                    kuyuDibiMaintenanceListLoadingError ? (
                    <ErrorComponent
                      error={kuyuDibiMaintenanceListErrorData.message}
                      errorCode={kuyuDibiMaintenanceListErrorData.data?.code}
                    />
                  ) : !kuyuDibiMaintenanceListLoading &&
                    kuyuDibiMaintenanceListData?.maintenance[0]
                      ?.kuyuDibiMaintenance.length === 0 ? (
                    <NoData />
                  ) : !kuyuDibiMaintenanceListLoading &&
                    kuyuDibiMaintenanceListData?.maintenance[0]
                      ?.kuyuDibiMaintenance ? (
                    <KuyuDibiDataTable
                      columns={kuyuDibiColumns}
                      data={
                        kuyuDibiMaintenanceListData.maintenance[0]
                          .kuyuDibiMaintenance
                      }
                    />
                  ) : null}
                </TabsContent>
                <TabsContent value="makineDairesi" className="w-full">
                  {makineDairesiMaintenanceListLoading ? (
                    <TableFallback />
                  ) : makineDairesiMaintenanceListError ||
                    makineDairesiMaintenanceListLoadingError ? (
                    <ErrorComponent
                      error={makineDairesiMaintenanceListErrorData.message}
                      errorCode={
                        makineDairesiMaintenanceListErrorData.data?.code
                      }
                    />
                  ) : !makineDairesiMaintenanceListLoading &&
                    makineDairesiMaintenanceListData?.maintenance[0]
                      ?.makineDairesiMaintenance?.length === 0 ? (
                    <NoData />
                  ) : !makineDairesiMaintenanceListLoading &&
                    makineDairesiMaintenanceListData?.maintenance[0]
                      ?.makineDairesiMaintenance ? (
                    <MakineDairesiDataTable
                      columns={makineDairesiColumns}
                      data={
                        makineDairesiMaintenanceListData.maintenance[0]
                          .makineDairesiMaintenance
                      }
                    />
                  ) : null}
                </TabsContent>
              </Tabs>
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </>
  );
};

export default MaintenanceByParams;
MaintenanceByParams.Layout = "Main";
