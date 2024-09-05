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
import { kabinUstuMaintenanceSchema } from "@/utils/schemas";
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
import MaintenanceToPdf from "./maintenance-to-pdf";
import { emitter } from "@/utils/emitter";
import { cn } from "@/lib/utils";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import MaintenanceToThermalPrinter from "./maintenance-to-thermal-printer";

interface MaintenanceFormProps {
  buildingName: string;
  maintenanceId: string | undefined;
}

export default function KabinUstuMaintenanceForm({
  buildingName,
  maintenanceId,
}: MaintenanceFormProps) {
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const utils = api.useUtils();

  const createMaintenance =
    api.maintenance.createKabinUstuMaintenance.useMutation({
      onMutate: () => {
        emitter.publish(
          "showNotification",
          "Kabin üstü bakım kaydı oluşturuluyor...",
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

  const form = useForm<z.infer<typeof kabinUstuMaintenanceSchema>>({
    resolver: zodResolver(kabinUstuMaintenanceSchema),
    defaultValues: {
      maintenanceId,
      additionalNote: undefined,
      borderSecurityBreaker: false,
      counterWeight: false,
      elevatorCabin: false,
      elevatorCabinDoor: false,
      emergencyAlarm: false,
      floorLevel: false,
      speedRegulator: false,
      stationEntrance: false,
      stopControls: false,
    },
  });

  function onSubmit(data: z.infer<typeof kabinUstuMaintenanceSchema>) {
    void createMaintenance.mutate(data);
  }

  function handleSelectAll() {
    setSelectAllChecked((prevState) => !prevState);

    const newCheckedState = !selectAllChecked;

    form.setValue("borderSecurityBreaker", newCheckedState);
    form.setValue("counterWeight", newCheckedState);
    form.setValue("elevatorCabin", newCheckedState);
    form.setValue("elevatorCabinDoor", newCheckedState);
    form.setValue("emergencyAlarm", newCheckedState);
    form.setValue("floorLevel", newCheckedState);
    form.setValue("speedRegulator", newCheckedState);
    form.setValue("stationEntrance", newCheckedState);
    form.setValue("stopControls", newCheckedState);
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
              name="borderSecurityBreaker"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Sınır Güvenliği Kesicisi</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="counterWeight"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Asansör Kabini / Karşı Ağırlık</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="elevatorCabin"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Asansör Kabini</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="elevatorCabinDoor"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Asansör Kabin Kapısı</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyAlarm"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Acil Alarm Tertibatı</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="floorLevel"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Kat Seviyesi</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="speedRegulator"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Hız Regülatorü</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stationEntrance"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Durak Girişi</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stopControls"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Durak Kumandaları ve Göstergeleri</FormLabel>
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
                  "cursor-not-allowed bg-red-600 hover:bg-red-500",
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
