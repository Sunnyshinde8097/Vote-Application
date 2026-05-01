import React from 'react';
import './CustomAlert.css';

const CustomAlert = ({ show, message, type = 'success', onClose }) => {
  if (!show) return null;

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️'
  };

  return (
    <div className={`custom-alert-overlay ${type}`}>
      <div className="custom-alert">
        <div className="alert-icon">{icons[type]}</div>
        <div className="alert-message">{message}</div>
        <button className="alert-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default CustomAlert;
