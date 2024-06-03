import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Category from "@/components/Category";

export default function categoryPage() {
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
        <title>Blog</title>
      </Head>
      <main>
        <Navbar />
        <section className="section section-categoHome">
          <div className="Acard-container">
            {images.map((image, index) => (
              <a href="#" className="Acard" key={index}>
                <Image src={image.src} alt={image.alt} width={300} height={300} />

                
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
