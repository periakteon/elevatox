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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { contactFormSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Check,
  Loader2,
  MailIcon,
  PhoneIcon,
  Send,
  XCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { type z } from "zod";
import { api } from "@/utils/api";
import { cn } from "@/lib/utils";
import Head from "next/head";
import { env } from "@/env.mjs";

const Contact: MyPage = () => {
  const [token, setToken] = useState<string | null>(null);

  const createMessage = api.company.sendContactMessage.useMutation({
    onSuccess: () => {
      toast({
        variant: "done",
        title: "Mesaj başarıyla gönderildi!",
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Mesaj gönderilemedi!",
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
  });

  function onSubmit(data: z.infer<typeof contactFormSchema>) {
    if (token) {
      createMessage.mutate({ captchaToken: token, ...data });
    } else {
      toast({
        variant: "destructive",
        title: "Lütfen reCAPTCHA doğrulamasını yapınız!",
      });
    }
  }

  function onChangeCapcha(value: string | null) {
    setToken(value);
  }

  return (
    <>
      <Head>
        <title>İletişim Formu - ElevatoX</title>
      </Head>
      <Card className="rounded-lgp-6 mx-auto my-10 max-w-lg space-y-6 shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold">İletişim</CardTitle>
          <CardDescription className="">
            Aşağıdaki formu doldurarak bize ulaşabilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ad</FormLabel>
                        <FormControl>
                          <Input placeholder="Adınızı giriniz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soyad</FormLabel>
                        <FormControl>
                          <Input placeholder="Soyadınızı giriniz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Telefon numaranızı giriniz"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-posta</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E-posta adresinizi giriniz"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mesaj</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Mesajınızı giriniz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <ReCAPTCHA
                sitekey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={onChangeCapcha}
              />
              <Button
                className={cn("w-full", {
                  "cursor-not-allowed bg-slate-400": createMessage.isSuccess,
                })}
                type="submit"
                disabled={createMessage.isLoading || createMessage.isSuccess}
              >
                {createMessage.isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : createMessage.isSuccess ? (
                  <Check />
                ) : createMessage.isError ? (
                  <XCircle className="mr-2 inline" />
                ) : (
                  <span>
                    {" "}
                    <Send className="mr-2 inline" /> Gönder
                  </span>
                )}
              </Button>
            </form>
          </Form>
          <div className="flex items-center space-x-2">
            <PhoneIcon className="h-4 w-4" />
            <p className="">+90 541 905 96 17</p>
          </div>
          <div className="flex items-center space-x-2">
            <MailIcon className="h-4 w-4" />
            <p className="">masumgokyuz@gmail.com</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Contact;
Contact.Layout = "LandingPage";
