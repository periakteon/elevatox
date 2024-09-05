import { Skeleton } from "../ui/skeleton";

export default function DashboardFallback() {
  return (
    <>
      <div className={`animate-pulse p-4 sm:ml-64`}>
        <div className="mt-16 rounded-lg border-2 bg-slate-50 dark:bg-slate-900">
          <div className="flex min-h-screen w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-32 w-full" />
                ))}
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                {Array.from({ length: 2 }).map((_, index) => (
                  <Skeleton key={index} className="h-32 w-full" />
                ))}
              </div>
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                {Array.from({ length: 1 }).map((_, index) => (
                  <Skeleton key={index} className="h-[300px] w-full" />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
