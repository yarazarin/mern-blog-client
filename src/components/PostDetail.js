import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Alert, Spinner } from 'react-bootstrap';
import './PostDetail.css'; // Import custom CSS for additional styling

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
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!post) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5 det-container">
      <Row className="justify-content-center">
        <Col lg="8">
          <article>
            <h1 className="display-4 mb-4 det-titel">{post.title}</h1>
            <Image src={post.imageUrl} alt={post.title} fluid className="mb-4 rounded det-img" />
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            <hr className="my-5" />
            <div className="author-info text-muted">
              <p>Written by {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </article>
        </Col>
      </Row>
    </Container>
  );
};

export default PostDetail;
