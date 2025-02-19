// require("dotenv").config();
// require('dotenv').config();

// const apiKey = process.env.METAMASK_API_KEY;
// console.log("Your API Key:", apiKey);

// const express = require("express");
// const Web3 = require("web3");

// const app = express();
// app.use(express.json());

// const web3 = new Web3("https://sepolia.infura.io/v3/b9a4e125fffa4331b84c9f5018f8cbe4"); // Replace with actual Infura URL
// const contractABI = []; // Add your contract ABI here
// const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"; // Replace with actual address
// const contract = new web3.eth.Contract(contractABI, contractAddress);

// app.get("/getMessage", async (req, res) => {
//   try {
//     const message = await contract.methods.getMessage().call();
//     res.json({ message });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

// web3.eth.getBlockNumber().then((block) => {
//   console.log("Current block number:", block);
// });




//import express from "express";
// import Web3 from "web3";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(express.json());

// const web3 = new Web3("https://sepolia.infura.io/v3/b9a4e125fffa4331b84c9f5018f8cbe4");

// const contractABI = []; // Add your contract ABI here
// const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with actual address
// const contract = new web3.eth.Contract(contractABI, contractAddress);

// app.get("/getMessage", async (req, res) => {
//   try {
//     const message = await contract.methods.message().call();
//     res.json({ message });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });






// require("dotenv").config();
// const express = require("express");
// const Web3 = require("web3");

// // ✅ Correct Web3 Provider Setup
// const provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/b9a4e125fffa4331b84c9f5018f8cbe4");
// const web3 = new Web3(provider);

// const app = express();
// app.use(express.json());

// // ✅ Smart Contract Setup
// const contractABI = [];  // 🔹 Replace with your actual contract ABI
// const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"; // 🔹 Replace with your contract address
// const contract = new web3.eth.Contract(contractABI, contractAddress);

// // ✅ Test Infura Connection
// web3.eth.net.isListening()
//   .then(() => console.log("✅ Connected to Ethereum Node"))
//   .catch((err) => console.error("❌ Connection Error:", err));

// // ✅ Fetch Message from Smart Contract
// app.get("/getMessage", async (req, res) => {
//   try {
//     const message = await contract.methods.message().call();
//     res.json({ message });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// // ✅ Send a Transaction to Update a Message
// app.post("/setMessage", async (req, res) => {
//   try {
//     const { newMessage } = req.body;

//     const account = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";  // 🔹 Replace with sender's Ethereum address
//     const privateKey = "YOUR_PRIVATE_KEY";  // ⚠️ Don't expose this in production

//     const tx = {
//       to: contractAddress,
//       data: contract.methods.setMessage(newMessage).encodeABI(),
//       gas: 3000000,
//     };

//     const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
//     const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

//     res.json({ receipt });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// // ✅ Start Server
// app.listen(5000, () => {
//   console.log("🚀 Server running on port 5000");
// });

// app.get("/getAppointments", async (req, res) => {
//   try {
//     const appointments = await contract.methods.getAppointments().call();
//     res.json({ appointments });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get("/checkEmployeeAvailability/:id", async (req, res) => {
//   try {
//     const isAvailable = await contract.methods.checkAvailability(req.params.id).call();
//     res.json({ available: isAvailable });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get("/getDocument/:docId", async (req, res) => {
//   try {
//     const document = await contract.methods.getDocument(req.params.docId).call();
//     res.json({ document });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });








require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http"); // ✅ Import HTTP module for WebSockets
const socketIo = require("socket.io");
const Appointment = require("./models/Appointment"); // ✅ Import your appointment model


const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection (Should be before server starts)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Import Routes BEFORE `app.listen()`
const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointments", appointmentRoutes);

const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api/employees", employeeRoutes);

const documentRoutes = require("./routes/documentRoutes");
app.use("/api/documents", documentRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// ✅ Root API Check
app.get("/", (req, res) => {
    res.send("Navigating Banking API is running...");
});

// ✅ Start Server (AFTER all routes are defined)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log("JWT_SECRET:", process.env.JWT_SECRET);



// ✅ Create an HTTP server
const server = http.createServer(app);

// ✅ Initialize WebSocket Server
const io = socketIo(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("User connected for notifications");

    // Fetch all upcoming appointments from the database
    const sendReminders = async () => {
        try {
            const now = new Date();  // Get current time
            const upcomingAppointments = await Appointment.find({ date: { $gte: now } });

            upcomingAppointments.forEach((appointment) => {
                const appointmentTime = new Date(appointment.date);
                const timeDiff = appointmentTime - now; // Time difference in milliseconds

                if (timeDiff > 0) {
                    // Schedule reminders at different times
                    setTimeout(() => {
                        io.emit("showReminder", { 
                            time: appointmentTime.toLocaleTimeString(), 
                            message: "🚀 Reminder: Your meeting is in 1 hour!" 
                        });
                    }, timeDiff - 60 * 60 * 1000);  // 1 hour before

                    setTimeout(() => {
                        io.emit("showReminder", { 
                            time: appointmentTime.toLocaleTimeString(), 
                            message: "📅 Reminder: Your meeting is in 30 minutes!" 
                        });
                    }, timeDiff - 30 * 60 * 1000);  // 30 minutes before

                    setTimeout(() => {
                        io.emit("showReminder", { 
                            time: appointmentTime.toLocaleTimeString(), 
                            message: "⏳ Your meeting is in 5 minutes!" 
                        });
                    }, timeDiff - 5 * 60 * 1000);  // 5 minutes before
                }
            });

        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    sendReminders();  // Call function to send notifications

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

