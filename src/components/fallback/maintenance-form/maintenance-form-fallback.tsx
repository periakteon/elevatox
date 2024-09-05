/**
 * @url: bakim/qr/:id
 */

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MaintenanceFormFallback() {
  return (
    <div className="p-4 sm:ml-64">
      <Card className="mt-16 rounded-lg border-slate-200 bg-slate-100 p-0 dark:border-slate-700 dark:bg-slate-800">
        <CardHeader>
          <Skeleton className="mb-6 h-6 w-1/3 bg-slate-300 dark:bg-slate-700" />
          <Skeleton className="mb-6 h-6 w-1/5 bg-slate-300 dark:bg-slate-700" />
        </CardHeader>
        <CardContent>
          <div>
            <Skeleton className="mb-6 h-6 w-1/3 bg-slate-300 dark:bg-slate-700" />
            <Skeleton className="mb-6 h-6 w-1/5 bg-slate-300 dark:bg-slate-700" />
          </div>
          <div className="mt-16">
            <Skeleton className="mb-6 h-6 w-1/3 bg-slate-300 dark:bg-slate-700" />
            <Skeleton className="mb-6 h-6 w-1/5 bg-slate-300 dark:bg-slate-700" />
            <Skeleton className="mb-6 h-6 w-1/12 bg-slate-300 dark:bg-slate-700" />
            <Skeleton className="mb-6 h-6 w-1/12 bg-slate-300 dark:bg-slate-700" />
            <Skeleton className="mb-6 h-6 w-1/12 bg-slate-300 dark:bg-slate-700" />
            <Skeleton className="mb-6 h-6 w-1/2 bg-slate-300 dark:bg-slate-700" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
