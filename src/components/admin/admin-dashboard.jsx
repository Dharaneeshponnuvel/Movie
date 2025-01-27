import React, { useState } from 'react';
import axios from 'axios';
import './dashboard.css';

const AdminDashboard = () => {
    const [movie, setMovie] = useState({
        name: '', rating: '', summary: '', releaseDate: '', language: ''
    });
    const [movieFile, setMovieFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [trailerFile, setTrailerFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in movie) {
            formData.append(key, movie[key]);
        }
        formData.append('movie', movieFile);
        formData.append('image', imageFile);
        formData.append('trailer', trailerFile);

        try {
            const response = await axios.post('http://localhost:5000/api/movie/add-movie', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Movie Added Successfully');
        } catch (error) {
            console.error("Error adding movie:", error);
            alert('Error adding movie');
        }
    };

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    return (
        <div className="dashboard-container">
            <h2>Add New Movie</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Movie Name" onChange={handleChange} required />
                <input type="number" name="rating" placeholder="Star Rating" onChange={handleChange} required />
                <textarea name="summary" placeholder="Summary" onChange={handleChange} required />
                <input type="date" name="releaseDate" onChange={handleChange} required />
                <label>Upload Trailer:</label>
                <input type="file" name="trailer" onChange={(e) => setTrailerFile(e.target.files[0])} required />
                <label>Upload Movie File:</label>
                <input type="file" name="movie" onChange={(e) => setMovieFile(e.target.files[0])} required />
                <label>Upload Movie Image:</label>
                <input type="file" name="image" onChange={(e) => setImageFile(e.target.files[0])} required />
                <input type="text" name="language" placeholder="Movie Language" onChange={handleChange} required />

                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
};

export default AdminDashboard;
