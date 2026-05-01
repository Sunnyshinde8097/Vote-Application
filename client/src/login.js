import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { FaVoteYea } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = {
        Email: email.trim(),
        Password: password.trim(),
      };

      if (!data.Email || !data.Password) {
        setError('Please fill in all fields');
        return;
      }

      const url = 'https://localhost:44306/api/Test/Login';
      const response = await axios.post(url, data);

      if (response.data === 'User Login Successfully.') {
        alert('User Login Successfully!');
        navigate('/home');
        setEmail('');
        setPassword('');
      } else {
        setError(response.data);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      
      <div className="login-container">
   
        <div className="login-form">
        <h1 className="project-title">
            <FaVoteYea className="vote-icon" /> Voter Application
          </h1>
          <h2>Login</h2>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="txtEmail">Email</label>
              <input
                type="text"
                id="txtEmail"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="txtPassword">Password</label>
              <input
                type="password"
                id="txtPassword"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="register-link">
            <p>
              Don't have an account?{' '}
              <a href="/registration">Register here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
