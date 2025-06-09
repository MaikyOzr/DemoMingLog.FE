import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoodChart } from "../components/MoodChart";
import { useJournalFetcher } from "../api/fetcher";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export const Home = () => {
  const { entries } = useJournalFetcher();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
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

  const [featuresRef, featuresVisible] = useInView({
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="hero-main-title">
              <span className="block hero-main-title-accent">
                {t.home.title}
              </span>
            </h1>
            <p className="hero-main-subtitle">
              {t.home.subtitle}
            </p>
            {!isAuthenticated && (
              <div className="button-group">
                <Link
                  to="/auth/signup"
                  className="btn btn-primary"
                >
                  {t.home.startFree}
                </Link>
                <Link
                  to="/auth/signin"
                  className="btn btn-secondary"
                >
                  {t.home.login}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="social-proof-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="social-proof-container">
              <div className="social-proof-item">
                <div className="social-proof-value">10K+</div>
                  <div className="social-proof-label">{t.home.users}</div>
                </div>
              <div className="social-proof-item">
                <div className="social-proof-value">98%</div>
                <div className="social-proof-label">{t.home.satisfaction}</div>
              </div>
            <div className="social-proof-item">
              <div className="social-proof-value">24/7</div>
              <div className="social-proof-label">{t.home.support}</div>
            </div>
          </div>
        </div>
      </div>


      {/* Features Section */}
      <div
        ref={featuresRef}
        className={`features-section transition-opacity duration-1000 ${
        featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">📊</span>
                </div>
                <h3 className="feature-title">{t.home.features.mood.title}</h3>
              <p className="feature-description">
                {t.home.features.mood.description}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">📝</span>
              </div>
              <h3 className="feature-title">{t.home.features.journal.title}</h3>
              <p className="feature-description">
                {t.home.features.journal.description}
              </p>
            </div>
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">📈</span>
              </div>
              <h3 className="feature-title">{t.home.features.analytics.title}</h3>
              <p className="feature-description">
                {t.home.features.analytics.description}
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
              <h2 className="chart-title">{t.home.chartPreviewTitle}</h2>
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
                {t.home.cta.title}
              </h2>
              <p className="cta-subtitle">
                {t.home.cta.subtitle}
              </p>
              <div className="button-group">
                <Link
                  to="/auth/signup"
                  className="btn btn-primary"
                >
                  {t.home.cta.register}
                </Link>
                <Link
                  to="/auth/signin"
                  className="btn btn-secondary"
                >
                  {t.home.cta.login}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 