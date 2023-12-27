// src/components/Auth/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await dispatch(login(formData));
    navigate('/survey/create');

  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handleChange} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
