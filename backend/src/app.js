const express = require("express");
const cors = require("cors");

const appointmentRoutes = require("./routes/appointmentRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// request logging
app.use(logger);

app.get("/", (req, res) => {
  res.send("Clinic Appointment Backend Running");
});

// routes
app.use("/api", appointmentRoutes);

// error handler (must be last)
app.use(errorHandler);

module.exports = app;