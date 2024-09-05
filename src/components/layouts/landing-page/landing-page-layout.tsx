import React, { type PropsWithChildren } from "react";
import { LandingPageNavigation } from "./navbar";
import { Raleway } from "next/font/google";
import Head from "next/head";

const raleway = Raleway({ subsets: ["latin"] });

const LandingPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>ElevatoX - Modern Asansör Çözümleri</title>
        <meta name="title" content="ElevatoX - Modern Asansör Yazılımları" />
        <meta
          name="keywords"
          content="elevatox, elevator, asansör, asansör takip, asansör takip yazılımı, asansör yazılımı, asansör bakım takip yazılımı, asansör uygulaması"
        />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Turkish" />
        <meta name="author" content="ElevatoX" />
        <meta name="distribution" content="global" />
        <meta
          property="og:title"
          content="ElevatoX - Modern Asansör Yazılımları"
        />
        <meta
          name="description"
          content="ElevatoX, modern asansör yazılımları sunan bir yazılım şirketidir. Asansörlerinizi uzaktan izleyin, bakım ve arıza kayıtlarınızı tutun, asansörlerinizin verilerini analiz edin."
          key="desc"
        />
        <meta
          property="og:description"
          content="ElevatoX, modern asansör yazılımları sunan bir yazılım şirketidir. Asansörlerinizi uzaktan izleyin, bakım ve arıza kayıtlarınızı tutun, asansörlerinizin verilerini analiz edin."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elevatox.com/" />
        <meta property="og:site_name" content="ElevatoX" />
        <meta property="og:locale" content="tr_TR" />
        <meta
          property="og:image"
          content="https://elevatox-bucket.s3.eu-central-1.amazonaws.com/hero.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="ElevatoX" />
        <meta
          name="twitter:title"
          content="ElevatoX - Modern Asansör Yazılımları"
        />
        <meta
          name="twitter:description"
          content="ElevatoX, modern asansör yazılımları sunan bir yazılım şirketidir. Asansörlerinizi uzaktan izleyin, bakım ve arıza kayıtlarınızı tutun, asansörlerinizin verilerini analiz edin."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@elevatox" />
        <meta name="twitter:creator" content="@elevatox" />
        <meta
          property="twitter:image"
          content="https://elevatox-bucket.s3.eu-central-1.amazonaws.com/hero.png"
        />
        <meta name="twitter:image:alt" content="ElevatoX" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <meta name="twitter:image:type" content="image/png" />
        <meta name="twitter:domain" content="elevatox.com" />
        <meta name="twitter:url" content="https://elevatox.com" />
        <link rel="canonical" href="https://elevatox.com" />
      </Head>
      <main className={raleway.className}>
        <LandingPageNavigation />
        {children}
      </main>
    </>
  );
};
export default LandingPageLayout;
