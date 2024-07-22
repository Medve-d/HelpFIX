import Head from "next/head";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/footComp";
import UserProfile from "@/src/components/UserProfile";

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
