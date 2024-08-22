import { useEffect, useState } from 'react'

interface ICounter {
  hours: number
  minutes: number
  seconds: number
}

const CountdownTimer = ({
  startDateTime,
  endDateTime,
}: {
  startDateTime: string
  endDateTime: string
}) => {
  const calculateTimeLeft = () => {
    const startTime = new Date(startDateTime).getTime()
    const endTime = new Date(endDateTime).getTime()
    const now = Date.now()
    const difference = endTime - Math.max(startTime, now)

    let timeLeft: ICounter = {} as ICounter

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    } else {
      timeLeft = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [startDateTime, endDateTime])

  return (
    <p className="mt-2 lg:mt-0">
      {`${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(
        2,
        '0'
      )}:${String(timeLeft.seconds).padStart(2, '0')} left`}
    </p>
  )
}

export default CountdownTimer
