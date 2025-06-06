import React, { useState, useEffect } from 'react'

const Timer = ({ initialMinutes = 5, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60) // Convert to seconds
  const [isActive, setIsActive] = useState(false)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    let interval = null
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft <= 1) {
            setIsExpired(true)
            setIsActive(false)
            if (onExpire) {
              onExpire()
            }
            return 0
          }
          return timeLeft - 1
        })
      }, 1000)
    } else if (timeLeft === 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft, onExpire])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startTimer = () => {
    setIsActive(true)
    setIsExpired(false)
  }

  const pauseTimer = () => {
    setIsActive(false)
  }

  const resetTimer = () => {
    setTimeLeft(initialMinutes * 60)
    setIsActive(false)
    setIsExpired(false)
  }

  const getTimerClass = () => {
    if (isExpired) return 'timer expired'
    if (timeLeft <= 30) return 'timer warning'
    if (timeLeft <= 60) return 'timer caution'
    return 'timer'
  }

  return (
    <div className={getTimerClass()}>
      <h2>Form Timer</h2>
      <div className="timer-display">
        {formatTime(timeLeft)}
      </div>
      <div className="timer-controls">
        {!isActive && !isExpired && (
          <button onClick={startTimer} className="start-btn">
            Start Timer
          </button>
        )}
        {isActive && (
          <button onClick={pauseTimer} className="pause-btn">
            Pause
          </button>
        )}
        <button onClick={resetTimer} className="reset-btn">
          Reset
        </button>
      </div>
      {isExpired && (
        <div className="expired-message">
          <p>⚠️ Time's up! Please start over.</p>
        </div>
      )}
      {timeLeft <= 30 && timeLeft > 0 && isActive && (
        <div className="warning-message">
          <p>⏰ Less than 30 seconds remaining!</p>
        </div>
      )}
    </div>
  )
}

export default Timer