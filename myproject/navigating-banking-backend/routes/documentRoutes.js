// const express = require("express");
// const Document = require("../models/Document");

// const router = express.Router();

// router.get("/test", (req, res) => {
//     res.json({ message: "Document API is working!" });
// });

// // ✅ API to fetch banking documents based on user input
// router.get("/search", async (req, res) => {
//     try {
//         const { bankName, documentType, accountType } = req.query; // Get user input

//         if (!bankName && !documentType && !accountType) {
//             return res.status(400).json({ message: "At least one search parameter is required" });
//         }

//         // Build search criteria dynamically
//         let searchQuery = {};
//         if (bankName) {
//             searchQuery.bankName = { $regex: bankName, $options: "i" };
//         }
//         if (documentType) {
//             searchQuery.documentType = { $regex: documentType, $options: "i" };
//         }
//         if (accountType) {
//             searchQuery.accountType = { $regex: accountType, $options: "i" };
//         }

//         // Find documents matching the criteria
//         const documents = await Document.find(searchQuery);

//         if (documents.length === 0) {
//             return res.status(404).json({ message: "No related banking documents found" });
//         }

//         res.json({ results: documents });

//     } catch (error) {
//         res.status(500).json({ message: "Error retrieving documents", error });
//     }
// });

// module.exports = router;



// const express = require("express");
// const Document = require("../models/Document");

// const router = express.Router();

// // ✅ Test Route to check if the API is working
// router.get("/test", (req, res) => {
//     res.json({ message: "Document API is working!" });
// });

// // ✅ Main Search API
// router.get("/search", async (req, res) => {
//     try {
//         const { query } = req.query; // Get user query from request

//         if (!query) {
//             return res.status(400).json({ message: "Query parameter is required" });
//         }

//         // Search by title, category, or keywords
//         const documents = await Document.find({
//             $or: [
//                 { title: { $regex: query, $options: "i" } },
//                 { category: { $regex: query, $options: "i" } },
//                 { keywords: { $in: [query.toLowerCase()] } }
//             ]
//         });

//         if (documents.length === 0) {
//             return res.status(404).json({ message: "No related documents found" });
//         }

//         res.json({ results: documents });

//     } catch (error) {
//         res.status(500).json({ message: "Error retrieving documents", error });
//     }
// });

// // ✅ Export Router
// module.exports = router;



const express = require("express");
const Document = require("../models/Document"); // Ensure the model exists

const router = express.Router();

// ✅ Test Route to check if API is working
router.get("/test", (req, res) => {
    res.json({ message: "Document API is working!" });
});

// ✅ Search Route to fetch documents based on user query
router.get("/search", async (req, res) => {
    try {
        const { query } = req.query; // Get user query from request

        if (!query) {
            return res.status(400).json({ message: "Query parameter is required" });
        }

        // Find all matching documents (case-insensitive search)
        const documents = await Document.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
                { keywords: { $in: [query.toLowerCase()] } }
            ]
        });

        if (documents.length === 0) {
            return res.status(404).json({ message: "No related documents found" });
        }

        res.json({ results: documents });

    } catch (error) {
        res.status(500).json({ message: "Error retrieving documents", error });
    }
});

// ✅ Export Router
module.exports = router;
