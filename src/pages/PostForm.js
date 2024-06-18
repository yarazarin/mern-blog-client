//src/pages/PostForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./PostForm.css";

let Font = ReactQuill.Quill.import("formats/font");
// Add 'dast' and 'ava' to the whitelist
Font.whitelist = ["sans-serif", "vazir", "Times", "dast", "ava", "nastaliq"];
// Register the updated 'font' format
ReactQuill.Quill.register(Font, true);

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: ["sans-serif", "vazir", "Times", "dast", "ava", "nastaliq"] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(
            `https://yarazarin.github.io/mern-blog-client/posts/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTitle(response.data.title);
          setContent(response.data.content);
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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const url = id
        ? `https://yarazarin.github.io/mern-blog-client/posts/${id}`
        : "https://yarazarin.github.io/mern-blog-client/posts";
      const method = id ? "put" : "post";
      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Post successful:", response.data);
      setTitle("");
      setContent("");
      setImage(null);
      alert("Post created/updated successfully");
      navigate("/");
    } catch (err) {
      console.error("Error posting data:", err);
      setError("Request failed");
    }
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
          
          <label htmlFor="content">Content</label>
          <ReactQuill
            id="content"
            value={content}
            onChange={setContent}
            modules={{ toolbar: toolbarOptions }}
            className="mb-3 bg-white content-container"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            className="form-control-file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3 mb-5">
          {id ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
}
export default PostForm;