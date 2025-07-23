module.exports = function calculateDuration(from, to) {
  return Math.abs(parseInt(from) - parseInt(to)) % 24;
};