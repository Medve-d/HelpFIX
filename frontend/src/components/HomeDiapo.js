import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext'

const Homevid = () => {
    const { user } = useAuthContext();
    return (
        <div className='HomeVideo'>
                    <img
                    src={`${process.env.PUBLIC_URL}/image/homeImage.png`}
                    alt="diaporama"
                    className="Home-image"
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