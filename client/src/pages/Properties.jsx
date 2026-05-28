import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

function Properties() {

  const [properties, setProperties] = useState([]);

  useEffect(() => {

    fetchProperties();

  }, []);

  const fetchProperties = async () => {

    try {

      const res = await API.get('/properties');

      setProperties(res.data);

    } catch (err) {

      console.log(err);

      alert('Failed to fetch properties');
    }
  };

  return (

    <div style={styles.container}>

      <h1>Properties</h1>

      <div style={styles.grid}>

        {properties.map((property) => (

          <Link
            key={property.id}
            to={`/properties/${property.id}`}
            style={{ textDecoration:'none', color:'black' }}
          >

            <div style={styles.card}>

              <h2>{property.name}</h2>

              <p>{property.description}</p>

              <p>
                <strong>Location:</strong>
                {' '}
                {property.location}
              </p>

              <p>
                <strong>City:</strong>
                {' '}
                {property.city}
              </p>

              <p>
                <strong>Price:</strong>
                {' '}
                ₹{property.price}
              </p>

              <p>
                <strong>Type:</strong>
                {' '}
                {property.type}
              </p>

              <p>
                <strong>Rooms:</strong>
                {' '}
                {property.rooms}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}

const styles = {

  container: {
    padding:
      window.innerWidth <= 768
        ? '1rem'
        : '2rem',

    background:'#f5f7fb',
    minHeight:'100vh'
  },

  grid: {
    display:'grid',

    gridTemplateColumns:
      window.innerWidth <= 768
        ? '1fr'
        : window.innerWidth <= 1024
        ? 'repeat(2,1fr)'
        : 'repeat(3,1fr)',

    gap:'2rem'
  },

  card: {
    border:'1px solid #ccc',
    borderRadius:'10px',
    padding:'1rem',
    boxShadow:'0 2px 5px rgba(0,0,0,0.1)'
  }
};

export default Properties;