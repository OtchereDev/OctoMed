export function generateStartAndEndDate(dateString: string, duration: string, startTime: string) {
  let [startHour, modifier] = startTime.split(' ')
  let [hour, minute] = startHour.split(':').map(Number)
  minute = minute || 0

  if (modifier === 'PM' && hour !== 12) hour += 12
  if (modifier === 'AM' && hour === 12) hour = 0

  let startDateTime = new Date(dateString)
  startDateTime.setHours(hour, minute)

  let durationValue = parseInt(duration)
  let durationType = duration.includes('Hour') ? 'hours' : 'minutes'

  let endDateTime = new Date(startDateTime)
  if (durationType === 'hours') {
    endDateTime.setHours(endDateTime.getHours() + durationValue)
  } else if (durationType === 'minutes') {
    endDateTime.setMinutes(endDateTime.getMinutes() + durationValue)
  }

  return {
    start: startDateTime,
    end: endDateTime,
  }
}
