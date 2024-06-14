//client/src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./pages/PostList";
import PostForm from "./pages/PostForm";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import Navbar from "./components/Navbar";
import PostDetail from "./components/PostDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myblog" element={<PostList />} />
          <Route
            path="/new"
            element={
              <PrivateRoute>
                <PostForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <PostForm />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<PostList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;