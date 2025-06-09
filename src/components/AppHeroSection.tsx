import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export const AppHeroSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="hero-section">
      <h1 className="hero-title">{t.appHero.title}</h1>
      <p className="hero-subtitle">{t.appHero.subtitle}</p>
    </div>
  );
}; 