// src/components/Checkout.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Checkout.css'; 

function Checkout({ cart }) {
    const [user, setUser ] = useState({ name: '', email: '', address: '' });
    const navigate = useNavigate(); // Initialize useNavigate

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        
        const orderData = {
            user,
            products: cart.map(item => ({
                productId: item._id,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: parseFloat(calculateTotal())
        };

        try {
            const response = await axios.post('http://localhost:5000/api/orders', orderData);
            alert(`Order placed! Order ID: ${response.data._id}`);
            navigate('/thank-you'); // Redirect to Thank You page using navigate
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order');
        }
    };

    return (
        <div className="checkout">
            <h2 className="checkout-title">Checkout</h2>
            <h3 className="order-summary-title">Order Summary</h3>
            <ul className="order-summary">
                {cart.map(item => (
                    <li key={item._id} className="order-item">{item.name} - Quantity: {item.quantity}</li>
                ))}
            </ul>
            <h3 className="total-amount">Total: ₹{calculateTotal()}</h3>

            <form className="checkout-form" onSubmit={handleSubmitOrder}>
                <h3 className="shipping-details-title">Shipping Details</h3>
                <label className="form-label">
                    Name:
                    <input type="text" className="form-input" value={user.name} onChange={(e) => setUser ({ ...user, name: e.target.value })} required />
                </label>
                <label className="form-label">
                    Email:
                    <input type="email" className="form-input" value={user.email} onChange={(e) => setUser ({ ...user, email: e.target.value })} required />
                </label>
                <label className="form-label">
                    Address:
                    <textarea className="form-textarea" value={user.address} onChange={(e) => setUser ({ ...user, address: e.target.value })} required />
                </label>
                <button type="submit" className="submit-button">Place Order</button>
            </form>
        </div>
    );
}

export default Checkout;