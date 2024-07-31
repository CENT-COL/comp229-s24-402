import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import Services from './pages/services';
import Contact from './pages/contact';
import About from './pages/about';
import Register from './pages/register';
import Login from './pages/login';
import Projectlist from './pages/project-list';
import ProjectDetails from './pages/project-details';
import 'bootstrap/dist/css/bootstrap.min.css';
import WebSocketComponent from './pages/websocket';
import PrivateRoute from './pages/private-route';
import { logout } from './auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
  
    if (token && username) {
      setUser({ username }); 
    }
  }, []); 

  const handleLogout = async () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    await logout();
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">      
            MyWebsite
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/projects">Projects</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/wschat">WebSockets</Link>
              </li>

            </ul>
            <ul className="navbar-nav ml-auto">
              {user ? (
                <>
                  <li className="nav-item">
                    <span className="navbar-text mr-3">Welcome, {user.username}</span>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <div className="container mt-4 text-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<PrivateRoute><Projectlist /></PrivateRoute>} />
            <Route path="/project-details" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
            <Route path="/project-details/:id" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/wschat" element={<WebSocketComponent />} />

          </Routes>
        </div>
        <nav className="navbar fixed-bottom navbar-light bg-light">
          <div className="container">
            <span className="navbar-text mx-auto">
              &copy; 2024 MyWebsite. All rights reserved.
            </span>
          </div>
        </nav>
      </div>
    </Router>
  );
}

export default App;