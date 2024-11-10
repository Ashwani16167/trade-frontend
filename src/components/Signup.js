import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Signup() {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        emailID: '',
        password: '',
        rePassword: '',
        gender: '',
        age: ''
    });

    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.rePassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/signup/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                navigate('/login'); // Redirect to login on successful signup
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="signup-content text-center p-4">
            <h2 className="mb-3">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="fullName" className="form-control mb-3" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                <input type="text" name="username" className="form-control mb-3" placeholder="Username" value={formData.username} onChange={handleChange} required />
                <input type="email" name="emailID" className="form-control mb-3" placeholder="Email" value={formData.emailID} onChange={handleChange} required />
                <input type="password" name="password" className="form-control mb-3" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <input type="password" name="rePassword" className="form-control mb-3" placeholder="Re-enter Password" value={formData.rePassword} onChange={handleChange} required />
                <input type="text" name="gender" className="form-control mb-3" placeholder="Gender (M/F/O)" value={formData.gender} onChange={handleChange} required />
                <input type="number" name="age" className="form-control mb-3" placeholder="Age" value={formData.age} onChange={handleChange} required />
                <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
        </div>
    );
}

export default Signup;
