import { useEffect, useState } from "react";
import Layout from "../../../component/Layout";
import { useNavigate } from "react-router-dom";

export default function WriterManagement() {
  const [writers, setWriters] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // 👈 For navigation

  useEffect(() => {
    fetch("http://localhost:5000/writers")
      .then((res) => res.json())
      .then((data) => setWriters(data))
      .catch((error) => console.error("Error fetching writers:", error));
  }, []);

  const filteredWriters = writers.filter(
    (writer) =>
      writer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      writer.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWriters.length / pageSize);
  const paginatedWriters = filteredWriters.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="pageSize" className="font-medium">
              Show:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border px-2 py-1 rounded focus:outline-none focus:ring"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Search writer..."
            className="border px-3 py-1 rounded w-full sm:w-64 focus:outline-none focus:ring"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Search writer by name or designation"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 border">Name</th>
                <th className="text-left p-2 border">Designation</th>
                <th className="text-left p-2 border">Description</th>
                <th className="text-left p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedWriters.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No writers found
                  </td>
                </tr>
              ) : (
                paginatedWriters.map((writer) => (
                  <tr key={writer.id} className="border-t hover:bg-gray-50">
                    <td className="p-2 border">{writer.name}</td>
                    <td className="p-2 border">{writer.designation}</td>
                    <td className="p-2 border">{writer.englishDescription}</td>
                    <td className="p-2 border space-x-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => navigate(`/writers/${writer.id}`)} // 👈 Navigates to details page
                      >
                        View
                      </button>
                      <button className="text-green-600 hover:underline">Edit</button>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            Showing{" "}
            {filteredWriters.length === 0
              ? 0
              : (currentPage - 1) * pageSize + 1}
            –{Math.min(currentPage * pageSize, filteredWriters.length)} of{" "}
            {filteredWriters.length}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              «
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              ‹
            </button>
            <span className="px-3 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              ›
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
