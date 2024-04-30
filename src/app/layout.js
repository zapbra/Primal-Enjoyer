import {Analytics} from "@vercel/analytics/react";
import "./globals.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import NextTopLoader from "nextjs-toploader";

import {GoogleAnalytics} from "nextjs-google-analytics";


export const metadata = {
    title: {
        default: "Raw Primal Diet by Aajonus Vonderplanitz - Primal Enjoyer",
    },
    description: "Aajonus Vonderplanitz Primal Diet health information articles and global information search. Learn to improve your health with natural raw foods.",
    twitter: {
        card: "summary_large_image"
    }
};

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
