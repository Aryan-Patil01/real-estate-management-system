import { useEffect, useState } from 'react';

import API from '../api/axios';

import PropertyCard from '../components/PropertyCard';

function Properties() {

  const [properties, setProperties] = useState([]);

  // FILTER STATES
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [type, setType] = useState('');
  const [availability, setAvailability] = useState('');

  useEffect(() => {

    fetchProperties();

  }, []);

  // FETCH FILTERED PROPERTIES
  const fetchProperties = async () => {

    try {

      const res =
        await API.get('/search', {

          params: {

            city,

            min_price: minPrice,

            max_price: maxPrice,

            type,

            availability
          }
        });

      setProperties(res.data);

    } catch (err) {

      console.log(err);

      alert('Failed to fetch properties');
    }
  };

  return (

    <div style={styles.container}>

      {/* HEADING */}
      <div style={styles.header}>

        <h1 style={styles.heading}>
          🏠 Explore Properties
        </h1>

      </div>

      {/* =========================
          SEARCH & FILTER SECTION
      ========================= */}

      <div style={styles.filterBox}>

        {/* CITY */}
        <input
          type="text"

          placeholder="Search by city"

          value={city}

          onChange={(e) =>
            setCity(e.target.value)
          }

          style={styles.input}
        />

        {/* MIN PRICE */}
        <input
          type="number"

          placeholder="Min Price"

          value={minPrice}

          onChange={(e) =>
            setMinPrice(e.target.value)
          }

          style={styles.input}
        />

        {/* MAX PRICE */}
        <input
          type="number"

          placeholder="Max Price"

          value={maxPrice}

          onChange={(e) =>
            setMaxPrice(e.target.value)
          }

          style={styles.input}
        />

        {/* PROPERTY TYPE */}
        <select
          value={type}

          onChange={(e) =>
            setType(e.target.value)
          }

          style={styles.input}
        >

          <option value="">
            All Types
          </option>

          <option value="Residential">
            Residential
          </option>

          <option value="Commercial">
            Commercial
          </option>

        </select>

        {/* AVAILABILITY */}
        <select
          value={availability}

          onChange={(e) =>
            setAvailability(e.target.value)
          }

          style={styles.input}
        >

          <option value="">
            All Availability
          </option>

          <option value="available">
            Available
          </option>

          <option value="sold">
            Sold
          </option>

        </select>

        {/* SEARCH BUTTON */}
        <button
          style={styles.searchBtn}

          onClick={fetchProperties}
        >
          🔍 Search
        </button>

      </div>

      {/* =========================
          NO PROPERTIES
      ========================= */}

      {properties.length === 0 ? (

        <p style={styles.emptyText}>
          No properties found.
        </p>

      ) : (

        /* =========================
            PROPERTIES GRID
        ========================= */

        <div style={styles.grid}>

          {properties.map((property) => (

            <PropertyCard
              key={property.id}
              property={property}
            />

          ))}

        </div>

      )}

    </div>
  );
}

const styles = {

  container: {

    padding:
      window.innerWidth <= 768
        ? '1rem'
        : '2rem',

    minHeight: '100vh',

    background: '#f5f7fb',

    width: '100%',

    overflowX: 'hidden'
  },

  header: {

    display: 'flex',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: '2rem',

    flexWrap: 'wrap'
  },

  heading: {

    color: '#1a1a2e',

    fontSize:
      window.innerWidth <= 768
        ? '1.8rem'
        : '2.5rem',

    fontWeight: '700'
  },

  /* FILTER BOX */
  filterBox: {

    background: 'white',

    padding: '1.5rem',

    borderRadius: '12px',

    display: 'grid',

    gridTemplateColumns:
      window.innerWidth <= 768
        ? '1fr'
        : window.innerWidth <= 1024
        ? 'repeat(2, 1fr)'
        : 'repeat(3, 1fr)',

    gap: '1rem',

    marginBottom: '2rem',

    boxShadow:
      '0 2px 10px rgba(0,0,0,0.08)'
  },

  input: {

    padding: '0.9rem',

    borderRadius: '8px',

    border: '1px solid #ccc',

    fontSize: '0.95rem',

    width: '100%'
  },

  searchBtn: {

    padding: '0.9rem',

    background: '#1a1a2e',

    color: 'white',

    border: 'none',

    borderRadius: '8px',

    cursor: 'pointer',

    fontSize: '1rem',

    fontWeight: '600'
  },

  emptyText: {

    textAlign: 'center',

    marginTop: '3rem',

    fontSize: '1.1rem',

    color: '#666'
  },

  grid: {

    display: 'grid',

    gridTemplateColumns:
      window.innerWidth <= 768
        ? '1fr'
        : window.innerWidth <= 1024
        ? 'repeat(2, minmax(280px, 1fr))'
        : 'repeat(auto-fit, minmax(300px, 1fr))',

    gap: '2rem',

    width: '100%',

    alignItems: 'stretch'
  }
};

export default Properties;