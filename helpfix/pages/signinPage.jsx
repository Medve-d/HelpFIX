import Head from "next/head";
import Navbar from "@/components/Navbar";
import SignupForm from "@/components/signupForm";
import Footer from "@/components/footComp";

export default function SigninForm() {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <main>
        <Navbar />
        <SignupForm />
      </main>
      <Footer />
    </>
  );
}
