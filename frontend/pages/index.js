import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footComp";

export default function Home() {
  const images = [
    { src: '/images/photo_ville_paris.jpg', alt: 'Image Paris', name: 'Paris' },
    { src: '/images/photo_ville_marseille.jpg', alt: 'Image Marseille', name: 'Marseille' },
    { src: '/images/photo_ville_lyon.jpg', alt: 'Image Lyon', name:'Lyon' },
    { src: '/images/photo_ville_lille.jpg', alt: 'image Lille', name:'Lille' },
    { src: '/images/photo_ville_bordeaux.jpg', alt: 'Image Bordeaux', name:'Bordeaux' },
    { src: '/images/photo_ville_nice.jpg', alt: 'Image Nice', name:'Nice' },
  ];
  return (
    <>
      <Head>
        <title>Bienvenue sur HelpFIX !</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/Help-logo.png" />
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
            <a href="./loginPage"><button className="comBtn">Commencer</button></a>
          </div>
        </div>
        <section className="section section-categoHome">
  <div className="Acard-container">
    {images.map((image, index) => (
      <a href="#" className="Acard" key={index}>
        <div className="img-container">
          <Image src={image.src} alt={image.alt} width={300} height={300}  />
          <div className="overlay">
            <div className="text-Card">{image.name}</div>
          </div>
        </div>
      </a>
    ))}
  </div>
</section>
        <section className="section promo-section">
            <div className="sebastien-text">
            <Image className="photo-sebastien" src="/images/presta-sebastien.jpg" alt="avatar" width={150} height={150} />
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
      <Footer />
    </>
  );
}
