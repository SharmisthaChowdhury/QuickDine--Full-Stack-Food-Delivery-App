import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './productGrid.css';

const ProductGrid = ({ addToCart }) => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:8000/api/user/getfooditem')
      .then(response => response.json())
      .then(data => setProductData(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <div className="top-dishes-container">
        <h1>~~~~~~~~~~~~~~~Top Dishes Near You~~~~~~~~~~~~~</h1>
      </div>
      <div className="product-grid">
        {productData.map((product) => (
          <div key={product._id} className="product-card-wrapper">
            <ProductCard product={product} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
