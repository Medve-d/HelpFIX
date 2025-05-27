import React, { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const videos = [
    `${process.env.PUBLIC_URL}/videos/video1.mp4`,
    `${process.env.PUBLIC_URL}/videos/video2.mp4`,
    `${process.env.PUBLIC_URL}/videos/video3.mp4`,
    `${process.env.PUBLIC_URL}/videos/video4.mp4`,
    `${process.env.PUBLIC_URL}/videos/video5.mp4`
];

const Homevid = () => {
    const { user } = useAuthContext();
    const [currentVideo, setCurrentVideo] = useState(0);
    const [nextVideo, setNextVideo] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const video1Ref = useRef(null);
    const video2Ref = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true); 
            setTimeout(() => {
                setCurrentVideo((prev) => (prev + 1) % videos.length);
                setNextVideo((prev) => (prev + 1) % videos.length);
                setIsTransitioning(false); 
            }, 500); 
        }, 6000); 

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const nextRef = video1Ref.current && video2Ref.current
            ? (isTransitioning ? video2Ref.current : video1Ref.current)
            : null;

        if (nextRef) {
            nextRef.src = videos[nextVideo];
            nextRef.load();
            nextRef.oncanplay = () => {
                nextRef.play().catch((error) => console.warn("Auto-play blocked:", error));
            };
        }
    }, [nextVideo, isTransitioning]);

    return (
        <div className="HomeVideo">
            <div className="HomeOverlay"></div>

            <video 
                ref={video1Ref} 
                className={`video ${!isTransitioning ? "visible" : "hidden"}`} 
                src={videos[currentVideo]} 
                autoPlay 
                muted 
                playsInline 
            />
                {/* Moyen pour précharger une vidéo pour éviter les coupures entres vidéos */}
            <video 
                ref={video2Ref} 
                className={`video ${isTransitioning ? "visible" : "hidden"}`} 
                muted 
                playsInline 
            />

            <div className="HomeContent">
                <h1>Votre solution à tous vos besoins de services,</h1>
                <h2>c'est HelpFIX!</h2>
                {!user && (<a href="./signup"><button className="comBtn">Commencer</button></a>)}
            </div>
        </div>
    );
};

export default Homevid;
