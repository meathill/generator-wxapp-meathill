export function createBeginningOfThisMonth() {
  const date = new Date();
  date.setDate(1);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date;
}
