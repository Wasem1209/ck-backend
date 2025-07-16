require ("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const trackRoutes = require("./routes/track");

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(uri)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB connection failed:", err.message));

app.use(trackRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});