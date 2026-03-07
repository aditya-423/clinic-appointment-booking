const { isSunday, isPastDate, isBeyondTwoWeeks, normalizeTime } = require("../utils/dateUtils");

// In-memory database
let appointments = [];

// clinic slots
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

// GET available slots
const getSlots = (req, res) => {

  const { date } = req.query;

  if (!date) {
    return res.status(400).json({
      message: "Please provide a date"
    });
  }

  const bookedSlots = appointments
    .filter(a => a.date === date)
    .map(a => normalizeTime(a.time));

  const availableSlots = slots.filter(
    slot => !bookedSlots.includes(slot)
  );

  res.json({
    date,
    availableSlots
  });

};


// POST book appointment
const bookAppointment = (req, res) => {

  const { name, symptoms, date, time } = req.body;

  if (!name || !date || !time) {
    return res.status(400).json({
      message: "Name, date and time are required"
    });
  }
  
  if (isPastDate(date)) {
    return res.status(400).json({
      message: "Cannot book appointments for past dates"
    });
  }

  if (isBeyondTwoWeeks(date)) {
    return res.status(400).json({
        message: "Appointments can only be booked within the next 14 days"
    });
  }

  if (isSunday(date)) {
    return res.status(400).json({
      message: "Clinic is closed on Sundays"
    });
  }
  const normalizedTime = normalizeTime(time);
  const alreadyBooked = appointments.find(
    a => a.date === date && a.time === normalizedTime
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
    time: normalizedTime,
    status: "Confirmed"
  };

  appointments.push(appointment);

  res.json({
    success: true,
    appointment
  });

};


// GET all appointments
const getAppointments = (req, res) => {

  const { date } = req.query;

  if (!date) {
    return res.json(appointments);
  }

  const filteredAppointments = appointments.filter(
    a => a.date === date
  );

  res.json(filteredAppointments);
};


module.exports = {
  getSlots,
  bookAppointment,
  getAppointments
};