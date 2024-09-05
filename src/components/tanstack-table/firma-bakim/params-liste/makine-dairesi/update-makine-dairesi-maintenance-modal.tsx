import SkeletonForForms from "@/components/fallback/skeleton-for-forms";
import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  makineDairesiMaintenanceSchema,
  type MakineDairesiMaintenanceType,
} from "@/utils/schemas";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Save, XCircle } from "lucide-react";
import { emitter } from "@/utils/emitter";
import { cn } from "@/lib/utils";

export default function UpdateMakineDairesiMaintenanceModal({
  props,
  kuyuDibiId,
}: {
  props: MakineDairesiMaintenanceType;
  kuyuDibiId: string;
}) {
  const user = useUser();

  const utils = api.useUtils();

  const updateMaintenance =
    api.maintenance.updateMakineDairesiMaintenance.useMutation({
      onMutate: () => {
        emitter.publish(
          "showNotification",
          "Makine dairesi bakım kaydı düzenleniyor...",
        );
      },

      onSuccess: async () => {
        await utils.maintenance.invalidate();

        toast({
          variant: "done",
          title: "Bakım başarıyla düzenlendi!",
        });
      },

      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Bakım düzenlenirken bir hata oluştu!",
          description: error.message,
        });
      },
    });

  const form = useForm<z.infer<typeof makineDairesiMaintenanceSchema>>({
    resolver: zodResolver(makineDairesiMaintenanceSchema),
    values: {
      gearBox: props.gearBox,
      propulsionMotor: props.propulsionMotor,
      switchBoard: props.switchBoard,
      additionalNote: props.additionalNote ?? "",
      maintenanceId: props.maintenanceId,
    },
  });

  function onSubmit(
    data: z.infer<typeof makineDairesiMaintenanceSchema>,
  ): void {
    void updateMaintenance.mutate({ id: kuyuDibiId, ...data });
  }

  if (user.user === undefined || !user.isLoaded) {
    return (
      <div className="mx-auto mt-32 w-2/6 items-center justify-center">
        <SkeletonForForms />
      </div>
    );
  }

  return (
    <>
      {user && (
        <div className="h-[450px] w-full overflow-y-auto">
          <Form {...form}>
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
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
                      <FormLabel>Tahrik Motoru / Jeneratör</FormLabel>
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
                    <FormLabel>
                      Eklemek İstediğiniz Notlar (Opsiyonel)
                    </FormLabel>
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
                  "w-full bg-green-600 text-white hover:bg-green-500 hover:text-white",
                  updateMaintenance.isError && "bg-red-600 hover:bg-red-500",
                )}
                type="submit"
                disabled={
                  updateMaintenance.isLoading || updateMaintenance.isError
                }
              >
                {!updateMaintenance.isLoading && !updateMaintenance.isError && (
                  <span className="ml-1 flex">
                    Bakımı Güncelle
                    <Save size={20} className="ml-1" />
                  </span>
                )}
                {updateMaintenance.isLoading && (
                  <Loader2 className="h-5 w-5 animate-spin" />
                )}
                {updateMaintenance.isError && (
                  <XCircle color="#fff" className="h-5 w-5" />
                )}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
