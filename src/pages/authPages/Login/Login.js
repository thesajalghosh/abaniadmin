import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file


function Login() {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('process.env.REACT_APP_API:', process.env.REACT_APP_API);
    try {
        const admin_login = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {role, email, password})
        console.log(admin_login)
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
    <div className="login-container">
      <h2>Abani Admin Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>
            Role:
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
