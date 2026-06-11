import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiGrid, FiBox, FiShoppingBag, FiTrendingUp, FiLogOut } from 'react-icons/fi';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { label: 'Dashboard', path: '/home', icon: <FiHome size={18} /> },
    { label: 'Category', path: '/category-page', icon: <FiGrid size={18} /> },
    { label: 'Product', path: '/product-page', icon: <FiBox size={18} /> },
    { label: 'Orders', path: '/orders', icon: <FiShoppingBag size={18} /> },
    { label: 'Popular Product', path: '/popular-product', icon: <FiTrendingUp size={18} /> },
  ];

  return (
    <div className="admin-layout-container">
      {/* Sidebar navigation */}
      <aside className="admin-sidebar">
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <span className="brand-logo-dot"></span>
            <span className="brand-name">ABANI ADMIN</span>
          </div>
          
          <nav className="sidebar-menu">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/home' && location.pathname.startsWith(item.path.replace('-page', '')));
              return (
                <div
                  key={item.path}
                  className={`menu-item ${isActive ? 'active' : ''}`}
                  onClick={() => navigate(item.path)}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-content">
        <header className="admin-top-header">
          <div className="header-title">
            {menuItems.find(item => location.pathname.startsWith(item.path.replace('-page', '')))?.label || 'Control Panel'}
          </div>
          <div className="header-profile">
            <div className="profile-avatar">A</div>
            <span className="profile-name">Administrator</span>
          </div>
        </header>
        <div className="admin-page-body">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
