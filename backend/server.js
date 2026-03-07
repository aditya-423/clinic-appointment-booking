const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

// In-memory database
let appointments = [];

// Clinic working slots
const slots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM"
];

// Helper function to check Sunday
function isSunday(dateString) {
  const date = new Date(dateString);
  return date.getDay() === 0;
}

// Root route
app.get("/", (req, res) => {
  res.send("Clinic Appointment Backend Running");
});


// Get available slots for a given date
app.get("/slots", (req, res) => {

  const { date } = req.query;

  if (!date) {
    return res.status(400).json({
      message: "Please provide a date"
    });
  }

  if (isSunday(date)) {
    return res.json({
      message: "Clinic is closed on Sundays",
      availableSlots: []
    });
  }

  const bookedSlots = appointments
    .filter(a => a.date === date)
    .map(a => a.time);

  const available = slots.filter(slot => !bookedSlots.includes(slot));

  res.json({
    date,
    availableSlots: available
  });

});


// Book appointment
app.post("/book", (req, res) => {

  const { name, symptoms, date, time } = req.body;

  if (!name || !date || !time) {
    return res.status(400).json({
      message: "Name, date and time are required"
    });
  }

  if (isSunday(date)) {
    return res.status(400).json({
      message: "Clinic is closed on Sundays"
    });
  }

  const alreadyBooked = appointments.find(
    a => a.date === date && a.time === time
  );

  if (alreadyBooked) {
    return res.json({
      success: false,
      message: "This slot is already booked"
    });
  }

  const appointment = {
    id: appointments.length + 1,
    name,
    symptoms,
    date,
    time,
    status: "Confirmed"
  };

  appointments.push(appointment);

  res.json({
    success: true,
    appointment
  });

});


// Get all appointments
app.get("/appointments", (req, res) => {
  res.json(appointments);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});