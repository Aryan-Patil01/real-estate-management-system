import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import BookVisit from "./pages/BookVisit";
import LoanCalculator from "./pages/LoanCalculator";
import AdminDashboard from "./pages/AdminDashboard";
import AddProperty from "./pages/AddProperty";
import AgentDashboard from "./pages/AgentDashboard";

import "./App.css";

function App() {

  return (

    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar />

      {/* ROUTES */}
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* PROPERTIES */}
        <Route
          path="/properties"
          element={<Properties />}
        />

        <Route
          path="/properties/:id"
          element={<PropertyDetail />}
        />

        {/* ADD PROPERTY */}
        <Route
          path="/add-property"

          element={
            <ProtectedRoute
              agentOrAdmin={true}
            >
              <AddProperty />
            </ProtectedRoute>
          }
        />

        {/* BOOK VISIT */}
        <Route
          path="/book/:id"

          element={
            <ProtectedRoute>

              <BookVisit />

            </ProtectedRoute>
          }
        />

        {/* LOAN CALCULATOR */}
        <Route
          path="/loan-calculator"

          element={
            <LoanCalculator />
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"

          element={
            <ProtectedRoute
              adminOnly={true}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* AGENT DASHBOARD */}
        <Route
          path="/agent-dashboard"

          element={
            <ProtectedRoute
              agentOrAdmin={true}
            >
              <AgentDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* FOOTER */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;