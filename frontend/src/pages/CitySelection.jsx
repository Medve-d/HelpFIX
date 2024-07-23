import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/src/components/Navbar";
import styles from '../styles/City.module.css';
import Footer from "@/src/components/footComp";

const services = {
  paris: ["Plombier", "Électricien", "Monteur de meubles", "Agent d'entretien"],
  marseille: ["Plombier", "Électricien", "Monteur de meubles", "Agent d'entretien"],
  lyon: ["Plombier", "Électricien", "Monteur de meubles", "Agent d'entretien"],
  lille: ["Plombier", "Électricien", "Monteur de meubles", "Agent d'entretien"],
  bordeaux: ["Plombier", "Électricien", "Monteur de meubles", "Agent d'entretien"],
  nice: ["Plombier", "Électricien", "Monteur de meubles", "Agent d'entretien"],
};

export default function CityPage() {
  const router = useRouter();
  const { city } = router.query;

  if (!city) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <main>
          <Navbar />
          <p>Loading...</p>
        </main>
      </>
    );
  }

  const cityName = city.toLowerCase();
  const availableServices = services[cityName];

  if (!availableServices) {
    return (
      <>
        <Head>
          <title>Ville non reconnue</title>
        </Head>
        <main>
          <Navbar />
          <section className={styles.section}>
            <h1>Ville non reconnue</h1>
            <p>Nous ne reconnaissons pas la ville "{city}". Veuillez choisir une ville valide.</p>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Services à {city.charAt(0).toUpperCase() + city.slice(1)}</title>
      </Head>
      <main>
        <Navbar />
        <section className={styles.section}>
          <h1>Services disponibles à {city.charAt(0).toUpperCase() + city.slice(1)}</h1>
          <ul className={styles.serviceList}>
            {availableServices.map((service, index) => (
              <li key={index} className={styles.serviceItem}>{service}</li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
