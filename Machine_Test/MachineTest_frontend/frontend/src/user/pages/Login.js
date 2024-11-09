// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/api/user/login', formData);
            setSuccess(response.data.message);
            localStorage.setItem('token', response.data.token);
            navigate('/booklist'); // Redirect to book list on successful login
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    const handleSignUpRedirect = () => {
        navigate('/signup'); // Redirect to signup page
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <button onClick={handleSignUpRedirect} style={{ marginTop: '10px' }}>
                Sign Up
            </button>
        </div>
    );
};

export default Login;
