/* eslint-disable @typescript-eslint/no-misused-promises */
import { type MyPage } from "@/components/layouts/types";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Check,
  Loader2,
  Send,
  Smartphone,
  User,
  XCircle,
} from "lucide-react";
import { Label } from "@/components/ui/label";

import { SignUpButton, useUser } from "@clerk/nextjs";
import SkeletonForForms from "@/components/fallback/skeleton-for-forms";
import { api } from "@/utils/api";
import { createStaffSchema } from "@/utils/schemas";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import Head from "next/head";
import { cn } from "@/lib/utils";

const CreateStaff: MyPage = () => {
  const router = useRouter();
  const url = router.asPath;

  const utils = api.useUtils();

  const { user } = useUser();

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const userId = user?.id;
  const avatar = user?.imageUrl;

  const { id: token } = router.query;

  const staffMutation = api.company.createStaff.useMutation({
    onSuccess: async () => {
      await utils.invalidate();

      toast({
        variant: "done",
        title: "Başarılı!",
        description: "Personel oluşturuldu. Yönlendiriliyorsunuz...",
      });

      setTimeout(() => {
        void router.push("/dashboard");
      }, 2000);
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Personel oluşturulamadı!",
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof createStaffSchema>>({
    resolver: zodResolver(createStaffSchema),
    values: {
      userId: userId!,
      email: userEmail!,
      firstName: "",
      lastName: "",
      avatar: avatar,
      companyId: "",
      phone: "",
      role: "OFFICE_STAFF",
      magicToken: token as string,
    },
  });

  function onSubmit(data: z.infer<typeof createStaffSchema>) {
    if (userId && userEmail && token && avatar) {
      data.userId = userId;
      data.email = userEmail;
      data.avatar = avatar;
      data.companyId = token as string;
      staffMutation.mutate(data);
    }
  }

  if (user === undefined) {
    return (
      <>
        <Head>
          <title>Personel Kayıt Formu - ElevatoX</title>
        </Head>
        <div className="mx-auto mt-10 w-2/6 items-center justify-center">
          <SkeletonForForms />
        </div>
      </>
    );
  }

  if (!user && token) {
    return (
      <>
        <Head>
          <title>Personel Kayıt Formu - ElevatoX</title>
        </Head>
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
                Personel Kayıt
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Personel kaydına devam etmek için lütfen aşağıdaki butona
                tıklayarak kayıt olun ve giriş yapın.
              </p>

              <SignUpButton
                mode="modal"
                forceRedirectUrl={url}
                signInForceRedirectUrl={url}
              >
                <Button variant="link2">
                  Kayıt Ol
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Personel Kayıt Formu - ElevatoX</title>
      </Head>
      {user && token && (
        <div className="-mt-36 flex h-screen w-full flex-col items-center justify-center sm:-mt-10">
          <div className="flex w-full flex-col items-center justify-center">
            <Card className="my-10 w-2/3 md:w-2/4 lg:w-1/3">
              <CardHeader>
                <CardTitle className="text-center">Personel Oluştur</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
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
                        <FormItem>
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
                      name="role"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Personel Türü</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
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
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className={cn(
                        "w-full bg-green-600 text-white hover:bg-green-500 hover:text-white sm:w-1/4 md:w-1/3",
                        staffMutation.isError && "bg-red-600 hover:bg-red-500",
                      )}
                      disabled={
                        staffMutation.isLoading ||
                        staffMutation.isSuccess ||
                        staffMutation.isError
                      }
                    >
                      {!staffMutation.isLoading &&
                        !staffMutation.isSuccess &&
                        !staffMutation.isError && (
                          <span className="ml-1 flex">
                            Kayıt Ol
                            <Send size={20} className="ml-1 h-5 w-5" />
                          </span>
                        )}
                      {staffMutation.isLoading && (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      )}
                      {staffMutation.isSuccess && <Check className="h-5 w-5" />}
                      {staffMutation.isError && (
                        <XCircle color="#ff0000" className="h-5 w-5" />
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
              <CardTitle className="text-center">Personel Oluştur</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-center">
                    Personel kaydı oluşturmak için lütfen yöneticinizle
                    iletişime geçin.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CreateStaff;
CreateStaff.Layout = "LandingPage";
