# Web Components Form Demo

A demonstration of modern web component functionality featuring a countdown timer and form validation, built with [Lit](https://lit.dev/) - a lightweight web components library. Includes both a Lit-powered web components implementation and a progressive enhancement approach.

## Features

This project showcases:

- **Timer Component**: Auto-starting countdown timer with visual state changes
- **Form Component**: Complete contact form with real-time validation
- **Layout Component**: Responsive 9-column/3-column grid system
- **Lit Framework**: Efficient reactive rendering with declarative templates
- **Modern Web Standards**: Custom Elements, Shadow DOM, and ES6 modules
- **Minimal Dependencies**: Just Lit (~5KB gzipped) for reactive components

## Getting Started

### Prerequisites
- Node.js (for development server and build tools)
- A modern web browser that supports ES6 modules and Web Components

### Installation

```bash
# Install dependencies
npm install
```

### Running the Project

#### Development Mode (Recommended)
```bash
npm run dev
```
Then open `http://localhost:5173/` in your browser.

#### Build for Production
```bash
npm run build
```
Outputs optimized bundle to `dist/`

#### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
├── js/
│   ├── components/
│   │   ├── timer.js           # Countdown timer component
│   │   ├── form.js            # Contact form component
│   │   ├── layout.js          # Grid layout component
│   │   └── clock.js           # Clock component
│   └── main.js                # Application entry point
├── index.html                 # Lit web components version
├── progressive.html           # Progressive enhancement version
├── package.json               # Dependencies and scripts
├── vite.config.js            # Vite build configuration
└── README.md                 # This file
```

## Two Approaches Demonstrated

### 1. Lit Web Components (`index.html`)
Uses Lit for efficient reactive components with Shadow DOM:
```html
<layout-element>
  <form-element slot="main"></form-element>
  <timer-element slot="sidebar" initial-minutes="15"></timer-element>
</layout-element>
```

### 2. Progressive Enhancement (`progressive.html`)
Starts with functional HTML/CSS, then enhances with JavaScript:
- **Base Layer**: Semantic HTML form that works without JavaScript
- **Enhancement Layer**: JavaScript adds interactive features when available
- **Graceful Degradation**: Full functionality even if JavaScript fails to load
