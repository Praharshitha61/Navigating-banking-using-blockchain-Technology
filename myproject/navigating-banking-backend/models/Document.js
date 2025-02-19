const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true }, 
    keywords: [String],  
    fileUrl: { type: String, required: true },  
    bankName: { type: String, required: true },  // New field
    documentType: { type: String, required: true },  // New field (e.g., application form, policy document)
    accountType: { type: String }  // Optional (e.g., savings, current, business)
});

module.exports = mongoose.model("Document", DocumentSchema);
