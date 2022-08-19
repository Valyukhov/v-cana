import { useEffect, useState } from 'react'

import Time from '../public/time.svg'

function Timer({ time }) {
  const [timeLeft, setTimeLeft] = useState(time)
  const [isCounting, setIsCounting] = useState(false)
  const getPadTime = (time) => time.toString().padStart(2, '0')
  const minutes = getPadTime(Math.floor(timeLeft / 60))
  const seconds = getPadTime(timeLeft - minutes * 60)
  useEffect(() => {
    setTimeLeft(time)
  }, [time])

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting && setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0))
    }, 1000)
    if (timeLeft === 0) setIsCounting(false)
    return () => {
      clearInterval(interval)
    }
  }, [timeLeft, isCounting])

  const handleStart = () => {
    timeLeft != 0 ? setTimeLeft(timeLeft - 1) : setTimeLeft(time)
    setIsCounting(true)
  }

  const handleStop = () => {
    setIsCounting(false)
  }

  const handleReset = () => {
    setIsCounting(false)
    setTimeLeft(time)
  }

  return (
    <div className="flex items-center gap-1 cursor-default">
      <Time onClick={handleReset} />
      <div onClick={isCounting ? handleStop : handleStart}>
        <span>{minutes}</span>
        <span className={isCounting ? 'separator' : ''}>:</span>
        <span>{seconds}</span>
      </div>
    </div>
  )
}

export default Timer
