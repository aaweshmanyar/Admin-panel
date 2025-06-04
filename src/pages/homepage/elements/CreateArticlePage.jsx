import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon, ImageIcon, Type, FileText, Users, Globe,
  CalendarIcon as CalendarIconOutline, Hash, X
} from "lucide-react";
import Layout from "../../../component/Layout";
import axios from "axios";

export default function CreateArticlePage() {
  const [publicationDate, setPublicationDate] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedWriter, setSelectedWriter] = useState("");
  const [selectedTranslator, setSelectedTranslator] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [topics, setTopics] = useState([]);
  const [language, setLanguage] = useState([]);
  const [translators, setTranslators] = useState([]);
  const [writers, setWriters] = useState([]);

  const handleDateChange = (e) => setPublicationDate(e.target.value);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:5000/topic");
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, []);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/language");
        setLanguage(response.data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchTranslators = async () => {
      try {
        const response = await axios.get("http://localhost:5000/translators");
        setTranslators(response.data);
      } catch (error) {
        console.error("Error fetching translators:", error);
      }
    };
    fetchTranslators();
  }, []);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const response = await axios.get("http://localhost:5000/writers");
        setWriters(response.data);
      } catch (error) {
        console.error("Error fetching writers:", error);
      }
    };
    fetchWriters();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <span>&gt;</span>
            <Link to="/articles" className="hover:text-foreground">Articles</Link>
            <span>&gt;</span>
            <span className="text-foreground">Create Article</span>
          </div>

          <h1 className="text-2xl font-bold mb-8">Create Article</h1>

          <div className="bg-slate-50 rounded-lg p-8">
            {/* Featured Image */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Featured Image</label>
              <div className="border border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 mb-4 text-muted-foreground">
                  <ImageIcon className="w-full h-full" />
                </div>
                <p className="text-base mb-1">Drop your image here, or click to browse</p>
                <p className="text-sm text-muted-foreground mb-4">Supported formats: PNG, JPG, GIF (max 5MB)</p>
                <button className="border px-4 py-2 rounded-md text-sm bg-transparent border-gray-400 hover:border-gray-500">
                  Browse Files
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Article Title */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Type className="w-4 h-4" />
                    <label className="text-sm font-medium">Article Title</label>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your article title"
                    className="border rounded-lg p-2 w-full"
                  />
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4" />
                    <label className="text-sm font-medium">Content</label>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="border-b p-2 flex gap-2">
                      <button className="border px-2 py-1 text-sm font-bold">B</button>
                      <button className="border px-2 py-1 text-sm italic">I</button>
                      <button className="border px-2 py-1 text-sm underline">U</button>
                    </div>
                    <textarea
                      placeholder="Start writing your article..."
                      className="border-0 rounded-none min-h-[200px] w-full p-2"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Topic */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4" />
                    <label className="text-sm font-medium">Topic</label>
                  </div>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">Select a topic</option>
                    {topics.map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.topic}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Writers */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4" />
                    <label className="text-sm font-medium">Writers</label>
                  </div>
                  <select
                    value={selectedWriter}
                    onChange={(e) => setSelectedWriter(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">Select a writer</option>
                    {writers.map((writer) => (
                      <option key={writer.id} value={writer.id}>
                        {writer.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Translator - Dynamic */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4" />
                    <label className="text-sm font-medium">Translator</label>
                  </div>
                  <select
                    value={selectedTranslator}
                    onChange={(e) => setSelectedTranslator(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">Select a translator</option>
                    {translators.map((translator) => (
                      <option key={translator.id} value={translator.id}>
                        {translator.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Language - Dynamic */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4" />
                    <label className="text-sm font-medium">Language</label>
                  </div>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">Select language</option>
                    {language.map((lang) => (
                      <option key={lang.id} value={lang.id}>
                        {lang.language}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Publication Date */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarIconOutline className="w-4 h-4" />
                    <label className="text-sm font-medium">Publication Date</label>
                  </div>
                  <input
                    type="date"
                    value={publicationDate}
                    onChange={handleDateChange}
                    className="border rounded-lg p-2 w-full"
                  />
                </div>

                {/* Tags */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="w-4 h-4" />
                    <label className="text-sm font-medium">Tags</label>
                  </div>
                  <input
                    type="text"
                    placeholder="Add tags..."
                    className="border rounded-lg p-2 w-full mb-3"
                  />
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 py-1 px-2 bg-gray-100">
                      Technology
                      <button className="border px-2 py-1 text-xs text-gray-600">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                    <span className="flex items-center gap-1 py-1 px-2 bg-gray-100">
                      Web
                      <button className="border px-2 py-1 text-xs text-gray-600">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center gap-4 mt-10">
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete Article</button>
              <button className="border border-gray-400 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100">Cancel</button>
              <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-md">Save as Draft</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Publish Article</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
