import React, { useState } from "react";
import { CloudUploadIcon } from "lucide-react";
import Layout from "../../../component/Layout";

export default function CreateWriterForm() {
  const [isTeamMember, setIsTeamMember] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    englishDescription: "",
    urduDescription: ""
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Create FormData object with a different name (formDataToSend)
    const formDataToSend = new FormData();
    
    // Append values from your state (formData)
    formDataToSend.append("name", formData.name);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("englishDescription", formData.englishDescription);
    formDataToSend.append("urduDescription", formData.urduDescription);
    formDataToSend.append("teamMember", isTeamMember);
    
    if (profilePic) {
      formDataToSend.append("photo", profilePic);
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/writers", {
        method: "POST",
        body: formDataToSend, // Use the correct variable here
      });
  
      const data = await response.json();
      if (!response.ok) throw data;
  
      alert("Writer created successfully!");
      
      // Reset form after successful submission
      setFormData({
        name: "",
        designation: "",
        englishDescription: "",
        urduDescription: ""
      });
      setIsTeamMember(false);
      setProfilePic(null);
      setPreview(null);
      
    } catch (error) {
      console.error("Full error:", error);
      alert(`Error: ${error.error}\nDetails: ${error.details}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Create Writer</h1>
          <p className="text-gray-500">Add a new writer to your team</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <h3 className="text-base font-medium mb-4">Profile Pic</h3>
                <label
                  htmlFor="profile-upload"
                  className="relative border-2 border-dashed border-gray-300 rounded-full w-48 h-48 flex items-center justify-center cursor-pointer overflow-hidden group"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <CloudUploadIcon className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500">Click to upload</p>
                    </div>
                  )}
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium">Team Member</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="teamMember"
                      checked={isTeamMember}
                      onChange={(e) => setIsTeamMember(e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="teamMember" className="text-sm text-gray-700">
                      Check if team member
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    id="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                    Designation<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    id="designation"
                    placeholder="Enter designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="englishDescription" className="block text-sm font-medium text-gray-700">
                    English Description<span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    id="englishDescription"
                    placeholder="Write your description here..."
                    rows={5}
                    value={formData.englishDescription}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="urduDescription" className="block text-sm font-medium text-gray-700">
                    Urdu Description<span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    id="urduDescription"
                    placeholder="Write your description here..."
                    rows={5}
                    value={formData.urduDescription}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Creating...' : 'Create Writer'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}