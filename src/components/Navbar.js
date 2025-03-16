import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Navbar() {
    const { username, logout } = useContext(AuthContext);
    const navigate = useNavigate(); // To redirect after logout

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mx-3">
            <Link className="navbar-brand" to="/">Paper Trading App</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto"> {/* Non-authenticated links */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {/* Add other common links if needed */}
                </ul>

                {username && (
                    <div className="d-flex justify-content-center w-100"> {/* Center nav links when user is logged in */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/holdings">Holdings</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/positions">Positions</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/funds">Funds</Link>
                            </li>
                        </ul>
                    </div>
                )}

                <div className="d-flex ms-auto"> {/* Align Login/Sign Up to the right */}
                    {username ? (
                        <div className="d-flex align-items-center">
                            <span className="me-3">Hello, {username}!</span>
                            <button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <>
                            <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
                            <Link className="btn btn-primary" to="/signup">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
