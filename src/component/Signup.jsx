import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, firebase } from "../component/../pages/firebase/firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Check if username is taken
      const userRef = db.collection("users").doc(username);
      const userSnap = await userRef.get();
      if (userSnap.exists) {
        alert("Username already taken");
        return;
      }

      const userCred = await auth.createUserWithEmailAndPassword(email, password);
      await userRef.set({
        uid: userCred.user.uid,
        email,
        password, // Consider hashing or using security rules
      });

      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.message);
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md w-96 shadow">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Sign Up</button>
        </form>
        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
