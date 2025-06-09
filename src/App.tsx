import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Journal } from "./pages/Journal";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from "./components/Navbar";
import { LanguageProvider } from "./context/LanguageContext";
import { AppHeroSection } from "./components/AppHeroSection";

const App = () => {
  return (
    <LanguageProvider>
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
            <Navbar />
            <div className="main-content-wrapper">
              <AppHeroSection />
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
    </LanguageProvider>
  );
};

export default App;