import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import API from "../api/axios";

import PropertyCard from "../components/PropertyCard";

function Home() {

  const [featuredProperties, setFeaturedProperties] =
    useState([]);

  useEffect(() => {

    fetchProperties();

  }, []);

  const fetchProperties = async () => {

    try {

      const res =
        await API.get("/properties");

      setFeaturedProperties(
        res.data.slice(0, 3)
      );

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <div style={styles.page}>

      {/* HERO SECTION */}
      <section style={styles.hero}>

        <div style={styles.overlay}></div>

        <div style={styles.heroContent}>

          <h1 style={styles.heroTitle}>
            Find Your Dream Property
            <br />
            with UrbanNest
          </h1>

          <p style={styles.heroText}>

            Discover luxury homes,
            premium apartments,
            and commercial properties
            tailored perfectly for you.

          </p>

          <div style={styles.heroButtons}>

            <Link
              to="/properties"
              style={styles.primaryBtn}
            >
              Explore Properties
            </Link>

            <Link
              to="/loan-calculator"
              style={styles.secondaryBtn}
            >
              Loan Calculator
            </Link>

          </div>

        </div>

      </section>

      {/* WHY CHOOSE US */}
      <section style={styles.featuresSection}>

        <h2 style={styles.sectionTitle}>
          Why Choose UrbanNest?
        </h2>

        <div style={styles.featuresGrid}>

          <div style={styles.featureCard}>

            <div style={styles.icon}>
              🏡
            </div>

            <h3>
              Luxury Properties
            </h3>

            <p>
              Explore premium homes and
              apartments across top cities.
            </p>

          </div>

          <div style={styles.featureCard}>

            <div style={styles.icon}>
              🔒
            </div>

            <h3>
              Trusted Platform
            </h3>

            <p>
              Verified listings with secure
              and reliable booking system.
            </p>

          </div>

          <div style={styles.featureCard}>

            <div style={styles.icon}>
              💰
            </div>

            <h3>
              Smart Investments
            </h3>

            <p>
              Discover profitable real estate
              opportunities with ease.
            </p>

          </div>

        </div>

      </section>

      {/* FEATURED PROPERTIES */}
      <section style={styles.featuredSection}>

        <div style={styles.featuredHeader}>

          <div>

            <h2 style={styles.sectionTitle}>
              Featured Properties
            </h2>

            <p style={styles.featuredText}>
              Explore some of our latest
              premium listings curated
              for modern living.
            </p>

          </div>

          <Link
            to="/properties"
            style={styles.viewAllBtn}
          >
            View All →
          </Link>

        </div>

        <div style={styles.featuredGrid}>

          {featuredProperties.map(
            (property) => (

              <PropertyCard
                key={property.id}
                property={property}
              />

            )
          )}

        </div>

      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>

        <h2 style={styles.ctaTitle}>
          Start Your Property Journey Today
        </h2>

        <p style={styles.ctaText}>
          Join UrbanNest and discover
          your perfect property with
          confidence.
        </p>

        <Link
          to="/properties"
          style={styles.ctaBtn}
        >
          Browse Properties
        </Link>

      </section>

    </div>
  );
}

const styles = {

  page: {

    background: "#f8fafc",

    overflowX: "hidden",
  },

  /* HERO */

  hero: {

    height: "90vh",

    backgroundImage:
      "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop')",

    backgroundSize: "cover",

    backgroundPosition: "center",

    position: "relative",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    textAlign: "center",

    padding: "2rem",
  },

  overlay: {

    position: "absolute",

    top: 0,

    left: 0,

    width: "100%",

    height: "100%",

    background:
      "rgba(15, 23, 42, 0.72)",
  },

  heroContent: {

    position: "relative",

    zIndex: 2,

    maxWidth: "850px",

    color: "white",
  },

  heroTitle: {

    fontSize:
      window.innerWidth <= 768
        ? "2.7rem"
        : "4.5rem",

    fontWeight: "800",

    lineHeight: "1.1",

    marginBottom: "1.5rem",

    color: "white",
  },

  heroText: {

    fontSize:
      window.innerWidth <= 768
        ? "1rem"
        : "1.25rem",

    lineHeight: "1.8",

    marginBottom: "2rem",

    color:
      "rgba(255,255,255,0.85)",
  },

  heroButtons: {

    display: "flex",

    gap: "1rem",

    justifyContent: "center",

    flexWrap: "wrap",
  },

  primaryBtn: {

    background:
      "linear-gradient(135deg, #eab308, #ca8a04)",

    color: "white",

    padding: "1rem 2rem",

    borderRadius: "12px",

    textDecoration: "none",

    fontWeight: "600",

    boxShadow:
      "0 10px 25px rgba(234,179,8,0.3)",
  },

  secondaryBtn: {

    background:
      "rgba(255,255,255,0.12)",

    backdropFilter: "blur(10px)",

    border:
      "1px solid rgba(255,255,255,0.2)",

    color: "white",

    padding: "1rem 2rem",

    borderRadius: "12px",

    textDecoration: "none",

    fontWeight: "600",
  },

  /* FEATURES */

  featuresSection: {

    padding: "5rem 2rem",

    background: "white",
  },

  sectionTitle: {

    textAlign: "center",

    fontSize:
      window.innerWidth <= 768
        ? "2rem"
        : "3rem",

    marginBottom: "1rem",
  },

  featuresGrid: {

    display: "grid",

    gridTemplateColumns:
      window.innerWidth <= 768
        ? "1fr"
        : "repeat(3,1fr)",

    gap: "2rem",

    maxWidth: "1200px",

    margin: "0 auto",
  },

  featureCard: {

    background: "#f8fafc",

    padding: "2.5rem",

    borderRadius: "20px",

    textAlign: "center",

    boxShadow:
      "0 10px 25px rgba(0,0,0,0.05)",
  },

  icon: {

    fontSize: "3rem",

    marginBottom: "1rem",
  },

  /* FEATURED */

  featuredSection: {

    padding: "5rem 2rem",

    background: "#f8fafc",
  },

  featuredHeader: {

    maxWidth: "1300px",

    margin: "0 auto",

    marginBottom: "3rem",

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    flexWrap: "wrap",

    gap: "1rem",
  },

  featuredText: {

    color: "#64748b",

    maxWidth: "600px",

    lineHeight: "1.8",
  },

  featuredGrid: {

    display: "grid",

    gridTemplateColumns:
      window.innerWidth <= 768
        ? "1fr"
        : "repeat(auto-fit, minmax(320px, 1fr))",

    gap: "2rem",

    maxWidth: "1300px",

    margin: "0 auto",
  },

  viewAllBtn: {

    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",

    color: "white",

    padding: "1rem 1.5rem",

    borderRadius: "12px",

    textDecoration: "none",

    fontWeight: "600",

    whiteSpace: "nowrap",
  },

  /* CTA */

  ctaSection: {

    padding: "6rem 2rem",

    textAlign: "center",

    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",

    color: "white",
  },

  ctaTitle: {

    fontSize:
      window.innerWidth <= 768
        ? "2rem"
        : "3.5rem",

    marginBottom: "1rem",

    color: "white",
  },

  ctaText: {

    maxWidth: "700px",

    margin: "0 auto",

    marginBottom: "2rem",

    lineHeight: "1.8",

    color:
      "rgba(255,255,255,0.8)",
  },

  ctaBtn: {

    display: "inline-block",

    background:
      "linear-gradient(135deg, #eab308, #ca8a04)",

    color: "white",

    padding: "1rem 2rem",

    borderRadius: "12px",

    textDecoration: "none",

    fontWeight: "600",
  },
};

export default Home;