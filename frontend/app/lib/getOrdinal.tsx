export function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return 'th' // Covers 4th to 20th
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}
