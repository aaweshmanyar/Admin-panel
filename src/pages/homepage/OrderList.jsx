import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from '../firebase/firebaseConfig';
import Layout from '../../component/Layout';

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

const OrderList = () => {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const orderCollection = await db.collection('Orders').orderBy('created_at', 'desc').get();
                const fetchedOrderData = orderCollection.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrderData(fetchedOrderData);
            } catch (error) {
                console.error("Error fetching orders: ", error);
            }
        };

        fetchOrderData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await db.collection('Orders').doc(id).delete();
            setOrderData(orderData.filter(order => order.id !== id));
        } catch (error) {
            console.error("Error deleting order: ", error);
        }
    };

    return (
        <Layout>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className='max-w-screen-lg mx-auto'>
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-2xl text-center font-bold mb-4">Order List</h2>
                        <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Mobile</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Currency</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Message</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Created At</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData.length > 0 ? (
                                    orderData.map(order => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">{order.order_id || "N/A"}</td>
                                            <td className="border border-gray-300 px-4 py-2">{order.name || "N/A"}</td>
                                            <td className="border border-gray-300 px-4 py-2">{order.email || "N/A"}</td>
                                            <td className="border border-gray-300 px-4 py-2">{order.mobile || "N/A"}</td>
                                            <td className="border border-gray-300 px-4 py-2">{order.amount || "N/A"}</td>
                                            <td className="border border-gray-300 px-4 py-2">{order.currency || "N/A"}</td>
                                            <td className="border border-gray-300 px-4 py-2">{order.status || "N/A"}</td>
                                            <td className="border border-gray-300 px-4 py-2">{order.title || "N/A"}</td>
                                            <td className="border border-gray-300 px-4 py-2 break-words">{order.message || "N/A"}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {order.created_at
                                                    ? new Date(order.created_at.toDate()).toLocaleString()
                                                    : "N/A"}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                <button 
                                                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                                    onClick={() => handleDelete(order.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11" className="text-center border border-gray-300 px-4 py-2">No orders available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderList;