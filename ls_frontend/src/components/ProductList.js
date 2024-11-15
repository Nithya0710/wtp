// src/components/ProductList.js
import '../styles/ProductListStyles.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList({ addToCart }) {
    const [products, setProducts] = useState([]);
    const [cartQuantities, setCartQuantities] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleQuantityChange = (productId, quantity) => {
        setCartQuantities(prev => ({
            ...prev,
            [productId]: Math.max(quantity, 0)
        }));
    };

    const handleAddToCart = (product) => {
        const quantity = cartQuantities[product._id] || 1;
        addToCart({ ...product, quantity });
    };

    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product._id} className="product-card">
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                    <div className="product-info">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="price">₹{product.price.toFixed(2)}</p>
                    </div>
                    <div className="product-controls">
                        <div className="quantity-controls">
                            <button onClick={() => handleQuantityChange(product._id, (cartQuantities[product._id] || 1) - 1)}>-</button>
                            <input
                                type="number"
                                value={cartQuantities[product._id] || 1}
                                onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value) || 1)}
                                min="1"
                            />
                            <button onClick={() => handleQuantityChange(product._id, (cartQuantities[product._id] || 1) + 1)}>+</button>
                        </div>
                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
