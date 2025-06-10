import { useEffect, useState } from "react";
import Layout from "../../../component/Layout";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";


export default function WriterManagement() {
  const [writers, setWriters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/writers")
      .then((res) => res.json())
      .then((data) => setWriters(data))
      .catch((error) => console.error("Error fetching writers:", error));
  }, []);

  const filteredWriters = writers.filter((writer) => {
    const matchesSearch =
      writer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      writer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      !statusFilter || writer.status?.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredWriters.length / pageSize);
  const paginatedWriters = filteredWriters.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const statusBadge = (status) => {
    const baseClass =
      "px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full";
    switch (status?.toLowerCase()) {
      case "active":
        return <span className={`${baseClass} bg-green-100 text-green-700`}>Active</span>;
      case "pending":
        return <span className={`${baseClass} bg-yellow-100 text-yellow-700`}>Pending</span>;
      case "suspended":
        return <span className={`${baseClass} bg-red-100 text-red-700`}>Suspended</span>;
      default:
        return <span className={`${baseClass} bg-gray-100 text-gray-700`}>Unknown</span>;
    }
  };

  return (
    <Layout>
      <div id="writers" className="content-section p-6">
        <div className="card animate-fadeInUp">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold text-gray-700">Manage Writers</h2>
            <button className="btn btn-primary">
              <i className="bi bi-person-plus-fill"></i>
              <span>Add New Writer</span>
            </button>
          </div>

          <div className="mb-6 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
            <input
              type="text"
              placeholder="Search writers by name or email..."
              className="form-input flex-grow"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <select
              className="form-select w-full md:w-auto"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending Approval</option>
              <option value="suspended">Suspended</option>
            </select>
            <button className="btn btn-secondary">
              <i className="bi bi-funnel"></i>
              <span>Filter</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-header-cell">Name</th>
                  <th className="table-header-cell">Email</th>
                  <th className="table-header-cell">Articles</th>
                  <th className="table-header-cell">Joined</th>
                  <th className="table-header-cell">Status</th>
                  <th className="table-header-cell">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedWriters.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">
                      No writers found
                    </td>
                  </tr>
                ) : (
                  paginatedWriters.map((writer) => (
                    <tr key={writer.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="table-body-cell font-medium text-gray-900">{writer.name}</td>
                      <td className="table-body-cell text-gray-500">{writer.email}</td>
                      <td className="table-body-cell text-gray-500 text-center">{writer.articleCount || 0}</td>
                      <td className="table-body-cell text-gray-500">
                        {new Date(writer.createdAt).toLocaleDateString()}
                      </td>
                      <td className="table-body-cell">{statusBadge(writer.status)}</td>
                      <td className="table-body-cell space-x-3">
                        <button className="table-action-icon" title="Edit">
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          className="table-action-icon"
                          title="View Profile"
                          onClick={() => navigate(`/writers/${writer.id}`)}
                        >
                          <i className="bi bi-eye-fill"></i>
                        </button>
                        <button className="table-action-icon table-action-delete" title="Delete">
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Showing {paginatedWriters.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, filteredWriters.length)} of{" "}
              {filteredWriters.length} Writers
            </span>
            <div className="inline-flex rounded-md shadow-sm -space-x-px">
              <button
                className="btn btn-secondary !rounded-r-none !py-1.5 !px-3 text-sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button
                className="btn btn-secondary !rounded-l-none !py-1.5 !px-3 text-sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
