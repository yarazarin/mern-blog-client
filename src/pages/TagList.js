import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TagList.css";

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [postCounts, setPostCounts] = useState({});

  useEffect(() => {
    const fetchTagsAndPosts = async () => {
      try {
        const tagsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/tags`
        );
        setTags(tagsResponse.data);

        const postsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/posts`
        );
        const posts = postsResponse.data;

        const counts = {};
        posts.forEach((post) => {
          post.tags.forEach((tag) => {
            counts[tag] = (counts[tag] || 0) + 1;
          });
        });
        setPostCounts(counts);
      } catch (error) {
        console.error("Error fetching tags or posts:", error);
      }
    };

    fetchTagsAndPosts();
  }, []);

  return (
    <div className="tag-list">
      <h2 className="blog_title">Tags</h2>
      <ul className="tag-grid">
        {tags.map((tag) => (
          <li key={tag} className="tag-item">
            <Link className="tag-link" to={`/tags/${tag}`}>
              <span className="tag-name">{tag}</span>
              <span className="tag-count">({postCounts[tag] || 0})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
