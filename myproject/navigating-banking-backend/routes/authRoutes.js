// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require('../models/User');

// const router = express.Router();


// router.get("/test", (req, res) => {
//     res.json({ message: "Auth API is working!" });
// });


// Register
// router.post("/register", async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();
//         res.status(201).json({ message: "User registered" });
//     } catch (error) {
//         res.status(500).json({ message: "Error registering", error });
//     }
// });

// // Login
// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user || !await bcrypt.compare(password, user.password)) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: "Error logging in", error });
//     }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();

// router.get("/test", (req, res) => {
//     res.json({ message: "Auth API is working!" });
// });

// module.exports = router;








const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");  // Ensure User model exists
const router = express.Router();

// ✅ Test Route (Check if API is working)
router.get("/test", (req, res) => {
    res.json({ message: "Auth API is working!" });
});

// ✅ User Registration Route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});

// ✅ User Login Route with Better Error Handling
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log("Login Request Received:", { email, password });  // Debugging

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found:", email);  // Debugging
            return res.status(400).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid password for user:", email);  // Debugging
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("Login successful for user:", email);  // Debugging
        res.json({ token });
    } catch (error) {
        console.error("Login Error:", error);  // Log the full error
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// ✅ Export Routes
module.exports = router;
