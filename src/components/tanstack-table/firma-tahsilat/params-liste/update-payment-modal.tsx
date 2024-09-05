import SkeletonForForms from "@/components/fallback/skeleton-for-forms";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { emitter } from "@/utils/emitter";
import { updatePaymentSchema } from "@/utils/schemas";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import {
  CalendarIcon,
  HandCoins,
  Loader2,
  Save,
  User,
  XCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

interface UpdatePaymentComponentProps {
  paymentId: string;
  paymentAmount: string;
  paymentDate: Date;
  paymentDescription: string | null;
}

export default function UpdatePaymentComponent({
  paymentId,
  paymentAmount,
  paymentDate,
  paymentDescription,
}: UpdatePaymentComponentProps) {
  const user = useUser();

  const utils = api.useUtils();

  const updatePayment = api.payment.updatePayment.useMutation({
    onMutate: () => {
      emitter.publish("showNotification", "Tahsilat kaydı güncelleniyor...");
    },

    onSuccess: async () => {
      await utils.payment.invalidate();

      toast({
        variant: "done",
        title: "Başarılı!",
        description: "Tahsilat kaydı güncellendi.",
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Tahsilat kaydı güncellenirken bir hata oluştu!",
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof updatePaymentSchema>>({
    resolver: zodResolver(updatePaymentSchema),
    defaultValues: {
      payment: {
        id: paymentId,
        amount: paymentAmount,
        date: paymentDate,
        additionalNote: paymentDescription ?? "",
      },
    },
  });

  function onSubmit(data: z.infer<typeof updatePaymentSchema>) {
    if (user) {
      updatePayment.mutate({
        payment: {
          id: paymentId,
          amount: data.payment.amount,
          date: data.payment.date,
          additionalNote: data.payment.additionalNote,
        },
      });
    }
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
        <div className="w-full overflow-y-auto">
          <Form {...form}>
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="payment.amount"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <HandCoins size={22} className="mb-1 inline" />
                      <Label className="ml-1">Tahsilat Miktarı</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. 400" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payment.date"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel className="block">
                      <CalendarIcon size={22} className="mb-1 inline" />
                      <Label className="ml-1">Tahsilat Tarihi</Label>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: tr })
                            ) : (
                              <span>Bir tarih seçiniz</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          locale={tr}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payment.additionalNote"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <User size={22} className="mb-1 inline" />
                      <Label className="ml-1">
                        Eklemek İstediğiniz Notlar (Opsiyonel)
                      </Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. elden nakit alındı" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={cn(
                  "w-full bg-green-600 text-white hover:bg-green-500 hover:text-white",
                  updatePayment.isError && "bg-red-600 hover:bg-red-500",
                )}
                disabled={updatePayment.isLoading || updatePayment.isError}
              >
                {updatePayment.isLoading && (
                  <Loader2 className="h-5 w-5 animate-spin" />
                )}
                {updatePayment.isError && (
                  <XCircle color="#fff" className="h-5 w-5" />
                )}
                {!updatePayment.isLoading && !updatePayment.isError && (
                  <span className="ml-1 flex">
                    DÜZENLE
                    <Save size={20} className="ml-1" />
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
