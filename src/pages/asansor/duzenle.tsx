import { type MyPage } from "@/components/layouts/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";
import { DataTable } from "@/components/tanstack-table/firma-asansor/duzenle/data-table";
import { columns } from "@/components/tanstack-table/firma-asansor/duzenle/columns";
import TableFallback from "@/components/fallback/table/table-fallback";
import NoData from "@/components/no-data";
import Head from "next/head";
import { useAtomValue } from "jotai";
import { companyInfoAtom, roleAtom } from "@/utils/atom";
import { useRouter } from "next/router";
import ErrorComponent from "@/components/error";

const EditElevator: MyPage = () => {
  const router = useRouter();

  const companyInfo = useAtomValue(companyInfoAtom);
  const roleInfo = useAtomValue(roleAtom);

  if (roleInfo === "FIELD_STAFF") {
    void router.push("/dashboard");
  }

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
          Asansör Düzenle | {companyInfo?.companyInfo?.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Asansör Düzenle</CardTitle>
            <CardDescription className="w-full">
              Aşağıdaki listeden asansör düzenleme işlemini
              gerçekleştirebilirsiniz.
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

export default EditElevator;
EditElevator.Layout = "Main";
