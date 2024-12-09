import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
    const [activeTab, setActiveTab] = useState('in-progress');
    const [allOrders, setAllOrders] = useState([]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const getAllOrder = async () => {
        try {
            const { data: get_all_orders } = await axios.get(`${process.env.REACT_APP_API}/api/v1/order/get-all-orders`);
            if (get_all_orders.success) {
                setAllOrders(get_all_orders.orders);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };
    // update-order-status/66ce12d33d52946b82057788
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

   

    return (
        <div className="orders-container">
            <div className="tabs">
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
                {activeTab === 'in-progress' &&
                    <div>
                        { allOrders && allOrders.filter(order => order.orderStatus === "processing")?.map((order) => (
                         <OrderCard order={order} status = {"processing"} updateStatus={updateStatus}/>
                        ))}
                    </div>
                }

                {activeTab === 'completed' &&
                    <div>
                        {allOrders.filter(order => order.orderStatus === "completed").map((order) => (
                            <OrderCard order={order} status = {"completed"} updateStatus={updateStatus}/>
                        ))}
                    </div>
                }

                {activeTab === 'cancel-orders' &&
                    <div>
                        {allOrders.filter(order => order.orderStatus === "canceled").map((order) => (
                            <OrderCard order={order} status = {"canceled"} updateStatus={updateStatus}/>
                        ))}
                    </div>
                }

                {activeTab === 'all-orders' &&
                    <div>
                        {allOrders.map((order) => (
                            <OrderCard orderCard order={order} status = {"canceled"} updateStatus={updateStatus}/>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
};

export default Orders;

const OrderCard = ({order,status, updateStatus})=> {

    return (
        <div className="order-card" key={order._id}>
        <div className="order-header">
            <div>
                <h3>Order ID: {order._id}</h3>
                <p>User: {order.user.name}</p>
                <p>Phone: {order.user.phone}</p>
                <p>Email: {order.user.email}</p>
            </div>
            <div>
                <p><strong>Payment:</strong> {order.paymentMode}</p>
                <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
            </div>
        </div>
        <div className="order-address">
            <p><strong>Address 1:</strong> {order.address.addressLine1}</p>
            <p><strong>Address 2:</strong> {order.address.addressLine2}</p>
            <p><strong>Address 3:</strong> {order.address.addressLine3}</p>
            <p>Landmark: {order.address.landmark}</p>
            <p>Pincode: {order.address.pincode}</p>
        </div>
        <div className="order-time">
            <p><strong>Time Slot:</strong> {order.timeSlot.value}</p>
            <p><strong>Booking Date:</strong> {order.bookingDate}</p>
        </div>
        <div className="order-items">
            <h4>Items:</h4>
            {order.items.map((item, index) => (
                <div className="item" key={index}>
                    <img src={item.product.url} alt={item.name} />
                    <div>
                        <h5>{item.name}</h5>
                        <p>Price: ₹{item.price}</p>
                        <p>Description: {item.description}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="order-footer">
            <div className="order_footer_lower_part">
                <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                <p><strong>Order Status:</strong> {order.orderStatus}</p>
            </div>
            <div className="order-status-buttons">
                {status !==  "processing" && <button className="status-btn in-progress" onClick={() => updateStatus(order._id, 'processing')}>In Progress</button>}
                {status !==  "completed" &&  <button className="status-btn completed" onClick={() => updateStatus(order._id, 'completed')}>Completed</button>}
                {status !==  "canceled" && <button className="status-btn canceled" onClick={() => updateStatus(order._id, 'canceled')}>Canceled</button>}
            </div>
        </div>
    </div>
    )
}

export {OrderCard}
