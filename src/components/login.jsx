import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import {useNavigate} from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/movies');
        } catch (err) {
            console.error(err);
            alert('Invalid credentials');
        }
    };

    return (
        <div className="form-wrapper">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                    <label>Email or phone number</label>
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
                <button type="submit">Login</button>
                <div className="form-help">
                    <div className="remember-me">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <a href="#">Need help?</a>
                </div>
            </form>
            <p>New to Netflix? <a href="./register">Sign up now</a></p>
            <small>
                This page is protected by Google reCAPTCHA to ensure you're not a bot.
                <a href="#">Learn more.</a>
            </small>
        </div>
    );
}

export default Login;
