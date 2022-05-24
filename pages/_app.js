import "../styles/globals.scss";
import Layout from "../components/Layout";
import { NextSeo } from "next-seo";

function MyApp({ Component, pageProps }) {
  const SEO = {
    title: "Primal Enjoyer",
    description: "Find Aajonus Vonderplanitz articles through a search bar",
    keywords: ["Aajonus Vonderplanitz", " raw primal", "raw meat"],
    icon: "/favicon.ico",
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
