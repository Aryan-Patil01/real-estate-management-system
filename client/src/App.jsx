import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import BookVisit from "./pages/BookVisit";
import LoanCalculator from "./pages/LoanCalculator";
import AdminDashboard from "./pages/AdminDashboard";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/properties" element={<Properties />} />

        <Route path="/properties/:id" element={<PropertyDetail />} />

        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <BookVisit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loan-calculator"
          element={<LoanCalculator />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;