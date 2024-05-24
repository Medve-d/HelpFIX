import Head from "next/head";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <main>
        <Navbar />
        <LoginForm />
      </main>
    </>
  );
}
