import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import "./AllPosts.css";

function isPersian(str) {
    const persianRegex = /[\u0600-\u06FF]/;
    return persianRegex.test(str);
}

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/posts`
                );
                setPosts(response.data);
            } catch (error) {
                console.error(
                    "Error fetching posts:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                Loading posts...
            </div>
        );
    }

    return (
        <div className="container all-posts-container">
            <h2 className="text-center my-4 all-posts-title">
                All Posts
            </h2>
            <div className="row">
                {posts.map((post) => (
                    <div
                        key={post._id}
                        className="col-12 col-md-6 col-lg-4 mb-4"
                    >
                        <Link
                            to={`/posts/${post._id}`}
                            className="text-decoration-none"
                        >
                            <div className="card h-100 shadow-sm all-posts-card">
                                {post.imageUrl && (
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="card-img-top all-posts-image"
                                    />
                                )}
                                <div
                                    className="card-body"
                                    style={{
                                        direction:
                                            isPersian(
                                                post.content
                                            )
                                                ? "rtl"
                                                : "ltr",
                                    }}
                                >
                                    <h5 className="card-title all-posts-title">
                                        {post.title}
                                    </h5>
                                    <p className="card-text text-muted all-posts-date">
                                        {format(
                                            parseISO(
                                                post.date
                                            ),
                                            "yyyy-MM-dd"
                                        )}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPosts;
