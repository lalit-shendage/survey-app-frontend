import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Register = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(register(formData));

    navigate('/login');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handleChange} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
