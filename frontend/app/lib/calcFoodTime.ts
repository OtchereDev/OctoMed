export function calculateTimeToMeal(meal: string) {
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  const mealTimes = {
    breakfast: { hour: 8, minute: 0 }, // 8:00 AM
    lunch: { hour: 12, minute: 0 }, // 12:00 PM
    dinner: { hour: 18, minute: 0 }, // 6:00 PM
  } as any

  if (!mealTimes[meal]) {
    return ''
  }

  const mealTime = mealTimes[meal]

  const currentTotalMinutes = currentHour * 60 + currentMinute
  const mealTotalMinutes = mealTime.hour * 60 + mealTime.minute

  let timeDiff = mealTotalMinutes - currentTotalMinutes

  if (timeDiff < 0) {
    timeDiff += 24 * 60 // Add 24 hours worth of minutes
  }

  const hoursRemaining = Math.floor(timeDiff / 60)
  const minutesRemaining = timeDiff % 60

  if (currentTotalMinutes > mealTotalMinutes) {
    return `Passed ${hoursRemaining - mealTime.hour} hrs ${minutesRemaining} mins`
  } else {
    return `In ${hoursRemaining} hrs ${minutesRemaining} mins`
  }
}
