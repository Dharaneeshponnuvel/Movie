import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/admin-login', formData);
            if (response.data.success) {
                localStorage.setItem('isAdmin', 'true'); // Storing admin status
                localStorage.setItem('adminToken', response.data.token);
                navigate('/admin/dashboard');
            } else {
                alert('Invalid credentials');
            }
        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <div className="form-wrapper">
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Admin Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Admin Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;
