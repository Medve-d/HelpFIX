import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  const images = [
    { src: '/photo_ville_paris.jpg', alt: 'Image Paris' },
    { src: '/photo_ville_marseille.jpg', alt: 'Image Marseille' },
    { src: '/photo_ville_lyon.jpg', alt: 'Image Lyon' },
    { src: '/photo_ville_lille.jpg', alt: 'image Lille' },
    { src: '/photo_ville_bordeaux.jpg', alt: 'Image Bordeaux' },
    { src: '/photo_ville_nice.jpg', alt: 'Image Nice' },
  ];
  return (
    <>
      <Head>
        <title>Bienvenue sur HelpFIX !</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Help-logo.png" />
      </Head>
      <main>
        <Navbar />
        <div className="video-background">
          <video autoPlay muted loop id="background-video">
            <source
              src="/video-home.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="overlay">
          <div className="text content">
            <h1>Votre solution à tous vos besoins de services,</h1>
            <h2>c'est HelpFIX!</h2>
            <a href="./category.html"><button className="comBtn">Commencer</button></a>
          </div>
        </div>
        <section className="section section-categoHome">
          <div className="Acard-container">
            {images.map((image, index) => (
              <a href="#" className="Acard" key={index}>
                <Image src={image.src} alt={image.alt} width={300} height={300} />
              </a>
            ))}
          </div>
        </section>
        <section className="section promo-section">
            <div className="sebastien-text">
            <Image className="photo-sebastien" src="/presta-sebastien.jpg" alt="avatar" width={150} height={150} />
              <h2>Sébastien</h2>
              <p>
                " Arrivé depuis peu, HelpFIX m'a permis de vivre à mon compte, je
                peux travailler comme je veux et quand je veux.<br />
                Bricoler et aider les autres est une passion depuis petit, et grâce
                à HelpFIX je peux vivre pleinement de ma passion."
              </p>
            </div>
        </section>
      </main>
    </>
  );
}
