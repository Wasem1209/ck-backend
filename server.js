require("dotenv").config(); // ✅ Load .env file

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const shipmentRoutes = require("./routes/shipment"); // Your router file

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// ✅ Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
});

// ✅ Routes
app.use("/api", shipmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});