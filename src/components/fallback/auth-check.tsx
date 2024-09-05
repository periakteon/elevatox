import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function AuthCheckFallback() {
  return (
    <Card className="mx-auto my-20 w-96">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Kontrol ediliyor
          <span className="animate-ping">.</span>
          <span className="animate-ping delay-300">.</span>
          <span className="delay-600 animate-ping">.</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="sr-only">Yetki kontrol ediliyor</span>
        </div>
      </CardContent>
    </Card>
  );
}
