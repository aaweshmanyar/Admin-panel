import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../../component/Layout";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/article/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching article:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Layout><p className="p-6">Loading...</p></Layout>;

  if (!article) return <Layout><p className="p-6">Article not found.</p></Layout>;

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-600 mb-2">Slug: {article.slug}</p>
        <p className="text-gray-600 mb-2">Topic: {article.topic}</p>
        <img
          src={`http://localhost:5000/uploads/${article.image}`}
          alt={article.title}
          className="w-full max-w-md object-cover mb-6"
        />
        <p>{article.content || "No content available."}</p>
      </div>
    </Layout>
  );
}
