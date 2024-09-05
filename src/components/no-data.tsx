import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { AlertCircleIcon, ArrowLeftCircleIcon } from "lucide-react";
import { useRouter } from "next/router";

export default function NoData() {
  const router = useRouter();
  return (
    <Card className="m-4 mx-auto max-w-md overflow-hidden rounded-xl shadow-md md:max-w-2xl">
      <CardContent className="p-8">
        <div className="flex items-center space-x-4">
          <AlertCircleIcon className="h-12 w-12 text-yellow-500" />
          <div>
            <div className="text-xl font-medium text-black dark:text-white">
              Veri Yok
            </div>
            <p className="text-gray-500">
              Gösterilecek herhangi bir veri bulunamadı.
            </p>
          </div>
        </div>
        <Button
          className="mt-4 cursor-pointer"
          variant="outline"
          onClick={() => void router.back()}
        >
          <ArrowLeftCircleIcon className="mr-2 h-4 w-4" />
          Geri Git
        </Button>
      </CardContent>
    </Card>
  );
}
