// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import StocksList from './components/StocksList';
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



function App() {
    return (
        <AuthProvider>
            
                <div className="App">
                    <Navbar />
                    <div className="container-fluid mt-0">
                        <div className="row gx-0">
                            {/* Adjust StocksList to take up 4 columns */}
                            <div className="col-md-4 p-3">
                                <StocksList />
                            </div>
                            {/* Adjust Dashboard to take up the remaining 8 columns */}
                            <div className="col-md-8 p-3">
                                <Routes>
                                    <Route path="/" element={<ConditionalDashboard />} />
                                    <Route path="/signup" element={<Signup />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/orders" element={<Orders />} />
                                    <Route path="/holdings" element={<Holdings />} />
                                    <Route path="/positions" element={<Positions />} />
                                    <Route path="/funds" element={<Funds />} />
                                    <Route path="/dashboard" element={<ConditionalDashboard />} />
                                    <Route path="/forgot-password" element={<ForgotPassword />} />

                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            
        </AuthProvider>
    );
}

function ConditionalDashboard() {
    const { username } = useContext(AuthContext); // Access the username from AuthContext

    // Render Dashboard2 if logged in, otherwise render Dashboard
    return username ? <Dashboard2 /> : <Dashboard />;
}

export default App;
