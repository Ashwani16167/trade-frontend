import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        email: '',
        password: '',
        rePassword: '',
        gender: '',
        age: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            setError("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.rePassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        if (isNaN(formData.age) || formData.age <= 0) {
            setError("Please enter a valid age.");
            setLoading(false);
            return;
        }

        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/signup/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                alert(data.message);
                navigate('/login');
            } else {
                setError(data.error || "Signup failed. Please try again.");
            }
        } catch (err) {
            setLoading(false);
            setError("Unable to connect to the server. Please try again later.");
        }
    };

    return (
        <div 
            className="d-flex justify-content-center align-items-center" 
            style={{ height: 'calc(100vh - 56px)', marginTop: '0' }}
        >
            <div className="card p-4 shadow" style={{ width: '350px' }}>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="full_name" 
                        className="form-control mb-3" 
                        placeholder="Full Name" 
                        value={formData.full_name} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="text" 
                        name="username" 
                        className="form-control mb-3" 
                        placeholder="Username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        className="form-control mb-3" 
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        className="form-control mb-3" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="rePassword" 
                        className="form-control mb-3" 
                        placeholder="Re-enter Password" 
                        value={formData.rePassword} 
                        onChange={handleChange} 
                        required 
                    />
                    <select 
                        name="gender" 
                        className="form-control mb-3" 
                        value={formData.gender} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                    </select>
                    <input 
                        type="number" 
                        name="age" 
                        className="form-control mb-3" 
                        placeholder="Age" 
                        value={formData.age} 
                        onChange={handleChange} 
                        required 
                    />
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
