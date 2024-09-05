import citiesByCountry from "@/(common)/cities-by-country";
import ErrorComponent from "@/components/error";
import UpdateCompanyFallback from "@/components/fallback/update-company";
import { type MyPage } from "@/components/layouts/types";
import LogoUploadCrop from "@/components/logo-upload-cropper";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { roleAtom } from "@/utils/atom";
import { emitter } from "@/utils/emitter";
import { updateCompanySchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue } from "jotai";
import {
  Check,
  ChevronsUpDown,
  Fingerprint,
  Globe2,
  ImageIcon,
  Info,
  Loader2,
  Mail,
  Map,
  Phone,
  Save,
  ScanFace,
  Smartphone,
  Store,
  User,
  XCircle,
} from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

const EditCompany: MyPage = () => {
  const router = useRouter();

  const roleInfo = useAtomValue(roleAtom);

  if (roleInfo !== "OWNER") {
    void router.push("/dashboard");
  }

  const utils = api.useUtils();

  const [isLogoUploadOpen, setIsLogoUploadOpen] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { isLoading, isError, isLoadingError, error, data } =
    api.company.getCompanyDetails.useQuery(undefined, {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Firma bilgileri alınırken bir hata oluştu!",
          description: error.message,
        });
      },
    });

  const updateCompany = api.company.updateCompanyInfo.useMutation({
    onMutate: () => {
      emitter.publish("showNotification", "Firma bilgileri düzenleniyor...");
    },

    onSuccess: async () => {
      await utils.company.invalidate();

      toast({
        variant: "done",
        title: "Firma bilgileriniz başarıyla güncellendi!",
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Firma bilgileri güncellenirken bir hata oluştu!",
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof updateCompanySchema>>({
    resolver: zodResolver(updateCompanySchema),
    values: {
      owner: {
        firstName: data?.ownerCompany?.owner?.firstName ?? "",
        lastName: data?.ownerCompany?.owner?.lastName ?? "",
        phone: data?.ownerCompany?.owner?.phone ?? "",
      },
      company: {
        name: data?.ownerCompany?.name ?? "",
        companyType: data?.ownerCompany?.companyType ?? "LIMITED_COMPANY",
        taxId: data?.ownerCompany?.taxId ?? "",
        address: data?.ownerCompany?.address ?? "",
        city: data?.ownerCompany?.city ?? "",
        district: data?.ownerCompany?.district ?? "",
        phone: data?.ownerCompany?.phone ?? "",
        email: data?.ownerCompany?.email ?? "",
        logo: data?.ownerCompany?.logo ?? "",
      },
    },
  });

  const uploadImage = async (imageFile: File): Promise<void> => {
    try {
      setIsUploading(true);

      const getPresignedUrl = await fetch(
        `/api/aws/s3?fileName=${imageFile.name}&companyName=${data?.ownerCompany?.name}`,
        {
          method: "GET",
        },
      );

      if (getPresignedUrl.ok) {
        const response = (await getPresignedUrl.json()) as {
          url: string;
          desiredPart: string;
        };

        const { url, desiredPart } = response;

        const upload = await fetch(url, {
          method: "PUT",
          body: imageFile,
          headers: {
            "Content-Type": imageFile.type,
          },
        });

        if (upload.ok) {
          form.setValue("company.logo", desiredPart);
          setIsSuccess(true);
          toast({
            variant: "done",
            title: "Logo başarıyla yüklendi! Formu kaydetmeyi unutmayın.",
          });
        }
      }
    } catch (error) {
      setIsSuccess(false);
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Logo yüklenirken bir hata oluştu!",
          description: error.message,
        });
      }
    } finally {
      setIsUploading(false);
    }
  };

  async function onSubmit(data: z.infer<typeof updateCompanySchema>) {
    await updateCompany.mutateAsync(data);
  }

  if (isError || isLoadingError) {
    return (
      <ErrorComponent error={error.message} errorCode={error.data?.code} />
    );
  }

  return (
    <>
      <Head>
        <title>
          Firma Bilgileri Düzenle | {data?.ownerCompany?.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <div className="mt-16 rounded-lg p-0">
          <Card>
            <CardHeader>
              <CardTitle>Firma Bilgileri</CardTitle>
              <CardDescription>
                Aşağıda firma bilgilerinizi görebilir ve düzenleyebilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <div>
                <div>
                  {isLoading ? (
                    <UpdateCompanyFallback />
                  ) : (
                    <Card className="border-none">
                      <CardContent>
                        <Form {...form}>
                          <form
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onSubmit={form.handleSubmit(onSubmit)}
                            className={`space-y-8`}
                          >
                            <FormField
                              control={form.control}
                              name="owner.firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    <User size={22} className="mb-1 inline" />
                                    <Label className="ml-1">
                                      Firma Sahibinin Adı
                                    </Label>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="örn. Ahmet"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="owner.lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    <User size={22} className="mb-1 inline" />
                                    <Label className="ml-1">
                                      Firma Sahibinin Soyadı
                                    </Label>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="örn. Yılmaz"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="owner.phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    <Smartphone
                                      size={22}
                                      className="mb-1 inline"
                                    />
                                    <Label className="ml-1">
                                      Kişisel Telefon Numarası
                                    </Label>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="örn. +905551112233"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="company.name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    <Store size={22} className="mb-1 inline" />
                                    <Label className="ml-1">Firma İsmi</Label>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="örn. Yılmaz Asansör LTD"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="company.companyType"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel>
                                    <ScanFace
                                      size={22}
                                      className="mb-1 inline"
                                    />
                                    <Label className="ml-1">Firma Türü</Label>
                                  </FormLabel>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={(() => {
                                        if (
                                          data?.ownerCompany?.companyType ===
                                          "INDIVIDUAL_COMPANY"
                                        ) {
                                          return "INDIVIDUAL_COMPANY";
                                        }
                                        return "LIMITED_COMPANY";
                                      })()}
                                      className="flex flex-col space-y-1"
                                    >
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="INDIVIDUAL_COMPANY" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          Şahıs Şirketi
                                        </FormLabel>
                                      </FormItem>
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="LIMITED_COMPANY" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          Limited Şirketi
                                        </FormLabel>
                                      </FormItem>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="company.taxId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    <Fingerprint
                                      size={22}
                                      className="mb-1 inline"
                                    />
                                    <Label className="ml-1">
                                      {form.watch("company.companyType") ===
                                      "INDIVIDUAL_COMPANY"
                                        ? "TC Kimlik Numarası"
                                        : "Vergi Kimlik Numarası"}
                                    </Label>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="örn. 12345678901"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="company.phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    <Phone size={22} className="mb-1 inline" />
                                    <Label className="ml-1">
                                      Şirket Telefon Numarası
                                    </Label>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="örn. +902863160000"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="company.email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    <Mail size={22} className="mb-1 inline" />
                                    <Label className="ml-1">
                                      Firma E-posta Adresi
                                    </Label>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="örn. xyzasansor@asansor.com"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                  <FormDescription>
                                    Firma e-posta adresiniz yoksa kişisel
                                    e-posta adresinizi yazabilirsiniz.
                                  </FormDescription>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="company.logo"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    <ImageIcon
                                      size={22}
                                      className="mb-1 inline"
                                    />
                                    <Label className="ml-1">Firma Logosu</Label>
                                  </FormLabel>
                                  <FormControl>
                                    {form.getValues("company.logo") === "" ||
                                    form.getValues("company.logo") ===
                                      undefined ? (
                                      <Avatar className="my-4 h-[200px] w-[200px] hover:cursor-pointer">
                                        <AvatarFallback
                                          className="text-center text-lg text-gray-500 hover:opacity-60"
                                          onClick={() =>
                                            setIsLogoUploadOpen(true)
                                          }
                                        >
                                          Logo Yüklemek İçin Tıklayın
                                        </AvatarFallback>
                                      </Avatar>
                                    ) : (
                                      field.value &&
                                      form.getValues("company.logo") !== "" &&
                                      form.getValues("company.logo") !==
                                        undefined && (
                                        <Image
                                          className="my-4 rounded-lg border-2 p-4 hover:cursor-pointer hover:opacity-60"
                                          src={form.getValues("company.logo")!}
                                          width={400}
                                          height={400}
                                          alt="Company Logo"
                                          onClick={() =>
                                            setIsLogoUploadOpen(true)
                                          }
                                        />
                                      )
                                    )}
                                  </FormControl>
                                  <FormDescription className="hidden md:block lg:block">
                                    Şirketinizin logosu sol menüde, bakım
                                    kayıtlarında ve QR kod çıktılarında
                                    görünecektir.
                                    <span className="mt-2 block">
                                      <span className="font-semibold text-red-500">
                                        UYARI:
                                      </span>{" "}
                                      Logo yükleme işleminden sonra sayfanın en
                                      altındaki &quot;Güncelle&quot; butonuna
                                      basmanız gerekmektedir. Aksi takdirde logo
                                      yüklenmeyecektir.
                                    </span>
                                    <LogoUploadCrop
                                      value={data?.ownerCompany?.logo ?? ""}
                                      setImageFile={setImageFile}
                                      isOpen={isLogoUploadOpen}
                                      setIsOpen={setIsLogoUploadOpen}
                                      setValue={(value) => {
                                        form.setValue("company.logo", value);
                                      }}
                                    />
                                    {imageFile && (
                                      <div className="mt-4">
                                        <Button
                                          variant="link2"
                                          type="button"
                                          disabled={isUploading || isSuccess}
                                          className={cn(
                                            "mr-2",
                                            isUploading &&
                                              "animate-pulse opacity-60",
                                          )}
                                          onClick={() => {
                                            void (async () => {
                                              await uploadImage(imageFile);
                                            })();
                                          }}
                                        >
                                          {isUploading ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                          ) : isSuccess ? (
                                            <Check className="h-5 w-5" />
                                          ) : (
                                            "Yükle"
                                          )}
                                        </Button>
                                      </div>
                                    )}
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="company.city"
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
                                            !field.value &&
                                              "text-muted-foreground",
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
                                        <CommandEmpty>
                                          Şehir bulunamadı.
                                        </CommandEmpty>
                                        <CommandGroup className="max-h-64 overflow-y-auto">
                                          {citiesByCountry.Turkey.map(
                                            (city) => (
                                              <CommandItem
                                                value={city}
                                                key={city}
                                                onSelect={() => {
                                                  form.clearErrors(
                                                    "company.city",
                                                  );
                                                  form.setValue(
                                                    "company.city",
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
                                            ),
                                          )}
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
                              name="company.district"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    <Map size={22} className="mb-1 inline" />
                                    <Label className="ml-1">İlçe</Label>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="örn. Üsküdar"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="company.address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    <Info size={22} className="mb-1 inline" />
                                    <Label className="ml-1">Firma Adresi</Label>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Güneşli Mahallesi Ay Sokak Daire 24 Kat 3 "
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="submit"
                              className={cn(
                                "w-full bg-green-600 text-white hover:bg-green-500 hover:text-white sm:w-1/4",
                                updateCompany.isError &&
                                  "bg-red-600 hover:bg-red-500",
                              )}
                              disabled={
                                updateCompany.isLoading ||
                                updateCompany.isError ||
                                isUploading
                              }
                            >
                              {!updateCompany.isLoading &&
                                !updateCompany.isError &&
                                !isUploading && (
                                  <span className="ml-1 flex">
                                    Güncelle
                                    <Save size={20} className="ml-1" />
                                  </span>
                                )}
                              {updateCompany.isLoading && (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              )}
                              {updateCompany.isError && (
                                <XCircle color="#fff" className="h-5 w-5" />
                              )}
                            </Button>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EditCompany;
EditCompany.Layout = "Main";
