const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Admin panel ke liye saara data fetch karne wala route
router.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
});

module.exports = router;