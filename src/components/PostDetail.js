//client/src/components/PostDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://mern-blog-server-bd5b7d4cacb2.herokuapp.com/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching the post:', error);
        setError('Error fetching the post');
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      {post.image && <img src={`https://github.com/yarazarin/mern-blog-server/upload${post.image}`} alt={post.title} />}
    </div>
  );
};

export default PostDetail;