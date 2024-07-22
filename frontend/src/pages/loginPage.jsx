import Head from "next/head";
import Navbar from "@/src/components/Navbar";
import LoginForm from "@/src/components/LoginPage";
import Footer from "@/src/components/footComp";


export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Se connecter</title>
      </Head>
      <main>
        <Navbar />
        <LoginForm />
      </main>
      <Footer />
    </>
  );
}
