function normalizeDate(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSunday(dateString) {
  const date = new Date(dateString);
  return date.getDay() === 0;
}

function isPastDate(dateString) {
  const today = normalizeDate(new Date());
  const inputDate = normalizeDate(dateString);

  return inputDate < today;
}

function isBeyondTwoWeeks(dateString) {
  const today = normalizeDate(new Date());
  const inputDate = normalizeDate(dateString);

  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(today.getDate() + 14);

  return inputDate > twoWeeksLater;
}

function normalizeTime(time) {

  if (!time) return time;

  const map = {
    "9 AM": "9:00 AM",
    "10 AM": "10:00 AM",
    "11 AM": "11:00 AM",
    "12 PM": "12:00 PM",
    "2 PM": "2:00 PM",
    "3 PM": "3:00 PM",
    "4 PM": "4:00 PM",
    "5 PM": "5:00 PM"
  };

  return map[time] || time;
}

module.exports = {
  isSunday,
  isPastDate,
  isBeyondTwoWeeks,
  normalizeTime
};