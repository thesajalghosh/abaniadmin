import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiStar, FiTrash2, FiSquare, FiCheckSquare } from 'react-icons/fi';
import './PopularProduct.css';

const PopularProduct = () => {
    const [activeTab, setActiveTab] = useState('all'); // 'all' or 'popular'
    const [products, setProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    const handleCheckboxChange = (id) => {
        setSelectedProducts((prev) =>
            prev.includes(id)
                ? prev.filter((productId) => productId !== id)
                : [...prev, id]
        );
    };

    const markAsPopular = async () => {
        try {
            const mark_popular = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/mark-popular-product`, { "productIds": selectedProducts })
            if (mark_popular.data.success) {
                toast.success("Products marked as popular");
                const newPopularProducts = products.filter((product) =>
                    selectedProducts.includes(product._id)
                );
                setPopularProducts([...popularProducts, ...newPopularProducts]);
                setSelectedProducts([]);
                setActiveTab('popular'); // Switch to popular view
            }
        } catch (error) {
            console.error("Error marking products popular:", error);
            toast.error("Failed to mark popular");
        }
    };

    const getAllProduct = async () => {
        try {
            const product = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get-product`
            );
            if (product.data.success) {
                setProducts(product?.data?.products);
            } else {
                toast.error("Something went wrong fetching products");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const deletePopularProduct = async(id) => {
        try {
            const delete_marked_product = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-mark-element/${id}`)
            if (delete_marked_product.data.success){
                toast.success("Removed from popular products");
                setPopularProducts(popularProducts.filter((item) => item._id !== id));
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const getAllPopularProduct = async () => {
        try {
            const popular_product = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/all-popular-product`)
            setPopularProducts(popular_product?.data?.all_popular_product)
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        getAllProduct()
        getAllPopularProduct()
    }, [activeTab])

    return (
        <div className="popular-page-container">
            <div className="popular-header-title">
                <h2>Popular Catalog</h2>
                <p>Highlight specific store items to showcase on the main collections banner.</p>
            </div>

            <div className="tabs">
                <button
                    className={activeTab === 'all' ? 'tab active' : 'tab'}
                    onClick={() => handleTabSwitch('all')}
                >
                    Select From Catalog
                </button>
                <button
                    className={activeTab === 'popular' ? 'tab active' : 'tab'}
                    onClick={() => handleTabSwitch('popular')}
                >
                    Active Featured List
                </button>
            </div>

            {activeTab === 'all' && (
                <div className="all-products-section">
                    <div className="action-row-creator">
                        <button
                            className="btn btn-primary mark-popular-btn"
                            onClick={markAsPopular}
                            disabled={selectedProducts.length === 0}
                        >
                            <FiStar size={14} style={{ marginRight: '6px' }} />
                            Feature Selected ({selectedProducts.length})
                        </button>
                    </div>

                    <div className="featured-selection-grid">
                        {products.map((product) => {
                            const isSelected = selectedProducts.includes(product._id);
                            return (
                                <div
                                    key={product._id}
                                    className={`featured-select-card ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleCheckboxChange(product._id)}
                                >
                                    <div className="select-card-checkbox">
                                        {isSelected ? (
                                            <FiCheckSquare size={20} className="checkbox-icon checked" />
                                        ) : (
                                            <FiSquare size={20} className="checkbox-icon" />
                                        )}
                                    </div>
                                    <img src={product.url} alt={product.name} className="select-card-img" />
                                    <div className="select-card-info">
                                        <h4>{product.name}</h4>
                                        <p>{product.description}</p>
                                        <span className="select-card-price">₹{product.price}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {activeTab === 'popular' && (
                <div className="popular-products-section">
                    {popularProducts.length > 0 ? (
                        <div className="featured-selection-grid">
                            {popularProducts.map(({ _id, product }) => (
                                <div key={_id} className="featured-select-card active-featured">
                                    <img src={product?.url} alt={product?.name} className="select-card-img" />
                                    <div className="select-card-info">
                                        <h4>{product?.name}</h4>
                                        <p>{product?.description}</p>
                                        <span className="select-card-price">₹{product?.price}</span>
                                        <button
                                            className="btn btn-danger remove-featured-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deletePopularProduct(_id);
                                            }}
                                        >
                                            <FiTrash2 size={13} />
                                            <span>Remove</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-featured-prompt">
                            No active featured products. Go to "Select From Catalog" tab to showcase items.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PopularProduct;
