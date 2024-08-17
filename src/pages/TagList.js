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
      <h2 className="blog_title text-center">Tags</h2>
      <nav className="menu">
        <ol className="tag-list-ol">
          {tags.map((tag) => (
            <li key={tag} className="menu-item">
              <Link className="link-tags_counter" to={`/tags/${tag}`}>
                {tag} <span className="tag-count"></span>
              </Link>
              ({postCounts[tag] || 0})
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default TagList;