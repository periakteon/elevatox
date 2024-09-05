import { type MyPage } from "@/components/layouts/types";
import { DataTable } from "@/components/tanstack-table/firma-bina-sorumlu/data-table";
import { columns } from "@/components/tanstack-table/firma-bina-sorumlu/columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import TableFallback from "@/components/fallback/table/table-fallback";
import NoData from "@/components/no-data";
import { useAtomValue } from "jotai";
import { companyInfoAtom } from "@/utils/atom";
import Head from "next/head";
import ErrorComponent from "@/components/error";

const BuildingResponsiblePersonList: MyPage = () => {
  const companyInfo = useAtomValue(companyInfoAtom);

  const router = useRouter();

  const { isLoading, isError, isLoadingError, error, data } =
    api.buildingResponsiblePerson.getBuildingResponsiblePersonList.useQuery();

  if (isError || isLoadingError) {
    return (
      <ErrorComponent error={error.message} errorCode={error.data?.code} />
    );
  }

  return (
    <>
      <Head>
        <title>
          Bina Sorumluları Listesi | {companyInfo?.companyInfo.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Bina Sorumlusu Listesi</CardTitle>
            <CardDescription>
              <span className="block">
                Aşağıda bina sorumlularının listesini ve tüm detaylarını
                görebilirsiniz.
              </span>
              <Button
                onClick={() =>
                  void router.push("/bina-sorumlulari/ekle?focus=true")
                }
                className="mt-2 bg-green-600 text-white hover:bg-green-500 focus:ring-green-200 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
              >
                Yeni Bina Sorumlusu Ekle
              </Button>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? <TableFallback /> : null}
            {!isLoading && data?.length ? (
              <DataTable columns={columns} data={data} />
            ) : null}
            {!isLoading && !data?.length ? <NoData /> : null}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default BuildingResponsiblePersonList;
BuildingResponsiblePersonList.Layout = "Main";
