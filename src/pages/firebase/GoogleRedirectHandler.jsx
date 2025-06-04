import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const GoogleRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth
      .getRedirectResult()
      .then((result) => {
        if (result.user) {
          // Save user info to localStorage for session persistence
          localStorage.setItem(
            "authUser",
            JSON.stringify({ email: result.user.email })
          );

          // Redirect to home
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Google sign-in error: ", error);
        navigate("/login");
      });
  }, [navigate]);

  return <div>Processing login...</div>;
};

export default GoogleRedirectHandler;
