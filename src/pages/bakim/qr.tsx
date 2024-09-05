import ErrorComponent from "@/components/error";
import TableFallback from "@/components/fallback/table/table-fallback";
import { type MyPage } from "@/components/layouts/types";
import NoData from "@/components/no-data";
import { columns } from "@/components/tanstack-table/firma-bakim/qr/columns";
import { DataTable } from "@/components/tanstack-table/firma-bakim/qr/data-table";
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

const QRCodeIndex: MyPage = () => {
  const companyInfo = useAtomValue(companyInfoAtom);

  const elevatorList = api.elevator.getElevatorListForQRCode.useQuery();

  const { isLoading, isError, isLoadingError, error, data } = elevatorList;

  if (isError || isLoadingError) {
    return (
      <ErrorComponent error={error.message} errorCode={error.data?.code} />
    );
  }

  return (
    <>
      <Head>
        <title>
          QR Kod Listesi | {companyInfo?.companyInfo.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>QR Kod Listesi</CardTitle>
            <CardDescription>
              <span className="block">
                Aşağıda firmanızdaki asansörlere ait QR kodları görebilirsiniz.
                QR kodu okutarak bakım ekleyebilirsiniz.
              </span>
              <span className="block">
                Her asansöre özel QR koda ulaşmak için aşağıdaki tabloda yer
                alan <span className="font-bold">&quot;İşlemler&quot;</span>{" "}
                sütunundaki{" "}
                <span className="font-bold">&quot;QR Kod Görüntüle&quot;</span>{" "}
                butonuna tıklayınız.
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

export default QRCodeIndex;
QRCodeIndex.Layout = "Main";
