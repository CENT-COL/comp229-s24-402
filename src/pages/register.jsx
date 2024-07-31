import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../auth';

const Register = ({setUser}) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
   
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const user = await register(form.email, form.password);
            setUser({username: user.email, userId: user.uid});
            localStorage.setItem('token', user.stsTokenManager.accessToken); // firebase uses JWT tokens
            localStorage.setItem('username', user.email);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div className="container mt-4">
            <h1 className="text-center">Register</h1>
            {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
        </div>
    );
};

export default Register;