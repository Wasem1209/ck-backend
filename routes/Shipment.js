const express = require("express");
const router = express.Router();
const Shipment = require("../models/Shipment");

// ✅ POST: Save Shipment
router.post("/admin/add", async (req, res) => {
  try {
    const { tracking_id } = req.body;

    // Check for duplicate tracking ID
    const existing = await Shipment.findOne({ tracking_id });
    if (existing) {
      return res.status(400).json(`{ message: Tracking ID ${tracking_id} already exists. }`);
    }

    const shipment = new Shipment(req.body);
    await shipment.save();

    res.status(201).json({ message: "Shipment saved successfully!", tracking_id });
  } catch (err) {
    console.error("❌ Error saving shipment:", err.message);
    res.status(500).json({ message: "Failed to save shipment", error: err.message });
  }
});

// ✅ GET: Retrieve Shipment by Tracking ID
router.get("/track/:id", async (req, res) => {
  try {
    const trackingId = req.params.id.trim(); // 🔍 Remove spaces

    console.log("📦 Searching for Tracking ID:", trackingId); // Debug log

    const shipment = await Shipment.findOne({ tracking_id: trackingId });

    if (!shipment) {
      return res.status(404).json(`{ message: No shipment found for ID: ${trackingId} }`);
    }

    res.json(shipment);
  } catch (err) {
    console.error("❌ Error fetching shipment:", err.message);
    res.status(500).json({ message: "Failed to fetch shipment", error: err.message });
  }
});

module.exports = router;