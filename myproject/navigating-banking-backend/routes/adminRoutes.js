const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/dashboard", authMiddleware(["admin"]), (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

module.exports = router;
