import "../styles/globals.scss";
import Layout from "../components/Layout";
import { NextSeo } from "next-seo";
import { usePanelbear } from "@panelbear/panelbear-nextjs";
function MyApp({ Component, pageProps }) {
  const SEO = {
    title: "Primal Enjoyer",
    description: "Find Aajonus Vonderplanitz articles through a search bar",
    keywords: ["Aajonus Vonderplanitz", " raw primal", "raw meat"],
    icon: "/favicon.ico",
    canonical: "https://www.primalenjoyer.com/",
    images: [
      {
        url: "/website.PNG",
        width: 800,
        height: 600,
        alt: "Primal Search",
        type: "image/png",
      },
    ],
    openGraph: {
      type: "website",
      locale: "en_IE",
      url: "https://www.primalenjoyer.com/",
      site_name: "Primal Enjoyer",
      images: [
        {
          url: "/website.PNG",
          width: 800,
          height: 600,
          alt: "Search Articles",
        },
      ],
    },
  };
  usePanelbear("2QcVdyTPC6X");
  return (
    <>
      <NextSeo {...SEO} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
