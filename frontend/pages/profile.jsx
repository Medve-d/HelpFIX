import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footComp";
import UserProfile from "@/components/UserProfile";

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>Profil Utilisateur</title>
      </Head>
      <main>
        <Navbar />
        <UserProfile />
      </main>
      <Footer />
    </>
  );
}
