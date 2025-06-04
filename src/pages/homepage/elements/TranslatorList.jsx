import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../../component/Layout";

export default function TranslatorList() {
    const [translators, setTranslators] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/translators") // adjust if your endpoint is different
            .then((res) => {
                setTranslators(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching translator data:", err);
                setLoading(false);
            });
    }, []);

    return (
        <Layout>    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-white p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Translators</h1>

            {loading ? (
                <div className="text-center text-lg text-gray-600">Loading...</div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {translators.map((translator, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <img
                                src={`http://localhost:5000/public_html/uploads/${translator.profilePic}`}
                                alt={translator.name}
                                className="w-full h-56 object-cover rounded-t-xl"
                            />
                            <div className="p-4 flex flex-col gap-2">
                                <h2 className="text-xl font-semibold text-gray-800">{translator.name}</h2>
                                <p className="text-sm text-blue-600 font-medium">{translator.designation}</p>
                                <p className="text-sm text-gray-600"><span className="font-semibold">English:</span> {translator.englishDescription}</p>
                                <p className="text-sm text-gray-600"><span className="font-semibold">Urdu:</span> {translator.urduDescription}</p>
                            </div>
                            <div className="px-4 pb-4 text-xs text-gray-400">
                                <p>Created on: {new Date(translator.createdOn).toLocaleDateString()}</p>
                                <p>Last updated: {new Date(translator.modifiedOn).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </Layout>

    );
}
