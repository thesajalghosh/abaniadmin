import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlusCircle, FiList } from 'react-icons/fi';
import './CategoryList.css';

const CategoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="category-select-container">
      <div className="category-intro">
        <h2>Category Management</h2>
        <p>Create new categories or manage existing ones inside the store catalog.</p>
      </div>

      <div className="category-grid">
        <div className="category-card" onClick={() => navigate('/create-category')}>
          <div className="icon-wrapper">
            <FiPlusCircle size={28} />
          </div>
          <h3>Create Category</h3>
          <p>Add a new category with custom photos and metadata to organize products.</p>
          <span className="action-link">Open Creator &rarr;</span>
        </div>

        <div className="category-card" onClick={() => navigate('/create-category')}>
          <div className="icon-wrapper">
            <FiList size={28} />
          </div>
          <h3>Manage Categories</h3>
          <p>View all existing categories, edit names, upload new photos, or delete records.</p>
          <span className="action-link">Open List &rarr;</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
