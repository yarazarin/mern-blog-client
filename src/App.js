// client/src/App.js
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
    <Router basename="/mern-blog-client">
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <PrivateRoute path="/myblog" element={<PostList />} />
          <PrivateRoute path="/">
            <Route path="/new" element={<PostForm />} />
            <Route path="/edit/:id" element={<PostForm />} />
          </PrivateRoute>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
