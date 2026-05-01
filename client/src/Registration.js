import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';

import './CustomAlert.css';
import { FaVoteYea } from "react-icons/fa";

function Registration() {
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const showCustomAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    
    // Auto hide after 4 seconds
    setTimeout(() => {
      setAlert({ show: false, message: '', type: 'success' });
    }, 6000);
  };

  const hideAlert = () => {
    setAlert({ show: false, message: '', type: 'success' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = {
        Name: name.trim(),
        PhoneNo: phoneNo.trim(),
        Address: address.trim(),
        IsActive: 1,
        Email : email.trim(),
        Password : password.trim()
      };

      // Client-side validation
      if (!data.Name || !data.PhoneNo || !data.Address||!data.Email||!data.Password) {
        setError('Please fill in all fields');
        return;
      }

      const url = 'https://localhost:44306/api/Test/Registeration';
      const response = await axios.post(url, data);

      if (response.data === 'User Register Successfully.') {
        showCustomAlert('User Register Successfully! 🎉');
        setName('');
        setPhoneNo('');
        setAddress('');
        setEmail('');
        setPassword('');
      } else {
        showCustomAlert(response.data, 'error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMsg = error.response?.data || 'Registration failed. Please try again.';
      showCustomAlert(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-page">
         
      <div className="registration-container">
        
        <div className="registration-form">
        <h1 className="project-title">
            <FaVoteYea className="vote-icon" /> Voter Application
          </h1>
          <h2>Register</h2>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="txtName">Full Name</label>
              <input
                type="text"
                id="txtName"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="txtPhoneNo">Phone Number</label>
              <input
                type="tel"
                id="txtPhoneNo"
                placeholder="Enter phone number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="txtAddress">Address</label>
              <input
                type="text"
                id="txtAddress"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="txtEmail">Email</label>
              <input
                type="text"
                id="txtEmail"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="txtPassword">password</label>
              <input
                type="text"
                id="txtPassword"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="login-link">
            <p>
              Already have an account?{' '}
              <a href="/login">Login here</a>
            </p>
          </div>
        </div>
      </div>

      {alert.show && (
        <div className={`custom-alert-overlay ${alert.type}`} onClick={hideAlert}>
          <div className="custom-alert" onClick={(e) => e.stopPropagation()}>
            <div className="alert-icon">
              {alert.type === 'success' ? '✅' : '❌'}
            </div>
            <div className="alert-message">{alert.message}</div>
            <button className="alert-close" onClick={hideAlert}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registration;
