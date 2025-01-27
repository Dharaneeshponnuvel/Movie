import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import AdminLogin from './components/admin/adminlogin';
import AdminDashboard from './components/admin/admin-dashboard';
import UserDashboard from './components/dashboard';
import UserProfile from './components/profile';
import UserMovies from './components/movies';
import Movies from './components/admin/movies';
import Profile from './components/admin/profile';
import AdminUser from './components/admin/users';

import './nav.css';

function App() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    return (
        <Router>
            {/* Navbar integrated directly in App.js */}
            <nav>
                <ul>
                    {isAdmin ? (
                        <>
                            <li><Link to="/admin/dashboard">Dashboard</Link></li>
                            <li><Link to="/admin/profile">Profile</Link></li>
                            <li><Link to="/admin/movies">Movies</Link></li>
                            <li><Link to="/admin/users">Users</Link></li>

                        </>
                    ) : (
                        <>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/movies">Movies</Link></li>
                            {/* Fixed the closing tag issue */}
                            <li><Link to="/admin/login">Admin Login</Link></li>
                        </>
                    )}
                    <li>
                        {/* Improved the logout functionality */}
                        <Link to="/login" onClick={() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        }}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Route Configuration */}
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/movies" element={<UserMovies />} />
                <Route path="/admin/movies" element={<Movies />} />
                <Route path="/admin/profile" element={<Profile />} />
                <Route path="/admin/users" element={<AdminUser />} />
            </Routes>
        </Router>
    );
}

export default App;
