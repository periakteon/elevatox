import ErrorComponent from "@/components/error";
import TableFallback from "@/components/fallback/table/table-fallback";
import { type MyPage } from "@/components/layouts/types";
import NoData from "@/components/no-data";
import { columns } from "@/components/tanstack-table/firma-bina-sorumlu/sil/columns";
import { DataTable } from "@/components/tanstack-table/firma-bina-sorumlu/sil/data-table";
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

const DeleteBuildingPerson: MyPage = () => {
  const router = useRouter();

  const companyInfo = useAtomValue(companyInfoAtom);
  const roleInfo = useAtomValue(roleAtom);

  if (roleInfo !== "OWNER") {
    void router.push("/dashboard");
  }

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
          Bina Sorumlusu Sil | {companyInfo?.companyInfo.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Bina Sorumlusu Sil</CardTitle>
            <CardDescription className="w-full">
              Aşağıdaki listeden bina sorumlusu silme işlemini
              gerçekleştirebilirsiniz.
              <span className="block">
                <span className="font-bold text-red-500">DİKKAT: </span>
                Bina sorumlusunu sildiğinizde, bina sorumlusuna ait tüm
                asansörler de silinecektir.
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

export default DeleteBuildingPerson;
DeleteBuildingPerson.Layout = "Main";
