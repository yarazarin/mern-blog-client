//client/src/pages/PostList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./PostList.css";

function isPersian(str) {
  const persianRegex = /[\u0600-\u06FF]/;
  return persianRegex.test(str);
}

function truncate(str, no_words) {
  return str.split(" ").splice(0, no_words).join(" ");
}

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setSelectedPost(null);
  const handleShow = (post) => setSelectedPost(post);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const isAuth = !!localStorage.getItem("token");

  const searchFilter = (post) => {
    const term = searchTerm.trim().toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term)
    );
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Welcome to my Blog</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="card-deck">
        {posts.filter(searchFilter).map((post) => (
          <div
            key={post._id}
            className="card mb-4"
            onClick={() => handleShow(post)}
          >
            {post.image && (
              <img
                src={`http://localhost:5000/uploads/${post.image}`}
                alt={post.title}
                className="card-img-top post-image"
              />
            )}
            <div
              className="card-body"
              style={{ direction: isPersian(post.content) ? "rtl" : "ltr" }}
            >
              <h5 className="card-title">{post.title}</h5>
              <div
                className="card-text"
                dangerouslySetInnerHTML={{
                  __html: truncate(post.content, 5) + "...",
                }}
              ></div>
              {isAuth && (
                <>
                  <Link to={`/edit/${post._id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <button
                    onClick={(e) => handleDelete(post._id, e)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <Modal show={selectedPost !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              direction:
                selectedPost && isPersian(selectedPost.title) ? "rtl" : "ltr",
            }}
          >
            {selectedPost?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            direction:
              selectedPost && isPersian(selectedPost.content) ? "rtl" : "ltr",
          }}
        >
          {selectedPost?.image && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={`http://localhost:5000/uploads/${selectedPost.image}`}
                alt={selectedPost.title}
                className="post-image"
              />
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: selectedPost?.content }}></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostList;
