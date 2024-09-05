import citiesByCountry from "@/(common)/cities-by-country";
import { type MyPage } from "@/components/layouts/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  FormDescription,
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
import { companyInfoAtom, roleAtom } from "@/utils/atom";
import { emitter } from "@/utils/emitter";
import { addBuildingResponsiblePersonSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue } from "jotai";
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
  Phone,
  PlusCircle,
  Save,
  User,
  XCircle,
} from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

const AddBuildingResponsiblePerson: MyPage = () => {
  const router = useRouter();

  const companyInfo = useAtomValue(companyInfoAtom);
  const roleInfo = useAtomValue(roleAtom);

  if (roleInfo === "FIELD_STAFF") {
    void router.push("/dashboard");
  }

  const { focus } = router.query;

  const [showAddPersonSection, setShowAddPersonSection] =
    useState<boolean>(false);

  const utils = api.useUtils();

  const addPerson =
    api.buildingResponsiblePerson.addBuildingResponsiblePerson.useMutation({
      onMutate: () => {
        emitter.publish("showNotification", "Bina sorumlusu ekleniyor...");
      },

      onSuccess: async () => {
        await utils.buildingResponsiblePerson.invalidate();

        toast({
          variant: "done",
          title: "Bina sorumlusu başarıyla eklendi!",
          description: "Yönlendiriliyorsunuz...",
        });

        setTimeout(() => {
          void router.push("/bina-sorumlulari");
        }, 2000);
      },

      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Bina sorumlusu eklenirken bir hata oluştu!",
          description: error.message,
        });
      },
    });

  const addPersonForm = useForm<
    z.infer<typeof addBuildingResponsiblePersonSchema>
  >({
    resolver: zodResolver(addBuildingResponsiblePersonSchema),
  });

  function addPersonSubmit(
    data: z.infer<typeof addBuildingResponsiblePersonSchema>,
  ) {
    addPerson.mutate(data);
  }

  useEffect(() => {
    if (focus === "true") {
      setShowAddPersonSection(true);
    }
  }, [focus]);

  return (
    <>
      <Head>
        <title>
          Bina Sorumlusu Ekle | {companyInfo?.companyInfo.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Bina Sorumlusu Ekle</CardTitle>
            <CardDescription>
              Aşağıdaki formu doldurarak yeni bir bina sorumlusu
              ekleyebilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <>
              <Button
                type="button"
                className={`mr-2 inline-flex items-center rounded-lg ${
                  !showAddPersonSection
                    ? "bg-green-600 hover:bg-green-500 focus:ring-green-200 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
                    : "bg-red-600 hover:bg-red-500 focus:ring-red-200 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-800"
                } px-3 py-1.5 text-center text-xs font-medium text-white focus:outline-none focus:ring-4`}
                onClick={() => setShowAddPersonSection(!showAddPersonSection)}
              >
                {!showAddPersonSection ? (
                  <PlusCircle className="mr-2" />
                ) : (
                  <PlusCircle className="mr-2 rotate-45 transform" />
                )}
                Bina Sorumlusu Ekle
              </Button>
              {showAddPersonSection && (
                <Form {...addPersonForm}>
                  <form
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onSubmit={addPersonForm.handleSubmit(addPersonSubmit)}
                    className="w-3/3 space-y-6"
                  >
                    <FormField
                      control={addPersonForm.control}
                      name="person.firstName"
                      render={({ field }) => (
                        <FormItem className="mt-4 w-full">
                          <FormLabel>
                            <User size={22} className="mb-1 mr-1 inline" />
                            Binadan Sorumlu Kişinin Adı
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="örn. Ahmet" {...field} />
                          </FormControl>
                          <FormDescription>
                            Binadan sorumlu kişinin adını giriniz.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addPersonForm.control}
                      name="person.lastName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            <User size={22} className="mb-1 mr-1 inline" />{" "}
                            Binadan Sorumlu Kişinin Soyadı
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="örn. Yılmaz" {...field} />
                          </FormControl>
                          <FormDescription>
                            Binadan sorumlu kişinin soyadını giriniz.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addPersonForm.control}
                      name="person.tcNo"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            <Fingerprint size={22} className="mb-1 inline" />{" "}
                            Binadan Sorumlu Kişinin TC Kimlik Numarası
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="örn. +905123456789"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Binadan sorumlu kişinin TC kimlik numarasını
                            giriniz.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addPersonForm.control}
                      name="person.vergiKimlikNo"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            <Fingerprint size={22} className="mb-1 inline" />{" "}
                            Binadan Sorumlu Kişinin Vergi Kimlik Numarası
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="örn. +905123456789"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Binadan sorumlu kişinin vergi kimlik numarasını
                            giriniz. (Yoksa TC kimlik numarasını giriniz.)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addPersonForm.control}
                      name="person.phone"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            <Phone size={22} className="mb-1 inline" /> Binadan
                            Sorumlu Kişinin Telefon Numarası
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="örn. +905123456789"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Binadan sorumlu kişinin telefon numarasını giriniz.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addPersonForm.control}
                      name="person.city"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>
                            <Globe2 size={22} className="mb-1 inline" />
                            <Label className="ml-1">Şehir</Label>
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-[300px] justify-between",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value
                                    ? citiesByCountry.Turkey.find(
                                        (city) =>
                                          city.toLowerCase() ===
                                          field.value?.toLowerCase(),
                                      )
                                    : "Şehir seçiniz"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="z-10 w-[300px] p-0">
                              <Command>
                                <CommandInput placeholder="Şehir ara..." />
                                <CommandEmpty>Şehir bulunamadı.</CommandEmpty>
                                <CommandGroup className="max-h-64 overflow-y-auto">
                                  {citiesByCountry.Turkey.map((city) => (
                                    <CommandItem
                                      value={city}
                                      key={city}
                                      onSelect={() => {
                                        addPersonForm.clearErrors(
                                          "person.city",
                                        );
                                        addPersonForm.setValue(
                                          "person.city",
                                          city,
                                        );
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
                      control={addPersonForm.control}
                      name="person.district"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            <Map size={22} className="mb-1 mr-1 inline" />{" "}
                            Binanın Bulunduğu İlçe
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="örn. Biga" {...field} />
                          </FormControl>
                          <FormDescription>
                            Binanın bulunduğu ilçeyi giriniz.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addPersonForm.control}
                      name="person.area"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            <Map size={22} className="mb-1 mr-1 inline" />{" "}
                            Binanın Bulunduğu Bölge
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="örn. Şirintepe" {...field} />
                          </FormControl>
                          <FormDescription>
                            Binanın bulunduğu bölgeyi giriniz.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addPersonForm.control}
                      name="person.address"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            <MapPin size={22} className="mb-1 inline" /> Binanın
                            Adresi
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="örn. A Mahallesi, B Sokak, No: 1"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Binadan sorumlu kişinin/asansörün adresini giriniz.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addPersonForm.control}
                      name="person.buildingFloor"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            <AlignHorizontalSpaceAround
                              size={22}
                              className="mb-1 inline"
                            />{" "}
                            Bina Durak Sayısı
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="örn. 8" {...field} />
                          </FormControl>
                          <FormDescription>Bina durak sayısı.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addPersonForm.control}
                      name="person.buildingName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            <Building size={22} className="mb-1 inline" /> Bina
                            İsmi
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="örn. Yeşim Apartmanı"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Binanın ismini giriniz.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className={cn(
                        "w-full bg-green-600 text-white hover:bg-green-500 hover:text-white sm:w-1/4",
                        addPerson.isError &&
                          "cursor-not-allowed bg-red-600 hover:bg-red-500",
                        addPerson.isSuccess && "cursor-not-allowed",
                      )}
                      disabled={
                        addPerson.isLoading ||
                        addPerson.isSuccess ||
                        addPerson.isError
                      }
                    >
                      {!addPerson.isLoading &&
                        !addPerson.isSuccess &&
                        !addPerson.isError && (
                          <span className="ml-1 flex">
                            <span className="mt-1">Bina Sorumlusu Ekle</span>
                            <Save className="ml-1" />
                          </span>
                        )}
                      {addPerson.isLoading && (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      )}
                      {addPerson.isSuccess && (
                        <Check className="mr-2 h-5 w-5" />
                      )}
                      {addPerson.isError && (
                        <XCircle color="#fff" className="h-5 w-5" />
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AddBuildingResponsiblePerson;
AddBuildingResponsiblePerson.Layout = "Main";
