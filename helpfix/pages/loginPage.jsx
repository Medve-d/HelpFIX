import Head from "next/head";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginPage";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Blogg</title>
      </Head>
      <main>
        <Navbar />
        <LoginForm />
      </main>
    </>
  );
}
