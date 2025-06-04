import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../../component/Layout";

export default function LanguagesGrid() {
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/languages") // replace with your actual API route
            .then((res) => {
                setLanguages(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching languages:", err);
                setLoading(false);
            });
    }, []);

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-4 py-10">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
                    Supported Languages
                </h1>

                {loading ? (
                    <div className="text-center text-lg text-gray-600">Loading...</div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {languages.map((lang, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl border p-6 text-center flex flex-col items-center"
                            >
                                <div className="text-5xl mb-2">🌐</div>
                                <h2 className="text-xl font-semibold text-gray-700">{lang.language}</h2>
                                <p className="text-sm text-gray-400 mt-1">
                                    Created on: {new Date(lang.createdOn).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
