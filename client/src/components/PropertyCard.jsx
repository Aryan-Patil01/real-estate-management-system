import { useNavigate } from "react-router-dom";

function PropertyCard({ property }) {

  const navigate = useNavigate();

  const image =
    property.images?.[0]?.image_url
      ? `http://localhost:5000${property.images[0].image_url}`
      : "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop";

  return (

    <div style={styles.card}>

      {/* IMAGE */}
      <div style={styles.imageContainer}>

        <img
          src={image}
          alt={property.name}
          style={styles.image}
        />

        {/* OVERLAY */}
        <div style={styles.overlay}></div>

        {/* TYPE BADGE */}
        <div style={styles.typeBadge}>
          {property.type}
        </div>

        {/* PRICE */}
        <div style={styles.priceTag}>
          ₹ {Number(property.price).toLocaleString("en-IN")}
        </div>

      </div>

      {/* CONTENT */}
      <div style={styles.content}>

        <h2 style={styles.title}>
          {property.name}
        </h2>

        <p style={styles.location}>
          📍 {property.location}, {property.city}
        </p>

        <p style={styles.description}>
          {property.description
            ?.slice(0, 90)}
          ...
        </p>

        {/* DETAILS */}
        <div style={styles.detailsRow}>

          <div style={styles.detailBox}>
            🛏 {property.rooms} Rooms
          </div>

          <div
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
          </div>

        </div>

        {/* CONTACT */}
        <div style={styles.contact}>
          📞 {property.contact}
        </div>

        {/* BUTTON */}
        <button
          style={styles.button}

          onClick={() =>
            navigate(
              `/properties/${property.id}`
            )
          }
        >
          View Details →
        </button>

      </div>

    </div>
  );
}

const styles = {

  card: {

    width: "100%",

    background: "white",

    borderRadius: "24px",

    overflow: "hidden",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)",

    transition:
      "all 0.35s ease",

    cursor: "pointer",
  },

  imageContainer: {

    position: "relative",

    height: "260px",

    overflow: "hidden",
  },

  image: {

    width: "100%",

    height: "100%",

    objectFit: "cover",

    transition:
      "transform 0.5s ease",
  },

  overlay: {

    position: "absolute",

    inset: 0,

    background:
      "linear-gradient(to top, rgba(15,23,42,0.8), transparent)",
  },

  typeBadge: {

    position: "absolute",

    top: "18px",

    left: "18px",

    background:
      "rgba(255,255,255,0.2)",

    backdropFilter: "blur(8px)",

    color: "white",

    padding: "0.5rem 1rem",

    borderRadius: "999px",

    fontSize: "0.8rem",

    fontWeight: "600",

    textTransform: "capitalize",
  },

  priceTag: {

    position: "absolute",

    bottom: "18px",

    left: "18px",

    background:
      "linear-gradient(135deg, #eab308, #ca8a04)",

    color: "white",

    padding: "0.7rem 1.2rem",

    borderRadius: "12px",

    fontWeight: "700",

    fontSize: "1rem",

    boxShadow:
      "0 10px 20px rgba(234,179,8,0.3)",
  },

  content: {

    padding: "1.5rem",
  },

  title: {

    fontSize: "1.5rem",

    marginBottom: "0.5rem",

    color: "#0f172a",
  },

  location: {

    color: "#64748b",

    marginBottom: "1rem",

    fontWeight: "500",
  },

  description: {

    color: "#475569",

    lineHeight: "1.7",

    marginBottom: "1.2rem",

    minHeight: "55px",
  },

  detailsRow: {

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: "1rem",

    flexWrap: "wrap",

    gap: "0.8rem",
  },

  detailBox: {

    background: "#f1f5f9",

    padding: "0.6rem 1rem",

    borderRadius: "10px",

    fontWeight: "500",

    color: "#334155",
  },

  status: {

    padding: "0.6rem 1rem",

    borderRadius: "999px",

    fontWeight: "700",

    fontSize: "0.85rem",

    textTransform: "capitalize",
  },

  contact: {

    marginBottom: "1.3rem",

    color: "#475569",

    fontWeight: "500",
  },

  button: {

    width: "100%",

    padding: "1rem",

    border: "none",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",

    color: "white",

    fontWeight: "600",

    fontSize: "1rem",

    transition:
      "all 0.3s ease",
  },
};

export default PropertyCard;