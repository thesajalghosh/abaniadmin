import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file


function Login() {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('process.env.REACT_APP_API:', process.env.REACT_APP_API);
    try {
        const admin_login = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/admin-login`, {role, name, phone})
        if(admin_login.data.success){
            localStorage.setItem("user", JSON.stringify(admin_login.data.user))
            localStorage.setItem("token", admin_login.data.token)
            navigate("/home")
        }
        
    } catch (error) {
        console.log(error)
        
    }
  };

  return (
    <div className="login-page">
      <div className="glow-circle glow-circle-1"></div>
      <div className="glow-circle glow-circle-2"></div>
      <div className="login-container">
        <div className="brand-header">
          <span className="brand-subtitle">ADMIN CONTROL PANEL</span>
          <h1 className="brand-title">THE ABANI</h1>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              placeholder="e.g. Admin, Editor"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <div className="phone-input-wrapper">
              <span className="phone-prefix">+91</span>
              <input
                type="tel"
                placeholder="Enter 10-digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="login-button">
            Login to Console
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
