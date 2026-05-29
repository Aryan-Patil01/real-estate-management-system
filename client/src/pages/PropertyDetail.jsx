import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import API from "../api/axios";

function PropertyDetail() {

  const { id } = useParams();

  const [property, setProperty] = 
    useState(null);

  const [visitDate, setVisitDate] =
    useState("");

  const [visitTime, setVisitTime] =
    useState("");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  useEffect(() => {

    fetchProperty();

  }, []);

  const fetchProperty = async () => {

    try {

      const res =
        await API.get(
          `/properties/${id}`
        );

      setProperty(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  if (!property) {

    return (

      <div style={styles.loading}>
        Loading...
      </div>

    );
  }

  let image = null;

  if (
    property.images &&
    property.images.length > 0
  ) {

    image =
      `http://localhost:5000${property.images[0].image_url}`;

  } else if (property.image) {

    image = property.image;

  } else {

    image =
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop";
  }

  const handleBooking = async () => {

    if (!visitDate || !visitTime) {

      alert(
        "Please select visit date and time"
      );

      return;
    }

    try {

      await API.post("/bookings", {

        property_id: property.id,

        visit_date:
          `${visitDate}T${visitTime}:00`
      });

      alert(
        "Visit booked successfully"
      );

    } catch (err) {

      console.log(err);

      alert("Booking failed");
    }
  };

  return (

    <div style={styles.page}>

      {/* HERO IMAGE */}
      <div style={styles.heroContainer}>

        <img
          src={image}
          alt={property.name}
          style={styles.heroImage}
        />

        <div style={styles.overlay}></div>

        <div style={styles.heroContent}>

          <div style={styles.typeBadge}>
            {property.type}
          </div>

          <h1 style={styles.title}>
            {property.name}
          </h1>

          <p style={styles.location}>
            📍 {property.location},
            {" "}
            {property.city}
          </p>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div style={styles.container}>

        {/* LEFT */}
        <div style={styles.left}>

          {/* PRICE */}
          <div style={styles.priceCard}>

            <h2 style={styles.price}>
              ₹
              {" "}
              {Number(
                property.price
              ).toLocaleString("en-IN")}
            </h2>

            <span
              style={{
                ...styles.status,

                background:
                  property.availability ===
                  "available"
                    ? "#dcfce7"
                    : "#fee2e2",

                color:
                  property.availability ===
                  "available"
                    ? "#15803d"
                    : "#dc2626",
              }}
            >
              {property.availability}
            </span>

          </div>

          {/* DESCRIPTION */}
          <div style={styles.card}>

            <h2 style={styles.sectionTitle}>
              Property Description
            </h2>

            <p style={styles.description}>
              {property.description}
            </p>

          </div>

          {/* DETAILS */}
          <div style={styles.card}>

            <h2 style={styles.sectionTitle}>
              Property Details
            </h2>

            <div style={styles.detailsGrid}>

              <div style={styles.detailBox}>
                🛏 Rooms:
                {" "}
                {property.rooms}
              </div>

              <div style={styles.detailBox}>
                🏠 Type:
                {" "}
                {property.type}
              </div>

              <div style={styles.detailBox}>
                📍 City:
                {" "}
                {property.city}
              </div>

              <div style={styles.detailBox}>
                📞 Contact:
                {" "}
                {property.contact}
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT BOOKING PANEL */}
        {user.role !== "admin" &&
         user.role !== "agent" && (

          <div style={styles.bookingCard}>

            <h2 style={styles.bookingTitle}>
              Book Property Visit
            </h2>

            <p style={styles.bookingText}>
              Schedule your visit
              and explore this
              amazing property.
            </p>

            <input
              type="date"

              value={visitDate}

              onChange={(e) =>
                setVisitDate(
                  e.target.value
                )
              }

              style={styles.input}
            />

            <input
              type="time"

              value={visitTime}

              onChange={(e) =>
                setVisitTime(
                  e.target.value
                )
              }

              style={styles.input}
            />

            <button
              style={styles.bookBtn}

              onClick={
                handleBooking
              }
            >
              Book Visit →
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

const styles = {

  page: {

    background: "#f8fafc",

    minHeight: "100vh",
  },

  loading: {

    textAlign: "center",

    padding: "5rem",

    fontSize: "2rem",
  },

  /* HERO */

  heroContainer: {

    position: "relative",

    height:
      window.innerWidth <= 768
        ? "400px"
        : "600px",

    overflow: "hidden",
  },

  heroImage: {

    width: "100%",

    height: "100%",

    objectFit: "cover",
  },

  overlay: {

    position: "absolute",

    inset: 0,

    background:
      "linear-gradient(to top, rgba(15,23,42,0.92), rgba(15,23,42,0.2))",
  },

  heroContent: {

    position: "absolute",

    bottom: "50px",

    left:
      window.innerWidth <= 768
        ? "20px"
        : "60px",

    color: "white",

    zIndex: 2,
  },

  typeBadge: {

    display: "inline-block",

    background:
      "rgba(255,255,255,0.18)",

    backdropFilter: "blur(8px)",

    padding: "0.6rem 1rem",

    borderRadius: "999px",

    marginBottom: "1rem",

    fontWeight: "600",

    textTransform: "capitalize",
  },

  title: {

    fontSize:
      window.innerWidth <= 768
        ? "2.5rem"
        : "4rem",

    color: "white",

    marginBottom: "1rem",
  },

  location: {

    fontSize: "1.1rem",

    color:
      "rgba(255,255,255,0.85)",
  },

  /* CONTAINER */

  container: {

    display: "grid",

    gridTemplateColumns:
      window.innerWidth <= 1024
        ? "1fr"
        : "2fr 1fr",

    gap: "2rem",

    padding:
      window.innerWidth <= 768
        ? "1rem"
        : "3rem",

    maxWidth: "1400px",

    margin: "0 auto",
  },

  left: {

    display: "flex",

    flexDirection: "column",

    gap: "2rem",
  },

  card: {

    background: "white",

    padding: "2rem",

    borderRadius: "24px",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.06)",
  },

  priceCard: {

    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",

    color: "white",

    padding: "2rem",

    borderRadius: "24px",

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    flexWrap: "wrap",

    gap: "1rem",
  },

  price: {

    color: "white",

    fontSize: "2rem",
  },

  status: {

    padding: "0.7rem 1.2rem",

    borderRadius: "999px",

    fontWeight: "700",

    textTransform: "capitalize",
  },

  sectionTitle: {

    marginBottom: "1rem",
  },

  description: {

    lineHeight: "1.9",

    color: "#475569",
  },

  detailsGrid: {

    display: "grid",

    gridTemplateColumns:
      window.innerWidth <= 768
        ? "1fr"
        : "repeat(2,1fr)",

    gap: "1rem",
  },

  detailBox: {

    background: "#f1f5f9",

    padding: "1rem",

    borderRadius: "14px",

    fontWeight: "500",
  },

  /* BOOKING */

  bookingCard: {

    background: "white",

    padding: "2rem",

    borderRadius: "24px",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.06)",

    height: "fit-content",

    position: "sticky",

    top: "120px",
  },

  bookingTitle: {

    marginBottom: "0.7rem",
  },

  bookingText: {

    color: "#64748b",

    marginBottom: "1.5rem",
  },

  input: {

    width: "100%",

    padding: "1rem",

    marginBottom: "1rem",

    borderRadius: "12px",

    border: "1px solid #dbeafe",

    fontSize: "1rem",
  },

  bookBtn: {

    width: "100%",

    padding: "1rem",

    border: "none",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg, #eab308, #ca8a04)",

    color: "white",

    fontWeight: "700",

    fontSize: "1rem",

    cursor: "pointer",

    boxShadow:
      "0 10px 25px rgba(234,179,8,0.3)",
  },
};

export default PropertyDetail;