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
import AdminLayout from './components/AdminLayout/AdminLayout';


const App = () => {
  const isAuthenticated = () => {
    // Check if token exists in localStorage
    return localStorage.getItem('token') !== null;
  };

  // Wrapper component to protect routes and inject AdminLayout
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? (
      <AdminLayout>{children}</AdminLayout>
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/category-page" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
        <Route path="/create-category" element={<ProtectedRoute><CreateCategory /></ProtectedRoute>} />
        <Route path="/product-page" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
        <Route path="/create-product" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
        <Route path="/all-product" element={<ProtectedRoute><AllProduct /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/popular-product" element={<ProtectedRoute><PopularProduct /></ProtectedRoute>} />

        <Route
          path="*"
          element={<Navigate to={isAuthenticated() ? "/home" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
