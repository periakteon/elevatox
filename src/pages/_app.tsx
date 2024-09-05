/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";
import { type MyAppProps } from "@/components/layouts/types";
import { Layouts } from "@/components/layouts/Layouts";
import { Raleway } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "@/components/cropper.css";
import { trTR } from "@/utils/clerk-tr";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const raleway = Raleway({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] ?? ((page) => page);
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-0742CFGH6C"
      />
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-0742CFGH6C');`}
      </Script>
      <Analytics />
      <SpeedInsights />
      <ClerkProvider {...pageProps} localization={trTR}>
        <NextNProgress
          color="#1d4ed8"
          startPosition={0.3}
          stopDelayMs={200}
          height={5}
          showOnShallow={true}
          options={{ easing: "ease", speed: 300 }}
        />
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Layout>
            <Toaster />
            <main className={raleway.className}>
              <Component {...pageProps} />
            </main>
          </Layout>
        </NextThemesProvider>
      </ClerkProvider>
    </>
  );
}

export default api.withTRPC(MyApp);
