import { LitElement, html, css } from 'lit'

class Clock extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `

  connectedCallback() {
    super.connectedCallback()
  }

  render() {
    return html``
  }
}

export default { element: Clock, name: 'clock-element' }
