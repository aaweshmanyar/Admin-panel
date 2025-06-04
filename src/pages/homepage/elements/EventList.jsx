import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../../component/Layout";

const EventCard = ({ id, title, content, eventDate, views, expandedId, setExpandedId }) => {
  const isExpanded = expandedId === id;

  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 ease-in-out flex flex-col justify-between h-full ${
        isExpanded ? "col-span-full" : ""
      }`}
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>

      <div
        className={`text-sm text-gray-700 mb-4 transition-all duration-300 ${
          isExpanded ? "" : "line-clamp-5"
        }`}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <button
        className="text-black-600 text-sm font-medium hover:underline self-start mb-4"
        onClick={() => setExpandedId(isExpanded ? null : id)}
      >
        {isExpanded ? "Read Less ▲" : "Read More ▼"}
      </button>

      <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
        <p className="flex items-center gap-1">📅 {new Date(eventDate).toLocaleDateString()}</p>
        <p className="flex items-center gap-1">👁️ {views} views</p>
      </div>
    </div>
  );
};

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/event");
        const data = res.data;
        const filtered = data.filter(item => item.isDeleted?.data?.[0] === 0);
        setEvents(filtered);
      } catch (err) {
        console.error(err);
        setError("Error fetching events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">📚 Upcoming Events</h2>
          <p className="text-gray-600 text-lg">
            Stay updated with our latest events, sessions, and activities!
          </p>
        </div>

        {loading && <p className="text-center text-gray-500 text-lg">Loading events...</p>}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {events.map(({ id, title, content, eventDate, views }) => (
            <EventCard
              key={id}
              id={id}
              title={title}
              content={content}
              eventDate={eventDate}
              views={views}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default EventList;
