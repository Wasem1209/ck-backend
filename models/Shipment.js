// models/shipment.js
const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  tracking_id: { type: String, required: true, unique: true },
  progress: Number,
  note: String,
  shipper: {
    name: String,
    address: String,
  },
  receiver: {
    name: String,
    address: String,
  },
  contents: [
    {
      serial: Number,
      quantity: Number,
      item: String,
    },
  ],
  travel_history: [
    {
      date: String,
      activity: String,
      details: String,
    },
  ],
});

const Shipment = mongoose.model("Shipment", shipmentSchema);
module.exports = Shipment;