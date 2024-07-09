import Category from "@/components/Category";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footComp";
import Image from "next/image";
import Link from "next/link"; // Importer le composant Link

export default function categoryPage() {
    const images = [
        { src: '/images/photo_ville_paris.jpg', alt: 'Image Paris', name: 'Paris', link: '/paris' },
        { src: '/images/photo_ville_marseille.jpg', alt: 'Image Marseille', name: 'Marseille', link: '/marseille' },
        { src: '/images/photo_ville_lyon.jpg', alt: 'Image Lyon', name: 'Lyon', link: '/lyon' },
        { src: '/images/photo_ville_lille.jpg', alt: 'Image Lille', name: 'Lille', link: '/lille' },
        { src: '/images/photo_ville_bordeaux.jpg', alt: 'Image Bordeaux', name: 'Bordeaux', link: '/bordeaux' },
        { src: '/images/photo_ville_nice.jpg', alt: 'Image Nice', name: 'Nice', link: '/nice' },
    ];

    return (
        <>
            <Navbar />
            <h1 className="title-category">Merci de choisir votre ville :</h1>
            <section className="section-categoHome">
                <div className="Acard-container">
                    {images.map((image, index) => (
                        <Link href={image.link} key={index}>
                            <div className="Acard">
                                <div className="img-container">
                                    <Image src={image.src} alt={image.alt} width={300} height={300} />
                                    <div className="overlay">
                                        <div className="text-Card">{image.name}</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
}
