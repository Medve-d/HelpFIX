import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <main>
        <Navbar />
        <h1>Contactez-nous</h1>
        <p>Une question ? Une demande ? Un litiges ? n'attendez plus pour nous contacter</p>
      </main>
    </>
  );
}
