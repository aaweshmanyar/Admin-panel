import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../../component/Layout';

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the question list from the API
        axios.get('http://localhost:5000/question')
            .then(response => {
                setQuestions(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching data');
                setLoading(false);
            });
    }, []);

    // Function to render the HTML content safely
    const createMarkup = (html) => {
        return { __html: html };
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 font-semibold">{error}</div>;
    }

    return (
        <Layout>
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Question List</h1>
                <div className="space-y-8">
                    {questions.length === 0 ? (
                        <p className="text-center text-lg font-semibold text-gray-600">No questions available.</p>
                    ) : (
                        questions.map((question) => (
                            <div key={question.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">{question.question}</h2>
                                <p className="text-sm text-gray-500 mb-2"><strong>Slug:</strong> {question.slug}</p>
                                <p className="text-sm text-gray-500 mb-4"><strong>Tags:</strong> {question.tags}</p>
                                <p className="text-sm text-gray-500 mb-2"><strong>Date:</strong> {new Date(question.date).toLocaleDateString()}</p>
                                <div
                                    className="mt-4 text-sm text-gray-700"
                                    dangerouslySetInnerHTML={createMarkup(question.answer)}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default QuestionList;
