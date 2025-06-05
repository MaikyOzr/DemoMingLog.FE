import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to MindLog 🧠</h1>
      <p className="text-gray-600 mb-8">Track your mental state, moods and thoughts daily.</p>
      <div className="space-x-4">
        <Link to="auth/signin" className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90">
          Login
        </Link>
        <Link to="auth/signup" className="bg-secondary text-white px-6 py-2 rounded hover:bg-opacity-90">
          Register
        </Link>
        <Link to="journal" className="bg-secondary text-white px-6 py-2 rounded hover:bg-opacity-90">
          Journal
        </Link>
      </div>
    </div>
  );
}; 