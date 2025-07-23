const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");
const calculateDuration = require("../utils/calculateDuration");

router.post("/", async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;
    if (!name || !capacityKg || !tyres) return res.status(400).json({ error: "Missing fields" });
    const vehicle = await Vehicle.create({ name, capacityKg, tyres });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

router.put("/:id", async (req, res) => {
  const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

router.get("/available", async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;
    const duration = calculateDuration(fromPincode, toPincode);
    const endTime = new Date(new Date(startTime).getTime() + duration * 3600000);

    const all = await Vehicle.find({ capacityKg: { $gte: capacityRequired } });
    const available = [];

    for (const v of all) {
      const overlap = await Booking.findOne({
        vehicleId: v._id,
        $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTime } }],
      });
      if (!overlap) available.push(v);
    }

    res.json({ vehicles: available, estimatedRideDurationHours: duration });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;