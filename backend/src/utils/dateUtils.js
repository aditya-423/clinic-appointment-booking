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

module.exports = {
  isSunday,
  isPastDate,
  isBeyondTwoWeeks
};