import { useEffect, useState } from "react";

import API from "../api/axios";

function AgentDashboard() {

  const [properties, setProperties] =
    useState([]);

  const [bookings, setBookings] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  useEffect(() => {

    fetchProperties();

    fetchBookings();

  }, []);

  /* FETCH PROPERTIES */

  const fetchProperties = async () => {

    try {

      const res =
        await API.get("/properties");

      const ownProperties =
        res.data.filter(
          (property) =>
            property.agent_id ===
            user.id
        );

      setProperties(
        ownProperties
      );

    } catch (err) {

      console.log(err);
    }
  };

  /* FETCH BOOKINGS */

  const fetchBookings = async () => {

    try {

      const res =
        await API.get("/bookings");

      const ownBookings =
        res.data.filter(
          (booking) =>
            booking.agent_id ===
            user.id
        );

      setBookings(
        ownBookings
      );

    } catch (err) {

      console.log(err);
    }
  };

  /* DELETE PROPERTY */

  const deleteProperty = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this property?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/properties/${id}`
      );

      fetchProperties();

      alert(
        "Property deleted successfully"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Failed to delete property"
      );
    }
  };

  return (

    <div style={styles.page}>

      {/* HERO */}
      <div style={styles.hero}>

        <div style={styles.overlay}></div>

        <div style={styles.heroContent}>

          <h1 style={styles.heroTitle}>
            Agent Dashboard
          </h1>

          <p style={styles.heroText}>
            Manage your properties
            and monitor customer
            visit bookings easily.
          </p>

        </div>

      </div>

      {/* MAIN */}
      <div style={styles.container}>

        {/* STATS */}
        <div style={styles.statsGrid}>

          <div style={styles.statCard}>

            <h2 style={styles.statValue}>
              {properties.length}
            </h2>

            <p style={styles.statLabel}>
              My Properties
            </p>

          </div>

          <div style={styles.statCard}>

            <h2 style={styles.statValue}>
              {bookings.length}
            </h2>

            <p style={styles.statLabel}>
              Visit Bookings
            </p>

          </div>

          <div style={styles.statCard}>

            <h2 style={styles.statValue}>
              {
                bookings.filter(
                  (b) =>
                    b.status ===
                    "Upcoming"
                ).length
              }
            </h2>

            <p style={styles.statLabel}>
              Upcoming Visits
            </p>

          </div>

        </div>

        {/* PROPERTIES */}
        <section style={styles.section}>

          <div style={styles.sectionHeader}>

            <h2 style={styles.sectionTitle}>
              My Properties
            </h2>

          </div>

          <div style={styles.grid}>

            {properties.map(
              (property) => {

                let image = null;

                if (
                  property.images &&
                  property.images.length > 0
                ) {

                  image =
                    `http://localhost:5000${property.images[0].image_url}`;

                } else if (
                  property.image
                ) {

                  image =
                    property.image;
                }

                return (

                  <div
                    key={property.id}
                    style={styles.card}
                  >

                    {/* IMAGE */}
                    {image ? (

                      <img
                        src={image}

                        alt={property.name}

                        style={styles.image}
                      />

                    ) : (

                      <div style={styles.noImage}>
                        🏠 No Image
                      </div>

                    )}

                    {/* BODY */}
                    <div style={styles.cardBody}>

                      <div style={styles.cardTop}>

                        <span style={styles.badge}>
                          {property.type}
                        </span>

                        <span style={styles.propertyId}>
                          ID:
                          {" "}
                          {property.id}
                        </span>

                      </div>

                      <h3 style={styles.cardTitle}>
                        {property.name}
                      </h3>

                      <p style={styles.location}>
                        📍
                        {" "}
                        {property.location},
                        {" "}
                        {property.city}
                      </p>

                      {property.rooms && (

                        <p style={styles.rooms}>
                          🛏
                          {" "}
                          {property.rooms}
                          {" "}
                          Rooms
                        </p>

                      )}

                      <h2 style={styles.price}>
                        ₹
                        {" "}
                        {Number(
                          property.price
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </h2>

                      {/* DELETE */}
                      <button
                        style={styles.deleteBtn}

                        onClick={() =>
                          deleteProperty(
                            property.id
                          )
                        }
                      >
                        🗑 Delete Property
                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </section>

        {/* BOOKINGS */}
        <section style={styles.section}>

          <div style={styles.sectionHeader}>

            <h2 style={styles.sectionTitle}>
              Property Visit Bookings
            </h2>

          </div>

          <div style={styles.tableWrapper}>

            <table style={styles.table}>

              <thead>

                <tr style={styles.tableHeader}>

                  <th style={styles.th}>
                    Booking ID
                  </th>

                  <th style={styles.th}>
                    Property
                  </th>

                  <th style={styles.th}>
                    Visitor
                  </th>

                  <th style={styles.th}>
                    Visit Date
                  </th>

                  <th style={styles.th}>
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {bookings.map(
                  (booking) => (

                    <tr key={booking.id}>

                      <td style={styles.td}>
                        {booking.id}
                      </td>

                      <td style={styles.td}>

                        <strong>
                          {
                            booking.property_name
                          }
                        </strong>

                        <br />

                        ID:
                        {" "}
                        {
                          booking.property_id
                        }

                      </td>

                      <td style={styles.td}>
                        <strong>
                          {booking.user_name}
                        </strong>
                        <br />
                        {booking.user_email}
                      </td>

                      <td style={styles.td}>

                        {new Date(
                          booking.visit_date
                        ).toLocaleString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",

                            hour: "numeric",
                            minute: "2-digit",

                            hour12: true,

                            timeZone: "Asia/Kolkata",
                          }
                        )}

                      </td>

                      <td style={styles.td}>

                        <span
                          style={{
                            ...styles.status,

                            background:
                              booking.status ===
                              "Upcoming"
                                ? "#dcfce7"
                                : "#e2e8f0",

                            color:
                              booking.status ===
                              "Upcoming"
                                ? "#15803d"
                                : "#475569",
                          }}
                        >
                          {
                            booking.status
                          }
                        </span>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </section>

      </div>

    </div>
  );
}

const styles = {

  page: {

    background: "#f8fafc",

    minHeight: "100vh",
  },

  /* HERO */

  hero: {

    height: "300px",

    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",

    position: "relative",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    textAlign: "center",
  },

  overlay: {

    position: "absolute",

    inset: 0,

    background:
      "rgba(0,0,0,0.15)",
  },

  heroContent: {

    position: "relative",

    zIndex: 2,

    color: "white",

    padding: "1rem",
  },

  heroTitle: {

    fontSize:
      window.innerWidth <= 768
        ? "2.5rem"
        : "4rem",

    color: "white",

    marginBottom: "1rem",
  },

  heroText: {

    fontSize: "1.1rem",

    color:
      "rgba(255,255,255,0.85)",
  },

  /* MAIN */

  container: {

    maxWidth: "1400px",

    margin: "0 auto",

    padding:
      window.innerWidth <= 768
        ? "1rem"
        : "3rem",
  },

  /* STATS */

  statsGrid: {

    display: "grid",

    gridTemplateColumns:
      window.innerWidth <= 768
        ? "1fr"
        : "repeat(3,1fr)",

    gap: "2rem",

    marginTop: "-80px",

    position: "relative",

    zIndex: 5,

    marginBottom: "3rem",
  },

  statCard: {

    background: "white",

    borderRadius: "24px",

    padding: "2rem",

    boxShadow:
      "0 20px 40px rgba(0,0,0,0.08)",

    textAlign: "center",
  },

  statValue: {

    fontSize: "3rem",

    color: "#eab308",

    marginBottom: "0.5rem",
  },

  statLabel: {

    color: "#64748b",

    fontWeight: "600",
  },

  /* SECTION */

  section: {

    marginBottom: "5rem",
  },

  sectionHeader: {

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: "2rem",
  },

  sectionTitle: {

    fontSize: "2rem",

    color: "#0f172a",
  },

  /* GRID */

  grid: {

    display: "grid",

    gridTemplateColumns:
      window.innerWidth <= 768
        ? "1fr"
        : "repeat(auto-fit, minmax(320px, 1fr))",

    gap: "2rem",
  },

  card: {

    background: "white",

    borderRadius: "24px",

    overflow: "hidden",

    boxShadow:
      "0 15px 35px rgba(0,0,0,0.06)",
  },

  image: {

    width: "100%",

    height: "240px",

    objectFit: "cover",
  },

  noImage: {

    width: "100%",

    height: "240px",

    background: "#e2e8f0",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    color: "#64748b",
  },

  cardBody: {

    padding: "1.5rem",
  },

  cardTop: {

    display: "flex",

    justifyContent:
      "space-between",

    marginBottom: "1rem",
  },

  badge: {

    background: "#dbeafe",

    color: "#1d4ed8",

    padding: "0.4rem 0.8rem",

    borderRadius: "999px",

    fontSize: "0.8rem",

    fontWeight: "600",

    textTransform: "capitalize",
  },

  propertyId: {

    color: "#64748b",

    fontWeight: "600",
  },

  cardTitle: {

    marginBottom: "0.7rem",

    color: "#0f172a",
  },

  location: {

    color: "#64748b",

    marginBottom: "0.5rem",
  },

  rooms: {

    color: "#64748b",
  },

  price: {

    marginTop: "1rem",

    color: "#16a34a",
  },

  deleteBtn: {

    width: "100%",

    marginTop: "1.5rem",

    padding: "1rem",

    border: "none",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg, #ef4444, #dc2626)",

    color: "white",

    fontWeight: "700",

    cursor: "pointer",
  },

  /* TABLE */

  tableWrapper: {

    overflowX: "auto",

    background: "white",

    borderRadius: "24px",

    boxShadow:
      "0 15px 35px rgba(0,0,0,0.06)",
  },

  table: {

    width: "100%",

    borderCollapse: "collapse",

    minWidth: "800px",
  },

  tableHeader: {

    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",

    color: "white",
  },

  th: {

    padding: "1.2rem",

    textAlign: "center",
  },

  td: {

    padding: "1rem",

    borderBottom:
      "1px solid #e2e8f0",

    textAlign: "center",
  },

  status: {

    padding: "0.5rem 1rem",

    borderRadius: "999px",

    fontWeight: "700",

    fontSize: "0.85rem",
  },
};

export default AgentDashboard;