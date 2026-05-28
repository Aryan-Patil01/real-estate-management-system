import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const userStr = localStorage.getItem("user");
  const user = userStr && userStr !== "undefined" ? JSON.parse(userStr) : {};

  const [menuOpen, setMenuOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );
  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);

  }, []);

  const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate("/login");
  };

  return (

    <nav style={styles.navbar}>

      <div style={styles.logo}>
        🏠 RealEstate
      </div>

      {/* Hamburger */}
      {isMobile && (

        <div
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

      )}

      {/* Links */}
      <div
        style={{
          ...styles.navLinks,

          ...(isMobile
            ? {
                display: menuOpen ? "flex" : "none",
                flexDirection: "column",
                width: "100%",
                marginTop: "1rem",
              }
            : {
                display: "flex",
              }),
        }}
      >

        <Link style={styles.link} to="/">
          Home
        </Link>

        <Link style={styles.link} to="/properties">
          Properties
        </Link>

        <Link style={styles.link} to="/loan-calculator">
          Loan Calculator
        </Link>

        {user?.role === "admin" && (

          <Link style={styles.link} to="/admin">
            Admin Dashboard
          </Link>

        )}

        {!token ? (
          <>

            <Link style={styles.link} to="/login">
              Login
            </Link>

            <Link style={styles.link} to="/register">
              Register
            </Link>

          </>
        ) : (
          <>

            <span style={styles.userText}>
              Hi, {user?.name}
            </span>

            <button
              style={styles.logoutBtn}
              onClick={handleLogout}
            >
              Logout
            </button>

          </>
        )}

      </div>

    </nav>
  );
}

const styles = {

  navbar: {
    background: "#0b0b2b",
    color: "white",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    fontSize: "1.8rem",
    fontWeight: "bold",
  },

  hamburger: {
    fontSize: "2rem",
    cursor: "pointer",
  },

  navLinks: {
    gap: "1.5rem",
    alignItems: "center",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
  },

  userText: {
    fontWeight: "bold",
  },

  logoutBtn: {
    background: "#ff4d6d",
    border: "none",
    color: "white",
    padding: "0.6rem 1rem",
    borderRadius: "6px",
  },
};

export default Navbar;