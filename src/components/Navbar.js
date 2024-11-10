import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Navbar() {
    const { username, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mx-3">
            <Link className="navbar-brand" to="/">Paper Trading App</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {username ? (
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
                ) : null}
                <div className="d-flex ms-auto"> {/* Align Login/Sign Up to the right */}
                    {username ? (
                        <div className="d-flex align-items-center">
                            <span className="me-3">Hello, {username}!</span>
                            <button className="btn btn-outline-secondary" onClick={logout}>Logout</button>
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
