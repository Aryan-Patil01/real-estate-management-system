import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import logo from "../assets/logo.png";

function Navbar() {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const userStr =
    localStorage.getItem("user");

  const user =
    userStr &&
    userStr !== "undefined"
      ? JSON.parse(userStr)
      : {};

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(
      window.innerWidth <= 768
    );

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {

    const handleResize = () => {

      setIsMobile(
        window.innerWidth <= 768
      );
    };

    const handleScroll = () => {

      setScrolled(
        window.scrollY > 20
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  return (

    <nav
      style={{
        ...styles.navbar,

        background: scrolled
          ? "rgba(15, 23, 42, 0.92)"
          : "#0f172a",

        backdropFilter:
          "blur(12px)",

        boxShadow: scrolled
          ? "0 8px 25px rgba(0,0,0,0.15)"
          : "none",
      }}
    >

      {/* LOGO */}
      <Link
        to="/"
        style={styles.logoContainer}
      >

        <img
          src={logo}
          alt="UrbanNest"
          style={styles.logoImage}
        />

        <div>

          <h2 style={styles.logoText}>
            UrbanNest
          </h2>

          <p style={styles.logoSub}>
            Find Your Perfect Space
          </p>

        </div>

      </Link>

      {/* MOBILE MENU */}
      {isMobile && (

        <div
          style={styles.hamburger}

          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </div>

      )}

      {/* NAV LINKS */}
      <div
        style={{
          ...styles.navLinks,

          ...(isMobile
            ? {

                display:
                  menuOpen
                    ? "flex"
                    : "none",

                flexDirection:
                  "column",

                width: "100%",

                marginTop: "1.5rem",

                background:
                  "#0f172a",

                padding: "1rem",

                borderRadius:
                  "12px",
              }
            : {
                display: "flex",
              }),
        }}
      >

        <Link
          style={styles.link}
          to="/"
        >
          Home
        </Link>

        <Link
          style={styles.link}
          to="/properties"
        >
          Properties
        </Link>

        <Link
          style={styles.link}
          to="/loan-calculator"
        >
          Loan Calculator
        </Link>

        {/* ADMIN */}
        {token &&
          user?.role ===
            "admin" && (

          <Link
            style={styles.link}
            to="/admin"
          >
            Admin Dashboard
          </Link>

        )}

        {/* AGENT */}
        {token &&
          user?.role ===
            "agent" && (

          <Link
            style={styles.link}
            to="/agent-dashboard"
          >
            Agent Dashboard
          </Link>

        )}

        {/* ADD PROPERTY */}
        {token &&
          (
            user?.role ===
              "admin" ||

            user?.role ===
              "agent"
          ) && (

          <Link
            to="/add-property"

            style={
              styles.addBtn
            }
          >
            ➕ Add Property
          </Link>

        )}

        {/* LOGIN / LOGOUT */}
        {!token ? (

          <>

            <Link
              style={styles.link}
              to="/login"
            >
              Login
            </Link>

            <Link
              style={styles.registerBtn}
              to="/register"
            >
              Register
            </Link>

          </>

        ) : (

          <>

            <span
              style={styles.userText}
            >
              Hi, {user?.name}
            </span>

            <button
              style={styles.logoutBtn}

              onClick={
                handleLogout
              }
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

    position: "sticky",

    top: 0,

    zIndex: 1000,

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    padding: "1rem 2.5rem",

    transition:
      "all 0.3s ease",

    flexWrap: "wrap",
  },

  logoContainer: {

    display: "flex",

    alignItems: "center",

    gap: "0.8rem",

    textDecoration: "none",
  },

  logoImage: {

    width: "55px",

    height: "55px",

    objectFit: "contain",
  },

  logoText: {

    color: "white",

    margin: 0,

    fontSize: "1.7rem",

    fontWeight: "700",

    lineHeight: 1,
  },

  logoSub: {

    color:
      "rgba(255,255,255,0.7)",

    margin: 0,

    fontSize: "0.75rem",

    marginTop: "3px",
  },

  hamburger: {

    fontSize: "2rem",

    color: "white",

    cursor: "pointer",
  },

  navLinks: {

    alignItems: "center",

    gap: "1.4rem",
  },

  link: {

    color: "white",

    textDecoration: "none",

    fontWeight: "500",

    transition:
      "all 0.3s ease",

    position: "relative",
  },

  addBtn: {

    background:
      "linear-gradient(135deg, #eab308, #ca8a04)",

    color: "white",

    padding:
      "0.7rem 1.2rem",

    borderRadius: "10px",

    textDecoration: "none",

    fontWeight: "600",

    boxShadow:
      "0 8px 20px rgba(234,179,8,0.3)",
  },

  registerBtn: {

    background:
      "white",

    color: "#0f172a",

    padding:
      "0.65rem 1.2rem",

    borderRadius: "10px",

    textDecoration: "none",

    fontWeight: "600",
  },

  userText: {

    color: "white",

    fontWeight: "600",
  },

  logoutBtn: {

    background:
      "#ef4444",

    color: "white",

    border: "none",

    padding:
      "0.7rem 1.1rem",

    borderRadius: "10px",

    fontWeight: "600",
  },
};

export default Navbar;