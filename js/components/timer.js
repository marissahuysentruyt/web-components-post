import { LitElement, html, css } from 'lit'

class Timer extends LitElement {
  static properties = {
    initialMinutes: { type: Number, attribute: 'initial-minutes' },
    timeLeft: { state: true },
    isActive: { state: true },
    isExpired: { state: true },
  }
  static styles = css`
    :host {
      display: block;
      background-color: #f8f9fa;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      height: fit-content;
    }

    :host(.caution) {
      border-color: #ffa500;
      background-color: #fff8e1;
    }

    :host(.warning) {
      border-color: #ff6b35;
      background-color: #ffebee;
      animation: pulse 1s infinite;
    }

    :host(.expired) {
      border-color: #d32f2f;
      background-color: #ffebee;
      animation: shake 0.5s ease-in-out;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.02);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes shake {
      0%,
      100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-5px);
      }
      75% {
        transform: translateX(5px);
      }
    }

    h2 {
      margin: 0 0 20px 0;
      color: #333;
      font-size: 1.5rem;
      text-align: center;
    }

    .timer-display {
      font-size: 3rem;
      font-weight: bold;
      color: #007acc;
      font-family: 'Courier New', monospace;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #ccc;
      margin-bottom: 20px;
      min-height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    :host(.caution) .timer-display {
      color: #f57c00;
    }

    :host(.warning) .timer-display {
      color: #d84315;
    }

    :host(.expired) .timer-display {
      color: #d32f2f;
    }

    .timer-controls {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-bottom: 15px;
      flex-wrap: wrap;
    }

    .timer-controls button {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      min-width: 80px;
    }

    .resume-btn {
      background-color: #4caf50;
      color: white;
    }

    .resume-btn:hover {
      background-color: #45a049;
      transform: translateY(-1px);
    }

    .pause-btn {
      background-color: #ff9800;
      color: white;
    }

    .pause-btn:hover {
      background-color: #f57c00;
      transform: translateY(-1px);
    }

    .reset-btn {
      background-color: #2196f3;
      color: white;
    }

    .reset-btn:hover {
      background-color: #1976d2;
      transform: translateY(-1px);
    }

    .expired-message,
    .warning-message {
      border-radius: 6px;
      padding: 15px;
      margin-top: 15px;
      text-align: center;
    }

    .expired-message {
      background-color: #ffcdd2;
      border: 1px solid #f44336;
    }

    .expired-message p {
      margin: 0;
      color: #c62828;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .warning-message {
      background-color: #fff3e0;
      border: 1px solid #ff9800;
    }

    .warning-message p {
      margin: 0;
      color: #ef6c00;
      font-weight: 500;
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      .timer-controls {
        flex-direction: column;
      }

      .timer-controls button {
        width: 100%;
      }

      .timer-display {
        font-size: 2rem;
        padding: 15px;
      }
    }
  `

  constructor() {
    super()
    this.initialMinutes = 5
    this.timeLeft = 0
    this.isActive = false
    this.isExpired = false
    this.interval = null
    this.onExpire = null
  }

  connectedCallback() {
    super.connectedCallback()
    this.timeLeft = this.initialMinutes * 60
    this.startTimer()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.clearTimer()
  }

  updated(changedProperties) {
    if (changedProperties.has('initialMinutes')) {
      this.timeLeft = this.initialMinutes * 60
    }

    // Update host classes based on state
    this.updateHostClasses()
  }

  updateHostClasses() {
    this.classList.remove('caution', 'warning', 'expired')

    if (this.isExpired) {
      this.classList.add('expired')
    } else if (this.timeLeft <= 30) {
      this.classList.add('warning')
    } else if (this.timeLeft <= 60) {
      this.classList.add('caution')
    }
  }

  clearTimer() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  startTimer() {
    this.isActive = true
    this.isExpired = false

    this.clearTimer()
    this.interval = setInterval(() => {
      if (this.timeLeft <= 1) {
        this.timeLeft = 0
        this.isExpired = true
        this.isActive = false
        this.clearTimer()
        this.handleExpire()
      } else {
        this.timeLeft--
      }
    }, 1000)
  }

  pauseTimer() {
    this.isActive = false
    this.clearTimer()
  }

  resetTimer() {
    this.timeLeft = this.initialMinutes * 60
    this.isActive = false
    this.isExpired = false
    this.clearTimer()
    this.startTimer()
  }

  handleExpire() {
    if (this.onExpire && typeof this.onExpire === 'function') {
      this.onExpire()
    } else {
      alert('Form session expired! Please start over.')
    }
  }

  render() {
    const showResume = !this.isActive && !this.isExpired && this.timeLeft > 0
    const showPause = this.isActive
    const showWarning =
      this.timeLeft <= 30 && this.timeLeft > 0 && this.isActive
    const showExpired = this.isExpired

    return html`
      <h2>Time Remaining</h2>
      <div class="timer-display">${this.formatTime(this.timeLeft)}</div>
      <div class="timer-controls">
        ${showResume
          ? html`<button class="resume-btn" @click=${this.startTimer}>
              Resume Timer
            </button>`
          : ''}
        ${showPause
          ? html`<button class="pause-btn" @click=${this.pauseTimer}>
              Pause
            </button>`
          : ''}
        <button class="reset-btn" @click=${this.resetTimer}>
          Reset (${this.initialMinutes}m)
        </button>
      </div>
      ${showExpired
        ? html`<div class="expired-message">
            <p>⚠️ Time's up! Please start over.</p>
          </div>`
        : ''}
      ${showWarning
        ? html`<div class="warning-message">
            <p>⏰ Less than 30 seconds remaining!</p>
          </div>`
        : ''}
    `
  }
}

export { Timer }
