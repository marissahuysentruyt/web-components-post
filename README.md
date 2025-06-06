# Web Components Form Demo

A demonstration of modern web component functionality featuring a countdown timer and form validation, built with vanilla JavaScript and zero dependencies.

## Features

This project showcases:

- **Timer Component**: Auto-starting countdown timer with visual state changes
- **Form Component**: Complete contact form with real-time validation
- **Layout Component**: Responsive 9-column/3-column grid system
- **Zero Dependencies**: Pure vanilla JavaScript with no frameworks
- **Modern Web Standards**: Uses Custom Elements, Shadow DOM concepts, and ES6 modules

## Getting Started

### Prerequisites
- A modern web browser that supports ES6 modules
- A local web server (for CORS compliance)

### Running the Project

#### Option 1: Python Server
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`

#### Option 2: Node.js Server
```bash
npx serve .
```

#### Option 3: Live Server (VS Code Extension)
Right-click on `index.html` and select "Open with Live Server"

#### Option 4: Direct File Access
Simply open `index.html` in your browser (may have module loading limitations)

## Project Structure

```
├── js/
│   ├── components/
│   │   ├── component.mjs         # Base component class
│   │   ├── timer.mjs            # Countdown timer component
│   │   ├── form.mjs             # Contact form component
│   │   └── layout.mjs           # Grid layout component
│   └── main.mjs                 # Application entry point
├── index.html                   # Main HTML file
└── README.md                    # This file
```

## Components

### Timer Component (`<timer-element>`)
- **Auto-start**: Begins countdown immediately when loaded
- **Visual States**: Changes appearance based on time remaining
  - Normal: Standard blue display
  - Caution: Orange when ≤ 60 seconds
  - Warning: Red with pulse animation when ≤ 30 seconds
  - Expired: Red with shake animation when time is up
- **Controls**: Pause, resume, and reset functionality
- **Configurable**: Set duration via `initial-minutes` attribute

#### Usage:
```html
<timer-element initial-minutes="15"></timer-element>
```

### Form Component (`<form-element>`)
- **Real-time Validation**: Validates fields as you type
- **Required Fields**: Name, email, phone, and message
- **Smart Validation**: Email format checking, minimum message length
- **Visual Feedback**: Error highlighting and messages
- **Form Controls**: Submit and clear functionality

### Layout Component (`<layout-element>`)
- **Responsive Grid**: 9-column main area, 3-column sidebar
- **Auto-distribution**: First child goes to main, second to sidebar
- **Mobile-friendly**: Stacks vertically on small screens
- **Flexible**: Supports layout variants via attributes

#### Usage:
```html
<layout-element>
  <form-element></form-element>
  <timer-element initial-minutes="15"></timer-element>
</layout-element>
```

## Comparison with React Version

This web components version offers several advantages over a React implementation:

### Bundle Size
- **Web Components**: ~10KB of vanilla JavaScript
- **React Equivalent**: ~200KB+ (React + ReactDOM + build tools)

### Dependencies
- **Web Components**: Zero dependencies
- **React Equivalent**: Multiple npm packages, build toolchain

### Performance
- **Web Components**: Direct DOM manipulation, no virtual DOM overhead
- **React Equivalent**: Virtual DOM reconciliation, component re-renders

### Learning Curve
- **Web Components**: Standard web APIs, transferable knowledge
- **React Equivalent**: Framework-specific concepts, JSX, hooks

### Build Process
- **Web Components**: No build step required, works directly in browsers
- **React Equivalent**: Requires transpilation, bundling, development server

## Browser Compatibility

This project uses modern web standards and requires:
- ES6 Modules support
- Custom Elements v1
- Modern JavaScript features (classes, arrow functions, etc.)

**Supported Browsers:**
- Chrome 61+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Development

### Adding New Components

1. Create a new `.mjs` file in `js/components/`
2. Extend the base `Component` class
3. Implement `connectedCallback()` and `render()` methods
4. Register the component in `main.mjs`

### Example Component:
```javascript
import Component from './component.mjs'

class MyComponent extends Component {
  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
      <style>
        :host { display: block; }
      </style>
      <div>My Component Content</div>
    `
  }
}

export default { element: MyComponent, name: 'my-component' }
```

## Educational Purpose

This project demonstrates:
- How to build complex UIs with vanilla web components
- Modern JavaScript patterns and ES6 modules
- Responsive design without CSS frameworks
- Component-based architecture without libraries
- Progressive enhancement and accessibility considerations

Perfect for understanding web fundamentals before adopting frameworks!

## License

MIT License - feel free to use this code for learning and experimentation.