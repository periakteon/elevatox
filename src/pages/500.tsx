import { type MyPage } from "@/components/layouts/types";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

const ErrorPage: MyPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">500</h1>
        <h2 className="mt-4 text-4xl font-medium">Internal Server Error</h2>
        <p className="mt-4 text-gray-500">
          Oops! Bir şeyler yanlış gitti ve çözmek için çalışıyoruz.
        </p>
        <div className="mt-6">
          <Button className="px-8 py-2 text-lg" variant="outline">
            <Link href="/">
              <span className="flex items-center gap-2">
                <HomeIcon className="h-4 w-4" />
                <span>Anasayfaya Git</span>
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
ErrorPage.Layout = "NoLayout";
