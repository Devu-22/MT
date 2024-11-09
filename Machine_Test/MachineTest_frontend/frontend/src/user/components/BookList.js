// BookList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [genre, setGenre] = useState('');
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token
        navigate('/login'); // Redirect to login page
    };

    useEffect(() => {
        const fetchBooks = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login'); // Redirect to login if no token is found
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/book', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBooks(response.data);
            } catch (err) {
                setError('Failed to fetch books. Please log in again.');
                navigate('/login'); // Redirect to login if there’s an error fetching data
            }
        };

        fetchBooks();
    }, [navigate]);

    const searchByGenre = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/genre/name/${genre}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBooks(response.data);
            setError(null); // Clear previous errors
        } catch (err) {
            setError('Failed to fetch books by genre.');
        }
    };

    const searchByTitle = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/book/title/${title}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBooks(response.data);
            setError(null); // Clear previous errors
        } catch (err) {
            setError('Failed to fetch books by title.');
        }
    };

    return (
        <div>
            <button onClick={handleLogout} style={{ marginBottom: '20px', padding: '10px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
                Logout
            </button>
            <h2>Book List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Search by Genre */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    style={{ padding: '8px', marginRight: '10px' }}
                />
                <button onClick={searchByGenre} style={{ padding: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Search by Genre
                </button>
            </div>

            {/* Search by Title */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ padding: '8px', marginRight: '10px' }}
                />
                <button onClick={searchByTitle} style={{ padding: '8px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Search by Title
                </button>
            </div>

            <ul>
            {Array.isArray(books) && books.map(book => (
    <li key={book._id}>
        <h3>{book.title}</h3>
        <p>Author: {book.author.name}</p>
        <p>Genre: {book.genre.name}</p>
        <p>Publication: {book.publication.name}</p>
        <p>Price: {book.price}</p>
    </li>
))}
                    
            </ul>
        </div>
    );
};

export default BookList;
