import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer style={styles.footer}>

      <div style={styles.container}>

        {/* BRAND */}
        <div style={styles.brandSection}>

          <h2 style={styles.logo}>
            UrbanNest
          </h2>

          <p style={styles.text}>

            Discover luxury homes,
            premium apartments,
            and trusted real estate
            solutions with UrbanNest.

          </p>

        </div>

        {/* QUICK LINKS */}
        <div>

          <h3 style={styles.heading}>
            Quick Links
          </h3>

          <div style={styles.links}>

            <Link
              to="/"
              style={styles.link}
            >
              Home
            </Link>

            <Link
              to="/properties"
              style={styles.link}
            >
              Properties
            </Link>

            <Link
              to="/loan-calculator"
              style={styles.link}
            >
              Loan Calculator
            </Link>

          </div>

        </div>

        {/* CONTACT */}
        <div>

          <h3 style={styles.heading}>
            Contact
          </h3>

          <p style={styles.contact}>
            📍 Chennai, India
          </p>

          <p style={styles.contact}>
            📧 support@urbannest.com
          </p>

          <p style={styles.contact}>
            📞 +91 98765 43210
          </p>

        </div>

      </div>

      {/* BOTTOM */}
      <div style={styles.bottom}>

        © 2026 UrbanNest.
        All rights reserved.

      </div>

    </footer>
  );
}

const styles = {

  footer: {

    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",

    color: "white",

    marginTop: "4rem",
  },

  container: {

    display: "grid",

    gridTemplateColumns:
      window.innerWidth <= 768
        ? "1fr"
        : "2fr 1fr 1fr",

    gap: "3rem",

    maxWidth: "1300px",

    margin: "0 auto",

    padding: "4rem 2rem",
  },

  brandSection: {

    maxWidth: "400px",
  },

  logo: {

    color: "white",

    marginBottom: "1rem",

    fontSize: "2rem",
  },

  text: {

    color:
      "rgba(255,255,255,0.75)",

    lineHeight: "1.8",
  },

  heading: {

    color: "white",

    marginBottom: "1rem",
  },

  links: {

    display: "flex",

    flexDirection: "column",

    gap: "0.8rem",
  },

  link: {

    color:
      "rgba(255,255,255,0.75)",

    textDecoration: "none",

    transition: "0.3s",
  },

  contact: {

    color:
      "rgba(255,255,255,0.75)",

    marginBottom: "0.7rem",
  },

  bottom: {

    borderTop:
      "1px solid rgba(255,255,255,0.1)",

    textAlign: "center",

    padding: "1.5rem",

    color:
      "rgba(255,255,255,0.6)",
  },
};

export default Footer;