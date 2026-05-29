import { useState } from 'react';
import API from '../api/axios';

function BookVisit() {

  const [propertyId, setPropertyId] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');

  const handleBooking = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem('token');

      // Combine date + time into a single datetime string (e.g. "2025-06-10T14:30")
      const visitDateTime = visitDate && visitTime
        ? `${visitDate}T${visitTime}:00`
        : visitDate;

      await API.post(
        '/bookings',
        {
          property_id: propertyId,
          visit_date: visitDateTime
        },
        {
          headers: {
            Authorization:`Bearer ${token}`
          }
        }
      );

      alert('Visit booked successfully');

    } catch (err) {

      console.log(err);

      alert('Booking failed');
    }
  };

  return (

    <div style={styles.container}>

      <form
        onSubmit={handleBooking}
        style={styles.form}
      >

        <h2>Book Visit</h2>

        <input
          type="number"
          placeholder="Property ID"
          value={propertyId}
          onChange={(e) => setPropertyId(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="date"
          value={visitDate}
          onChange={(e) => setVisitDate(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="time"
          value={visitTime}
          onChange={(e) => setVisitTime(e.target.value)}
          required
          style={styles.input}
        />

        <button
          type="submit"
          style={styles.button}
        >
          Book Visit
        </button>

      </form>

    </div>
  );
}

const styles = {

  container: {
    display:'flex',
    justifyContent:'center',
    padding:'1rem',
    marginTop:'2rem'
  },

  form: {
    width:'100%',
    maxWidth:'600px',

    display:'flex',
    flexDirection:'column',

    gap:'1rem',

    border:'1px solid #ccc',

    padding:
      window.innerWidth <= 768
        ? '1rem'
        : '2rem',

    borderRadius:'10px',

    background:'white'
  },

  input: {
    width:'100%',
    padding:'0.8rem',
    borderRadius:'5px',
    border:'1px solid #ccc'
  },

  button: {
    padding:'0.8rem',
    background:'#0b0b2b',
    color:'white',
    border:'none',
    cursor:'pointer'
  }
};

export default BookVisit;