// src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import y from "../img/y.jpg";
import "./Home.css";

const Home = () => {
    const [latestPosts, setLatestPosts] = useState([]);
    const [manualPosts, setManualPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/posts`
                );
                const sortedPosts = response.data.sort(
                    (a, b) =>
                        new Date(b.date) - new Date(a.date)
                );
                setLatestPosts(sortedPosts.slice(0, 5));
                setManualPosts(
                    sortedPosts.filter(
                        (post) => post.addToManual
                    )
                );
            } catch (error) {
                console.error(
                    "Error fetching posts:",
                    error
                );
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <div className="container">
                <div className="row second_container">
                    <div className="col-md-9 about_auther">
                        <div className="author-container">
                            <img
                                src={y}
                                alt="Author"
                                className="author-picture"
                            />
                            <div class="drop"></div>
                            <div class="drop drop_2"></div>
                        </div>

                        <div className="about-container">
                            <h2 className="about-title">
                                About Me
                            </h2>
                            <p
                                className="pre-type"
                                dangerouslySetInnerHTML={{
                                    __html: `<p>
  Hey! I'm Yara, a developer who loves building things for the web.</p>
<p>
  While I’m comfortable working across the entire MERN stack (MongoDB, Express, React, Node.js), I’ve found my true passion in frontend development.
  There’s something incredibly satisfying about turning ideas into beautiful, responsive, and user-friendly interfaces that me and people love to use.
</p>
<p>
  I enjoy the challenge of making designs come to life with React, crafting new smooth animations,
  and ensuring every interaction feels just right. Whether it’s optimizing performance or creating intuitive layouts, I’m all about building experiences that leave a lasting impression.
</p>
<p>
  When I’m not coding, you’ll probably find me exploring new frontend tools, sketching out UI ideas,
  or just geeking out over the latest web trends. Let’s create something awesome together!
  <br> Thanks for stopping by!
</p>`,
                                }}
                            ></p>
                        </div>
                    </div>
                </div>
                <div className="posts-container">
                    <div
                        id="postsCarousel"
                        className="carousel slide carousel_width"
                        data-ride="carousel"
                        data-interval="4000"
                    >
                        <h6 className="text-center h6_title">
                            <i class="fa-solid fa-basket-shopping"></i>
                        </h6>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="card card_a">
                                    <div className="card-body card-body_b">
                                        <h5 className="card-title">
                                            Soon!
                                        </h5>
                                        <p className="card-text">
                                            {" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="card card_a">
                                    <div className="card-body card-body_b">
                                        <h5 className="card-title">
                                            Soon!
                                        </h5>
                                        <p className="card-text"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a
                            className="carousel-control-prev"
                            href="#postsCarousel"
                            role="button"
                            data-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="sr-only"></span>
                        </a>
                        <a
                            className="carousel-control-next"
                            href="#postsCarousel"
                            role="button"
                            data-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="sr-only"></span>
                        </a>
                    </div>

                    {/* High lights Section */}
                    <div className="manual-posts">
                        <ul className="manual-post_ul">
                            <h6>Spacial Posts</h6>
                            {manualPosts.length > 0 ? (
                                manualPosts.map((post) => (
                                    <li
                                        key={post._id}
                                        className="manual-post_li"
                                        onClick={() =>
                                            (window.location.href = `/posts/${post._id}`)
                                        }
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    >
                                        {post.title}
                                    </li>
                                ))
                            ) : (
                                <li className="manual-post_li">
                                    No highlighted posts
                                    available
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="container_books-menu">
                        <h6 className="h6_title-lastposts">
                            last Posts
                        </h6>
                        <div className="books-menu">
                            <div className="card-deck">
                                {latestPosts.map((post) => (
                                    <div
                                        className="card"
                                        key={post._id}
                                    >
                                        <div className="card-body card-body_a">
                                            <h5 className="card-title card-title_last">
                                                {post.title}
                                            </h5>
                                            <Link
                                                to={`/posts/${post._id}`}
                                                className="btn read_it-btn"
                                            >
                                                read{" "}
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
