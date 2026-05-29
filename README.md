# 🏠 UrbanNest — Real Estate Management System

A full-stack real estate web application where buyers can browse properties and book visits, agents can manage their listings and track bookings, and admins have full platform oversight.

---

## 🔥 Features

### 👤 Buyer
- Browse all property listings with filters
- View detailed property pages with images
- Book property visits with date & time
- View booking history and status

### 🧑‍💼 Agent
- Add, edit, and delete property listings
- Upload property images
- View all visit bookings for their properties
- See visitor name, email, and visit time

### 🛡️ Admin
- Full dashboard overview — users, properties, bookings
- View all bookings across all agents
- Monitor platform activity

### 🏦 General
- JWT-based authentication (Register / Login)
- Role-based access control (Buyer / Agent / Admin)
- EMI Loan Calculator
- Property search by city, type, price
- Fully responsive UI

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MySQL (mysql2) |
| Auth | JWT, bcryptjs |
| Styling | Plain CSS-in-JS |
| Dev Tools | Vite, Nodemon |

---

## 📁 Project Structure

```
real-estate-app/
├── client/                 # React frontend
│   └── src/
│       ├── pages/          # All page components
│       ├── components/     # Navbar, Footer, etc.
│       └── api/            # Axios instance
├── server/                 # Express backend
│   ├── routes/             # API route handlers
│   ├── middleware/         # Auth middleware
│   ├── models/             # DB query helpers
│   ├── db.js               # MySQL connection pool
│   └── server.js           # Entry point
└── seed.sql                # Sample data seed file
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MySQL 8.0+
- npm

### 1. Clone the repository
```bash
git clone https://github.com/Aryan-Patil01/real-estate-management-system.git
cd real-estate-management-system
```

### 2. Setup the database
- Open MySQL Workbench
- Create a database called `real_estate_db`
- Run the `seed.sql` file to create tables and insert sample data

### 3. Configure environment variables
Create a `.env` file inside the `server/` folder:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=real_estate_db
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 4. Install dependencies & run

**Backend:**
```bash
cd server
npm install
nodemon server.js
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

### 5. Open the app
```
http://localhost:5173
```

---

## 🌱 Sample Data

The `seed.sql` file includes:
- **10 properties** across Mumbai, Delhi, Bangalore, Hyderabad, and Pune
- **2 agent accounts** ready to log in

| Email | Password | Role |
|---|---|---|
| rahul@urbannest.com | Agent@123 | Agent |
| priya@urbannest.com | Agent@123 | Agent |

---

## 📸 Screenshots

> Add screenshots of your app here after deployment

---

## 👨‍💻 Author

**Aryan Patil**  
GitHub: [@Aryan-Patil01](https://github.com/Aryan-Patil01)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
