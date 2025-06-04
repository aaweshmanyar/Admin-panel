import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../../component/Layout";

const TopicCard = ({ topic, about }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow hover:shadow-md transition w-full text-right">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{topic}</h3>
    </div>
  );
};

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:5000/topic"); // ✅ fixed
        const data = response.data;

        const filtered = data.filter((item) => item.isDeleted?.data?.[0] === 0);
        setTopics(filtered);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching topics.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          موضوعات کی فہرست
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Loading topics...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topics.map(({ id, topic, about }) => (
            <TopicCard key={id} topic={topic} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TopicList;
