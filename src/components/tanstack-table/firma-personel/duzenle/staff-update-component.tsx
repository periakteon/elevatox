import SkeletonForForms from "@/components/fallback/skeleton-for-forms";
import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { emitter } from "@/utils/emitter";
import { updateStaffSchema } from "@/utils/schemas";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, Smartphone, User, XCircle } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { type z } from "zod";

interface UpdateStaffComponentProps {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "OWNER" | "FIELD_STAFF" | "OFFICE_STAFF";
  isActive: boolean;
  avatar: string | undefined;
}

export default function UpdateStaffComponent({
  userId,
  avatar,
  firstName,
  lastName,
  phone,
  role,
  isActive,
}: UpdateStaffComponentProps) {
  const user = useUser();

  const utils = api.useUtils();

  const updateUser = api.company.updateStaff.useMutation({
    onMutate: () => {
      emitter.publish("showNotification", "Personel düzenleniyor...");
    },

    onSuccess: async () => {
      await utils.company.invalidate();

      toast({
        variant: "done",
        title: "Başarılı!",
        description: "Personel güncellendi.",
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Personel güncellenirken hata oluştu!",
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof updateStaffSchema>>({
    resolver: zodResolver(updateStaffSchema),
    values: {
      userId,
      avatar,
      firstName,
      lastName,
      phone,
      role,
      isActive,
    },
  });

  function onSubmit(data: z.infer<typeof updateStaffSchema>) {
    if (user) {
      updateUser.mutate(data);
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
        <div className="h-[450px] w-full overflow-y-auto">
          <Form {...form}>
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <div className="mt-2 flex justify-center">
                <Image
                  src={avatar!}
                  alt="Personel Fotoğrafı"
                  width={200}
                  height={200}
                  className="flex h-64 max-h-96 w-64 max-w-md justify-center rounded-full"
                />
              </div>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <User size={22} className="mb-1 inline" />
                      <Label className="ml-1">Ad</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. Ahmet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <User size={22} className="mb-1 inline" />
                      <Label className="ml-1">Soyad</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. Yılmaz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <Smartphone size={22} className="mb-1 inline" />
                      <Label className="ml-1">Kişisel Telefon Numarası</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. +905551112233" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="mx-2 space-y-3">
                    <FormLabel>Personel Türü</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem disabled value="OWNER" />
                            </FormControl>
                            <FormLabel className="cursor-not-allowed font-normal">
                              Patron
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="OFFICE_STAFF" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Ofis Personeli
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="FIELD_STAFF" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Saha Personeli
                            </FormLabel>
                          </FormItem>
                        </>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="">
                      <FormLabel>
                        <span
                          className={`${
                            field.value ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {field.value ? "AKTİF" : "PASİF"}
                        </span>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={cn(
                  "w-full bg-green-600 text-white hover:bg-green-500 hover:text-white",
                  updateUser.isError && "bg-red-600 hover:bg-red-500",
                )}
                disabled={updateUser.isLoading || updateUser.isError}
              >
                {updateUser.isLoading && (
                  <Loader2 className="h-5 w-5 animate-spin" />
                )}
                {updateUser.isError && (
                  <XCircle color="#fff" className="h-5 w-5" />
                )}
                {!updateUser.isLoading && !updateUser.isError && (
                  <span className="ml-1 flex">
                    Güncelle
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
