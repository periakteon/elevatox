import ErrorComponent from "@/components/error";
import TableFallback from "@/components/fallback/table/table-fallback";
import { type MyPage } from "@/components/layouts/types";
import NoData from "@/components/no-data";
import { columns } from "@/components/tanstack-table/firma-bakim/sil/columns";
import { DataTable } from "@/components/tanstack-table/firma-bakim/sil/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";
import { companyInfoAtom } from "@/utils/atom";
import { useAtomValue } from "jotai";
import Head from "next/head";

const MaintenanceIndex: MyPage = () => {
  const companyInfo = useAtomValue(companyInfoAtom);

  const { isLoading, isError, isLoadingError, error, data } =
    api.maintenance.getQRCodesToAddMaintenance.useQuery();

  if (isError || isLoadingError) {
    return (
      <ErrorComponent error={error.message} errorCode={error.data?.code} />
    );
  }

  return (
    <>
      <Head>
        <title>
          Bakım Kaydı Listesi | {companyInfo?.companyInfo.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Bakım Kaydı Listesi</CardTitle>
            <CardDescription>
              <span className="block">
                Aşağıda firmanızdaki asansör listesini görebilir ve{" "}
                <span className="font-bold">
                  &quot;Bakım Listesine Git&quot;
                </span>{" "}
                butonuna basarak bakım kaydı listesine gidebilirsiniz.
              </span>
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

export default MaintenanceIndex;
MaintenanceIndex.Layout = "Main";
