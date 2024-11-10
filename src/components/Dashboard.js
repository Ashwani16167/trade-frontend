// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div className="container">
            <div className="dashboard-content text-center p-4" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
                <h1 className="display-5 mb-3">Welcome to the Paper Trading App</h1>
                <p className="lead">Log in or sign up to start your trading journey and experience real-time market simulations.</p>
                <div className="d-flex justify-content-center mt-4">
                    <Link to="/login" className="btn btn-primary me-2">Login</Link>
                    <Link to="/signup" className="btn btn-outline-primary">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
