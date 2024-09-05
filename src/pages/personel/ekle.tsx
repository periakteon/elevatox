import ErrorComponent from "@/components/error";
import { type MyPage } from "@/components/layouts/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { env } from "@/env.mjs";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { companyInfoAtom } from "@/utils/atom";
import { emitter } from "@/utils/emitter";
import { format } from "date-fns";
import { useAtomValue } from "jotai";
import Head from "next/head";
import { useEffect, useState } from "react";

const AddStaff: MyPage = () => {
  const companyInfo = useAtomValue(companyInfoAtom);

  const utils = api.useUtils();

  const [closeInfo, setCloseInfo] = useState(false);

  const [copyLinkAnimation, setCopyLinkAnimation] = useState(false);

  const {
    isLoading,
    isError,
    isLoadingError,
    error,
    data: magicLink,
  } = api.company.getMagicLinks.useQuery();

  const generateInviteLink = api.company.createMagicLinkForStaff.useMutation({
    onMutate: () => {
      emitter.publish(
        "showNotification",
        "Personel davet linki oluşturuluyor...",
      );
    },

    onSuccess: async () => {
      await utils.company.invalidate();

      toast({
        variant: "done",
        title: "Link başarıyla oluşturuldu!",
        description: "Kayıt olması için linki personelinize gönderin.",
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Link oluşturulurken bir hata oluştu!",
        description: error.message,
      });
    },
  });

  const deleteInviteLink = api.company.deleteMagicLink.useMutation({
    onMutate: () => {
      emitter.publish("showNotification", "Personel davet linki siliniyor...");
    },

    onSuccess: async () => {
      await utils.company.invalidate();

      toast({
        variant: "done",
        title: "Link başarıyla silindi!",
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Link silinirken bir hata oluştu!",
        description: error.message,
      });
    },
  });

  useEffect(() => {
    if (magicLink && magicLink !== null) {
      setCopyLinkAnimation(true);
    } else {
      setCopyLinkAnimation(false);
    }
  }, [magicLink]);

  if (isError || isLoadingError) {
    return (
      <ErrorComponent error={error.message} errorCode={error.data?.code} />
    );
  }

  return (
    <>
      <Head>
        <title>
          Personel Ekle | {companyInfo?.companyInfo.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Personel Ekle</CardTitle>
            <CardDescription className="">
              Personel eklemek için lütfen link oluşturun ve oluşturduğunuz
              linki personelinize gönderin.
              {!closeInfo && (
                <div className="w-3/3 md:w-3/3 my-4 flex rounded-lg bg-red-50 p-4 text-sm text-red-800 drop-shadow-md transition-all dark:bg-slate-800 dark:text-red-400 lg:w-1/3">
                  <svg
                    className="mr-3 mt-[2px] inline h-4 w-4 flex-shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <div className="w-full transition-transform duration-1000 ease-in-out">
                    <div className="flex justify-between">
                      <span className="justify-start font-medium">
                        Güvenlik sebebiyle şu anlık yalnızca tek bir link
                        oluşturabilirsiniz.
                      </span>
                      <span
                        className="relative ml-2 flex h-3 w-3 cursor-pointer justify-end"
                        onClick={() => setCloseInfo(!closeInfo)}
                      >
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500 text-sm text-white">
                          <span>
                            <span className="flex h-3 w-3 items-center justify-center">
                              <span className="text-xs text-slate-700">X</span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                className="w-2/3 cursor-pointer"
                onClick={() => {
                  void copyToClipboard(
                    `${env.NEXT_PUBLIC_WEBSITE_URL}/firma/kayit/personel?id=${magicLink?.token}`,
                  );
                  setCopyLinkAnimation(false);
                }}
                value={`${
                  magicLink?.token
                    ? `${env.NEXT_PUBLIC_WEBSITE_URL}/firma/kayit/personel?id=${magicLink?.token}`
                    : "Lütfen link oluşturun."
                }`}
                readOnly
              />
            </div>
            <Button
              variant="default"
              className={`mt-4 shrink-0 cursor-pointer`}
              onClick={() => {
                void generateInviteLink.mutate();
                setCopyLinkAnimation(true);
              }}
              disabled={generateInviteLink.isLoading}
            >
              Link Oluştur
            </Button>
            <Button
              variant="default"
              // animate-pulse border-2 border-green-300 bg-gradient-to-r from-green-600 to-green-700
              className={cn(
                "relative ml-2 shrink-0 overflow-hidden bg-green-500 text-white hover:bg-green-400",
                {
                  "animate-pulse border-2 border-green-300 bg-gradient-to-r from-green-600 to-green-700":
                    copyLinkAnimation,
                },
                {
                  "cursor-not-allowed opacity-50":
                    magicLink?.token === undefined,
                },
              )}
              onClick={() => {
                if (magicLink?.token === undefined) {
                  return;
                }

                void copyToClipboard(
                  `${env.NEXT_PUBLIC_WEBSITE_URL}/firma/kayit/personel?id=${magicLink?.token}`,
                );

                setCopyLinkAnimation(false);
              }}
            >
              {magicLink?.token &&
                (copyLinkAnimation ? "Linki Kopyala!" : "Link Kopyalandı!")}
              {magicLink?.token === undefined && "Linki Kopyala!"}
            </Button>
            {isLoading && <Skeleton className="my-4 h-20" />}
            {!isLoading && magicLink && magicLink !== null ? (
              <>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Link Listesi </h4>
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between space-x-4">
                      <div className={`flex items-center space-x-4`}>
                        {magicLink?.expiresAt < new Date() ? (
                          <div className="relative rounded-lg border-2">
                            <div className="blur-md">
                              <div>
                                <Textarea
                                  className="min-h-[138px] max-w-[400px] cursor-pointer resize-none sm:min-w-[450px]"
                                  value={`${
                                    magicLink.token
                                      ? `${env.NEXT_PUBLIC_WEBSITE_URL}/firma/kayit/personel?id=${magicLink.token}`
                                      : "Lütfen link oluşturun."
                                  }`}
                                  readOnly
                                  onClick={() => {
                                    void copyToClipboard(
                                      `${env.NEXT_PUBLIC_WEBSITE_URL}/firma/kayit/personel?id=${magicLink.token}`,
                                    );
                                    setCopyLinkAnimation(false);
                                  }}
                                />
                                <p className="text-sm text-muted-foreground">
                                  <span className="text-red-500">
                                    {format(
                                      magicLink.expiresAt,
                                      "dd.MM.yyyy HH:mm",
                                    )}
                                  </span>{" "}
                                  tarihine kadar geçerli.
                                </p>
                              </div>
                            </div>
                            <div className="absolute inset-0 z-10 flex w-full items-center justify-center bg-white bg-opacity-50 dark:bg-slate-950 dark:bg-opacity-50">
                              <button className="rounded bg-red-500 px-4 py-2 font-bold text-white">
                                Linkin süresi dolmuştur. Silip yeni link
                                oluşturun.
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <Textarea
                              className="min-h-[138px] max-w-[400px] cursor-pointer resize-none sm:min-w-[450px]"
                              value={`${
                                magicLink.token
                                  ? `${env.NEXT_PUBLIC_WEBSITE_URL}/firma/kayit/personel?id=${magicLink.token}`
                                  : "Lütfen link oluşturun."
                              }`}
                              readOnly
                              onClick={() => {
                                void copyToClipboard(
                                  `${env.NEXT_PUBLIC_WEBSITE_URL}/firma/kayit/personel?id=${magicLink.token}`,
                                );
                                setCopyLinkAnimation(false);
                              }}
                            />
                            <p className="text-sm text-muted-foreground">
                              <span className="text-red-500">
                                {format(
                                  magicLink.expiresAt,
                                  "dd.MM.yyyy HH:mm",
                                )}
                              </span>{" "}
                              tarihine kadar geçerli.
                            </p>
                          </div>
                        )}
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button variant="destructive">SİL</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              <span className="font-bold text-red-500">
                                {format(
                                  magicLink.expiresAt,
                                  "dd.MM.yyyy HH:mm",
                                )}
                              </span>{" "}
                              tarihine kadar geçerli olan linki silmek
                              istediğinize emin misiniz?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Bu işlem geri alınamaz. Silindikten sonra kayıt
                              linkinin tekrar oluşturulması gerekecektir.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Vazgeç</AlertDialogCancel>

                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
                              onClick={() =>
                                deleteInviteLink.mutate({
                                  magicLinkId: magicLink.id,
                                })
                              }
                            >
                              Sil
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

async function copyToClipboard(link: string) {
  await navigator.clipboard.writeText(link);
  toast({
    title: "Link Kopyalandı!",
    duration: 1500,
    description: (
      <pre className="mt-2 w-[340px] overflow-x-auto rounded-md bg-slate-950 p-4">
        <code className="text-white">{link}</code>
      </pre>
    ),
  });
}

export default AddStaff;
AddStaff.Layout = "Main";
