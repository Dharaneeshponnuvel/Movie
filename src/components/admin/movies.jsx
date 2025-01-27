import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './movie.css';

const MoviesTable = () => {
    const [movies, setMovies] = useState([]);
    const [editingMovie, setEditingMovie] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        rating: '',
        summary: '',
        language: '',
        releaseDate: '',
    });
    const [expandedSummaries, setExpandedSummaries] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/api/movies')
            .then(response => setMovies(response.data))
            .catch(error => console.error('Error fetching movie details!', error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/movies/${id}`)
            .then(() => setMovies(movies.filter(movie => movie._id !== id)))
            .catch(error => console.error('Error deleting movie!', error));
    };

    const handleEditClick = (movie) => {
        setEditingMovie(movie._id);
        setFormData({
            name: movie.name,
            rating: movie.rating,
            summary: movie.summary,
            language: movie.language,
            releaseDate: movie.releaseDate.split('T')[0],
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEditSubmit = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/movies/${id}`, formData);
            const updatedMovies = movies.map((movie) =>
                movie._id === id ? { ...movie, ...formData } : movie
            );
            setMovies(updatedMovies);
            setEditingMovie(null);
        } catch (error) {
            console.error('Error updating movie!', error);
        }
    };

    const toggleSummary = (id) => {
        setExpandedSummaries((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const truncateSummary = (summary, id) => {
        if (expandedSummaries[id]) {
            return summary;
        }
        return summary.split(' ').slice(0, 50).join(' ') + '...';
    };

    return (
        <div>
            <h2>Movies List</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Trailer</th>
                    <th>Rating</th>
                    <th>Summary</th>
                    <th>Language</th>
                    <th>Movie</th>
                    <th>Release Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {movies.map(movie => (
                    <tr key={movie._id}>
                        <td>{movie.name}</td>
                        <td>
                            <img
                                src={`http://localhost:5000${movie.imageUrl}`}
                                alt={movie.name}
                                width="100"
                            />
                        </td>
                        <td>
                            <a
                                href={`http://localhost:5000${movie.trailerUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Watch Trailer
                            </a>
                        </td>
                        <td>{movie.rating}</td>
                        {/* Summary with Read More */}
                        <td>
                            {truncateSummary(movie.summary, movie._id)}
                            {movie.summary.split(' ').length > 50 && (
                                <button
                                    className="read-more-btn"
                                    onClick={() => toggleSummary(movie._id)}
                                >
                                    {expandedSummaries[movie._id] ? 'Read Less' : 'Read More'}
                                </button>
                            )}
                        </td>
                        <td>{movie.language}</td>
                        <td>
                            <a
                                href={`http://localhost:5000${movie.movie}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download Movie to Watch
                            </a>
                        </td>
                        <td>{new Date(movie.releaseDate).toLocaleDateString()}</td>
                        <td>
                            <button onClick={() => handleEditClick(movie)}>Edit</button>
                            <button onClick={() => handleDelete(movie._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Edit Form */}
            {editingMovie && (
                <div className="edit-form">
                    <h3>Edit Movie</h3>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange}/>
                    <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} />
                    <textarea name="summary" value={formData.summary} onChange={handleInputChange}></textarea>
                    <input type="text" name="language" value={formData.language} onChange={handleInputChange} />
                    <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleInputChange} />
                    <button onClick={() => handleEditSubmit(editingMovie)}>Save Changes</button>
                    <button onClick={() => setEditingMovie(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default MoviesTable;
