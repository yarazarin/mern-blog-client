// // src/pages/Home.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
// import ya from "../img/ya.png";
// import "./Home.css";

const Home = () => {
//   const [latestPosts, setLatestPosts] = useState([]);
//   const [manualPosts, setManualPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/posts`
//         );
//         const sortedPosts = response.data.sort(
//           (a, b) => new Date(b.date) - new Date(a.date)
//         );
//         setLatestPosts(sortedPosts.slice(0, 5));
//         setManualPosts(sortedPosts.filter((post) => post.addToManual));
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

  return (
    <>
      <div className="container">
hi
      </div>
    </>
  );
};

export default Home;
