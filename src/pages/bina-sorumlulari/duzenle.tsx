import ErrorComponent from "@/components/error";
import TableFallback from "@/components/fallback/table/table-fallback";
import { type MyPage } from "@/components/layouts/types";
import NoData from "@/components/no-data";
import { columns } from "@/components/tanstack-table/firma-bina-sorumlu/duzenle/columns";
import { DataTable } from "@/components/tanstack-table/firma-bina-sorumlu/duzenle/data-table";
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

const EditBuildingPerson: MyPage = () => {
  const router = useRouter();

  const companyInfo = useAtomValue(companyInfoAtom);
  const roleInfo = useAtomValue(roleAtom);

  if (roleInfo === "FIELD_STAFF") {
    void router.push("/dashboard");
  }

  const { isLoading, data, isError, isLoadingError, error } =
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
          Bina Sorumlusu Düzenle | {companyInfo?.companyInfo.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Bina Sorumlusu Düzenle</CardTitle>
            <CardDescription className="w-full">
              Aşağıdaki listeden bina sorumlusu düzenleme işlemini
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

export default EditBuildingPerson;
EditBuildingPerson.Layout = "Main";
