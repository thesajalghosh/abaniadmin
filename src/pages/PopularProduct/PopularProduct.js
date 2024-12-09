import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
            if (mark_popular.success) {

                const newPopularProducts = products.filter((product) =>
                    selectedProducts.includes(product._id)
                );
                setPopularProducts([...popularProducts, ...newPopularProducts]);
                setSelectedProducts([]);
            }


        } catch (error) {

        }

    };

    const getAllProduct = async () => {
        try {
            const product = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get-product`
            );

            console.log(product.data);
            if (product.data.success) {
                setProducts(product?.data?.products);
                toast.success("product get successfully");
            } else {
                toast.error("something wrong in succesfull try section");
            }
        } catch (error) {

            toast.error("something went wrong");
        }
    };

    const deletePopularProduct = async(id) => {
        try {
            const delete_marked_product = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-mark-element/${id}`)
            {
               if (delete_marked_product.data.success){

                   setPopularProducts(popularProducts.filter((item) => item._id !== id));
               }
            }
            
        } catch (error) {
            
            toast.error("something went wrong");
        }
    };

    const getAllPopularProduct = async () => {
        try {
            const popular_product = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/all-popular-product`)
            console.log("popular_product", popular_product)
            setPopularProducts(popular_product?.data?.all_popular_product)
        } catch (error) {
            toast.error("something went wrong");
        }
    }
    useEffect(() => {
        getAllProduct()
        getAllPopularProduct()
    }, [activeTab])
    return (
        <div className="popular-product-container">
            <div className="tabs">
                <button
                    className={activeTab === 'all' ? 'active-tab' : ''}
                    onClick={() => handleTabSwitch('all')}
                >
                    All Products
                </button>
                <button
                    className={activeTab === 'popular' ? 'active-tab' : ''}
                    onClick={() => handleTabSwitch('popular')}
                >
                    Popular Products
                </button>
            </div>

            {activeTab === 'all' && (
                <div className="all-products">
                    <button
                        className="mark-popular-btn"
                        onClick={markAsPopular}
                        disabled={selectedProducts.length === 0}
                    >
                        Mark Popular
                    </button>
                    <ul className="product-list">
                        {products.map((product) => (
                            <li key={product._id} className="product-item">
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(product._id)}
                                    onChange={() => handleCheckboxChange(product._id)}
                                />
                                <img src={product.url} alt={product.name} className="product-img" />
                                <div className="product-info">
                                    <h4>{product.name}</h4>
                                    <p>{product.description}</p>
                                    <span className="price">${product.price}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {activeTab === 'popular' && (
                <div className="popular-products">
                    {popularProducts.length > 0 ? (
                        <ul className="product-list">
                            {popularProducts.map(({ _id, product }) => (
                                <li key={_id} className="product-item">
                                    <img src={product.url} alt={product.name} className="product-img" />
                                    <div className="product-info">
                                        <h4>{product.name}</h4>
                                        <p>{product.description}</p>
                                        <span className="price">${product.price}</span>
                                        <button
                                            className="delete-btn"
                                            onClick={() => deletePopularProduct(_id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No popular products yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PopularProduct;
