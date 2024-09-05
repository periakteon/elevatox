import { type MyPage } from "@/components/layouts/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import TableFallback from "@/components/fallback/table/table-fallback";
import NoData from "@/components/no-data";
import { useAtomValue } from "jotai";
import { companyInfoAtom } from "@/utils/atom";
import ErrorComponent from "@/components/error";
import { DataTable } from "@/components/tanstack-table/firma-tahsilat/params-liste/data-table";
import { columns } from "@/components/tanstack-table/firma-tahsilat/params-liste/columns";
import { Label } from "@/components/ui/label";
import AddPaymentComponent from "@/components/tanstack-table/firma-tahsilat/ekle/add-payment-modal";

const PaymentListByParams: MyPage = () => {
  const companyInfo = useAtomValue(companyInfoAtom);

  const router = useRouter();

  const { id: params } = router.query;

  const { isLoading, isError, isLoadingError, error, data } =
    api.payment.getPaymentList.useQuery({
      buildingResponsiblePersonId: params as string,
    });

  if (isError || isLoadingError) {
    return (
      <ErrorComponent error={error.message} errorCode={error.data?.code} />
    );
  }

  return (
    <>
      <Head>
        <title>
          {data?.[0]?.buildingResponsiblePerson.buildingName} Tahsilat Kaydı
          Listesi | {companyInfo?.companyInfo.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>
              {data?.[0]?.buildingResponsiblePerson.buildingName}
            </CardTitle>
            <CardDescription>
              <span className="block">
                {data?.[0]?.buildingResponsiblePerson.address}
              </span>
              {data?.length ? (
                <AlertDialog>
                  <AlertDialogTrigger className="flex justify-center truncate text-center font-semibold">
                    <Button className="mt-4 bg-green-600 font-bold text-white hover:bg-green-500 focus:ring-green-200 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800">
                      TAHSİLAT EKLE
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="mb-4">
                        <span className="mr-1 text-red-500">
                          {data?.[0]?.buildingResponsiblePerson.firstName}{" "}
                          {data?.[0]?.buildingResponsiblePerson.lastName}
                        </span>{" "}
                        adlı bina sorumlusu için tahsilat kaydı ekliyorsunuz.
                      </AlertDialogTitle>
                      <AlertDialogDescription className="w-full">
                        <AddPaymentComponent
                          buildingResponsiblePersonId={params as string}
                        />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer bg-red-500 text-white hover:bg-red-600 hover:text-white">
                        <Label>KAPAT</Label>
                      </AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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

export default PaymentListByParams;
PaymentListByParams.Layout = "Main";
