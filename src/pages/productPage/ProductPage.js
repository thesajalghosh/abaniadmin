import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlusCircle, FiLayers } from 'react-icons/fi';
import './ProductPage.css';

const ProductPage = () => {
  const navigate = useNavigate();

  return (
    <div className="product-select-container">
      <div className="product-intro">
        <h2>Product Management</h2>
        <p>Add new products to the catalog or browse and update active store listings.</p>
      </div>

      <div className="product-grid">
        <div className="product-card-tile" onClick={() => navigate('/create-product')}>
          <div className="icon-wrapper">
            <FiPlusCircle size={28} />
          </div>
          <h3>Create Product</h3>
          <p>Create a catalog item with photo, description, inventory count, and pricing tier.</p>
          <span className="action-link">Open Creator &rarr;</span>
        </div>

        <div className="product-card-tile" onClick={() => navigate('/all-product')}>
          <div className="icon-wrapper">
            <FiLayers size={28} />
          </div>
          <h3>All Products List</h3>
          <p>Browse active inventory, modify detail specs, update stock quantities, or delete listings.</p>
          <span className="action-link">Browse Inventory &rarr;</span>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
