import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footComp";
import MenuService from "@/components/menuService";
import styles from "../styles/CityService.module.css"

export default function AnnonceNice() {
  return (
    <>
      <Head>
        <title>Service disponible à Nice</title>
      </Head>
      <main>
        <Navbar />
        <h1 className={styles.cityAnnonces}>Les annonces disponible à Nice :</h1>
        <MenuService />
        
      </main>
      <Footer />
    </>
  );
}
