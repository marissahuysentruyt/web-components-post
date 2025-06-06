import Component from './component.mjs'

class Layout extends Component {
  constructor() {
    super()
    this.variant = 'default'
    
    // Create shadow DOM
    this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['variant']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'variant') {
      this.variant = newValue || 'default'
      this.updateLayout()
    }
  }

  connectedCallback() {
    this.render()
  }

  updateLayout() {
    const container = this.shadowRoot.querySelector('.layout-container')
    if (container) {
      // Remove existing variant classes
      container.classList.remove('layout-reverse', 'layout-equal', 'layout-narrow-sidebar', 'layout-wide-sidebar')
      
      // Add new variant class
      if (this.variant !== 'default') {
        container.classList.add(`layout-${this.variant}`)
      }
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
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
          grid-template-areas: 
            "main main main main main main main main main sidebar sidebar sidebar";
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

        /* Layout variants */
        .layout-reverse .layout-grid {
          grid-template-areas: 
            "sidebar sidebar sidebar main main main main main main main main main";
        }

        .layout-equal .layout-grid {
          grid-template-areas: 
            "main main main main main main sidebar sidebar sidebar sidebar sidebar sidebar";
        }

        .layout-narrow-sidebar .layout-grid {
          grid-template-areas: 
            "main main main main main main main main main main sidebar sidebar";
        }

        .layout-wide-sidebar .layout-grid {
          grid-template-areas: 
            "main main main main main main main main sidebar sidebar sidebar sidebar";
        }

        /* Responsive design */
        @media (max-width: 1024px) {
          .layout-grid {
            grid-template-columns: repeat(8, 1fr);
            grid-template-areas: 
              "main main main main main main sidebar sidebar";
          }

          .layout-reverse .layout-grid {
            grid-template-areas: 
              "sidebar sidebar main main main main main main";
          }

          .layout-equal .layout-grid {
            grid-template-areas: 
              "main main main main sidebar sidebar sidebar sidebar";
          }
        }

        @media (max-width: 768px) {
          .layout-container {
            padding: 15px;
          }
          
          .layout-grid {
            grid-template-columns: 1fr;
            grid-template-areas: 
              "main"
              "sidebar";
            gap: 15px;
          }

          .layout-reverse .layout-grid {
            grid-template-areas: 
              "sidebar"
              "main";
          }

          .layout-equal .layout-grid {
            grid-template-areas: 
              "main"
              "sidebar";
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
      </style>

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

    this.updateLayout()
  }
}

export default { element: Layout, name: 'layout-element' }