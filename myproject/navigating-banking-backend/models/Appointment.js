const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
