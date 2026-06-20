import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiGrid, FiBox, FiShoppingBag, FiTrendingUp, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({ name: 'Administrator', role: 'Admin' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }, []);

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
      {/* Sidebar mobile overlay backdrop */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar navigation */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-top">
          <div className="sidebar-brand-wrapper">
            <div className="sidebar-brand">
              <span className="brand-logo-dot"></span>
              <span className="brand-name">ABANI <span className="brand-accent">STUDIO</span></span>
            </div>
            <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)}>
              <FiX size={20} />
            </button>
          </div>
          
          <nav className="sidebar-menu">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/home' && location.pathname.startsWith(item.path.replace('-page', '')));
              return (
                <div
                  key={item.path}
                  className={`menu-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    navigate(item.path);
                    setIsSidebarOpen(false);
                  }}
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
          <div className="header-left">
            <button className="mobile-toggle-btn" onClick={() => setIsSidebarOpen(true)}>
              <FiMenu size={22} />
            </button>
            <div className="header-title">
              {menuItems.find(item => location.pathname.startsWith(item.path.replace('-page', '')))?.label || 'Control Panel'}
            </div>
          </div>
          <div className="header-profile">
            <div className="profile-info">
              <span className="profile-name">{user.name}</span>
              <span className="profile-role">{user.role || 'Administrator'}</span>
            </div>
            <div className="profile-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
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
