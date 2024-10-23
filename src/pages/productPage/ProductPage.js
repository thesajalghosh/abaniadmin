import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./ProductPage.css"

const ProductPage = () => {
  const navigate = useNavigate()
  const handleCreateProduct = () => {
    // Logic for creating a category
    console.log("Create Category button clicked");
    navigate("/create-product")
  };

  const handleAllProduct = () => {
    // Logic for showing all categories
    console.log("All Category button clicked");
    navigate("/all-product")
  };

  return (
    <div className="category-page">
      <h3>Product Page</h3>
      <div className="button-container">
        <button className="category-button" onClick={handleCreateProduct}>
          Create Product
        </button>
        <button className="category-button" onClick={handleAllProduct}>
          All Product
        </button>
      </div>
    </div>
  )
}

export default ProductPage;
