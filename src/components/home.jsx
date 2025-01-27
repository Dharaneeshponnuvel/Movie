import React, { useEffect, useState } from 'react';
import './home.css';

const App = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/movies')
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div className="homepage">
            <header className="navbar">
                <h1>MovieStream</h1>
                <nav>
                    <a href="#home">Home</a>
                    <a href="#movies">Movies</a>
                    <a href="#tv-shows">TV Shows</a>
                    <a href="#my-list">My List</a>
                </nav>
            </header>
            <div className="hero-section">
                <h2>Welcome to MovieStream</h2>
                <p>Your favorite movies and TV shows, all in one place.</p>
            </div>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <div key={movie._id} className="movie-card">
                        <img src={movie.imageUrl} alt={movie.title} />
                        <h3>{movie.title}</h3>
                        <p>{movie.genre}</p>
                        <p>Release Date: {movie.releaseDate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
