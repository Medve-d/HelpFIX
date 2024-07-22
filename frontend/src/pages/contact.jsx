import Head from "next/head";
import Image from "next/image";
import Navbar from "@/src/components/Navbar";
import ContactForm from "@/src/components/contactForm";
import Footer from "@/src/components/footComp";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <main>
        <Navbar />
        <h1>Contactez-nous</h1>
        <p>Une question ? Une demande ? Un litiges ? n'attendez plus pour nous contacter</p>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
