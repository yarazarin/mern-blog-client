import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navbar';
import Home from './pages/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './pages/PostForm';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router basename="/mern-blog-client">
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myblog" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/new" element={<PrivateRoute />}>
            <Route path="/new" element={<PostForm />} />
          </Route>
          <Route path="/edit/:id" element={<PrivateRoute />}>
            <Route path="/edit/:id" element={<PostForm />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
