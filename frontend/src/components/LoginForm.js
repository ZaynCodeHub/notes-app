import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:8000/api/auth/login/', credentials);
    localStorage.setItem('access', res.data.access);
    localStorage.setItem('refresh', res.data.refresh);
    onLogin({ 
      access: res.data.access, 
      refresh: res.data.refresh, 
      username: credentials.username 
    });
    navigate('/notes');
  } catch (err) {
    alert("Login failed.");
    console.error("Login error:", err.response?.data || err.message);
  }
};


  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      {/* NavBar */}
      <nav style={styles.navbar}>
        <h1 style={styles.navTitle}>Welcome to Simple Notes</h1>
        <p style={styles.navSlogan}>Your ideas, organized and secure.</p>
      </nav>

      {/* Login Form */}
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Login</h2>
          <input
            name="username"
            onChange={handleChange}
            placeholder="Username"
            required
            style={styles.input}
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
            required
            style={styles.input}
          />
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.buttonPrimary}>Submit</button>
            <button type="button" onClick={goToRegister} style={styles.buttonSecondary}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#4a90e2',
    padding: '20px',
    color: 'white',
    textAlign: 'center',
  },
  navTitle: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 'bold',
  },
  navSlogan: {
    marginTop: '5px',
    fontSize: '16px',
    fontStyle: 'italic',
  },
  container: {
    height: 'calc(100vh - 120px)', // subtract navbar height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0f2f5',
  },
  form: {
    background: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonPrimary: {
    padding: '10px 20px',
    backgroundColor: '#4a90e2',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonSecondary: {
    padding: '10px 20px',
    backgroundColor: '#aaa',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Login;
