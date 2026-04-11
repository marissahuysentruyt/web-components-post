import Component from './component.mjs'

class Form extends Component {
  constructor() {
    super()
    this.formData = {
      name: '',
      email: '',
      phone: '',
      message: '',
      priority: 'medium',
      subscribe: false
    }
    this.errors = {}
    
    // Create shadow DOM
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
    this.attachEventListeners()
  }

  validateForm() {
    const newErrors = {}

    if (!this.formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!this.formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(this.formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!this.formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!this.formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (this.formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    this.errors = newErrors
    this.updateErrorDisplay()
    return Object.keys(newErrors).length === 0
  }

  handleInputChange(event) {
    const { name, value, type, checked } = event.target
    this.formData[name] = type === 'checkbox' ? checked : value

    // Clear error when user starts typing
    if (this.errors[name]) {
      delete this.errors[name]
      this.updateErrorDisplay()
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.validateForm()) {
      alert('Form submitted successfully!')
      console.log('Form data:', this.formData)
      this.resetForm()
    }
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      message: '',
      priority: 'medium',
      subscribe: false,
    }
    this.errors = {}
    this.render()
    this.attachEventListeners()
  }

  updateErrorDisplay() {
    Object.keys(this.errors).forEach(field => {
      const input = this.shadowRoot.querySelector(`[name="${field}"]`)
      const errorSpan = this.shadowRoot.querySelector(`.error-${field}`)
      
      if (input) {
        if (this.errors[field]) {
          input.classList.add('error')
        } else {
          input.classList.remove('error')
        }
      }
      
      if (errorSpan) {
        errorSpan.textContent = this.errors[field] || ''
        errorSpan.style.display = this.errors[field] ? 'block' : 'none'
      }
    })
  }

  attachEventListeners() {
    const form = this.shadowRoot.querySelector('.contact-form')
    const inputs = this.shadowRoot.querySelectorAll('input, select, textarea')
    
    form.addEventListener('submit', (e) => this.handleSubmit(e))
    
    inputs.forEach(input => {
      input.addEventListener('input', (e) => this.handleInputChange(e))
      input.addEventListener('change', (e) => this.handleInputChange(e))
    })

    const clearBtn = this.shadowRoot.querySelector('.clear-btn')
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.resetForm())
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
        }

        h2 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 1.8rem;
          border-bottom: 2px solid #007acc;
          padding-bottom: 10px;
        }

        .form-description {
          margin: 0 0 25px 0;
          color: #666;
          font-size: 1rem;
          line-height: 1.5;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .form-group label {
          font-weight: 600;
          color: #333;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #007acc;
          box-shadow: 0 0 0 3px rgba(0, 122, 204, 0.1);
        }

        .form-group input.error,
        .form-group textarea.error {
          border-color: #d32f2f;
          box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .error-message {
          color: #d32f2f;
          font-size: 0.85rem;
          font-weight: 500;
          margin-top: 2px;
          display: none;
        }

        .checkbox-group {
          flex-direction: row;
          align-items: center;
          gap: 10px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 400;
        }

        .checkbox-label input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #007acc;
        }

        .form-actions {
          display: flex;
          gap: 15px;
          margin-top: 15px;
          flex-wrap: wrap;
        }

        .submit-btn,
        .clear-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 120px;
        }

        .submit-btn {
          background-color: #4caf50;
          color: white;
        }

        .submit-btn:hover {
          background-color: #45a049;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
        }

        .clear-btn {
          background-color: #6c757d;
          color: white;
        }

        .clear-btn:hover {
          background-color: #5a6268;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
        }

        @media (max-width: 480px) {
          :host {
            padding: 15px;
          }

          .form-actions {
            flex-direction: column;
          }

          .submit-btn,
          .clear-btn {
            width: 100%;
          }
        }
      </style>

      <div class="form-container">
        <h2>Contact Form</h2>
        <p class="form-description">
          Please fill out this form completely. You have a limited time to complete it before it expires.
        </p>

        <form class="contact-form">
          <div class="form-group">
            <label for="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value="${this.formData.name}"
              placeholder="Enter your full name"
            />
            <span class="error-message error-name"></span>
          </div>

          <div class="form-group">
            <label for="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value="${this.formData.email}"
              placeholder="your.email@example.com"
            />
            <span class="error-message error-email"></span>
          </div>

          <div class="form-group">
            <label for="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value="${this.formData.phone}"
              placeholder="(555) 123-4567"
            />
            <span class="error-message error-phone"></span>
          </div>

          <div class="form-group">
            <label for="priority">Priority Level</label>
            <select id="priority" name="priority">
              <option value="low" ${this.formData.priority === 'low' ? 'selected' : ''}>Low</option>
              <option value="medium" ${this.formData.priority === 'medium' ? 'selected' : ''}>Medium</option>
              <option value="high" ${this.formData.priority === 'high' ? 'selected' : ''}>High</option>
              <option value="urgent" ${this.formData.priority === 'urgent' ? 'selected' : ''}>Urgent</option>
            </select>
          </div>

          <div class="form-group">
            <label for="message">Message *</label>
            <textarea
              id="message"
              name="message"
              placeholder="Please describe your inquiry in detail..."
              rows="4"
            >${this.formData.message}</textarea>
            <span class="error-message"></span>
          </div>

          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                name="subscribe"
                ${this.formData.subscribe ? 'checked' : ''}
              />
              Subscribe to newsletter updates
            </label>
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-btn">
              Submit Form
            </button>
            <button type="button" class="clear-btn">
              Clear Form
            </button>
          </div>
        </form>
      </div>
    `
  }
}

export default { element: Form, name: 'form-element' }
