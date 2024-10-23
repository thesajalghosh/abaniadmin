import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h3>All Admin Control</h3>
      <div className="button-group">
        <button className="admin-button" onClick={()=> navigate("/category-page")}>Category</button>
        <button className="admin-button" onClick={()=> navigate("/product-page")}>Product</button>
        <button className="admin-button" onClick={()=> navigate("/order-page")}>Order</button>
      </div>
    </div>
  );
}

export default Home;
