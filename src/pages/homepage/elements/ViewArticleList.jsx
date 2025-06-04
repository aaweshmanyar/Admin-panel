import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../component/Layout";

export default function ViewArticle() {
  const [articles, setArticles] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/article")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArticles.length / pageSize);
  const paginatedArticles = filteredArticles.slice(
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
          <div>
            <label className="mr-2 font-medium">Show:</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border px-2 py-1 rounded"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="Search article..."
            className="border px-3 py-1 rounded w-full sm:w-64"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 border">Title</th>
                <th className="text-left p-2 border">Slug</th>
                <th className="text-left p-2 border">Topic</th>
                <th className="text-left p-2 border">Image</th>
                <th className="text-left p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedArticles.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">No articles found</td>
                </tr>
              ) : (
                paginatedArticles.map((article) => (
                  <tr key={article.id} className="border-t hover:bg-gray-50">
                    <td className="p-2 border">{article.title}</td>
                    <td className="p-2 border">{article.slug}</td>
                    <td className="p-2 border">{article.topic}</td>
                    <td className="p-2 border">
                      <img
                        src={`http://localhost:5000/article/${article.image}`}
                        alt={article.title}
                        className="h-16 w-16 object-cover"
                      />
                    </td>
                    <td className="p-2 border">
                      <button
                        onClick={() => navigate(`article/${article.id}`)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            Showing {filteredArticles.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
            {Math.min(currentPage * pageSize, filteredArticles.length)} of {filteredArticles.length}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => goToPage(1)} disabled={currentPage === 1} className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">«</button>
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">‹</button>
            <span className="px-3 text-sm">Page {currentPage} of {totalPages}</span>
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">›</button>
            <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">»</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
