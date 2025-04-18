export function isYearTooEarly(yearA: string, yearB: string) {
  if (yearA < yearB) {
    return true;
  }
  return false;
}
