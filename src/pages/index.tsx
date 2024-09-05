import { useInView } from "framer-motion";
import { type MyPage } from "@/components/layouts/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Link as SmoothScroll } from "react-scroll";
import { useRef } from "react";
import ModeToggle from "@/components/mode-toggle";
import { useRouter } from "next/router";

const Home: MyPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <Section>
            <section className="w-full py-6 sm:py-12 md:py-12 lg:py-12 xl:py-12">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                  <Section>
                    <Image
                      alt="Hero"
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                      height="550"
                      src="/hero1.png"
                      width="550"
                    />
                  </Section>
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <Section>
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                          Modern Asansör Yazılımları
                        </h1>
                      </Section>
                      <Section>
                        <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                          Modern web teknolojileriyle entegre edilmiş, güvenilir
                          ve özelleştirilebilir asansör takip hizmetimizle
                          asansörlerinizi kontrol altında tutun. Bakımları,
                          güvenliği ve performansı tek bir çatı altında yönetin.
                        </p>
                      </Section>
                    </div>
                    <Section>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <Button
                          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
                          onClick={() => void router.push("/iletisim")}
                        >
                          İletişime Geçin
                        </Button>
                      </div>
                    </Section>
                  </div>
                </div>
              </div>
            </section>
          </Section>
          <Section>
            <section
              className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32"
              id="features"
            >
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <Section>
                      <Badge className="inline-block rounded-lg px-3 py-1 text-sm">
                        Özellikler
                      </Badge>
                    </Section>
                    <Section>
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                        Daha modern, daha erişilebilir.
                      </h2>
                    </Section>
                    <Section>
                      <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Geleneksel bilgisayar yazılımlarının aksine, web tabanlı
                        bir yazılım olan{" "}
                        <span className="font-bold">ElevatoX</span> ile
                        asansörlerinizi, personellerinizi ve bakımlarınızı her
                        yerden takip edin. Kullanıcı dostu arayüzü sayesinde
                        asansörlerinizi ve bakımlarınızı kolayca yönetin.
                      </p>
                    </Section>
                  </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                  <Section>
                    <Image
                      alt="Image"
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                      height="310"
                      src="/hero2.png"
                      width="550"
                    />
                  </Section>
                  <div className="flex flex-col justify-center space-y-4">
                    <ul className="grid gap-6">
                      <Section>
                        <li>
                          <div className="grid gap-1">
                            <h3 className="text-xl font-bold">Rol Sistemi</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                              Kullanıcılarınızı yönetin ve yetkilendirin.
                              Kullanıcı ve yetki yönetimini kolayca yapın.
                            </p>
                          </div>
                        </li>
                      </Section>
                      <Section>
                        <li>
                          <div className="grid gap-1">
                            <h3 className="text-xl font-bold">QR Kod</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                              Asansörlerinizi QR kod ile takip edin. Bakımlarını
                              kolayca yönetin.
                            </p>
                          </div>
                        </li>
                      </Section>
                      <Section>
                        <li>
                          <div className="grid gap-1">
                            <h3 className="text-xl font-bold">Erişilebilir</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                              Web tabanlı yazılımımız sayesinde asansörlerinizi
                              ve bakımlarınızı her yerden takip edin.
                            </p>
                          </div>
                        </li>
                      </Section>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </Section>
          <Section>
            <section className="mb-10 w-full py-12 md:py-24 lg:py-32">
              <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                <div className="space-y-2">
                  <Section>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                      Asansör Bakımlarınızı Profesyonel Ellere Bırakın.
                    </h2>
                  </Section>
                  <Section>
                    <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Deneyimli ekibimiz düzenli bakım ve güncellemelerle
                      asansörlerinizin ve bakım takiplerinizin sorunsuz
                      çalışmasını sağlar. Siz işinize odaklanın, asansörlerinizi
                      bize bırakın. Hizmet kalitemizi keşfedin.
                    </p>
                  </Section>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row lg:justify-end" />
              </div>
            </section>
          </Section>
        </main>
        <Section>
          <section
            className="w-full bg-gray-100 py-12 dark:bg-slate-900 md:py-24 lg:py-32"
            id="pricing"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <Section>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Fiyatlandırma
                  </h2>
                </Section>
                <Section>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    İhtiyacınız olan planı seçin ve hemen başlayın. Ücretsiz
                    deneme süresi için bizimle iletişime geçin.
                  </p>
                </Section>
              </div>
              {/* EĞER 2. PLANI EKLEMEK İSTERSEK AŞAĞIDAKİ GRID OLACAK */}
              {/* <div className="mt-12 grid gap-6 lg:grid-cols-2"> */}
              <div className="md:w1/2 mx-auto mt-12 w-full lg:w-1/2 xl:w-1/2">
                <Section>
                  <Card className="flex flex-col rounded-md bg-white p-6 shadow-md dark:bg-slate-800">
                    <CardHeader className="mb-4 flex justify-center text-2xl font-semibold">
                      Aylık
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="mb-6 flex items-center space-x-3">
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <p className="text-gray-500 dark:text-gray-400">
                            Ayda bir ödeme yapın.
                          </p>
                        </div>
                        <div className="mb-6 flex items-center space-x-3">
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <p className="text-gray-500 dark:text-gray-400">
                            Üç farklı rol sistemi:{" "}
                            <span className="font-semibold">Patron</span>,{" "}
                            <span className="font-semibold">
                              Ofis Personeli
                            </span>{" "}
                            ve{" "}
                            <span className="font-semibold">
                              Saha Personeli
                            </span>
                            .
                          </p>
                        </div>
                        <div className="mb-6 flex items-center space-x-3">
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <p className="text-gray-500 dark:text-gray-400">
                            Sınırsız personel kaydı.
                          </p>
                        </div>
                        <div className="mb-6 flex items-center space-x-3">
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <p className="text-gray-500 dark:text-gray-400">
                            Sınırsız asansör kaydı.
                          </p>
                        </div>
                        <div className="mb-6 flex items-center space-x-3">
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <p className="text-gray-500 dark:text-gray-400">
                            Sınırsız bakım kaydı.
                          </p>
                        </div>
                        <h3 className="mb-3 text-center text-4xl font-bold">
                          499 ₺
                          <span className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                            /ay
                          </span>
                        </h3>
                      </div>
                      <Button
                        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
                        onClick={() => void router.push("/iletisim")}
                      >
                        İletişime Geçin
                      </Button>
                    </CardContent>
                  </Card>
                </Section>
                {/* <Section>
                  <Card className="flex flex-col rounded-md bg-white p-6 shadow-md dark:bg-slate-800">
                    <CardHeader className="mb-4 flex justify-center text-2xl font-semibold">
                      Yıllık
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="mb-6 flex items-center space-x-3">
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <p className="text-gray-500 dark:text-gray-400">
                            Yıllık ödeme yapın, kâra geçin.
                          </p>
                        </div>
                        <div className="mb-6 flex items-center space-x-3">
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <p className="text-gray-500 dark:text-gray-400">
                            Üç farklı rol sistemi:{" "}
                            <span className="font-semibold">Patron</span>,{" "}
                            <span className="font-semibold">
                              Ofis Personeli
                            </span>{" "}
                            ve{" "}
                            <span className="font-semibold">
                              Saha Personeli
                            </span>
                            .
                          </p>
                        </div>
                        <div className="mb-6 flex items-center space-x-3">
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <p className="text-gray-500 dark:text-gray-400">
                            Sınırsız personel kaydı.
                          </p>
                        </div>
                        <div className="mb-6 flex items-center space-x-3">
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <p className="text-gray-500 dark:text-gray-400">
                            Sınırsız asansör kaydı.
                          </p>
                        </div>
                        <div className="mb-6 flex items-center space-x-3">
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <p className="text-gray-500 dark:text-gray-400">
                            Sınırsız bakım kaydı.
                          </p>
                        </div>
                        <h3 className="mb-3 text-center text-4xl font-bold">
                          899 ₺
                          <span className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                            /ay
                          </span>
                        </h3>
                      </div>
                      <Button
                        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
                        onClick={() => void router.push("/iletisim")}
                      >
                        İletişime Geçin
                      </Button>
                    </CardContent>
                  </Card>
                </Section> */}
              </div>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-7 sm:space-y-0 md:-mb-20 lg:-mb-20">
              <Section>
                <Link
                  href="#"
                  className="flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto sm:justify-center"
                >
                  <svg
                    className="mr-3 h-7 w-7"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="apple"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                    ></path>
                  </svg>
                  <div className="text-left">
                    <div className="mb-1 text-xs">Çok yakında</div>
                    <div className="-mt-1 font-sans text-sm font-semibold">
                      App Store
                    </div>
                  </div>
                </Link>
              </Section>
              <Section>
                <Link
                  href="#"
                  className="flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto sm:justify-center"
                >
                  <svg
                    className="mr-3 h-7 w-7"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google-play"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                    ></path>
                  </svg>
                  <div className="text-left">
                    <div className="mb-1 text-xs">Çok yakında</div>
                    <div className="-mt-1 font-sans text-sm font-semibold">
                      Play Store
                    </div>
                  </div>
                </Link>
              </Section>
            </div>
          </section>
        </Section>
        <Section>
          <footer className="bg-gray-800 py-12 text-white" id="footer">
            <div className="container px-4 md:px-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <h3 className="mb-4 text-lg font-bold">
                    Elevato
                    <span className="text-xl font-bold text-red-500">X</span>
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <SmoothScroll
                        className="text-sm hover:underline"
                        to="features"
                        spy={true}
                        smooth={true}
                        duration={500}
                      >
                        Özellikler
                      </SmoothScroll>
                    </li>
                    <li>
                      <SmoothScroll
                        className="text-sm hover:underline"
                        to="pricing"
                        spy={true}
                        smooth={true}
                        duration={500}
                      >
                        Fiyatlandırma
                      </SmoothScroll>
                    </li>
                    <li>
                      <Link
                        className="text-sm hover:underline"
                        href="/iletisim"
                      >
                        İletişim
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold">Bizi Takip Edin</h3>
                  <ul className="flex space-x-4">
                    <li>
                      <Link className="text-sm hover:underline" href="#">
                        <FacebookIcon className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link className="text-sm hover:underline" href="#">
                        <InstagramIcon className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link className="text-sm hover:underline" href="#">
                        <TwitterIcon className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link className="text-sm hover:underline" href="#">
                        <YoutubeIcon className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link className="text-sm hover:underline" href="#">
                        <LinkedinIcon className="h-4 w-4" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="text-sm">
                  © ElevatoX. Tüm hakları saklıdır.
                </span>
                <div className="flex space-x-4">
                  {/* <Link className="text-sm hover:underline" href="#">
                Terms of Service
              </Link> */}
                  <ModeToggle />
                </div>
              </div>
            </div>
          </footer>
        </Section>
      </div>
    </>
  );
};

export default Home;
Home.Layout = "LandingPage";

function Section({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <span
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {children}
      </span>
    </section>
  );
}
