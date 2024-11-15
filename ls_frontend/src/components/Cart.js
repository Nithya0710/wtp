// src/components/Cart.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CartStyles.css';

function Cart({ cart, updateQuantity, removeFromCart }) {
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Cart</h2>
            {cart.length === 0 ? (
                <p className="empty-cart-message">
                    Your cart is empty. <Link to="/" className="go-shopping-link">Go shopping</Link>
                </p>
            ) : (
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item._id} className="cart-item">
                            <div className="cart-item-details">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-price">Price: ₹{item.price}</p>
                                <p className="item-quantity">
                                    Quantity: 
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        className="quantity-input"
                                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                                    />
                                </p>
                            </div>
                            <button className="remove-button" onClick={() => removeFromCart(item._id)}>Remove</button>
                        </div>
                    ))}
                    <h3 className="total-amount">Total: ₹{calculateTotal()}</h3>
                    <Link to="/checkout" className="checkout-link">
                        <button className="checkout-button">Proceed to Checkout</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Cart;
