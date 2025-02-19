const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Book an appointment
router.post("/book", async (req, res) => {
    try {
        const { userId, employeeId, date, time } = req.body;
        const newAppointment = new Appointment({ userId, employeeId, date, time });
        await newAppointment.save();
        res.status(201).json({ message: "Appointment booked successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error booking appointment", error });
    }
});

module.exports = router;
