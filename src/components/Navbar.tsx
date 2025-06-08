import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useJournalFetcher } from "../api/fetcher";

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

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
    <nav className="navbar-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="navbar-brand">
              MindLog 🧠
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/journal"
                  className="nav-link"
                >
                  Мій журнал
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary"
                >
                  Вийти
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/signin"
                  className="btn btn-secondary"
                >
                  Увійти
                </Link>
                <Link
                  to="/auth/signup"
                  className="btn btn-primary"
                >
                  Зареєструватися
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}; 