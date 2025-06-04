import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../../component/Layout";

export default function WriterDetail() {
  const { id } = useParams();
  const [writer, setWriter] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/writers/${id}`)
      .then((res) => res.json())
      .then((data) => setWriter(data))
      .catch((err) => console.error("Error fetching writer:", err));
  }, [id]);

  if (!writer) {
    return <Layout><div className="p-6">Loading writer...</div></Layout>;
  }

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Writer Details</h2>
        <p><strong>Name:</strong> {writer.name}</p>
        <p><strong>Designation:</strong> {writer.designation}</p>
        <p><strong>Description:</strong> {writer.englishDescription}</p>
        {/* Add more fields if available */}
      </div>
    </Layout>
  );
}
