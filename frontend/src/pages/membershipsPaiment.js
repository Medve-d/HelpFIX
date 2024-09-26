import React, { useState } from 'react';

const MembershipsPaiment = ({ userId }) => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expirationDate: '',
        cvc: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Function to handle updating membership status
    const handleUpdateMembership = async () => {
        try {
            const response = await fetch(`/api/user/profile/updateMembership/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            const data = await response.json();
            if (response.ok) {
                alert('Membership updated to Free Trial');
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            alert('An error occurred while updating membership');
        }
    };

    return (
        <div className="paiment-container">
            <div className="membership-hero">
                <h3 className='fromstitles'>Checkout</h3>
                <div className="payment-area">
                    <div className='payment-area-1'>
                        <h3 className='fromstexts'>Essai Gratuit</h3>
                        <p className='titles-texts-p'>Profitez de 3 utilisations gratuites pour découvrir notre service avant de souscrire à un abonnement.</p>
                        <p><strong>Gratuit</strong></p>
                    </div>
                    <form className="payment-area-2">
                        <label htmlFor="cardNumber">Numéro de carte :</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="expirationDate">Date d'expiration :</label>
                        <input
                            type="text"
                            id="expirationDate"
                            name="expirationDate"
                            placeholder="MM/AA"
                            value={formData.expirationDate}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="cvc">CVC :</label>
                        <input
                            type="text"
                            id="cvc"
                            name="cvc"
                            placeholder="123"
                            value={formData.cvc}
                            onChange={handleChange}
                            required
                        />
                        <button onClick={handleUpdateMembership}>Start Free Trial</button>
                    </form>
                </div>
                <div className="hero-description-bk"></div>
                <div className="hero-logo">
                    <img
                        src={`${process.env.PUBLIC_URL}/image/logo-helpfix.png`}
                        alt="membership"
                        className="hero-profile-img"
                    />
                </div>
                <div className="hero-description">
                    <p>Essayez notre service gratuitement 3 fois.</p>
                </div>
            </div>
        </div>
    );
};

export default MembershipsPaiment;
