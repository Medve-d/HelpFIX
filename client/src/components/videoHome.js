import React, { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import '../index.css'; // Assurez-vous d'importer le fichier CSS

const videos = [
    '/videos/video1.mp4',
    '/videos/video2.mp4',
    '/videos/video3.mp4',
    '/videos/video4.mp4',
    '/videos/video5.mp4'
];

const Homevid = () => {
    const { user } = useAuthContext();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const videoRefs = [useRef(null), useRef(null)];
    const activeRefIndex = useRef(0);

    // Effet pour changer de vidéo à intervalle régulier
    useEffect(() => {
        const interval = setInterval(() => {
            // Prépare l'index du prochain lecteur vidéo
            const nextRefIndex = 1 - activeRefIndex.current;
            const nextVideoElement = videoRefs[nextRefIndex].current;

            // Prépare l'index de la prochaine vidéo
            setCurrentVideoIndex(prevIndex => {
                const nextVideoIndex = (prevIndex + 1) % videos.length;

                // Précharge la prochaine vidéo dans le lecteur inactif
                if (nextVideoElement) {
                    nextVideoElement.src = videos[nextVideoIndex];
                    nextVideoElement.load();
                }

                return nextVideoIndex;
            });

        }, 6000); // Change de vidéo toutes les 6 secondes

        return () => clearInterval(interval);
    }, []);

    // Effet pour jouer la vidéo et gérer la transition visuelle
    useEffect(() => {
        const nextRefIndex = 1 - activeRefIndex.current;
        const activeVideoElement = videoRefs[activeRefIndex.current].current;
        const nextVideoElement = videoRefs[nextRefIndex].current;

        if (nextVideoElement) {
            // Joue la vidéo dès qu'elle est prête
            nextVideoElement.oncanplaythrough = () => {
                nextVideoElement.play().catch(error => console.warn("Autoplay bloqué", error));
                
                // Inverse les classes pour la transition en fondu
                nextVideoElement.classList.add('active');
                if (activeVideoElement) {
                    activeVideoElement.classList.remove('active');
                }
                
                // Met à jour l'index du lecteur actif
                activeRefIndex.current = nextRefIndex;
            };
        }
    }, [currentVideoIndex]);

    return (
        <div className="HomeVideo">
            <div className="HomeOverlay"></div>

            <video
                ref={videoRefs[0]}
                className="video active" // Le premier lecteur commence comme actif
                src={videos[0]} // Charge la première vidéo initialement
                autoPlay
                muted
                playsInline
                onCanPlayThrough={e => e.target.play().catch(err => console.warn("Autoplay initial bloqué", err))}
            />
            <video
                ref={videoRefs[1]}
                className="video" // Le deuxième lecteur est initialement caché
                muted
                playsInline
            />

            <div className="HomeContent">
                <p className='texte-accueil' style={{ fontSize: '2.5rem', color: '#fff' }}>
                    Votre solution à tous vos besoins de services,
                </p>
                <p className='texte-accueil' style={{ fontSize: '2.5rem', color: '#fff' }}>
                    c'est HelpFIX!
                </p>
                {!user && (<a href="./signup"><button className="comBtn">Commencer</button></a>)}
            </div>
        </div>
    );
};

export default Homevid;