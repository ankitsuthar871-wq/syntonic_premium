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

// 🔹 Naya — Admin login verify karne wala route
router.post("/login", (req, res) => {
    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
        return res.json({ success: true });
    } else {
        return res.status(401).json({ success: false, message: "Wrong password" });
    }
});

module.exports = router;