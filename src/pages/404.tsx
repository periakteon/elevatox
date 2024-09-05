import { type MyPage } from "@/components/layouts/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import { useRouter } from "next/router";

const ErrorPage: MyPage = () => {
  const router = useRouter();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">
            Sayfa Bulunamadı
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4">
            <XIcon className="h-12 w-12 text-red-600" />
            <p className="text-center text-gray-500">
              Üzgünüz, aradığınız sayfayı bulamadık.
            </p>
          </div>
        </CardContent>
        <div className="p-4">
          <Button className="w-full" onClick={() => void router.back()}>
            Geri Dön
          </Button>
        </div>
      </Card>
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>© ElevatoX</p>
      </footer>
    </main>
  );
};

export default ErrorPage;
ErrorPage.Layout = "NoLayout";
