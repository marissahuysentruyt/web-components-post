import React from 'react'
import Timer from './components/Timer'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Timer Demo</h1>
        <p>A countdown timer to demonstrate form time limits</p>
      </header>
      <main>
        <Timer 
          initialMinutes={5} 
          onExpire={() => alert('Form session expired! Please start over.')} 
        />
      </main>
    </div>
  )
}

export default App