import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Journal } from "./pages/Journal";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <Router basename="/">
      <div className="app-container">
        <div className="relative">
          {/* Decorative elements */}
          <div className="decorative-elements-wrapper">
            <div className="decorative-blob blob-primary-100 blob-top-right animate-blob"></div>
            <div className="decorative-blob blob-secondary-100 blob-bottom-left animate-blob animation-delay-2000"></div>
            <div className="decorative-blob blob-primary-200 blob-center animate-blob animation-delay-4000"></div>
          </div>
          
          {/* Main content */}
          <div className="main-content-wrapper">
            <div className="hero-section">
              <h1 className="hero-title">Мільйони людей обирають нас!</h1>
              <p className="hero-subtitle">Приєднуйтесь до спільноти, яка змінює своє життя.</p>
            </div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/signin" element={<Login />} />
              <Route path="/auth/signup" element={<Register />} />
              <Route 
                path="/journal" 
                element={
                  <ProtectedRoute>
                    <Journal />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;