import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import React from 'react';


const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Scalapay Form Test</title>
        <meta name="description" content="Scalapay Form Test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.heading}>Welcome to Scalapay Form Test</h1>
          <Link href={{ pathname: '/form', query: { step: 1 } }}>START FILLING FORM</Link>
        </main>
        <footer className={styles.footer}>

        </footer>
      </div>
    </>
  );
};

export default Home;
