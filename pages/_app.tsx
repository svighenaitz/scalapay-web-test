import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head >
        <title>Scalapay Form Test</title>
      </Head >
      <main className={poppins.variable} style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
        <Component {...pageProps} />
      </main></>
  );
}
