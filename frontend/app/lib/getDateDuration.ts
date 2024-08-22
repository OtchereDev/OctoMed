import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import durationPlugin from 'dayjs/plugin/duration'

dayjs.extend(durationPlugin)
dayjs.extend(advancedFormat)

export const getDetailsFromDates = (startDateTimeStr: string, endDateTimeStr: string) => {
  const startDateTime = dayjs(startDateTimeStr)
  const endDateTime = dayjs(endDateTimeStr)

  const startTime = startDateTime.format('h:mm A')

  const durationInMinutes = endDateTime.diff(startDateTime, 'minute')
  const duration =
    durationInMinutes >= 60
      ? `${durationInMinutes / 60} Hour${durationInMinutes / 60 > 1 ? 's' : ''}`
      : `${durationInMinutes} Min`

  return { startTime, duration, date: startDateTime.toDate() }
}

export const isCurrentTimeBetween = (startDateTimeStr: string, endDateTimeStr: string) => {
  const startDateTime = dayjs(startDateTimeStr)
  const endDateTime = dayjs(endDateTimeStr)
  const currentTime = dayjs()

  return currentTime.isAfter(startDateTime) && currentTime.isBefore(endDateTime)
}
