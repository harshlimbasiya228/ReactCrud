import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Loggin.css'
function Loggin() {
  const [username,setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin =(e)=>{
    e.preventDefault();
    if (username === "Harsh" && password === "9944") {
      navigate("/student"); 
    } else {
      alert("Enter a valid username and password"); 
    }
  }
  return (
    <>
    <div className="aesthetic-wrapper">
      <div className="login-minimal-card">
        <div className="brand-logo">
          React<span>CRUD</span>
        </div>
        <div className="login-header">
          <h2>Welcome back</h2>
          <p>Enter your details to access your account.</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-wrapper">
            <label>Username</label>
            <input
              type="text"
              placeholder="e.g. Harsh"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="input-wrapper">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="aesthetic-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Loggin