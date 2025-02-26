import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./PostForm.css";

let Font = ReactQuill.Quill.import("formats/font");
Font.whitelist = ["sans-serif", "vazir", "Times", "dast", "ava", "nastaliq"];
ReactQuill.Quill.register(Font, true);

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: ["sans-serif", "vazir", "Times", "dast", "ava", "nastaliq"] }],
  [{ align: [] }],
  ["clean"],
];

const tagOptions = [
  "Personal",
  "Technology",
  "News",
  "Jobs",
  "Hobbies",
  "Life",
  "Gadgets",
  "Games",
  "Programming",
  "Web Development",
  "Mobile Development",
  "Development",
  "AI",
  "Machine Learning",
];

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTags, setCustomTags] = useState("");
  const [date, setDate] = useState("");
  const [addToManual, setAddToManual] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/posts/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTitle(response.data.title);
          setContent(response.data.content);
          setImageUrl(response.data.imageUrl);
          setSelectedTags(response.data.tags || []);
          setDate(response.data.date ? response.data.date.split("T")[0] : "");
          setAddToManual(response.data.addToManual || false);
        } catch (err) {
          console.error("Error fetching post data:", err);
          setError("Error fetching post data");
        }
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const allTags = [
      ...selectedTags,
      ...customTags.split(",").map((tag) => tag.trim()),
    ].filter((tag) => tag);

    if (allTags.length === 0) {
      setError("Please select at least one tag or enter a custom tag.");
      return;
    }

    const postData = {
      title,
      content,
      imageUrl,
      tags: allTags,
      date,
      addToManual,
    };

    try {
      const baseUrl = process.env.REACT_APP_API_URL;
      const url = id ? `${baseUrl}/posts/${id}` : `${baseUrl}/posts`;
      const method = id ? "put" : "post";
      const response = await axios({
        method,
        url,
        data: postData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Post successful:", response.data);
      setTitle("");
      setContent("");
      setImageUrl("");
      setDate("");
      setAddToManual(false);
      setCustomTags("");
      setSelectedTags([]);
      alert("Post created/updated successfully");
      navigate("/");
    } catch (err) {
      console.error("Error posting data:", err);
      setError("Request failed");
    }
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    setSelectedTags((prevTags) =>
      prevTags.includes(value)
        ? prevTags.filter((tag) => tag !== value)
        : [...prevTags, value]
    );
  };

  const handleCheckboxChange = (e) => {
    setAddToManual(e.target.checked);
  };

  const handleCustomTagsChange = (e) => {
    setCustomTags(e.target.value);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{id ? "Edit Post" : "Create Post"}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            className="form-control"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Tags</label>
          <div>
            {tagOptions.map((tag) => (
              <div key={tag} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={tag}
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={handleTagChange}
                />
                <label className="form-check-label" htmlFor={tag}>
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="customTags">Custom Tags (comma separated)</label>
          <input
            type="text"
            id="customTags"
            className="form-control"
            placeholder="Enter custom tags"
            value={customTags}
            onChange={handleCustomTagsChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <ReactQuill
            id="content"
            value={content}
            onChange={setContent}
            modules={{ toolbar: toolbarOptions }}
            className="mb-3 bg-white content-container"
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="addToManual"
            checked={addToManual}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="addToManual">
            Add to Highlights on Home Page
          </label>
        </div>
        <button type="submit" className="submit-post_btn">
          {id ? "Update Post" : "Submit"}
        </button>
        <br />
        <br />
      </form>
    </div>
  );
};

export default PostForm;