import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth';

const Login = ({ setUser }) => {

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
      const user = await login(form.email, form.password);
      setUser({ username: user.email, userId: user.uid });
      localStorage.setItem('username', user.email);
      localStorage.setItem('token', user.stsTokenManager.accessToken);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className="container mt-4">
      <h1 className="text-center">Login</h1>
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;