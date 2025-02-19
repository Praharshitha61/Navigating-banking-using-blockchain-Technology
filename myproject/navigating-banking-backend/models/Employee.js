const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    name: String,
    role: String,
    availableDates: [String]
});

module.exports = mongoose.model("Employee", EmployeeSchema);
