import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserCircle } from "lucide-react";
import Layout from "../../../component/Layout";

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
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
                <h1 className="mb-8 text-4xl font-extrabold text-gray-800 text-center">Admin Management</h1>

                {loading ? (
                    <div className="text-center text-lg font-medium text-gray-500">Loading...</div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {admins.map((admin, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <UserCircle className="h-12 w-12 text-blue-600" />
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                {admin.fname} {admin.lname}
                                            </h2>
                                            <p className="text-sm text-gray-500">{admin.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 text-sm text-gray-600">
                                    <p><span className="font-medium">Role:</span> {admin.role === 0 ? "Super Admin" : "Admin"}</p>
                                    <p><span className="font-medium">Created On:</span> {new Date(admin.createdOn).toLocaleDateString()}</p>
                                    <p><span className="font-medium">Modified On:</span> {new Date(admin.modifiedOn).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
