import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { LoginData } from "../types/auth";

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signin", formData);
      console.log("Full response:", response);
      console.log("Response data:", response.data);
      console.log("Response headers:", response.headers);
      
      const token = typeof response.data === "string"
        ? response.data
        : (response.data.token || response.data.accessToken || response.data.access_token);
      console.log("Found token:", token);
      
      if (!token) {
        throw new Error("No token found in response");
      }
      
      localStorage.setItem("token", token);
      console.log("Token saved to localStorage:", localStorage.getItem("token"));
      
      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err);
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">MindLog Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="w-full bg-primary text-white p-2 rounded mb-4">
            Login
          </button>
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-primary hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}; 