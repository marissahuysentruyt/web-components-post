import { LitElement, html, css } from 'lit'

class Layout extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .layout-container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .layout-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-areas: 'main main main main main main main main main sidebar sidebar sidebar';
      gap: 20px;
      min-height: 400px;
    }

    .layout-main {
      grid-area: main;
      display: flex;
      flex-direction: column;
    }

    .layout-sidebar {
      grid-area: sidebar;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    /* Responsive design */
    @media (max-width: 1024px) {
      .layout-grid {
        grid-template-columns: repeat(8, 1fr);
        grid-template-areas: 'main main main main main main sidebar sidebar';
      }
    }

    @media (max-width: 768px) {
      .layout-container {
        padding: 15px;
      }

      .layout-grid {
        grid-template-columns: 1fr;
        grid-template-areas:
          'main'
          'sidebar';
        gap: 15px;
      }
    }

    @media (max-width: 480px) {
      .layout-container {
        padding: 10px;
      }

      .layout-grid {
        gap: 10px;
      }
    }

    /* Slot styling */
    ::slotted(*) {
      flex: 1;
      width: 100%;
    }
  `

  constructor() {
    super()
  }

  render() {
    return html`
      <div class="layout-container">
        <div class="layout-grid">
          <div class="layout-main">
            <slot name="main"></slot>
          </div>
          <div class="layout-sidebar">
            <slot name="sidebar"></slot>
          </div>
        </div>
      </div>
    `
  }
}

export { Layout }
