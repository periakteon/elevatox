import QrFallback from "@/components/fallback/qr/qr-fallback";
import { type MyPage } from "@/components/layouts/types";
import QRCodeToPdf from "@/components/qr-code-to-pdf";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { emitter } from "@/utils/emitter";
import { PDFDownloadLink } from "@react-pdf/renderer";
import format from "date-fns/format";
import { Download, QrCode } from "lucide-react";
import { useRouter } from "next/router";
import { QRCode as QRCodeLogo } from "react-qrcode-logo";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@/server/api/root";
import { env } from "@/env.mjs";
import UnauthorizedError from "@/components/unauthorized";
import { useAtomValue } from "jotai";
import { companyInfoAtom } from "@/utils/atom";
import Head from "next/head";
import ErrorComponent from "@/components/error";
import transformLocation from "@/utils/transform-location";

type RouterOutput = inferRouterOutputs<AppRouter>;
type QRCodeData = RouterOutput["elevator"]["checkQRCodes"];

const MaintenanceIndex: MyPage = () => {
  const companyInfo = useAtomValue(companyInfoAtom);

  const [base64Codes, setBase64Codes] = useState<
    { id: string; elevatorLocation: string }[]
  >([]);
  const [isBase64DataReady, setIsBase64DataReady] = useState(false);

  const router = useRouter();

  const { id: params } = router.query;

  const { isLoading, isError, isLoadingError, error, data } =
    api.elevator.checkQRCodes.useQuery({
      elevatorId: params as string,
    });

  useEffect(() => {
    const generateQRCodeBase64 = async (data: QRCodeData) => {
      try {
        const base64Array: { id: string; elevatorLocation: string }[] = [];

        await Promise.all(
          data!.elevatorQRCode.map(async (qr) => {
            // base64'e çeviriyoruz, böylece react-pdf renderer içinde kullanabiliyoruz.
            //https://stackoverflow.com/questions/60006853/printing-generated-qr-codes-on-a-pdf-file
            const qrCodeDataURL = await QRCode.toDataURL(
              `${env.NEXT_PUBLIC_WEBSITE_URL}/bakim/qr/${qr.id}`,
            );

            const transformedLocation = transformLocation(qr.elevatorLocation);

            base64Array.push({
              id: qrCodeDataURL,
              elevatorLocation: transformedLocation,
            });
          }),
        );

        setBase64Codes(base64Array);
        setIsBase64DataReady(true);
      } catch (error) {
        setBase64Codes([]);
        setIsBase64DataReady(false);

        if (error instanceof Error) {
          toast({
            variant: "destructive",
            title: "QR kod getirilirken bir hata oluştu!",
            description: error.message,
          });
        }
      }
    };

    if (data) {
      void generateQRCodeBase64(data);
    }
  }, [data]);

  if (isLoading || !data) {
    return <QrFallback />;
  }

  if (isError || isLoadingError) {
    return (
      <ErrorComponent error={error.message} errorCode={error.data?.code} />
    );
  }

  if (!data?.company) {
    return <UnauthorizedError />;
  }

  if (data?.elevatorQRCode.length === 0 || !data?.elevatorQRCode) {
    return <NoQRCodeCard elevatorId={params as string} />;
  }

  return (
    <>
      <Head>
        <title>
          QR Kod Görüntüle | {companyInfo?.companyInfo?.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>QR Kod Listesi</CardTitle>
            <CardDescription>
              Aşağıda firmanızdaki asansörlere ait QR kodlarının listesini
              görebilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isLoading && data ? (
              <div className="flex min-w-full flex-col rounded-lg border border-slate-200 bg-white shadow dark:border-slate-700 dark:bg-slate-800 md:max-w-xl md:flex-row">
                <div className="flex flex-col items-center border-r p-1">
                  <Tabs
                    defaultValue="makine_dairesi"
                    className="w-[full] sm:w-[400px]"
                  >
                    <TabsList className="grid min-w-fit grid-cols-3">
                      <TabsTrigger value="makine_dairesi">
                        Makine Dairesi
                      </TabsTrigger>
                      <TabsTrigger value="kuyu_dibi">Kuyu Dibi</TabsTrigger>
                      <TabsTrigger value="kabin_ustu">Kabin Üstü</TabsTrigger>
                    </TabsList>
                    <TabsContent value="makine_dairesi">
                      <QRCodeCard
                        qrCodeId={
                          data?.elevatorQRCode.find(
                            (qrCode) =>
                              qrCode.elevatorLocation === "MAKINE_DAIRESI",
                          )?.id ?? ""
                        }
                      />
                    </TabsContent>
                    <TabsContent value="kuyu_dibi">
                      <QRCodeCard
                        qrCodeId={
                          data?.elevatorQRCode.find(
                            (qrCode) => qrCode.elevatorLocation === "KUYU_DIBI",
                          )?.id ?? ""
                        }
                      />
                    </TabsContent>
                    <TabsContent value="kabin_ustu">
                      <QRCodeCard
                        qrCodeId={
                          data?.elevatorQRCode.find(
                            (qrCode) =>
                              qrCode.elevatorLocation === "KABIN_USTU",
                          )?.id ?? ""
                        }
                      />
                    </TabsContent>
                    {isBase64DataReady ? (
                      <div
                        className={cn(
                          "mx-3 mt-4 flex justify-center sm:mx-10",
                          {
                            hidden: !isBase64DataReady,
                          },
                        )}
                      >
                        <Button
                          disabled={base64Codes.length === 0}
                          variant={"link2"}
                          type="button"
                          className="mt-4 block h-full w-full md:inline lg:inline"
                        >
                          <PDFDownloadLink
                            document={
                              <QRCodeToPdf
                                QRCodes={base64Codes}
                                buildingName={
                                  data.buildingResponsiblePerson.buildingName
                                }
                                company={data.company}
                              />
                            }
                            fileName={`${
                              data.buildingResponsiblePerson.buildingName
                            } - QR Kod Listesi / ${new Date().toLocaleDateString()}.pdf`}
                          >
                            <span className="ml-1 flex justify-around">
                              <Download className="-mr-8 h-10 sm:mr-2 sm:h-6" />
                              <span className="mt-1 flex justify-center font-bold">
                                TÜM QR KODLARI{" "}
                                <br className="block md:hidden lg:hidden" />
                                PDF OLARAK İNDİR
                              </span>
                            </span>
                          </PDFDownloadLink>
                        </Button>
                      </div>
                    ) : null}
                  </Tabs>
                </div>
                <div className="max:w-1/3 flex flex-col justify-between border-t p-4 leading-normal md:w-1/3 md:border-none">
                  <div className="flex flex-col">
                    <Label className="text-md my-2 font-bold tracking-tight text-gray-900 dark:text-white">
                      Bina Adı
                    </Label>
                    <Input
                      className="mb-6 w-full"
                      value={data?.buildingResponsiblePerson.buildingName}
                      disabled
                    />
                    <Label className="text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                      Bina Sorumlusu
                    </Label>
                    <Input
                      className="mb-6 w-full"
                      value={`${data?.buildingResponsiblePerson.firstName} ${data?.buildingResponsiblePerson.lastName}`}
                      disabled
                    />
                    <Label className="text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                      İl
                    </Label>
                    <Input
                      className="mb-6"
                      value={data?.buildingResponsiblePerson.city}
                      disabled
                    />
                    <Label className="text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                      İlçe
                    </Label>
                    <Input
                      className="mb-6"
                      value={data?.buildingResponsiblePerson.district}
                      disabled
                    />
                    <Label className="text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                      Adres
                    </Label>
                    <Input
                      className="mb-2 w-full"
                      value={data?.buildingResponsiblePerson.address}
                      disabled
                    />
                  </div>
                </div>
                <div className="max:w-1/3 flex flex-col justify-between border-t p-4 leading-normal md:w-1/3 md:border-none">
                  <div className="flex flex-col">
                    <Label className="text-md my-2 font-bold tracking-tight text-gray-900 dark:text-white">
                      Seri No
                    </Label>
                    <Input
                      className="mb-6"
                      value={data?.elevatorSerialNumber}
                      disabled
                    />
                    <Label className="text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                      Kapasite (kg)
                    </Label>
                    <Input
                      className="mb-6"
                      value={data?.elevatorCapacityKg + " kg"}
                      disabled
                    />
                    <Label className="text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                      Kapasite (kişi)
                    </Label>
                    <Input
                      className="mb-6"
                      value={data?.elevatorCapacityPerson + " kişi"}
                      disabled
                    />
                    <Label className="text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                      Montaj Tarihi
                    </Label>
                    <Input
                      className="mb-6"
                      value={format(
                        data?.elevatorInstallationDate ?? new Date(),
                        "dd/MM/yyyy HH:mm:ss",
                      )}
                      disabled
                    />
                    <Label className="text-md mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                      Son Bakım Tarihi
                    </Label>
                    <Input
                      className="mb-6"
                      value={format(
                        data?.elevatorLastMaintenanceDate ?? new Date(),
                        "dd/MM/yyyy HH:mm:ss",
                      )}
                      disabled
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

function QRCodeCard({ qrCodeId }: { qrCodeId: string }) {
  return (
    <div className="">
      <div className="mt-4 flex justify-center">
        <QRCodeLogo
          value={`${env.NEXT_PUBLIC_WEBSITE_URL}/bakim/qr/${qrCodeId}`}
          bgColor="#FFFFFF"
          fgColor="#000000"
          size={256}
        />
      </div>
      {/* <div className="my-4 flex justify-center">
        <Button variant={"link2"}>Tek QR Kod İndir</Button>
      </div> */}
    </div>
  );
}

function NoQRCodeCard({ elevatorId }: { elevatorId: string }) {
  const utils = api.useUtils();

  const createQRCode = api.elevator.createQRCode.useMutation({
    onMutate: () => {
      emitter.publish("showNotification", "QR kod oluşturuluyor...");
    },

    onSuccess: async () => {
      await utils.elevator.invalidate();
      toast({
        variant: "done",
        title: "QR kod başarıyla oluşturuldu!",
        duration: 1000,
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: "QR kod oluşturulurken bir hata oluştu!",
        description: error.message,
      });
    },
  });

  const { isLoading, isSuccess, isError } = createQRCode;

  if (isLoading) {
    return <QrFallback />;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-gray-700 dark:text-white">
          QR Kod Bulunamadı
        </div>
        <div className="text-xl text-gray-600 dark:text-gray-400">
          Bu asansör için QR kod oluşturulmamış.
        </div>
        <Button
          className={cn("mt-4 text-xl", {
            "cursor-not-allowed": isLoading || isSuccess || isError,
          })}
          variant="link2"
          disabled={isLoading || isSuccess || isError}
          onClick={() => void createQRCode.mutate({ elevatorId })}
        >
          <QrCode />
          <span className="ml-2">QR KOD OLUŞTUR</span>
        </Button>
      </div>
    </div>
  );
}

export default MaintenanceIndex;
MaintenanceIndex.Layout = "Main";
