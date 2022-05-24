import "../styles/globals.scss";
import { usePanelbear } from "@panelbear/panelbear-nextjs";
import Layout from "../components/Layout";
import { NextSeo } from "next-seo";
function MyApp({ Component, pageProps }) {
  usePanelbear("2QcVdyTPC6X");

  const SEO = {
    title: "Primal Enjoyer",
    titleTemplate: "Primal Enjoyer",
    defaultTitle: "Primal Enjoyer",
    description: "Aajonus Vonderplanitz Searchbar",
    canonical: "https://www.primalenjoyer.com/",
    openGraph: {
      url: "https://www.primalenjoyer.com/",
      title: "Primal Enjoyer",
      description: "Aajonus Vonderplanitz Searchbar",
      images: [
        {
          url: "/webImage.png",
          width: 800,
          height: 420,
          alt: "Primal Enjoyer",
        },
      ],
    },
  };
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
