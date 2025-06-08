import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoodChart } from "../components/MoodChart";
import { useJournalFetcher } from "../api/fetcher";

export const Home = () => {
  const { entries } = useJournalFetcher();
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
    <div className="min-h-screen">

      {/* Hero Section */}
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="hero-main-title">
              <span className="block hero-main-title-accent">
                Відстежуйте свій психічний стан
              </span>
            </h1>
            <p className="hero-main-subtitle">
              Приєднуйтесь до тисяч користувачів, які вже покращили своє психічне здоров'я
            </p>
            {!isAuthenticated && (
              <div className="button-group">
                <Link
                  to="/auth/signup"
                  className="btn btn-primary"
                >
                  Почніть безкоштовно
                </Link>
                <Link
                  to="/auth/signin"
                  className="btn btn-secondary"
                >
                  Увійти
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="social-proof-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="social-proof-item">
              <div className="social-proof-value">10K+</div>
              <div className="social-proof-label">Активних користувачів</div>
            </div>
            <div className="social-proof-item">
              <div className="social-proof-value">98%</div>
              <div className="social-proof-label">Задоволених користувачів</div>
            </div>
            <div className="social-proof-item">
              <div className="social-proof-value">24/7</div>
              <div className="social-proof-label">Підтримка</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">📊</span>
              </div>
              <h3 className="feature-title">Відстеження настрою</h3>
              <p className="feature-description">
                Записуйте свій настрій щодня та отримуйте детальну статистику
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">📝</span>
              </div>
              <h3 className="feature-title">Щоденник думок</h3>
              <p className="feature-description">
                Зберігайте свої думки та роздуми в зручному форматі
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">📈</span>
              </div>
              <h3 className="feature-title">Аналітика</h3>
              <p className="feature-description">
                Отримуйте інсайти про свій психічний стан завдяки графікам
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Preview - Only show for authenticated users */}
      {isAuthenticated && entries.length > 0 && (
        <div className="chart-preview-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="chart-card">
              <h2 className="chart-title">Ваш настрій за останній час</h2>
              <div className="chart-height">
                <MoodChart entries={entries} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section - Only show for non-authenticated users */}
      {!isAuthenticated && (
        <div className="cta-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="cta-title">
                Почніть відстежувати свій настрій сьогодні
              </h2>
              <p className="cta-subtitle">
                Приєднуйтесь до нашої спільноти та покращуйте своє психічне здоров'я
              </p>
              <div className="button-group">
                <Link
                  to="/auth/signup"
                  className="btn btn-primary"
                >
                  Зареєструватися
                </Link>
                <Link
                  to="/auth/signin"
                  className="btn btn-secondary"
                >
                  Увійти
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 