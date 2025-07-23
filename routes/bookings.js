const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const calculateDuration = require("../utils/calculateDuration");


router.post("/", async (req, res) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;
    const duration = calculateDuration(fromPincode, toPincode);
    const endTime = new Date(new Date(startTime).getTime() + duration * 3600000);

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

    const conflict = await Booking.findOne({
      vehicleId,
      $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTime } }],
    });
    if (conflict) return res.status(409).json({ error: "Vehicle already booked in this time" });

    const booking = await Booking.create({ vehicleId, fromPincode, toPincode, startTime, endTime, customerId });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;



