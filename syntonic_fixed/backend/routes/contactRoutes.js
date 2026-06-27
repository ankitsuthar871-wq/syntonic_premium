const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");
console.log("📍 contactRoutes.js file load ho gayi hai!");

router.post("/", async (req, res) => {
  console.log("📥 Incoming Request Body:", req.body); // Ye check karega ki frontend se kya aaya

  try {
    const contact = new Contact(req.body);
    await contact.save();
 
    console.log("✅ Saved to MongoDB successfully!"); // Success log

    res.json({
      success: true,
      message: "Data Saved Successfully",
    });
  } catch (error) {
    console.error("❌ Error saving data:", error); // Detailed error log

    res.status(500).json({
      success: false,
      message: "Error saving data",
    });
  }
});

module.exports = router;