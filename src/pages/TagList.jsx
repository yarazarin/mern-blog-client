import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  HexGrid,
  Layout,
  Hexagon,
} from "react-hexgrid";
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

        const counts = {};
        postsResponse.data.forEach((post) => {
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

  const maxR = tags.length > 0 ? Math.floor((tags.length - 1) / 5) : 0;
  const dynamicHeight = 400 + maxR * 200;
  const dynamicViewBoxHeight = 100 + maxR * 50;

  return (
    <div className="tag-list">
      <h2 className="blog_title">Tags</h2>

      <HexGrid width={600} height={dynamicHeight} viewBox={`-20 -20 100 ${dynamicViewBoxHeight}`}>
        <defs>
          <clipPath id="hex-clip">
            <polygon points="12,0 6,-10.392 -6,-10.392 -12,0 -6,10.392 6,10.392" />
          </clipPath>
        </defs>
        <Layout
          size={{ x: 12, y: 12 }}
          flat={true}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
        >
          {tags.map((tag, index) => (
            <Hexagon
              key={tag}
              q={index % 4}
              r={Math.floor(index / 4)}
              s={-(index % 4) - Math.floor(index / 4)}
              className="tag-hex"
            >
              <image
                x="-15"
                y="-15"
                width="50"
                height="50"
                href={`https://picsum.photos/20/20/?random=${index}`}
                opacity="0.5"
                clipPath="url(#hex-clip)"
              />
              <foreignObject
                x="-10"
                y="-10"
                width="20"
                height="20"
              >
                <Link
                  to={`/tags/${tag}`}
                  className="hex-content"
                  style={{ textDecoration: 'none' }}
                >
                  <span className="hex-title">{tag}</span>
                  <span className="hex-count">
                    {postCounts[tag] || 0}
                  </span>
                </Link>
              </foreignObject>
            </Hexagon>
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
};

export default TagList;
