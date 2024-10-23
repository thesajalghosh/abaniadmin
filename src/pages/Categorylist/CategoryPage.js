import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./CategoryList.css"

const CategoryPage = () => {
  const navigate = useNavigate()
  const handleCreateCategory = () => {
    // Logic for creating a category
    console.log("Create Category button clicked");
    navigate("/create-category")
  };

  const handleAllCategory = () => {
    // Logic for showing all categories
    console.log("All Category button clicked");
  };

  return (
    <div className="category-page">
      <h3>Category Page</h3>
      <div className="button-container">
        <button className="category-button" onClick={handleCreateCategory}>
          Create Category
        </button>
        <button className="category-button" onClick={handleAllCategory}>
          All Category
        </button>
      </div>
    </div>
  )
}

export default CategoryPage;
