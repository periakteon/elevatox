/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { makineDairesiMaintenanceSchema } from "@/utils/schemas";
import { Textarea } from "../ui/textarea";
import {
  Check,
  Download,
  ListChecks,
  Loader2,
  Save,
  XCircle,
} from "lucide-react";
import { api } from "@/utils/api";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MaintenanceToPdf from "./maintenance-to-pdf";
import { emitter } from "@/utils/emitter";
import { cn } from "@/lib/utils";
import { useState } from "react";
import MaintenanceToThermalPrinter from "./maintenance-to-thermal-printer";

interface MaintenanceFormProps {
  buildingName: string;
  maintenanceId: string | undefined;
}

export default function MakineDairesiMaintenanceForm({
  buildingName,
  maintenanceId,
}: MaintenanceFormProps) {
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const utils = api.useUtils();

  const createMaintenance =
    api.maintenance.createMakineDairesiMaintenance.useMutation({
      onMutate: () => {
        emitter.publish(
          "showNotification",
          "Makine dairesi bakım kaydı oluşturuluyor...",
        );
      },

      onSuccess: async () => {
        await utils.maintenance.invalidate();

        toast({
          variant: "done",
          title: "Bakım başarıyla kaydedildi!",
        });
      },

      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Bakım kaydedilirken bir hata oluştu!",
          description: error.message,
        });
      },
    });

  const todayMaintenanceList = api.maintenance.getLastMaintenanceList.useQuery({
    maintenanceId,
  });

  const form = useForm<z.infer<typeof makineDairesiMaintenanceSchema>>({
    resolver: zodResolver(makineDairesiMaintenanceSchema),
    defaultValues: {
      maintenanceId,
      additionalNote: undefined,
      propulsionMotor: false,
      gearBox: false,
      switchBoard: false,
    },
  });

  function onSubmit(data: z.infer<typeof makineDairesiMaintenanceSchema>) {
    void createMaintenance.mutate(data);
  }

  function handleSelectAll() {
    setSelectAllChecked((prevState) => !prevState);

    const newCheckedState = !selectAllChecked;

    form.setValue("propulsionMotor", newCheckedState);
    form.setValue("gearBox", newCheckedState);
    form.setValue("switchBoard", newCheckedState);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bakım Formu</CardTitle>
        <CardDescription>
          Aşağıdaki formu doldurarak yeni bir bakım oluşturabilirsiniz.
          <Button
            className="mt-4 flex w-full bg-green-600 text-white hover:bg-green-500 hover:text-white md:w-2/4 lg:w-1/4"
            type="button"
            onClick={handleSelectAll}
          >
            <ListChecks size={20} className="ml-1" />
            <span className="ml-1 flex font-bold">
              {selectAllChecked ? "TÜMÜNÜ KALDIR" : "TÜMÜNÜ SEÇ"}
            </span>
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="propulsionMotor"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Tahrik Motoru</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gearBox"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Dişli Kutusu</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="switchBoard"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Kumanda Panosu</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eklemek İstediğiniz Notlar (Opsiyonel)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Varsa parça değişimi, bakımı yapılan parça, bakımı yapan kişi, bakım tarihi vb."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Bakımla ilgili eklemek istediğiniz notlarınızı buraya
                    yazabilirsiniz.
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button
              className={cn(
                "w-full bg-green-600 text-white hover:bg-green-500 hover:text-white sm:w-3/4 md:w-2/4 lg:w-1/4",
                createMaintenance.isError &&
                  "cursor-not-allowed bg-red-600 opacity-50 hover:bg-red-500",
                createMaintenance.isSuccess && "cursor-not-allowed",
              )}
              type="submit"
              disabled={
                createMaintenance.isLoading ||
                createMaintenance.isSuccess ||
                createMaintenance.isError
              }
            >
              {!createMaintenance.isLoading &&
                !createMaintenance.isError &&
                !createMaintenance.isSuccess && (
                  <span className="ml-1 flex font-bold">
                    BAKIMI KAYDET
                    <Save size={20} className="ml-1" />
                  </span>
                )}
              {createMaintenance.isLoading && (
                <Loader2 className="h-5 w-5 animate-spin" />
              )}
              {createMaintenance.isSuccess && <Check className="h-5 w-5" />}
              {createMaintenance.isError && (
                <XCircle color="#fff" className="h-5 w-5" />
              )}
            </Button>
            {todayMaintenanceList.data &&
            todayMaintenanceList.data?.kabinUstuMaintenance?.length > 0 &&
            todayMaintenanceList.data?.kuyuDibiMaintenance?.length > 0 &&
            todayMaintenanceList.data?.makineDairesiMaintenance?.length > 0 ? (
              <>
                <Button
                  variant={"link2"}
                  type="button"
                  className="mt-0 flex w-full justify-center text-center sm:mt-4 sm:w-3/4 md:w-2/4 lg:w-1/4"
                >
                  <PDFDownloadLink
                    className="ml-1 inline"
                    document={
                      <MaintenanceToThermalPrinter
                        props={todayMaintenanceList.data}
                        buildingName={buildingName}
                      />
                    }
                    fileName={`bakim-kaydi-${new Date().toLocaleDateString()}.pdf`}
                  >
                    <span className="ml-1 flex">
                      <span className="mt-1 font-bold">
                        TERMAL YAZICI ÇIKTISI
                      </span>
                      <Download className="ml-2" />
                    </span>
                  </PDFDownloadLink>
                </Button>
                <Button
                  variant={"link2"}
                  type="button"
                  className="mt-0 flex w-full justify-center text-center sm:mt-4 sm:w-3/4 md:w-2/4 lg:w-1/4"
                >
                  <PDFDownloadLink
                    className="ml-1 inline"
                    document={
                      <MaintenanceToPdf
                        props={todayMaintenanceList.data}
                        buildingName={buildingName}
                      />
                    }
                    fileName={`bakim-kaydi-${new Date().toLocaleDateString()}.pdf`}
                  >
                    <span className="ml-1 flex">
                      <span className="mt-1 font-bold">SON 3 BAKIMI İNDİR</span>
                      <Download className="ml-2" />
                    </span>
                  </PDFDownloadLink>
                </Button>
              </>
            ) : null}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
