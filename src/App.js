import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Navbar from './components/Navbar';

import Dashboard from './components/Dashboard';
import Dashboard2 from './components/Dashboard2';
import Signup from './components/Signup';
import Login from './components/Login';
import Orders from './components/Orders';
import Holdings from './components/Holdings';
import Positions from './components/Positions';
import Funds from './components/Funds';
import { AuthProvider, AuthContext } from './AuthContext';
import ForgotPassword from './components/ForgotPassword';
import PasswordResetConfirm from './components/PasswordResetConfirm';

export default function App() {
    const [watchlists, setWatchlists] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    // ✅ Layout for auth-related routes (Centered)
    function CenteredLayout({ children }) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 56px)' }}>
                {children}
            </div>
        );
    }

    // ✅ Main layout with sidebar for logged-in users
    function MainLayout({ watchlists, loggedInUserId }) {
        const { username } = React.useContext(AuthContext);

        return (
            <div className="row gx-0">
                {/* ✅ Right Section */}
                <div className={`col-md-${loggedInUserId ? '9' : '12'} p-3`}>
                    <ConditionalDashboard watchlists={watchlists} loggedInUserId={loggedInUserId} />
                </div>
            </div>
        );
    }

    // ✅ Conditional dashboard based on login state
    function ConditionalDashboard({ watchlists, loggedInUserId }) {
        const { username } = React.useContext(AuthContext);
        return username ? (
            <Dashboard2 watchlists={watchlists} loggedInUserId={loggedInUserId} />
        ) : (
            <Dashboard />
        );
    }

    // ✅ Function to get CSRF token
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(`${name}=`)) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    useEffect(() => {
        // ✅ Fetch logged-in user data
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user/', {
                    withCredentials: true,
                });
                setLoggedInUserId(response.data.id);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        // ✅ Fetch user watchlists
        const fetchWatchlists = async () => {
            try {
                const csrfToken = getCookie('csrftoken');
                const response = await axios.get('http://localhost:8000/api/watchlists/', {
                    withCredentials: true,
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                });
                setWatchlists(response.data);
            } catch (error) {
                console.error('Error fetching watchlists:', error);
            }
        };

        fetchUserData();
        fetchWatchlists();
    }, []);

    return (
        <AuthProvider>
            <div className="App">
                <Navbar />
                <div className="container-fluid mt-0">
                    <Routes>
                        {/* ✅ Auth Routes */}
                        <Route path="/signup" element={<CenteredLayout><Signup /></CenteredLayout>} />
                        <Route path="/login" element={<CenteredLayout><Login /></CenteredLayout>} />
                        <Route path="/forgot-password" element={<CenteredLayout><ForgotPassword /></CenteredLayout>} />
                        <Route path="/reset-password/:uid/:token" element={<CenteredLayout><PasswordResetConfirm /></CenteredLayout>} />

                        {/* ✅ Main Routes */}
                        <Route element={<MainLayout watchlists={watchlists} loggedInUserId={loggedInUserId} />}>
                            <Route path="/" element={<ConditionalDashboard watchlists={watchlists} loggedInUserId={loggedInUserId} />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/holdings" element={<Holdings />} />
                            <Route path="/positions" element={<Positions />} />
                            <Route path="/funds" element={<Funds />} />
                            <Route path="/dashboard" element={<ConditionalDashboard watchlists={watchlists} loggedInUserId={loggedInUserId} />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </AuthProvider>
    );
}
