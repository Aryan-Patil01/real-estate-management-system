import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../api/axios";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res =
        await API.post(
          "/auth/login",
          formData
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",

        JSON.stringify(
          res.data.user
        )
      );

      alert(
        "Login successful"
      );

      navigate("/");

    } catch (err) {

      alert(

        err.response?.data
          ?.message ||

        "Login failed"
      );
    }
  };

  return (

    <div style={styles.page}>

      {/* LEFT SECTION */}
      <div style={styles.leftSection}>

        <div style={styles.overlay}></div>

        <div style={styles.leftContent}>

          <h1 style={styles.brand}>
            UrbanNest
          </h1>

          <h2 style={styles.title}>
            Welcome Back
          </h2>

          <p style={styles.text}>

            Discover premium
            properties and manage
            your real estate journey
            with confidence.

          </p>

        </div>

      </div>

      {/* RIGHT SECTION */}
      <div style={styles.rightSection}>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >

          <h2 style={styles.formTitle}>
            Login to Your Account
          </h2>

          <p style={styles.formSubtitle}>
            Continue your journey
            with UrbanNest
          </p>

          {/* EMAIL */}
          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Email Address
            </label>

            <input
              type="email"

              name="email"

              placeholder="Enter your email"

              onChange={handleChange}

              required

              style={styles.input}
            />

          </div>

          {/* PASSWORD */}
          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Password
            </label>

            <input
              type="password"

              name="password"

              placeholder="Enter your password"

              onChange={handleChange}

              required

              style={styles.input}
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"

            style={styles.button}
          >
            Login →
          </button>

          {/* REGISTER */}
          <p style={styles.bottomText}>

            Don't have an account?

            <Link
              to="/register"

              style={styles.link}
            >
              Register
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

const styles = {

  page: {

    display: "grid",

    gridTemplateColumns:
      window.innerWidth <= 968
        ? "1fr"
        : "1fr 1fr",

    minHeight: "100vh",
  },

  /* LEFT */

  leftSection: {

    position: "relative",

    backgroundImage:
      "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop')",

    backgroundSize: "cover",

    backgroundPosition: "center",

    display:
      window.innerWidth <= 968
        ? "none"
        : "flex",

    alignItems: "center",

    justifyContent: "center",

    padding: "3rem",
  },

  overlay: {

    position: "absolute",

    inset: 0,

    background:
      "rgba(15,23,42,0.78)",
  },

  leftContent: {

    position: "relative",

    zIndex: 2,

    color: "white",

    maxWidth: "500px",
  },

  brand: {

    fontSize: "4rem",

    color: "white",

    marginBottom: "1rem",
  },

  title: {

    fontSize: "3rem",

    color: "white",

    marginBottom: "1rem",
  },

  text: {

    fontSize: "1.1rem",

    lineHeight: "1.8",

    color:
      "rgba(255,255,255,0.85)",
  },

  /* RIGHT */

  rightSection: {

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    background: "#f8fafc",

    padding: "2rem",
  },

  form: {

    width: "100%",

    maxWidth: "500px",

    background:
      "rgba(255,255,255,0.8)",

    backdropFilter:
      "blur(16px)",

    border:
      "1px solid rgba(255,255,255,0.3)",

    padding:
      window.innerWidth <= 768
        ? "2rem"
        : "3rem",

    borderRadius: "28px",

    boxShadow:
      "0 20px 40px rgba(0,0,0,0.08)",
  },

  formTitle: {

    fontSize: "2rem",

    marginBottom: "0.5rem",

    color: "#0f172a",
  },

  formSubtitle: {

    color: "#64748b",

    marginBottom: "2rem",
  },

  inputGroup: {

    marginBottom: "1.5rem",
  },

  label: {

    display: "block",

    marginBottom: "0.6rem",

    fontWeight: "600",

    color: "#334155",
  },

  input: {

    width: "100%",

    padding: "1rem",

    borderRadius: "14px",

    border:
      "1px solid #dbeafe",

    fontSize: "1rem",

    background: "white",
  },

  button: {

    width: "100%",

    padding: "1rem",

    border: "none",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",

    color: "white",

    fontWeight: "700",

    fontSize: "1rem",

    marginTop: "0.5rem",

    cursor: "pointer",

    boxShadow:
      "0 10px 25px rgba(15,23,42,0.2)",
  },

  bottomText: {

    marginTop: "1.5rem",

    textAlign: "center",

    color: "#64748b",
  },

  link: {

    marginLeft: "0.4rem",

    color: "#eab308",

    fontWeight: "700",

    textDecoration: "none",
  },
};

export default Login;