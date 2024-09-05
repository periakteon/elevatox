import citiesByCountry from "@/(common)/cities-by-country";
import SkeletonForForms from "@/components/fallback/skeleton-for-forms";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import { updateBuildingResponsiblePersonSchema } from "@/utils/schemas";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlignHorizontalSpaceAround,
  Building,
  Check,
  ChevronsUpDown,
  Fingerprint,
  Globe2,
  Loader2,
  Map,
  MapPin,
  Save,
  Smartphone,
  User,
  XCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

interface UpdateBuildingResponsiblePersonComponentProps {
  id: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  area: string;
  buildingName: string;
  buildingFloor: string;
  citizenshipId: string;
  taxId: string;
}

export default function UpdateBuildingResponsiblePersonComponent({
  props,
}: {
  props: UpdateBuildingResponsiblePersonComponentProps;
}) {
  const user = useUser();

  const utils = api.useUtils();

  const editPerson =
    api.buildingResponsiblePerson.editBuildingResponsiblePerson.useMutation({
      onMutate: () => {
        emitter.publish("showNotification", "Bina sorumlusu düzenleniyor...");
      },

      onSuccess: async () => {
        await utils.buildingResponsiblePerson.invalidate();

        toast({
          variant: "done",
          title: "Başarılı!",
          description: "Bina sorumlusu güncellendi.",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Bina sorumlusu güncellenirken hata oluştu!",
          description: error.message,
        });
      },
    });

  const form = useForm<z.infer<typeof updateBuildingResponsiblePersonSchema>>({
    resolver: zodResolver(updateBuildingResponsiblePersonSchema),
    values: {
      person: {
        id: props.id,
        firstName: props.firstName,
        lastName: props.lastName,
        phone: props.phone,
        area: props.area,
        buildingFloor: props.buildingFloor,
        buildingName: props.buildingName,
        city: props.city,
        district: props.district,
        tcNo: props.citizenshipId,
        vergiKimlikNo: props.taxId,
        address: props.address,
      },
    },
  });

  function onSubmit(
    data: z.infer<typeof updateBuildingResponsiblePersonSchema>,
  ) {
    if (user) {
      editPerson.mutate(data);
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
              <FormField
                control={form.control}
                name="person.firstName"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <User size={22} className="mb-1 inline" />
                      <Label className="ml-1">Bina Sorumlusu Ad</Label>
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
                name="person.lastName"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <User size={22} className="mb-1 inline" />
                      <Label className="ml-1">Bina Sorumlusu Soyad</Label>
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
                name="person.phone"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <Smartphone size={22} className="mb-1 inline" />
                      <Label className="ml-1">Telefon Numarası</Label>
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
                name="person.tcNo"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <Fingerprint size={22} className="mb-1 inline" />
                      <Label className="ml-1">TC No</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. 10629861925" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="person.vergiKimlikNo"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <Fingerprint size={22} className="mb-1 inline" />
                      <Label className="ml-1">Vergi Kimlik No</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. 10629861925" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="person.city"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    {" "}
                    <FormLabel>
                      <Globe2 size={22} className="mb-1 inline" />
                      <Label className="ml-1">Şehir</Label>
                    </FormLabel>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "ml-2 w-[300px] justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? citiesByCountry.Turkey.find(
                                  (city) =>
                                    city.toLowerCase() ===
                                    field.value.toLowerCase(),
                                )
                              : "Şehir seçiniz"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="z-[99] w-[300px] p-0">
                        <Command>
                          <CommandInput placeholder="Şehir ara..." />
                          <CommandEmpty>Şehir bulunamadı.</CommandEmpty>
                          <CommandGroup className="max-h-64 overflow-y-auto">
                            {citiesByCountry.Turkey.map((city) => (
                              <CommandItem
                                value={city}
                                key={city}
                                onSelect={() => {
                                  form.clearErrors("person.city");
                                  form.setValue("person.city", city);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    city === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {city}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="person.district"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <Map size={22} className="mb-1 inline" />
                      <Label className="ml-1">İlçe</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. Ümraniye" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="person.area"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <Map size={22} className="mb-1 inline" />
                      <Label className="ml-1">Bölge</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. Şirintepe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="person.buildingName"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <Building size={22} className="mb-1 inline" />
                      <Label className="ml-1">Bina İsmi</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. Yılmaz Apartmanı" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="person.address"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <MapPin size={22} className="mb-1 inline" />
                      <Label className="ml-1">Adres</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="örn. X mahallesi Z sokak"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="person.buildingFloor"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <AlignHorizontalSpaceAround
                        size={22}
                        className="mb-1 inline"
                      />
                      <Label className="ml-1">Bina Durak Sayısı</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. 8" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className={cn(
                  "w-full bg-green-600 text-white hover:bg-green-500 hover:text-white",
                  editPerson.isError && "bg-red-600 hover:bg-red-500",
                )}
                disabled={editPerson.isLoading || editPerson.isError}
              >
                {!editPerson.isLoading && !editPerson.isError && (
                  <span className="ml-1 flex">
                    Güncelle
                    <Save size={20} className="ml-1" />
                  </span>
                )}
                {editPerson.isLoading && (
                  <Loader2 className="h-5 w-5 animate-spin" />
                )}
                {editPerson.isError && (
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
