import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function UnauthorizedError() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Yetkisiz Erişim | ElevatoX</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center">
        <Card className="mx-auto w-96 rounded-lg p-4 shadow-lg">
          <div className="flex justify-start">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri Dön
            </Button>
          </div>
          <CardHeader className="mt-4">
            <CardTitle>Yetkisiz Erişim</CardTitle>
            <CardDescription>
              Bu sayfaya erişim yetkiniz bulunmamaktadır.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <p className="text-sm">
              Eğer bunun bir hata olduğunu düşünüyorsanız,
              <Link className="text-blue-500 hover:underline" href="/iletisim">
                {" "}
                buraya tıklayarak
              </Link>{" "}
              bizimle iletişime geçin.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
