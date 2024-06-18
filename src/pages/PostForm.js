//src/pages/PostForm.js

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
            `https://mern-blog-server-bd5b7d4cacb2.herokuapp.com/posts/${id}`,
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
  
    let imageUrl = "";
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
  
      try {
        const uploadResponse = await axios.post(
          "https://github.com/yarazarin/mern-blog-server/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageUrl = uploadResponse.data.url;
      } catch (err) {
        console.error("Error uploading image:", err);
        setError("Request failed: " + err.message);
        return;
      }
    }
  
    try {
      const url = id
        ? `https://mern-blog-server-bd5b7d4cacb2.herokuapp.com/posts/${id}`
        : "https://mern-blog-server-bd5b7d4cacb2.herokuapp.com/posts";
      const method = id ? "put" : "post";
      const response = await axios({
        method,
        url,
        data: {
          title,
          content,
          imageUrl, // Include the image URL in the post data
        },
        headers: {
          Authorization: `Bearer ${token}`,
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
};

export default PostForm;
