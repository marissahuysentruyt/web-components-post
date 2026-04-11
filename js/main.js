import { Timer } from './components/timer.js'
import { Form } from './components/form.js'
import { Layout } from './components/layout.js'

// Register all custom elements
customElements.define('timer-element', Timer)
customElements.define('form-element', Form)
customElements.define('layout-element', Layout)

console.log('Web components registered:', {
  timer: 'timer-element',
  form: 'form-element',
  layout: 'layout-element',
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
