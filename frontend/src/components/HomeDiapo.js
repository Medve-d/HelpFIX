import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const HomeDiapo = () => {
    const { user } = useAuthContext();
    return (
        <div className='HomeDiapo'>
            <div className="HomeOverlay" />
            <div className="diaporama-container">
( 
(
                        <img
                            src={`${process.env.PUBLIC_URL}/image/jardinierDiapo.jpg`}
                            alt="diaporama"
                            className="Home-image"
                        />
                    ))
                 : (
                    <div>Chargement des images...</div>
                )
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