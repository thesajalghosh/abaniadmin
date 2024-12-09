import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/authPages/Login/Login';
import CategoryPage from './pages/Categorylist/CategoryPage';
import CreateCategory from './pages/Categorylist/CreateCategory';
import Home from './pages/home/Home';
import AllProduct from './pages/productPage/AllProduct';
import CreateProduct from './pages/productPage/CreateProduct';
import ProductPage from './pages/productPage/ProductPage';
import Orders from './pages/Orders/Orders';
import PopularProduct from './pages/PopularProduct/PopularProduct';


const App = () => {
  const isAuthenticated = () => {
    // Check if token exists in localStorage
    return localStorage.getItem('token') !== null;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated() ? "/home" : "/login"} />}
        />

        //All category page and url
        <Route path="/category-page" element={<CategoryPage/>}/>
        <Route path="/create-category" element={<CreateCategory/>}/>
        <Route path="/product-page" element={<ProductPage/>}/>
        <Route path="/create-product" element={<CreateProduct/>}/>
        <Route path="/all-product" element={<AllProduct/>}/>
        <Route path="/orders" element= {<Orders/>}/>
        <Route path="/popular-product" element= {<PopularProduct/>}/>
      </Routes>
    </Router>
  );
};

export default App;
