import React from 'react';
import '../styles/ThankYou.css'; 

function ThankYou() {
    return (
        <div className="thank-you-page">
            <h1 className="thank-you-title">Thank You!</h1>
            <p className="thank-you-message">Your order has been successfully placed!</p>
            <div className="thank-you-confetti"></div>
            <p className="thank-you-note">We appreciate your business!</p>
        </div>
    );
}

export default ThankYou;