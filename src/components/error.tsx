import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { type TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import { AlertCircleIcon, RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/router";

export default function ErrorComponent({
  error,
  errorCode,
}: {
  error?: string;
  errorCode?: TRPC_ERROR_CODE_KEY;
}) {
  const router = useRouter();
  return (
    <Card className="m-4 mx-auto mt-20 max-w-[350px] overflow-hidden rounded-xl p-4 shadow-md md:max-w-2xl">
      <CardContent className="p-8">
        <div className="flex items-center space-x-4">
          <AlertCircleIcon className="h-12 w-12 text-red-500" />
          <div>
            <div className="text-xl font-medium text-black dark:text-white">
              Hata!
            </div>
            <p className="text-gray-500">
              Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.
              <span className="mt-2 block text-white">
                Hata Kodu:{" "}
                {errorCode ? (
                  <span className="text-red-500">{errorCode}</span>
                ) : (
                  "Bilinmiyor"
                )}
              </span>
              <span className="mt-2 block text-white">
                Hata:{" "}
                {error ? (
                  <span className="text-red-500">{error}</span>
                ) : (
                  "Bilinmiyor"
                )}
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            className="mt-4 cursor-pointer"
            variant="outline"
            onClick={() => void router.reload()}
          >
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Sayfayı Yenile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
