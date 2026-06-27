const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Dotenv configuration
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();

// CORS configuration - Allow your frontend port (5174)
app.use(cors({
    origin: ["http://localhost:5174", "http://localhost:5173", "http://localhost:5175"], 
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());

// Routes
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes"); 

app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes); 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    family: 4,
})
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
});

app.get("/", (req, res) => {
    res.send("Backend is Running 🚀");
});

app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});