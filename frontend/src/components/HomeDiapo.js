import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Image from 'next/image';

const HomeDiapo = () => {
    const { user } = useAuthContext();
    const images = process.env.NEXT_PUBLIC_URL 
        ? [
              `${process.env.NEXT_PUBLIC_URL}/image/jardinierDiapo.jpg`,
          ]
        : [];

    return (
        <div className='HomeDiapo'>
            <div className="HomeOverlay" />
            <div className="diaporama-container">
                {images.length > 0 ? ( 
                    images.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            alt="Diaporama"
                            className="diaporama-image"
                            width={1920}
                            height={1080}
                            layout="fill"
                            objectFit="cover"
                        />
                    ))
                ) : (
                    <div>Chargement des images...</div>
                )}
            </div>
            <div className="HomeContent">
                <h1>Votre solution à tous vos besoins de services,</h1>
                <h2>c'est HelpFIX!</h2>
                {!user && <a href="./signup"><button className="comBtn">Commencer</button></a>}
            </div>
        </div>
    );
};

export default HomeDiapo;