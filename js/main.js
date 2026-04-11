import Timer from './components/timer.mjs'
import Form from './components/form.mjs'
import Layout from './components/layout.mjs'

// Register all custom elements
customElements.define(Timer.name, Timer.element)
customElements.define(Form.name, Form.element)
customElements.define(Layout.name, Layout.element)

console.log('Web components registered:', {
  timer: Timer.name,
  form: Form.name,
  layout: Layout.name
})

// Set up timer expire handler after components are registered
document.addEventListener('DOMContentLoaded', () => {
  const timer = document.querySelector('timer-element')
  if (timer) {
    // Wait for the component to be fully initialized
    setTimeout(() => {
      timer.onExpire = () => {
        alert('Form session expired! Please start over.')
        // Could add additional logic here:
        // - Reset form data
        // - Show a modal
        // - Redirect to a different page
        // - Trigger custom events
        const form = document.querySelector('form-element')
        if (form && form.shadowRoot) {
          // Could reset form here if needed
          console.log('Timer expired - form could be reset')
        }
      }
    }, 100)
  }
})