import ErrorComponent from "@/components/error";
import TableFallback from "@/components/fallback/table/table-fallback";
import { type MyPage } from "@/components/layouts/types";
import NoData from "@/components/no-data";
import { columns } from "@/components/tanstack-table/firma-personel/sil/columns";
import { DataTable } from "@/components/tanstack-table/firma-personel/sil/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";
import { companyInfoAtom, roleAtom } from "@/utils/atom";
import { useAtomValue } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";

const DeleteStaff: MyPage = () => {
  const router = useRouter();

  const companyInfo = useAtomValue(companyInfoAtom);
  const roleInfo = useAtomValue(roleAtom);

  if (roleInfo !== "OWNER") {
    void router.push("/dashboard");
  }

  const staffList = api.company.getCompanyStaffList.useQuery();

  const { isLoading, isError, isLoadingError, error, data } = staffList;

  if (isError || isLoadingError) {
    return (
      <ErrorComponent error={error.message} errorCode={error.data?.code} />
    );
  }

  return (
    <>
      <Head>
        <title>Personel Sil | {companyInfo?.companyInfo.name} - ElevatoX</title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Personel Sil</CardTitle>
            <CardDescription className="w-full">
              Aşağıdaki listeden personel kaydı silme işlemini
              gerçekleştirebilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? <TableFallback /> : null}
            {!isLoading && data ? (
              <DataTable columns={columns} data={data.staff} />
            ) : null}
            {!isLoading && !data ? <NoData /> : null}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DeleteStaff;
DeleteStaff.Layout = "Main";
