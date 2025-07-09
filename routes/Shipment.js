// backend/routes/shipment.js
require("dotenv").config();


const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// GET shipment by tracking ID
router.get("/track/:id", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("ruba");
    const shipment = await db.collection("shipments").findOne({ tracking_id: req.params.id });
    if (!shipment) return res.status(404).json({ message: "Not found" });
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ error: "Internal error" });
  }
});

// POST - For new shipment
router.post("/shipments", async (req, res) => {
  try {
    const newShipment = newShipment (req.body);
    await newShipment.save();
    res.status(201).json({ message: "✅ Shipment created" });
  } catch (err) {
    console.error("❌ error saving shipment:", err.message);
    res.status(500).json({ error: "Failed to create shipment" });
  }
});

// PUT - Update shipment by tracking ID
router.put("/shipments/:id", async (req, res) => {
  try {
    const updateData = req.body;
    await client.connect();
    const db = client.db("ruba");

    const result = await db.collection("shipments").updateOne(
      { tracking_id: req.params.id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json({ message: "✅ Shipment updated" });
  } catch (err) {
    console.error("❌", err);
    res.status(500).json({ error: "Failed to update shipment" });
  }
});

module.exports = router;