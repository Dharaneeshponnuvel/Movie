import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Only import useNavigate
import "./register.css";

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        Address: '',
        Gender: '',
    });

    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            alert('Registration successful!');
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert('Registration failed');
        }
    };

    // Function to handle navigation to the login page
    const handleLoginRedirect = () => {
        navigate('/login'); // Use navigate instead of history.push
    };

    return (
        <div className="form-wrapper">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <label>Username</label>
                </div>
                <div className="form-control">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                    <label>Email</label>
                </div>
                <div className="form-control">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <label>Password</label>
                </div>
                <div className="form-control">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        required
                    />
                    <label>Phone Number</label>
                </div>
                <div className="form-control">
                    <input
                        type="text"
                        name="Address"
                        placeholder="Address"
                        onChange={handleChange}
                        required
                    />
                    <label>Address</label>
                </div>
                <div className="form-control">
                    <input
                        type="text"
                        name="Gender"
                        placeholder="Gender"
                        onChange={handleChange}
                        required
                    />
                    <label>Gender</label>
                </div>
                <button type="submit">Register</button>
            </form>
            <button onClick={handleLoginRedirect} className="login-btn">
                Already have an account? Login
            </button>
        </div>
    );
}

export default Register;
