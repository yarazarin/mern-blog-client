// src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import y from "../img/y.png";
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
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setLatestPosts(sortedPosts.slice(0, 5));
        setManualPosts(sortedPosts.filter((post) => post.addToManual));
      } catch (error) {
        console.error("Error fetching posts:", error);
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
              <img src={y} alt="Author" className="author-picture" />
              <div class="drop"></div>
              <div class="drop drop_2"></div>
            </div>

            <div className="about-container">
              <h2>About Me</h2>
              <p
                className="pre-type"
                dangerouslySetInnerHTML={{
                  __html: `I'm a proactive <b>Full-Stack</b> Web Developer specializing in the <b>M.E.R.N</b> stack with extensive experience in <b>AWS</b> deployment. With a background in diverse roles ranging from social media communications to warehouse management, I bring a unique blend of problem-solving skills and creativity to my work. Currently seeking opportunities full-stack development where I can leverage my expertise to create innovative web solutions and drive positive change.`,
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
                    <h5 className="card-title">Soon!</h5>
                    <p className="card-text"> </p>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card card_a">
                  <div className="card-body card-body_b">
                    <h5 className="card-title">Soon!</h5>
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
                    style={{ cursor: "pointer" }}
                  >
                    {post.title}
                  </li>
                ))
              ) : (
                <li className="manual-post_li">
                  No highlighted posts available
                </li>
              )}
            </ul>
          </div>

          <div className="container_books-menu">
            <h6 className="text-center h6_title h6_title-lastposts">
              last Posts
            </h6>
            <div className="books-menu">
              <div className="card-deck">
                {latestPosts.map((post) => (
                  <div className="card" key={post._id}>
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
