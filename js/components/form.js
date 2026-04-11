import { LitElement, html, css } from 'lit'

class Form extends LitElement {
  static properties = {
    formData: { state: true },
    errors: { state: true },
  }

  static styles = css`
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
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
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

    .checkbox-label input[type='checkbox'] {
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
  `

  constructor() {
    super()
    this.formData = {
      name: '',
      email: '',
      phone: '',
      message: '',
      priority: 'medium',
      subscribe: false,
    }
    this.errors = {}
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
    return Object.keys(newErrors).length === 0
  }

  handleInputChange(event) {
    const { name, value, type, checked } = event.target
    this.formData = {
      ...this.formData,
      [name]: type === 'checkbox' ? checked : value,
    }

    // Clear error when user starts typing
    if (this.errors[name]) {
      const newErrors = { ...this.errors }
      delete newErrors[name]
      this.errors = newErrors
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
  }

  render() {
    return html`
      <div class="form-container">
        <h2>Contact Form</h2>
        <p class="form-description">
          Please fill out this form completely. You have a limited time to
          complete it before it expires.
        </p>

        <form class="contact-form" @submit=${this.handleSubmit}>
          <div class="form-group">
            <label for="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              .value=${this.formData.name}
              @input=${this.handleInputChange}
              placeholder="Enter your full name"
              class=${this.errors.name ? 'error' : ''}
            />
            ${this.errors.name
              ? html`<span class="error-message">${this.errors.name}</span>`
              : ''}
          </div>

          <div class="form-group">
            <label for="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              .value=${this.formData.email}
              @input=${this.handleInputChange}
              placeholder="your.email@example.com"
              class=${this.errors.email ? 'error' : ''}
            />
            ${this.errors.email
              ? html`<span class="error-message">${this.errors.email}</span>`
              : ''}
          </div>

          <div class="form-group">
            <label for="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              .value=${this.formData.phone}
              @input=${this.handleInputChange}
              placeholder="(555) 123-4567"
              class=${this.errors.phone ? 'error' : ''}
            />
            ${this.errors.phone
              ? html`<span class="error-message">${this.errors.phone}</span>`
              : ''}
          </div>

          <div class="form-group">
            <label for="priority">Priority Level</label>
            <select
              id="priority"
              name="priority"
              .value=${this.formData.priority}
              @change=${this.handleInputChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div class="form-group">
            <label for="message">Message *</label>
            <textarea
              id="message"
              name="message"
              .value=${this.formData.message}
              @input=${this.handleInputChange}
              placeholder="Please describe your inquiry in detail..."
              rows="4"
              class=${this.errors.message ? 'error' : ''}
            ></textarea>
            ${this.errors.message
              ? html`<span class="error-message">${this.errors.message}</span>`
              : ''}
          </div>

          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                name="subscribe"
                .checked=${this.formData.subscribe}
                @change=${this.handleInputChange}
              />
              Subscribe to newsletter updates
            </label>
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-btn">Submit Form</button>
            <button type="button" class="clear-btn" @click=${this.resetForm}>
              Clear Form
            </button>
          </div>
        </form>
      </div>
    `
  }
}

export { Form }
