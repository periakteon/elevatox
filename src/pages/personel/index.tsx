import ErrorComponent from "@/components/error";
import TableFallback from "@/components/fallback/table/table-fallback";
import { type MyPage } from "@/components/layouts/types";
import NoData from "@/components/no-data";
import { columns } from "@/components/tanstack-table/firma-personel/columns";
import { DataTable } from "@/components/tanstack-table/firma-personel/data-table";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/router";

const StaffList: MyPage = () => {
  const companyInfo = useAtomValue(companyInfoAtom);

  const router = useRouter();

  const { isLoading, isError, isLoadingError, error, data } =
    api.company.getCompanyStaffList.useQuery();

  if (isError || isLoadingError) {
    return (
      <ErrorComponent error={error.message} errorCode={error.data?.code} />
    );
  }

  return (
    <>
      <Head>
        <title>
          Personel Listesi | {companyInfo?.companyInfo.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Personel Listesi</CardTitle>
            <CardDescription>
              <span className="block">
                Aşağıda firmanızda çalışan personellerin listesini
                görebilirsiniz.
              </span>
              <Button
                onClick={() => void router.push("/personel/ekle")}
                className="mt-2 bg-green-600 text-white hover:bg-green-500 focus:ring-green-200 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
              >
                Yeni Personel Ekle
              </Button>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? <TableFallback /> : null}
            {!isLoading && data?.staff.length ? (
              <DataTable columns={columns} data={data.staff} />
            ) : null}
            {!isLoading && !data?.staff.length ? <NoData /> : null}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StaffList;
StaffList.Layout = "Main";
