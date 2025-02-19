import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MeetingReminder from "./components/MeetingReminder";
import BookingForm from "./components/BookingForm";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [account, setAccount] = useState("");

  useEffect(() => {
    loadWeb3();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        console.log("Connected MetaMask Account:", accounts[0]);
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it.");
    }
  };

  return (
    <Router>
      <div className="p-6">
        <nav className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-md">
          <h1 className="text-xl font-bold">Navigating Banking</h1>
          <div>
            <Link className="px-4 py-2 bg-gray-200 text-blue-700 rounded-md mx-2" to="/">
              Home
            </Link>
            <Link className="px-4 py-2 bg-gray-200 text-blue-700 rounded-md mx-2" to="/dashboard">
              Dashboard
            </Link>
            <Link className="px-4 py-2 bg-gray-200 text-blue-700 rounded-md mx-2" to="/admin">
              Admin
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Login setAccount={setAccount} />} />
          <Route path="/dashboard" element={<Dashboard account={account} />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        {/* <div className="mt-6 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-semibold">MetaMask Connection</h2>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={loadWeb3}>
            Connect MetaMask
          </button>
          {account && <p className="mt-2">Connected Account: {account}</p>}
        </div> */}

        {/* Include Meeting Reminder */}
        <MeetingReminder />
      </div>
    </Router>
  );
}

export default App;

























// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;







