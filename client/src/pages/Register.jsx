import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../api/axios';

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    role:'buyer'
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
        '/auth/register',
        formData
      );

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      alert(res.data.message);

      navigate('/properties');

    } catch (err) {

      alert(
        err.response?.data?.message ||
        'Registration failed'
      );
    }
  };

  return (

    <div style={styles.container}>

      <form
        onSubmit={handleSubmit}
        style={styles.form}
      >

        <h2>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          style={styles.input}
        />

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

        <select
          name="role"
          onChange={handleChange}
          style={styles.input}
        >
          <option value="buyer">
            Buyer
          </option>

          <option value="agent">
            Agent
          </option>
        </select>

        <button
          type="submit"
          style={styles.button}
        >
          Register
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

export default Register;