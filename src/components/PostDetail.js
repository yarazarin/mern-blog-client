import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Image,
    Alert,
    Spinner,
    Button,
} from "react-bootstrap";
import "./PostDetail.css";

const convertLinksToImages = (content) => {
    const imageUrlRegex = /(https?:\/\/[^\s]+?\.(?:png|jpg|jpeg|gif|webp))/gi;
    return content.replace(
        imageUrlRegex,
        (url) =>
            `<img src="${url}" alt="image" style="max-width:60%; height:auto; display:block; margin: 0 auto;" />`
    );
};

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/posts/${id}`
                );
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching the post:", error);
                setError("Error fetching the post");
            }
        };

        fetchPost();
    }, [id]);

    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: post.title,
                    url: window.location.href,
                })
                .then(() => console.log("Successful share"))
                .catch((error) => console.log("Error sharing", error));
        } else {
            alert("Share feature is not supported in your browser.");
        }
    };

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
        <>
            <div className="post-detail">
                <Container className="mt-5 mb-5 det-container">
                    <Row className="justify-content-center">
                        <Col lg="8">
                            <article>
                                <Button
                                    variant=""
                                    className="share-btn"
                                    onClick={handleShare}
                                >
                                    <i className="fa-solid fa-arrow-up-from-bracket"></i>{" "}
                                    share
                                </Button>
                                <h1 className="display-4 mb-4 det-titel">
                                    {post.title}
                                </h1>
                                {/* Conditionally render the image */}
                                {post.imageUrl && (
                                    <Image
                                        src={post.imageUrl}
                                        alt={post.title}
                                        fluid
                                        className="mb-4 rounded det-img"
                                    />
                                )}
                                <div
                                    className="post-content"
                                    dangerouslySetInnerHTML={{
                                        __html: convertLinksToImages(
                                            post.content
                                        ),
                                    }}
                                />
                                <hr className="my-5" />
                                <div className="author-info text-muted">
                                    <p className="date_">
                                        {post.date
                                            ? new Date(
                                                  post.date
                                              ).toLocaleDateString(undefined, {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                              })
                                            : "Date not available"}
                                    </p>
                                </div>
                                <div className="post-tags mt-3">
                                    {post.tags &&
                                        post.tags.map((tag, index) => (
                                            <Link
                                                to={`/tags/${tag}`}
                                                key={index}
                                                className="badge badge-secondary mr-2"
                                            >
                                                {tag}
                                            </Link>
                                        ))}
                                </div>
                            </article>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default PostDetail;
