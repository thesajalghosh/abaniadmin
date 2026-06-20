import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGrid, FiBox, FiShoppingBag, FiTrendingUp } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Categories',
      description: 'Manage store categories, view catalogs, and update catalog structure.',
      path: '/category-page',
      icon: <FiGrid size={28} />,
      color: 'cyan',
    },
    {
      title: 'Products',
      description: 'Manage active catalog products, create items, adjust pricing, and track inventory.',
      path: '/product-page',
      icon: <FiBox size={28} />,
      color: 'purple',
    },
    {
      title: 'Orders',
      description: 'Track incoming purchases, change statuses, manage addresses, and verify bookings.',
      path: '/orders',
      icon: <FiShoppingBag size={28} />,
      color: 'blue',
    },
    {
      title: 'Popular Products',
      description: 'Mark featured elements, showcase products, and manage hot collections.',
      path: '/popular-product',
      icon: <FiTrendingUp size={28} />,
      color: 'pink',
    },
  ];

  return (
    <div className="dashboard-home">
      <div className="dashboard-intro">
        <h2>Welcome to Admin Console</h2>
        <p>Select a quick action card to manage different parts of the platform catalog and sales pipelines.</p>
      </div>

      <div className="dashboard-grid">
        {cards.map((card) => (
          <div
            key={card.path}
            className={`dashboard-tile tile-${card.color}`}
            onClick={() => navigate(card.path)}
          >
            <div className="tile-icon-wrapper">
              {card.icon}
            </div>
            <div className="tile-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <div className="tile-action">
              <span>Manage &rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
