export function calculateStreak(startDateStr: string, endDateStr: string | null) {
  const startDate = new Date(startDateStr)
  const endDate = endDateStr ? new Date(endDateStr) : new Date()

  const diffTime = Math.abs((endDate as any) - (startDate as any))

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  return diffDays + 1
}
