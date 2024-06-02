//client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './pages/PostList';
import PostForm from './pages/PostForm';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/myblog" element={<PostList />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<PostList />} />
            <Route path="/new" element={<PostForm />} />
            <Route path="/edit/:id" element={<PostForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;