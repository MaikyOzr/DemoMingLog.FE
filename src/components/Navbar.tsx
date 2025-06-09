import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar-container fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="navbar-brand text-white text-xl font-bold">
              MindLog 🧠
            </Link>

            {/* Navigation links */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <Link to="/journal" className="nav-link text-white hover:text-purple-400 transition">
                  {t.nav.journal}
                </Link>
              )}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary"
                >
                  {t.nav.logout}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Language Switcher Button */}
      <div className="fixed bottom-8 left-8 z-50">
        <button
          onClick={toggleLanguage}
          className="btn btn-primary flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <span className="text-sm font-medium">{t.nav.language}</span>
          <span className="text-lg">🌐</span>
        </button>
      </div>
    </>
  );
};
