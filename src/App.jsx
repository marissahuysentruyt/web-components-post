import React from 'react'
import Layout from './components/Layout'
import Form from './components/Form'
import Timer from './components/Timer'
import './App.css'

function App() {
  const handleTimerExpire = () => {
    alert('Form session expired! Please start over.')
    // You could add additional logic here like:
    // - Reset form data
    // - Show a modal
    // - Redirect to a different page
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Form with Timer Demo</h1>
        <p>Complete the form before time runs out!</p>
        <nav className="demo-nav">
          <a href="/" className="demo-link current">Full React Implementation</a>
          <a href="/react-progressive.html" className="demo-link">React Progressive Enhancement</a>
        </nav>
      </header>

      <Layout>
        <Form />
        <Timer initialMinutes={10} onExpire={handleTimerExpire} />
      </Layout>
    </div>
  )
}

export default App
