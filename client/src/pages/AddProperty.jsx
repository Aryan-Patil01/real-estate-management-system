import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

function AddProperty() {

  const navigate = useNavigate();

  const [form, setForm] =
    useState({

      name: "",

      description: "",

      location: "",

      city: "",

      price: "",

      type: "residential",

      rooms: "",

      availability: "available",

      contact: "",
    });

  const [images, setImages] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async () => {

    if (submitted) return;

    if (
      !form.name ||
      !form.city ||
      !form.location ||
      !form.price ||
      !form.contact
    ) {

      setError(
        "Please fill all required fields"
      );

      return;
    }

    setLoading(true);

    setSubmitted(true);

    setError("");

    setMessage("");

    try {

      const res =
        await API.post(
          "/properties",
          form
        );

      const propertyId =
        res.data.propertyId;

      if (images.length > 0) {

        const formData =
          new FormData();

        for (let img of images) {

          formData.append(
            "images",
            img
          );
        }

        await API.post(

          `/upload/${propertyId}`,

          formData,

          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      }

      setMessage(
        "Property added successfully!"
      );

      setTimeout(() => {

        navigate("/properties");

      }, 1800);

    } catch (err) {

      setError(

        err.response?.data
          ?.message ||

        "Failed to add property"
      );

      setLoading(false);

      setSubmitted(false);
    }
  };

  return (

    <div style={styles.page}>

      {/* HERO */}
      <div style={styles.hero}>

        <div style={styles.overlay}></div>

        <div style={styles.heroContent}>

          <h1 style={styles.heroTitle}>
            Add Premium Property
          </h1>

          <p style={styles.heroText}>

            Showcase luxury homes,
            apartments, and commercial
            spaces on UrbanNest.

          </p>

        </div>

      </div>

      {/* FORM SECTION */}
      <div style={styles.container}>

        <div style={styles.card}>

          <h2 style={styles.heading}>
            Property Information
          </h2>

          {/* SUCCESS */}
          {message && (

            <div style={styles.successBox}>
              ✅ {message}
            </div>

          )}

          {/* ERROR */}
          {error && (

            <div style={styles.errorBox}>
              ❌ {error}
            </div>

          )}

          {/* GRID */}
          <div style={styles.grid}>

            {/* PROPERTY NAME */}
            <div style={styles.field}>

              <label style={styles.label}>
                Property Name *
              </label>

              <input
                style={styles.input}

                name="name"

                placeholder="Luxury Villa"

                onChange={handleChange}
              />

            </div>

            {/* CITY */}
            <div style={styles.field}>

              <label style={styles.label}>
                City *
              </label>

              <input
                style={styles.input}

                name="city"

                placeholder="Chennai"

                onChange={handleChange}
              />

            </div>

            {/* LOCATION */}
            <div style={styles.field}>

              <label style={styles.label}>
                Location *
              </label>

              <input
                style={styles.input}

                name="location"

                placeholder="Anna Nagar"

                onChange={handleChange}
              />

            </div>

            {/* PRICE */}
            <div style={styles.field}>

              <label style={styles.label}>
                Price *
              </label>

              <input
                type="number"

                style={styles.input}

                name="price"

                placeholder="8500000"

                onChange={handleChange}
              />

            </div>

            {/* TYPE */}
            <div style={styles.field}>

              <label style={styles.label}>
                Property Type
              </label>

              <select
                style={styles.input}

                name="type"

                onChange={handleChange}
              >

                <option value="residential">
                  Residential
                </option>

                <option value="commercial">
                  Commercial
                </option>

              </select>

            </div>

            {/* ROOMS */}
            <div style={styles.field}>

              <label style={styles.label}>
                Rooms
              </label>

              <input
                type="number"

                style={styles.input}

                name="rooms"

                placeholder="3"

                onChange={handleChange}
              />

            </div>

            {/* CONTACT */}
            <div style={styles.field}>

              <label style={styles.label}>
                Contact *
              </label>

              <input
                style={styles.input}

                name="contact"

                placeholder="+91 9876543210"

                onChange={handleChange}
              />

            </div>

            {/* AVAILABILITY */}
            <div style={styles.field}>

              <label style={styles.label}>
                Availability
              </label>

              <select
                style={styles.input}

                name="availability"

                onChange={handleChange}
              >

                <option value="available">
                  Available
                </option>

                <option value="sold">
                  Sold
                </option>

                <option value="rented">
                  Rented
                </option>

              </select>

            </div>

          </div>

          {/* DESCRIPTION */}
          <div style={styles.field}>

            <label style={styles.label}>
              Property Description
            </label>

            <textarea
              style={styles.textarea}

              name="description"

              rows={5}

              placeholder="Describe the property..."

              onChange={handleChange}
            />

          </div>

          {/* IMAGE UPLOAD */}
          <div style={styles.uploadBox}>

            <label style={styles.uploadLabel}>
              📸 Upload Property Images
            </label>

            <input
              type="file"

              multiple

              accept="image/*"

              style={styles.fileInput}

              onChange={(e) =>
                setImages(
                  [...e.target.files]
                )
              }
            />

            {images.length > 0 && (

              <p style={styles.fileCount}>
                {images.length}
                {" "}
                image(s) selected
              </p>

            )}

          </div>

          {/* BUTTON */}
          <button
            style={
              loading || submitted
                ? styles.disabledBtn
                : styles.submitBtn
            }

            onClick={handleSubmit}

            disabled={
              loading || submitted
            }
          >

            {loading
              ? "Uploading..."
              : "➕ Add Property"}

          </button>

        </div>

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

    height: "320px",

    backgroundImage:
      "url('https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop')",

    backgroundSize: "cover",

    backgroundPosition: "center",

    position: "relative",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",
  },

  overlay: {

    position: "absolute",

    inset: 0,

    background:
      "rgba(15,23,42,0.72)",
  },

  heroContent: {

    position: "relative",

    zIndex: 2,

    textAlign: "center",

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

  /* FORM */

  container: {

    padding:
      window.innerWidth <= 768
        ? "1rem"
        : "3rem",

    maxWidth: "1200px",

    margin: "0 auto",
  },

  card: {

    marginTop: "-80px",

    position: "relative",

    zIndex: 3,

    background:
      "rgba(255,255,255,0.85)",

    backdropFilter:
      "blur(18px)",

    border:
      "1px solid rgba(255,255,255,0.3)",

    borderRadius: "30px",

    padding:
      window.innerWidth <= 768
        ? "1.5rem"
        : "3rem",

    boxShadow:
      "0 20px 40px rgba(0,0,0,0.08)",
  },

  heading: {

    marginBottom: "2rem",

    color: "#0f172a",

    fontSize: "2rem",
  },

  grid: {

    display: "grid",

    gridTemplateColumns:
      window.innerWidth <= 768
        ? "1fr"
        : "1fr 1fr",

    gap: "1.5rem",
  },

  field: {

    display: "flex",

    flexDirection: "column",

    marginBottom: "1.3rem",
  },

  label: {

    marginBottom: "0.6rem",

    fontWeight: "600",

    color: "#334155",
  },

  input: {

    padding: "1rem",

    borderRadius: "14px",

    border:
      "1px solid #dbeafe",

    fontSize: "1rem",

    background: "white",
  },

  textarea: {

    padding: "1rem",

    borderRadius: "14px",

    border:
      "1px solid #dbeafe",

    resize: "vertical",

    fontSize: "1rem",

    background: "white",
  },

  uploadBox: {

    marginTop: "1rem",

    padding: "2rem",

    border:
      "2px dashed #cbd5e1",

    borderRadius: "20px",

    textAlign: "center",

    background: "#f8fafc",
  },

  uploadLabel: {

    display: "block",

    marginBottom: "1rem",

    fontWeight: "600",

    color: "#334155",
  },

  fileInput: {

    marginBottom: "1rem",
  },

  fileCount: {

    color: "#64748b",

    fontWeight: "500",
  },

  submitBtn: {

    width: "100%",

    marginTop: "2rem",

    padding: "1rem",

    border: "none",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg, #eab308, #ca8a04)",

    color: "white",

    fontWeight: "700",

    fontSize: "1rem",

    cursor: "pointer",

    boxShadow:
      "0 12px 30px rgba(234,179,8,0.3)",
  },

  disabledBtn: {

    width: "100%",

    marginTop: "2rem",

    padding: "1rem",

    border: "none",

    borderRadius: "16px",

    background: "#94a3b8",

    color: "white",

    fontWeight: "700",

    fontSize: "1rem",

    cursor: "not-allowed",
  },

  successBox: {

    background: "#dcfce7",

    color: "#15803d",

    padding: "1rem",

    borderRadius: "14px",

    marginBottom: "1.5rem",

    fontWeight: "600",
  },

  errorBox: {

    background: "#fee2e2",

    color: "#dc2626",

    padding: "1rem",

    borderRadius: "14px",

    marginBottom: "1.5rem",

    fontWeight: "600",
  },
};

export default AddProperty;