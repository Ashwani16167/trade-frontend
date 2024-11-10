// Dashboard2.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Dashboard2() {
    const { username } = useContext(AuthContext); // Get the username from context

    return (
        <div className="container">
            <div className="dashboard-content text-center p-4" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
                <h1 className="display-5 mb-3">Welcome to the Paper Trading App</h1>
                <h2 className="mb-4">Hello, {username}!</h2> {/* Personalized message */}

                <div className="d-flex justify-content-center mt-4">
                    <Link className="btn btn-primary me-3" to="/watchlist">My Watchlist</Link>
                    <Link className="btn btn-outline-secondary" to="/trading-history">Trading History</Link>
                </div>

                <div className="mt-5">
                    <p>Start trading today and track your portfolio with real-time simulations!</p>
                    <Link className="btn btn-success mt-2" to="/trade">Start Trading</Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard2;
