import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <main>
        <Navbar />
        
      </main>
    </>
  );
}
