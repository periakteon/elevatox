import { Skeleton } from "@/components/ui/skeleton";

export default function UpdateCompanyFallback() {
  return (
    <>
      <div className="grid gap-4">
        <div className="ml-6 flex flex-col space-y-2">
          <Skeleton className="mb-2 h-4 w-[100px]" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
        <div className="ml-6 flex flex-col space-y-2">
          <Skeleton className="mb-2 h-4 w-[100px]" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
        <div className="ml-6 flex flex-col space-y-2">
          <Skeleton className="mb-2 h-4 w-[100px]" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
        <div className="ml-6 flex flex-col space-y-2">
          <Skeleton className="mb-2 h-4 w-[100px]" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
        <div className="ml-6 flex flex-col space-y-2">
          <Skeleton className="mb-2 h-4 w-[100px]" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
        <div className="ml-6 flex flex-col space-y-2">
          <Skeleton className="mb-2 h-4 w-[100px]" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
        <div className="ml-6 flex flex-col space-y-2">
          <Skeleton className="mb-2 h-4 w-[100px]" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
        <div className="ml-6 flex flex-col space-y-2">
          <Skeleton className="mb-2 h-4 w-[100px]" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
      </div>
      <Skeleton className="ml-6 mt-4 h-8 w-[100px] rounded-md" />
    </>
  );
}
