import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './login';
import Signup from './signup';
import Landing from './landing';
import ThankYou from './components/ThankYou';

function App() {
    const [cart, setCart] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

    // Add item to cart or update quantity
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item._id === product._id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Update quantity in cart
    const updateQuantity = (productId, quantity) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === productId ? { ...item, quantity } : item
            )
        );
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item._id !== productId));
    };

    // Callback for successful login/signup
    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <div className="App">
                <header className="header">
                    <h1>Recipe Realm</h1>
                    <nav>
                        {!isAuthenticated ? (
                            <>
                                <Link to="/landing">Home</Link>
                                    <Link to="/signup">Sign Up</Link>
                                <Link to="/login">Log In</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/products">Products </Link>
                                <Link to="/cart">Cart ({cart.length})</Link>
                                <Link to="/checkout">Checkout</Link>
                               
                            </>
                        )}
                    </nav>
                </header>

                <main className="main-content">
                    <Routes>
                        {/* Redirect authenticated users to products page */}
                        {isAuthenticated ? (
                            <>
                                <Route path="/products" element={<ProductList addToCart={addToCart} />} />
                                <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
                                <Route path="/checkout" element={<Checkout cart={cart} />} />
                                <Route path="/thank-you" element={<ThankYou />} />
                                {/* Redirect any unmatched route to Products */}
                                <Route path="*" element={<Navigate to="/products" replace />} />
                            </>
                        ) : (
                            <>
                                <Route path="/landing" element={<Landing />} />
                                <Route path="/signup" element={<Signup onAuthSuccess={handleAuthSuccess} />} />
                                <Route path="/login" element={<Login onAuthSuccess={handleAuthSuccess} />} />
                                {/* Redirect to Landing by default for non-authenticated users */}
                                <Route path="*" element={<Navigate to="/landing" replace />} />
                            </>
                        )}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;