const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST'],
  credentials: true,
}));

const vehicleRoutes = require("./routes/vehicles");
const bookingRoutes = require("./routes/bookings");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));