const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Update availability
router.post("/availability", async (req, res) => {
    try {
        const { employeeId, availableDates } = req.body;
        await Employee.findByIdAndUpdate(employeeId, { availableDates });
        res.status(200).json({ message: "Availability updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating availability", error });
    }
});

module.exports = router;
