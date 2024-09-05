/**
 * @url: bakim/:id
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function QrFallback() {
  return (
    <>
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
            <div className="flex h-full min-w-full animate-pulse flex-col rounded-lg border border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800 md:max-w-xl md:flex-row">
              <div className="flex max-w-[400px] flex-col items-center p-1 sm:w-[400px]">
                {/* Tabs ve içerikleri */}
                <Skeleton className="mb-4 h-16 w-full bg-slate-300 dark:bg-slate-700" />
                <Skeleton className="h-72 w-full bg-slate-300 dark:bg-slate-700" />
              </div>
              <div className="max-w-1/3 flex flex-col justify-between border-t p-4 leading-normal md:w-1/3 md:border-none">
                {/* Bilgiler */}
                <div className="flex flex-col">
                  <Skeleton className="mb-6 h-6 w-full bg-slate-300 dark:bg-slate-700" />
                  <Skeleton className="mb-6 h-6 w-full bg-slate-300 dark:bg-slate-700" />
                  <Skeleton className="mb-6 h-6 w-full bg-slate-300 dark:bg-slate-700" />
                  <Skeleton className="mb-6 h-6 w-full bg-slate-300 dark:bg-slate-700" />
                  <Skeleton className="mb-6 h-6 w-full bg-slate-300 dark:bg-slate-700" />
                  <Skeleton className="mb-6 h-6 w-full bg-slate-300 dark:bg-slate-700" />
                </div>
              </div>
              <div className="max-w-1/3 flex flex-col justify-between border-t p-4 leading-normal md:w-1/3 md:border-none">
                {/* Diğer Bilgiler */}
                <div className="flex flex-col">
                  <Skeleton className="mb-6 h-6 w-full bg-slate-300 dark:bg-slate-700" />
                  <Skeleton className="mb-6 h-6 w-full bg-slate-300 dark:bg-slate-700" />
                  <Skeleton className="mb-6 h-6 w-full bg-slate-300 dark:bg-slate-700" />
                  <Skeleton className="mb-6 h-6 w-full bg-slate-300 dark:bg-slate-700" />
                  <Skeleton className="mb-6 h-6 w-full bg-slate-300 dark:bg-slate-700" />
                  <Skeleton className="mb-6 h-6 w-full bg-slate-300 dark:bg-slate-700" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
