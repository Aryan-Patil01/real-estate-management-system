import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function PropertyDetail() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');


  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await API.get(`/properties/${id}`);
      setProperty(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!property) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div
      style={{
        padding:
          window.innerWidth <= 768
            ? "1rem"
            : "2rem"
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          display: "flex",
          flexDirection:
            window.innerWidth <= 768
              ? "column"
              : "column",
          margin: "auto",
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}
      >
        <img
          src={property.image}
          alt={property.name}
          style={{
            width: "100%",
            height:
              window.innerWidth <= 768
                ? "250px"
                : "400px",
            objectFit: "cover",
            borderRadius: "10px"
          }}
        />

        <h1 style={{ marginTop: "1rem" }}>{property.name}</h1>

        <p>{property.description}</p>

        <h3>📍 {property.location}</h3>

        <h2 style={{ color: "green" }}>
          ₹ {property.price}
        </h2>

        <div style={{ marginTop: "1rem" }}>
  <input
    type="date"
    value={visitDate}
    onChange={(e) => setVisitDate(e.target.value)}
    style={{
      padding: "0.8rem",
      width: "100%",
      marginBottom: "1rem",
      borderRadius: "5px",
      border: "1px solid #ccc"
    }}
  />

  <input
    type="time"
    value={visitTime}
    onChange={(e) => setVisitTime(e.target.value)}
    style={{
      padding: "0.8rem",
      width: "100%",
      borderRadius: "5px",
      border: "1px solid #ccc"
    }}
  />
</div>

        <button
  onClick={async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/bookings",
        {
          property_id: property.id,
          visit_date: `${visitDate} ${visitTime}`
        }
      );

      alert("Visit booked successfully");
    } catch (err) {
      console.log(err);
      alert("Booking failed");
    }
  }}
  style={{
    padding:
      window.innerWidth <= 768
        ? "0.8rem"
        : "1rem 2rem",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "1rem"
  }}
>
  Book Visit
</button>
      </div>
    </div>
  );
}

export default PropertyDetail;