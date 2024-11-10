import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Funds() {
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem('token'); // Assume token is stored in local storage
                const response = await axios.get('http://127.0.0.1:8000/api/balance/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setBalance(response.data.balance);
            } catch (error) {
                setError("Error fetching balance");
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className="container my-5">
            <div className="card shadow-lg border-0 rounded">
                <div className="card-header text-white bg-primary text-center">
                    <h2>Your Account Balance</h2>
                </div>
                <div className="card-body text-center">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    {balance !== null ? (
                        <h3 className="display-4 text-success">
                            ₹{balance.toLocaleString()} {/* Display balance with currency formatting */}
                        </h3>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className="card-footer text-muted text-center">
                    Updated in real-time
                </div>
            </div>
        </div>
    );
}

export default Funds;
