import "../styles/globals.scss";
import { usePanelbear } from "@panelbear/panelbear-nextjs";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  usePanelbear;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
