import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminDashboard() {

  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchProperties();
    fetchBookings();
  }, []);

  const fetchProperties = async () => {
    try {

      const res = await API.get("/properties");

      setProperties(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const fetchBookings = async () => {
    try {

      const res = await API.get("/bookings");

      setBookings(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        padding:
          window.innerWidth <= 768
            ? "1rem"
            : "2rem"
      }}
    >

      <h1 style={{ textAlign: "center" }}>
        Admin Dashboard
      </h1>

      <div style={{ marginTop: "2rem" }}>

        <h2>All Properties</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              window.innerWidth <= 768
                ? "1fr"
                : window.innerWidth <= 1024
                ? "repeat(2, minmax(250px, 1fr))"
                : "repeat(3, minmax(280px, 1fr))",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          {properties.map((property) => (

            <div
              key={property.id}
              style={{
                width: window.innerWidth <= 768 ? "100%" : "350px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                overflow: "hidden",
                background: "#fff"
              }}
            >
              <img
                src={property.image}
                alt={property.name}
                style={{
                  width: "100%",
                  height: window.innerWidth <= 768 ? "200px" : "280px",
                  objectFit: "cover"
                }}
              />

              <div style={{ padding: "1rem" }}>
                <h3>{property.name}</h3>

                <p>{property.location}</p>

                <h4 style={{ color: "green" }}>
                  ₹ {property.price}
                </h4>
              </div>

            </div>

          ))}
        </div>

      </div>

      <div style={{ marginTop: "3rem" }}>

        <h2>All Bookings</h2>

        <div
          style={{
            overflowX: "auto",
            width: "100%"
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem"
            }}
          >
            <thead>
              <tr style={{ background: "#0b0b2b", color: "white" }}>
                <th style={{ padding: "1rem" }}>Booking ID</th>
                <th>User ID</th>
                <th>Property ID</th>
                <th>Visit Date</th>
              </tr>
            </thead>

            <tbody>

              {bookings.map((booking) => (

                <tr key={booking.id}>
                  <td style={{ padding: "1rem", border: "1px solid #ccc" }}>
                    {booking.id}
                  </td>

                  <td style={{ border: "1px solid #ccc" }}>
                    {booking.user_id}
                  </td>

                  <td style={{ border: "1px solid #ccc" }}>
                    {booking.property_id}
                  </td>

                  <td style={{ border: "1px solid #ccc" }}>
                    {booking.visit_date}
                  </td>
                </tr>

              ))}

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;