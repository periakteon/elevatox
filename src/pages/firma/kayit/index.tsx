/* eslint-disable @typescript-eslint/no-misused-promises */
import { type MyPage } from "@/components/layouts/types";
import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Check,
  ChevronsUpDown,
  Fingerprint,
  Globe2,
  Info,
  Loader2,
  Map,
  ScanFace,
  Phone,
  Send,
  Smartphone,
  Store,
  User,
  XCircle,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import citiesByCountry from "@/(common)/cities-by-country";
import { SignUpButton, useUser } from "@clerk/nextjs";
import SkeletonForForms from "@/components/fallback/skeleton-for-forms";
import { api } from "@/utils/api";
import { newCompanySchema } from "@/utils/schemas";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import Image from "next/image";
import { emitter } from "@/utils/emitter";
import Head from "next/head";

const CreateCompany: MyPage = () => {
  const router = useRouter();
  const url = router.asPath;

  const user = useUser();
  const email = user.user?.primaryEmailAddress?.emailAddress;
  const avatar = user.user?.imageUrl;

  const { id: token } = router.query;

  const companyMutation = api.company.initialCompanySetup.useMutation({
    onMutate: () => {
      emitter.publish("showNotification", "Firma oluşturuluyor...");
    },

    onSuccess: () => {
      toast({
        variant: "done",
        title: "Firma oluşturuldu!",
        description: "Firma sayfanıza yönlendiriliyorsunuz...",
      });
      setTimeout(() => {
        void router.push("/dashboard");
      }, 2000);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Firma oluşturulamadı!",
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof newCompanySchema>>({
    resolver: zodResolver(newCompanySchema),
    values: {
      token: token as string,
      userInfo: {
        email: email!,
        avatar: avatar!,
        firstName: "",
        lastName: "",
        phone: "",
      },
      companyInfo: {
        address: "",
        city: "",
        district: "",
        email: "",
        logo: "",
        name: "",
        phone: "",
        companyType: "LIMITED_COMPANY",
        taxId: "",
      },
    },
  });

  function onSubmit(data: z.infer<typeof newCompanySchema>) {
    if (email && token && avatar) {
      companyMutation.mutate({
        companyInfo: {
          ...data.companyInfo,
        },
        userInfo: {
          ...data.userInfo,
          email,
          avatar,
        },
        token: token as string,
      });
    }
  }

  if (user.user === undefined || !user.isLoaded) {
    return (
      <div className="mx-auto mt-10 w-2/6 items-center justify-center">
        <SkeletonForForms />
      </div>
    );
  }

  if (!user.user && token) {
    return (
      <div className="mx-auto mt-32 flex w-full items-center justify-center">
        <div className="max-w-sm rounded-lg border border-slate-200 bg-white shadow dark:border-slate-700 dark:bg-slate-800">
          <Image
            className="h-full w-full rounded-t-lg"
            width={250}
            height={150}
            src="/logo-light.png"
            alt="Logo"
          />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Firma Kayıt
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Firma kaydına devam etmek için lütfen aşağıdaki butona tıklayarak
              kayıt olun ve giriş yapın.
            </p>

            <SignUpButton mode="modal" forceRedirectUrl={url}>
              <Button variant="link2">
                Kayıt Ol
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </SignUpButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Firma Kayıt Formu | ElevatoX</title>
      </Head>
      {token && (
        <div className="mt-72 flex h-screen w-full flex-col items-center justify-center sm:mt-[375px]">
          <div className="flex w-full flex-col items-center justify-center">
            <Card className="my-10 w-2/3 md:w-2/4 lg:w-1/3">
              <CardHeader>
                <CardTitle className="text-center">Şirket Oluştur</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="userInfo.firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <User size={22} className="mb-1 inline" />
                            <Label className="ml-1">
                              Firma Yöneticisinin Adı
                            </Label>
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
                      name="userInfo.lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <User size={22} className="mb-1 inline" />
                            <Label className="ml-1">
                              Firma Yöneticisinin Soyadı
                            </Label>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="örn. Yılmaz" {...field} />
                          </FormControl>
                          <FormMessage />{" "}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyInfo.name"
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
                      name="companyInfo.companyType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            <ScanFace size={22} className="mb-1 inline" />
                            <Label className="ml-1">Firma Türü</Label>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
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
                      name="companyInfo.taxId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <Fingerprint size={22} className="mb-1 inline" />
                            <Label className="ml-1">
                              {form.watch("companyInfo.companyType") ===
                              "INDIVIDUAL_COMPANY"
                                ? "TC Kimlik Numarası"
                                : "Vergi Kimlik Numarası"}
                            </Label>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="örn. 12345678901" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyInfo.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <Store size={22} className="mb-1 inline" />
                            <Label className="ml-1">Firma E-posta Adresi</Label>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="örn. xyz@asansor.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Yoksa kendi e-posta adresinizi girebilirsiniz.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="userInfo.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <Smartphone size={22} className="mb-1 inline" />
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
                      name="companyInfo.phone"
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
                          <FormDescription>
                            Yoksa kendi telefon numaranızı girebilirsiniz.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyInfo.address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <Info size={22} className="mb-1 inline" />
                            <Label className="ml-1">Adres</Label>
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
                    <FormField
                      control={form.control}
                      name="companyInfo.city"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          {" "}
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
                                    "w-full justify-between",
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
                                        form.clearErrors("companyInfo.city");
                                        form.setValue("companyInfo.city", city);
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
                      name="companyInfo.district"
                      render={({ field }) => (
                        <FormItem>
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
                    <Button
                      type="submit"
                      className={cn(
                        "w-full bg-green-600 text-white hover:bg-green-500 hover:text-white sm:w-1/4 md:w-1/3 lg:w-1/2",
                        companyMutation.isError &&
                          "bg-red-600 hover:bg-red-500",
                      )}
                      disabled={
                        companyMutation.isLoading ||
                        companyMutation.isSuccess ||
                        companyMutation.isError
                      }
                    >
                      {!companyMutation.isLoading &&
                        !companyMutation.isSuccess &&
                        !companyMutation.isError && (
                          <span className="ml-1 flex">
                            Kayıt Ol
                            <Send size={20} className="ml-1" />
                          </span>
                        )}
                      {companyMutation.isLoading && (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      )}
                      {companyMutation.isSuccess && (
                        <Check className="h-5 w-5" />
                      )}
                      {companyMutation.isError && (
                        <XCircle color="#fff" className="h-5 w-5" />
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      {!token && (
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <Card className="w-2/3 md:w-2/4 lg:w-1/3">
            <CardHeader>
              <CardTitle className="text-center">Şirket Oluştur</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-center">
                    Şirket oluşturmak için lütfen bize ulaşın.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      void router.push("/iletisim");
                    }}
                  >
                    İletişim
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CreateCompany;
CreateCompany.Layout = "LandingPage";
