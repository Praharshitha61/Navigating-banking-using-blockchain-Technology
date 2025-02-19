import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser, setAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, setLocalAccount] = useState("");
  const navigate = useNavigate();

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.msg || "Login failed");
    }
  };

  // Handle MetaMask Connection
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setLocalAccount(accounts[0]);
        setAccount(accounts[0]);
        alert(`Connected to MetaMask: ${accounts[0]}`);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
        alert("Failed to connect to MetaMask");
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold">Login</h2>

      {/* Email/Password Login Form */}
      <form onSubmit={handleLogin} className="mt-4 flex flex-col items-center">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-2 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-2 p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md">
          Login
        </button>
      </form>

      {/* MetaMask Login Button */}
      <h3 className="mt-6 text-lg font-bold">Or Connect with MetaMask</h3>
      <button
        className="mt-2 px-6 py-2 bg-green-500 text-white rounded-md"
        onClick={connectWallet}
      >
        Connect MetaMask
      </button>

      {/* Show Connected Account */}
      {account && <p className="mt-3">Connected Account: {account}</p>}
    </div>
  );
};

export default Login;
