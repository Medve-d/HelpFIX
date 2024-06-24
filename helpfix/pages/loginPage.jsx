import Head from "next/head";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginPage";
import Footer from "@/components/footComp";


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
