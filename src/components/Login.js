import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import Link for navigation
import { AuthContext } from '../AuthContext';

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Access login function from context

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json(); // Retrieve data from the response
                localStorage.setItem('token', data.token); // Save token in localStorage
                login(formData.username); // Set username in context
                navigate('/');
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="login-content text-center p-4">
            <h2 className="mb-3">Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" className="form-control mb-3" placeholder="Username" value={formData.username} onChange={handleChange} required />
                <input type="password" name="password" className="form-control mb-3" placeholder="Password" value={formData.password} onChange={handleChange} required />
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary mb-3">Login</button>
            </form>
            <Link to="/forgot-password" className="text-primary">Forgot Password?</Link> {/* Add Forgot Password link */}
        </div>
    );
}

export default Login;
