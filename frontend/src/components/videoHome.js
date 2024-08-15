import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext'

const Homevid = () => {
    const { user } = useAuthContext();
    return (
        <div className='HomeVideo'>
            <div className="HomeOverlay"></div>
            <video src={`${process.env.PUBLIC_URL}/videos/videoHome.mp4`} autoPlay loop muted />
            <div className="HomeContent">
                <h1>Votre solution à tous vos besoins de services,</h1>
                <h2>c'est HelpFIX!</h2>
                {!user && (<a href="./signup"><button className="comBtn">Commencer</button></a>)}
            </div>
        </div>
    );
};

export default Homevid;
