import Head from "next/head";
import Navbar from "@/src/components/Navbar";
import SignupForm from "@/src/components/signupForm";
import Footer from "@/src/components/footComp";

export default function SigninForm() {
  return (
    <>
      <Head>
        <title>S'inscrire</title>
      </Head>
      <main>
        <Navbar />
        <SignupForm />
      </main>
      <Footer />
    </>
  );
}
