import React, { useState } from "react";
import Layout from "../../../component/Layout";

export default function CreateQuestionsForm() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Layout>
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Create Questions</h1>

      <div className="border rounded-md shadow-sm">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="question" className="text-sm font-medium">
              Question<span className="text-red-500">*</span>
            </label>
            <input id="question" placeholder="Enter your question here" className="w-full border px-3 py-2 rounded-md" />
          </div>

          <div className="space-y-2">
            <label htmlFor="answer" className="text-sm font-medium">
              Answer<span className="text-red-500">*</span>
            </label>
            <div className="border rounded-md">
              <div className="flex items-center p-2 border-b">
                {["B", "I", "U", "S"].map((style, idx) => (
                  <button key={idx} className="h-8 w-8 text-sm font-bold hover:bg-gray-100 rounded">
                    {style}
                  </button>
                ))}
                <div className="mx-1 h-6 border-l" />
              </div>
              <div className="p-3 min-h-[200px]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="writer" className="text-sm font-medium">
                Writer<span className="text-red-500">*</span>
              </label>
              <select className="w-full border rounded-md px-3 py-2">
                <option>Choose Writer</option>
                <option value="writer1">Writer 1</option>
                <option value="writer2">Writer 2</option>
                <option value="writer3">Writer 3</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input id="date" type="text" value="2025-04-15" readOnly className="w-full border rounded-md px-3 py-2" />
                <button className="absolute right-0 top-0 h-full px-3 text-gray-500">📅</button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="language" className="text-sm font-medium">
                Language<span className="text-red-500">*</span>
              </label>
              <select className="w-full border rounded-md px-3 py-2">
                <option>Choose Language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="arabic">Arabic</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Tags<span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-1 border rounded-md p-2">
                {tags.map((tag, index) => (
                  <div key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-md flex items-center">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 text-gray-500 hover:text-gray-700">
                      &times;
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Add tags..."
                  className="flex-1 outline-none border-none bg-transparent text-sm min-w-[100px]"
                />
              </div>
            </div>
          </div>

          <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center text-center">
            <div className="mb-4 text-gray-300 text-4xl">🖼️</div>
            <p className="text-gray-500 mb-4">Drag and drop your images here</p>
            <button className="border rounded px-4 py-2 text-sm">Browse Images</button>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button className="border rounded px-4 py-2">Cancel</button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Create Questions</button>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500">
        © 2024 | All rights reserved | Designed & Developed by AIQalamArts
      </footer>
    </div>
    </Layout>
  );
}
