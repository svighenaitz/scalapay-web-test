import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import React from 'react';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Head>
        <title>Scalapay Form Test</title>
        <meta name="description" content="Scalapay Form Test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <Link href={{ pathname: '/form', query: { step: 1 } }}>START FILLING FORM</Link>
        </main>
        <footer className={styles.footer}>
          
        </footer>
      </div>
    </>
  );
};

export default Home;
