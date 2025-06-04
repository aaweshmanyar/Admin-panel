import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../../component/Layout";

const FeedbackCard = ({ feedback }) => {
  return (
    
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{feedback.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{feedback.feedback}</p>
      <div className="text-sm text-gray-500 space-y-1">
        <p><span className="font-medium">Name:</span> {feedback.name}</p>
        <p><span className="font-medium">Email:</span> {feedback.email}</p>
        <p><span className="font-medium">Type:</span> {feedback.feedbackType}</p>
        <p><span className="font-medium">Submitted:</span> {new Date(feedback.createdOn).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/feedback`);
        console.log("Fetched data:", res.data);

        // Optional: adjust this based on your actual backend structure
        const filtered = res.data.filter(item => item.isDeleted?.data?.[0] === 0);
        setFeedbacks(filtered);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("Failed to fetch feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <Layout>
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">User Feedback</h2>

      {loading && <p className="text-center text-gray-500">Loading feedbacks...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {feedbacks.map(feedback => (
          <FeedbackCard key={feedback.id} feedback={feedback} />
        ))}
      </div>
    </div>
</Layout>
  );
};

export default FeedbackList;
