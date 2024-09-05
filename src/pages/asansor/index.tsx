import ErrorComponent from "@/components/error";
import TableFallback from "@/components/fallback/table/table-fallback";
import { type MyPage } from "@/components/layouts/types";
import NoData from "@/components/no-data";
import { columns } from "@/components/tanstack-table/firma-asansor/columns";
import { DataTable } from "@/components/tanstack-table/firma-asansor/data-table";
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

const ElevatorIndex: MyPage = () => {
  const companyInfo = useAtomValue(companyInfoAtom);

  const router = useRouter();

  const { isLoading, isError, isLoadingError, error, data } =
    api.elevator.getElevatorList.useQuery();

  if (isError || isLoadingError) {
    return (
      <ErrorComponent error={error.message} errorCode={error.data?.code} />
    );
  }

  return (
    <>
      <Head>
        <title>
          Asansör Listesi | {companyInfo?.companyInfo?.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Asansör Listesi</CardTitle>
            <CardDescription>
              <span className="block">
                Aşağıda firmanızdaki asansörlerin listesini görebilirsiniz.
              </span>
              <Button
                onClick={() => void router.push("/asansor/ekle?focus=true")}
                className="mt-2 bg-green-600 text-white hover:bg-green-500 focus:ring-green-200 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
              >
                Yeni Asansör Ekle
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

export default ElevatorIndex;
ElevatorIndex.Layout = "Main";
