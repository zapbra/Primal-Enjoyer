import {Analytics} from "@vercel/analytics/react";
import "./globals.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import NextTopLoader from "nextjs-toploader";

import {GoogleAnalytics} from "nextjs-google-analytics";

export default function RootLayout({children}) {

    return (
        <html lang="en" className='scroll-smooth'>
        <body>
        <Analytics/>
        <NextTopLoader/>
        {/**
         <GoogleAnalytics trackPageViews/>
         */}

        <Navbar/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
