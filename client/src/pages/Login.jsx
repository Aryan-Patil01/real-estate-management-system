import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../api/axios';

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email:'',
    password:''
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        '/auth/login',
        formData
      );

      localStorage.setItem(
        'token',
        res.data.token
      );

      localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      );

      alert('Login successful');

      navigate('/');

    } catch (err) {

      alert(
        err.response?.data?.message ||
        'Login failed'
      );
    }
  };

  return (

    <div style={styles.container}>

      <form
        onSubmit={handleSubmit}
        style={styles.form}
      >

        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button
          type="submit"
          style={styles.button}
        >
          Login
        </button>

      </form>

    </div>
  );
}

const styles = {

  container: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    minHeight:'100vh',
    padding:'1rem'
  },

  form: {
    width:'100%',
    maxWidth:'450px',
    display:'flex',
    flexDirection:'column',
    gap:'1rem',
    padding:
      window.innerWidth <= 768
        ? '1rem'
        : '2rem',

    border:'1px solid #ccc',
    borderRadius:'10px',
    background:'white'
  },

  input: {
    padding:'0.8rem',
    borderRadius:'5px',
    border:'1px solid #ccc'
  },

  button: {
    padding:'0.8rem',
    background:'#1a1a2e',
    color:'white',
    border:'none',
    borderRadius:'5px',
    cursor:'pointer'
  }
};

export default Login;