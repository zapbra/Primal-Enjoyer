"use client";
import { Analytics } from "@vercel/analytics/react";
import "./styles/globals.scss";
import StyledComponentsRegistry from "../../lib/registry";
import { useState, useEffect, createContext } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import NextTopLoader from "nextjs-toploader";
export const AppContext = createContext();
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function RootLayout({ children }) {
  const [context, setContext] = useState({
    tags: [],
    upvotes: [],
    downvotes: [],
  });
  return (
    <AppContext.Provider value={[context, setContext]}>
      <html lang="en">
        <body className="main-holder">
          <Analytics />
          <NextTopLoader />
          <GoogleAnalytics trackPageViews />
          <StyledComponentsRegistry>
            <Navbar />
            {children}

            <Footer />
          </StyledComponentsRegistry>
        </body>
      </html>
    </AppContext.Provider>
  );
}
