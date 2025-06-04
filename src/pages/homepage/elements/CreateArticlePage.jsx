import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ImageIcon,
  Type,
  FileText,
  Users,
  Globe,
  CalendarIcon,
  Hash,
  X,
} from "lucide-react";
import Layout from "../../../component/Layout";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Reusable Input Field
const TextInputField = ({ label, icon: Icon, ...props }) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4" />
      <label className="text-sm font-medium">{label}</label>
    </div>
    <input className="border rounded-lg p-2 w-full" {...props} />
  </div>
);

// Reusable Select Field
const SelectField = ({
  label,
  icon: Icon,
  options = [],
  value,
  onChange,
  placeholder,
}) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4" />
      <label className="text-sm font-medium">{label}</label>
    </div>
    <select
      value={value}
      onChange={onChange}
      className="border rounded-lg p-2 w-full"
    >
      <option value="">{placeholder}</option>
      {options.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name || item.topic || item.language}
        </option>
      ))}
    </select>
  </div>
);

export default function CreateArticlePage() {
  const [title, setTitle] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedWriter, setSelectedWriter] = useState("");
  const [selectedTranslator, setSelectedTranslator] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [topics, setTopics] = useState([]);
  const [language, setLanguage] = useState([]);
  const [translators, setTranslators] = useState([]);
  const [writers, setWriters] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [articleContent, setArticleContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [t, l, tr, w] = await Promise.all([
          axios.get("http://localhost:5000/topic"),
          axios.get("http://localhost:5000/language"),
          axios.get("http://localhost:5000/translators"),
          axios.get("http://localhost:5000/writers"),
        ]);
        setTopics(t.data);
        setLanguage(l.data);
        setTranslators(tr.data);
        setWriters(w.data);
      } catch (error) {
        console.error("Data fetching error:", error);
      }
    };
    fetchData();
  }, []);

  const handleImageUpload = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const articleData = {
        title,
        content: articleContent,
        topic: selectedTopic,
        writer: selectedWriter,
        translator: selectedTranslator,
        language: selectedLanguage,
        publicationDate,
      };

      const formData = new FormData();
      Object.entries(articleData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (featuredImage) {
        formData.append("featuredImage", featuredImage);
      }

      await axios.post("http://localhost:5000/articles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Article created successfully!");
    } catch (error) {
      console.error("Error submitting article:", error);
      alert("Failed to submit article.");
    }
  };

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
            {/* Featured Image Upload */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Featured Image</label>
              <label className="border border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer">
                <ImageIcon className="w-16 h-16 mb-4 text-muted-foreground" />
                <p className="text-base mb-1">Drop your image here, or click to browse</p>
                <p className="text-sm text-muted-foreground mb-4">Supported: PNG, JPG, GIF (max 5MB)</p>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <button className="border px-4 py-2 rounded-md text-sm bg-transparent border-gray-400 hover:border-gray-500">
                  Browse Files
                </button>
              </label>
              {featuredImage && <p className="text-sm mt-2">Selected: {featuredImage.name}</p>}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <TextInputField
                  label="Article Title"
                  icon={Type}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your article title"
                />

                {/* CKEditor Section */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4" />
                    <label className="text-sm font-medium">Content</label>
                  </div>
                  <CKEditor
                    editor={ClassicEditor}
                    data={articleContent}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setArticleContent(data);
                    }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <SelectField
                  label="Topic"
                  icon={FileText}
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  options={topics}
                  placeholder="Select a topic"
                />
                <SelectField
                  label="Writer"
                  icon={Users}
                  value={selectedWriter}
                  onChange={(e) => setSelectedWriter(e.target.value)}
                  options={writers}
                  placeholder="Select a writer"
                />
                <SelectField
                  label="Translator"
                  icon={Users}
                  value={selectedTranslator}
                  onChange={(e) => setSelectedTranslator(e.target.value)}
                  options={translators}
                  placeholder="Select a translator"
                />
                <SelectField
                  label="Language"
                  icon={Globe}
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  options={language}
                  placeholder="Select a language"
                />
                <TextInputField
                  label="Publication Date"
                  icon={CalendarIcon}
                  type="date"
                  value={publicationDate}
                  onChange={(e) => setPublicationDate(e.target.value)}
                />

                {/* Static Tags Placeholder */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="w-4 h-4" />
                    <label className="text-sm font-medium">Tags</label>
                  </div>
                  <input type="text" placeholder="Add tags..." className="border rounded-lg p-2 w-full mb-3" />
                  <div className="flex flex-wrap gap-2">
                    {["Technology", "Web"].map((tag) => (
                      <span key={tag} className="flex items-center gap-1 py-1 px-2 bg-gray-100 rounded">
                        {tag}
                        <button className="text-gray-600">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center gap-4 mt-10">
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete</button>
              <button className="border border-gray-400 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100">Cancel</button>
              <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-md">Save as Draft</button>
              <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
