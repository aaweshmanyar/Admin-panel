// src/components/BookList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../../component/Layout";

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/data")
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <Layout>        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">📚 Books Library</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                    <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                        <img
                            src={`http://localhost:5000/data/${book.image}`} // ✅ Full image URL
                            alt={book.title}
                            className="w-full h-52 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">{book.title}</h2>
                            <a
                                href={`http://localhost:5000/data/${book.attachment}`} // ✅ Full PDF URL
                                download
                                className="block text-center bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition duration-200"
                            >
                                📥 Download PDF
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </Layout>

    );
};

export default BookList;
