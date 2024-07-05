import Category from "@/components/Category";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footComp";
import Image from "next/image";

export default function categoryPage() {
    const images = [
        { src: '/images/photo_ville_paris.jpg', alt: 'Image Paris', name: 'Paris' },
        { src: '/images/photo_ville_marseille.jpg', alt: 'Image Marseille', name: 'Marseille' },
        { src: '/images/photo_ville_lyon.jpg', alt: 'Image Lyon', name:'Lyon' },
        { src: '/images/photo_ville_lille.jpg', alt: 'image Lille', name:'Lille' },
        { src: '/images/photo_ville_bordeaux.jpg', alt: 'Image Bordeaux', name:'Bordeaux' },
        { src: '/images/photo_ville_nice.jpg', alt: 'Image Nice', name:'Nice' },
    ];
    return <>
    <Navbar />
    <h1 className="title-category">Merci de choisir votre ville :</h1>
    <section className="section-categoHome">
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
    <Footer />
    </>
}