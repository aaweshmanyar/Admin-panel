// src/pages/GoogleRedirectHandler.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const GoogleRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    firebase.auth().getRedirectResult()
      .then((result) => {
        if (result.user) {
          // Save user info to localStorage (or Context/Auth Provider)
          localStorage.setItem("authUser", JSON.stringify(result.user));
          navigate("/"); // Redirect to homepage or dashboard
        } else {
          // No user returned — possibly cancelled or first visit
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Google login error:", error);
        alert("Google login failed!");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-lg text-gray-700">Signing in with Google...</p>
    </div>
  );
};

export default GoogleRedirectHandler;
