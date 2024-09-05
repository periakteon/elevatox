import ErrorComponent from "@/components/error";
import TableFallback from "@/components/fallback/table/table-fallback";
import { type MyPage } from "@/components/layouts/types";
import NoData from "@/components/no-data";
import { columns } from "@/components/tanstack-table/firma-bakim/ekle/columns";
import { DataTable } from "@/components/tanstack-table/firma-bakim/ekle/data-table";
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

const AddMaintenance: MyPage = () => {
  const companyInfo = useAtomValue(companyInfoAtom);

  const router = useRouter();

  const { isLoading, isLoadingError, isError, error, data } =
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
          Bakım Kaydı Ekle | {companyInfo?.companyInfo.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Bakım Kaydı Ekle</CardTitle>
            <CardDescription>
              <span className="block">
                Aşağıda firmanızdaki asansör listesini görebilir ve{" "}
                <span className="font-bold">&quot;Bakım Ekle&quot;</span>{" "}
                butonuna basarak bakım kaydı ekleyebilirsiniz.
              </span>
              {!isLoading && data?.[0]?.elevatorQRCode.length === 0 ? (
                <>
                  <span className="mt-2 block">
                    <span className="font-bold text-red-500">UYARI: </span>
                    Bakım kaydı eklemek için öncelikle asansör için QR kod
                    oluşturmanız gerekmektedir.
                  </span>
                  <Button
                    className="mt-2 bg-green-600 text-white hover:bg-green-500 focus:ring-green-200 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
                    onClick={() => void router.push("/bakim/qr")}
                  >
                    QR Kod Oluştur
                  </Button>
                </>
              ) : null}
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

export default AddMaintenance;
AddMaintenance.Layout = "Main";
