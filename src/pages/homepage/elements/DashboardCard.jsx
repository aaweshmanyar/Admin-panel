import React from "react";
import Layout from "../../../component/Layout";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function DashboardOverview() {
  const staticCounts = {
    writerCount: 12,
    translatorCount: 8,
    bookCount: 25,
    unicodeBookCount: 5,
    adminCount: 4,
  };

  const recentActivity = [
    {
      user: "Aisha Kaur",
      action: "Added New Book",
      item: "The Silent Patient",
      date: "2024-06-03",
      status: "Published",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      user: "Rohan Sharma",
      action: "Updated Article",
      item: "AI in Healthcare",
      date: "2024-06-02",
      status: "Pending Review",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
    {
      user: "Priya Patel",
      action: "Registered Writer",
      item: "John Doe",
      date: "2024-06-01",
      status: "Active",
      statusColor: "bg-blue-100 text-blue-700",
    },
    {
      user: "Mike Ross",
      action: "Created Event",
      item: "Summer Book Fair",
      date: "2024-05-30",
      status: "Scheduled",
      statusColor: "bg-indigo-100 text-indigo-700",
    },
    {
      user: "Sarah Lee",
      action: "Deleted Topic",
      item: "Ancient History",
      date: "2024-05-29",
      status: "Archived",
      statusColor: "bg-red-100 text-red-700",
    },
  ];

  return (
    <Layout>
      {/* Inject custom button CSS */}
      <style>{`
        .btn {
          padding: 0.625rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .btn-primary {
          background-color: #4e5909;
          color: white;
        }
        .btn-primary:hover {
          background-color: #3a4207;
          box-shadow: 0 4px 12px rgba(78, 89, 9, 0.2);
        }
        .btn-secondary {
          background-color: #f0f2e0;
          color: #4e5909;
          border: 1px solid #d1d8a8;
        }
        .btn-secondary:hover {
          background-color: #e8eac4;
          border-color: #4e5909;
          color: #3a4207;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {/* Stat Cards */}
          {[
            {
              label: "Writers",
              icon: "bi-pencil-square",
              color: "text-yellow-500",
              count: staticCounts.writerCount,
            },
            {
              label: "Translators",
              icon: "bi-translate",
              color: "text-blue-500",
              count: staticCounts.translatorCount,
            },
            {
              label: "Books",
              icon: "bi-book-half",
              color: "text-green-500",
              count: staticCounts.bookCount,
            },
            {
              label: "Unicode Books",
              icon: "bi-journals",
              color: "text-red-500",
              count: staticCounts.unicodeBookCount,
            },
            {
              label: "Admins",
              icon: "bi-person-badge",
              color: "text-purple-500",
              count: staticCounts.adminCount,
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`stat-card cursor-pointer bg-white p-5 flex items-center justify-between transform transition duration-300 hover:-translate-y-1 hover:shadow-xl animate-fadeInUp stagger-delay-${
                idx + 1
              }`}
            >
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <i className={`bi ${card.icon} text-xl ${card.color}`}></i>
                  <h3 className="text-gray-500 text-sm font-medium">
                    {card.label}
                  </h3>
                </div>
                <p className="text-3xl font-bold text-gray-800">{card.count}</p>
                <a href="#" className="text-xs text-[#4e5909] hover:underline">
                  View all
                </a>
              </div>
              <button className="btn btn-primary text-xs py-1.5 px-2.5">
                <i className="bi bi-plus-lg"></i>
                <span>Add</span>
              </button>
            </div>
          ))}
        </div>

        {/* Recent Activity Table */}
        <div className="card animate-fadeInUp stagger-delay-6 bg-white p-6 shadow-sm rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Activity
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentActivity.map((entry, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entry.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#4e5909]">
                      {entry.item}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${entry.statusColor}`}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
