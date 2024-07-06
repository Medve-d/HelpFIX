import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footComp";
import MenuService from "@/components/menuService";
import styles from "../styles/CityService.module.css"

export default function Contact() {
  return (
    <>
      <Head>
        <title>Service disponible à Marseille</title>
      </Head>
      <main>
        <Navbar />
        <h1 className={styles.cityAnnonces}>Les annonces disponible à Marseille :</h1>
        <MenuService />
        
      </main>
      <Footer />
    </>
  );
}
