
// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(localStorage.getItem('username') || null);

    const login = (username) => {
        setUsername(username);
        localStorage.setItem('username', username);
        localStorage.setItem('isAuthenticated', 'true');
    };

    const logout = () => {
        setUsername(null);
        localStorage.removeItem('username');
        localStorage.removeItem('isAuthenticated');
    };

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
