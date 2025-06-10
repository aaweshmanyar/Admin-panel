import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../../component/Layout";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AdminList() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/admin")
            .then((res) => {
                setAdmins(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching admin data:", err);
                setLoading(false);
            });
    }, []);

    return (
        <Layout>
            <div id="admin" className="content-section p-6">
                <div className="card animate-fadeInUp bg-white shadow-md rounded-xl p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h2 className="text-xl font-semibold text-gray-700">Manage Admins</h2>
                        <button className="btn btn-primary flex items-center gap-2 bg-[#4e5909] hover:bg-[#3a4207] text-white px-4 py-2 rounded-md transition">
                            <i className="bi bi-plus-circle-fill"></i>
                            <span>Add New Admin</span>
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center text-gray-500 font-medium py-8">Loading...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="table-header-cell text-left px-4 py-3 font-semibold text-gray-600">Name</th>
                                        <th className="table-header-cell text-left px-4 py-3 font-semibold text-gray-600">Email</th>
                                        <th className="table-header-cell text-left px-4 py-3 font-semibold text-gray-600">Role</th>
                                        <th className="table-header-cell text-left px-4 py-3 font-semibold text-gray-600">Created On</th>
                                        <th className="table-header-cell text-left px-4 py-3 font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {admins.map((admin, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="table-body-cell px-4 py-3 font-medium text-gray-900">
                                                {admin.fname} {admin.lname}
                                            </td>
                                            <td className="table-body-cell px-4 py-3 text-gray-500">{admin.email}</td>
                                            <td className="table-body-cell px-4 py-3 text-gray-500">{admin.role === 0 ? "Super Admin" : "Admin"}</td>
                                            <td className="table-body-cell px-4 py-3 text-gray-500">
                                                {new Date(admin.createdOn).toLocaleDateString()}
                                            </td>
                                            <td className="table-body-cell px-4 py-3 space-x-3">
                                                <button className="table-action-icon text-blue-600 hover:text-blue-800" title="Edit">
                                                    <i className="bi bi-pencil-fill"></i>
                                                </button>
                                                <button className="table-action-icon text-red-600 hover:text-red-800" title="Delete">
                                                    <i className="bi bi-trash-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
