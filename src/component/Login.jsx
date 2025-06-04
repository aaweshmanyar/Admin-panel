// imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth"; // Add this
import firebaseConfig from "../component/../pages/firebase/firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const auth = firebase.auth(); // Firebase Auth instance
const provider = new firebase.auth.GoogleAuthProvider(); // Google provider

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    auth.signInWithRedirect(provider);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isSignup) {
      // Sign up with custom username/password
      try {
        const userRef = db.collection("users").doc(username);
        const userSnap = await userRef.get();
        if (userSnap.exists) {
          alert("Username already taken!");
        } else {
          await userRef.set({ password });
          alert("Signup successful! You can now log in.");
          setIsSignup(false);
        }
      } catch (error) {
        console.error("Error signing up: ", error);
      }
    } else {
      // Login with custom username/password
      try {
        const userRef = db.collection("users").doc(username);
        const userSnap = await userRef.get();
        if (userSnap.exists && userSnap.data().password === password) {
          localStorage.setItem("authUser", JSON.stringify({ username }));
          navigate("/");
        } else {
          alert("Invalid username or password");
        }
      } catch (error) {
        console.error("Error logging in: ", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">
          {isSignup ? "Sign Up" : "Admin Login"}
        </h2>
        <form onSubmit={handleAuth}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Google Login Button */}
        {!isSignup && (
          <div className="mt-4 text-center">
            <button
              onClick={handleGoogleLogin}
              className="text-sm text-white bg-red-500 hover:bg-red-600 rounded-md px-4 py-2 w-full"
            >
              Sign in with Google
            </button>
          </div>
        )}

        <div className="mt-4 text-center">
          <button
            className="text-blue-500"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
