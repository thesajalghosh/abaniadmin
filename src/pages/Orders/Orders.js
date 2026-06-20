import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiUser, FiPhone, FiMail, FiMapPin, FiClock, FiCreditCard, FiShoppingBag } from 'react-icons/fi';
import './Orders.css';

const Orders = () => {
    const [activeTab, setActiveTab] = useState('new-order');
    const [allOrders, setAllOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const getAllOrder = async () => {
        try {
            const { data: get_all_orders } = await axios.get(`${process.env.REACT_APP_API}/api/v1/order/get-all-orders`);
            if (get_all_orders.success) {
                // Sort by creation date descending (newest first)
                const sortedOrders = (get_all_orders.orders || []).sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setAllOrders(sortedOrders);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/order/update-order-status/${orderId}`, {
                status: newStatus,
            });
            if (response.data.success) {
                getAllOrder(); // Refresh orders after update
            } else {
                console.error("Failed to update status:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    useEffect(() => {
        getAllOrder();
    }, []);

    // Reset pagination page when tab changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    function isToday(dateString) {
        if (!dateString) return false;
        const givenDate = new Date(dateString);
        const today = new Date();

        return (
            givenDate.getFullYear() === today.getFullYear() &&
            givenDate.getMonth() === today.getMonth() &&
            givenDate.getDate() === today.getDate()
        );
    }

    const getFilteredOrders = () => {
        if (!allOrders) return [];
        switch (activeTab) {
            case 'new-order':
                return allOrders.filter(order => isToday(order.createdAt) && order.orderStatus === "processing");
            case 'in-progress':
                return allOrders.filter(order => order.orderStatus === "processing");
            case 'completed':
                return allOrders.filter(order => order.orderStatus === "completed");
            case 'cancel-orders':
                return allOrders.filter(order => order.orderStatus === "canceled");
            case 'all-orders':
                return allOrders;
            default:
                return [];
        }
    };

    const filteredOrders = getFilteredOrders();
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    return (
        <div className="orders-page-container">
            <div className="orders-header-title">
                <h2>Orders pipeline</h2>
                <p>Manage customer orders status, shipping details, and time slots booking.</p>
            </div>

            <div className="tabs">
                <button
                    className={activeTab === 'new-order' ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick('new-order')}
                >
                    New Orders
                </button>
                <button
                    className={activeTab === 'in-progress' ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick('in-progress')}
                >
                    In Progress
                </button>
                <button
                    className={activeTab === 'completed' ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick('completed')}
                >
                    Completed
                </button>
                <button
                    className={activeTab === 'cancel-orders' ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick('cancel-orders')}
                >
                    Canceled
                </button>
                <button
                    className={activeTab === 'all-orders' ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick('all-orders')}
                >
                    All Orders
                </button>
            </div>
            
            <div className="content">
                {currentOrders.length > 0 ? (
                    <div className="orders-cards-list">
                        {currentOrders.map((order) => (
                            <OrderCard key={order._id} order={order} status={order.orderStatus} updateStatus={updateStatus} />
                        ))}
                    </div>
                ) : (
                    <div className="no-orders-placeholder">
                        <FiShoppingBag size={28} />
                        <p>No orders found in this pipeline tab.</p>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="pagination-container">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="pagination-btn"
                        >
                            Previous
                        </button>
                        <span className="pagination-info">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="pagination-btn"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;

const OrderCard = ({ order, status, updateStatus }) => {
    return (
        <div className="order-card" key={order._id}>
            <div className="order-card-header">
                <div className="order-meta-info">
                    <span className="order-id-label">ORDER #{order?._id?.substring(0, 8).toUpperCase()}...</span>
                    <span className={`status-pill status-${order?.orderStatus}`}>{order?.orderStatus}</span>
                </div>
                <div className="order-payment-box">
                    <FiCreditCard size={13} />
                    <span>{order?.paymentMode} ({order?.paymentStatus})</span>
                </div>
            </div>

            <div className="order-card-body-grid">
                <div className="order-info-col">
                    <div className="profile-badge-box">
                        <div className="badge-avatar">
                            {order?.user?.name ? order.user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="badge-details">
                            <span className="badge-name"><FiUser size={12} /> {order?.user?.name}</span>
                            <span className="badge-contact"><FiPhone size={12} /> {order?.user?.phone}</span>
                            <span className="badge-contact"><FiMail size={12} /> {order?.user?.email}</span>
                        </div>
                    </div>

                    <div className="order-address-box">
                        <h4><FiMapPin size={13} style={{ marginRight: '6px' }} /> Delivery Address</h4>
                        <p>{order?.address?.addressLine1}</p>
                        {order?.address?.addressLine2 && <p>{order?.address?.addressLine2}</p>}
                        {order?.address?.addressLine3 && <p>{order?.address?.addressLine3}</p>}
                        {order?.address?.landmark && <p className="landmark">Landmark: {order?.address?.landmark}</p>}
                        <p className="pincode">Pincode: {order?.address?.pincode}</p>
                    </div>

                    <div className="order-time-box">
                        <h4><FiClock size={13} style={{ marginRight: '6px' }} /> Booking details</h4>
                        <p><strong>Slot:</strong> {order?.timeSlot?.value}</p>
                        <p><strong>Date:</strong> {order?.bookingDate}</p>
                    </div>
                </div>

                <div className="order-items-col">
                    <h4><FiShoppingBag size={13} style={{ marginRight: '6px' }} /> Items Checklist</h4>
                    <div className="items-list-scrollable">
                        {(order?.items ?? [])?.map((item, index) => (
                            <div className="ordered-item-row" key={index}>
                                <img src={item?.product?.url} alt={item?.name} className="ordered-item-thumb" />
                                <div className="ordered-item-details">
                                    <h5>{item?.name}</h5>
                                    <span className="ordered-item-price">₹{item?.price}</span>
                                    <p className="ordered-item-desc">{item?.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="order-card-footer">
                <div className="total-billing-section">
                    <span className="total-billing-label">Total Amount Due</span>
                    <span className="total-billing-price">₹{order?.totalPrice}</span>
                </div>
                <div className="order-status-buttons">
                    {order?.orderStatus !== "processing" && (
                        <button className="status-btn in-progress" onClick={() => updateStatus(order?._id, 'processing')}>
                            In Progress
                        </button>
                    )}
                    {order?.orderStatus !== "completed" && (
                        <button className="status-btn completed" onClick={() => updateStatus(order?._id, 'completed')}>
                            Completed
                        </button>
                    )}
                    {order?.orderStatus !== "canceled" && (
                        <button className="status-btn canceled" onClick={() => updateStatus(order?._id, 'canceled')}>
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
