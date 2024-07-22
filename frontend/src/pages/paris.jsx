import Head from "next/head";
import Image from "next/image";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/footComp";
import MenuService from "@/src/components/menuService";
import styles from "../styles/CityService.module.css"

export default function AnnonceParis() {
  return (
    
    <>
    
      <Head>
        <title>Service disponible à Paris</title>
      </Head>
      <main>
        <Navbar />
        <h1 className={styles.cityAnnonces}>Les annonces disponible à Paris :</h1>
        <MenuService />
        
      </main>
      <Footer />
    </>
  );
}
