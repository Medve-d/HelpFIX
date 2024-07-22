import Head from "next/head";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/footComp";
import styles from "../styles/blog.module.css"

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <main>
        <Navbar />
        <h1 className={styles.h1}>Nouveautés chez HelpFIX</h1>
        <div className={styles.texteBlog}>
        <p>
        Bienvenue sur HelpFIX, votre destination en ligne pour trouver des prestataires de services qualifiés et fiables. Avec notre plateforme conviviale, vous pouvez découvrir une multitude de fonctionnalités conçues pour simplifier votre recherche. Que vous ayez besoin d'aide pour trouver un prestataire de services manuellement ou automatiquement grâce à ANIR, notre chatbot intelligent,
         HelpFIX est là pour vous aider. Vous avez la possibilité de parcourir une liste de prestataires de services dans votre région et de choisir celui qui correspond parfaitement à vos préférences. De plus, notre système de chat intégré vous permet de communiquer directement avec les prestataires pour discuter des détails et trouver des solutions adaptées à vos besoins. Chez HelpFIX,
          la transparence est primordiale, c'est pourquoi nous offrons également la possibilité aux utilisateurs de noter et de partager leurs expériences avec les prestataires. Les prestataires de services peuvent également rejoindre notre plateforme et commencer à travailler en ligne en utilisant uniquement notre site web. Nous proposons différentes options d'abonnement pour les utilisateurs et les prestataires,
           offrant ainsi un accès accru à diverses fonctionnalités. Que vous soyez à la recherche d'un service ou que vous souhaitiez proposer vos compétences, HelpFIX est là pour vous accompagner à chaque étape du processus.
        </p>
        </div>
        <div className={styles.creditBlog}>
          <p>
          HelpFIX est une plateforme web trouvé par Nikolai ZLODEYEV, Anas EL MALIKI et Ryad OTMANI conçue pour mettre en relation les utilisateurs avec des prestataires de services pour divers besoins. Que ce soit pour réparer un robinet qui fuit,
           réparer un appareil défectueux ou trouver un tuteur, HelpFix vise à simplifier le processus de recherche de professionnels fiables.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
