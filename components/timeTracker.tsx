import React from 'react'
import { formatSeconds } from './date'

export default function TimeTracker() {
const [timeSpent, setTimeSpent] = React.useState(0)
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(timeSpent + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timeSpent])

  return (
    <p>Time spent on this page: {formatSeconds(timeSpent)} </p>
  )
}