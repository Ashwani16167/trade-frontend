import React, { useState } from 'react';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Get the CSRF token from cookies
    const getCsrfToken = () => {
        const cookieValue = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
        return cookieValue ? cookieValue.split('=')[1] : '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get CSRF token and auth token (stored in localStorage after login)
        const csrfToken = getCsrfToken();
        const authToken = localStorage.getItem('auth_token');  // Assuming auth token is stored in localStorage

        if (!authToken) {
            setMessage('You must be logged in to perform this action.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/password_reset/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,  // Include CSRF token
                    'Authorization': `Token ${authToken}`,  // Include Authorization token
                },
                body: JSON.stringify({ email }),
                credentials: 'include',  // Send cookies with request
            });

            if (response.ok) {
                setMessage('Password reset email sent! Please check your inbox.');
            } else {
                const errorData = await response.json();
                setMessage(errorData.detail || 'Error: Unable to send reset email.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="forgot-password-content text-center p-4">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    className="form-control mb-3"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary">Send Reset Link</button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
}

export default ForgotPassword;
