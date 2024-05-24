import Head from "next/head";
import Navbar from "@/components/Navbar";
import SignupForm from "@/components/signupForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <main>
        <Navbar />
        <SignupForm />
      </main>
    </>
  );
}
