// imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import firebaseConfig from "../pages/firebase/firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // auth.signInWithRedirect(provider);
    alert("Currently we are working on it , we don't have any admin and superadmin data that's why we did not enable it but you can login userself by clicking on below signup button")
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isSignup) {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 space-y-8 transition-all duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            {isSignup
              ? "Sign up to get started"
              : "Login to manage your admin dashboard"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-3 rounded-lg hover:bg-indigo-600 transition-all duration-300"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {!isSignup && (
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full border border-gray-300 font-medium py-3 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            <img
              src="data:image/png;base64,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"
              alt="Google Icon"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>
        )}

        <div className="text-center pt-2">
          <button
            className="text-indigo-600 text-sm font-medium hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
