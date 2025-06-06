# React Components Demo (React Branch)

This branch demonstrates the same functionality as the web components version, but implemented using React. This is part of a comparison to show the overhead and complexity differences between vanilla web components and React.

## What's Different in This Branch

- **Bundle Size**: React adds significant JavaScript overhead (~42kb for React + ReactDOM minified + gzipped)
- **Build Step**: Requires Vite for JSX transpilation and bundling
- **Dependencies**: Multiple npm packages vs zero dependencies in web components
- **Complexity**: Additional tooling, configuration, and build processes

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
This will start the Vite development server at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/
│   │   └── Clock.jsx          # React Clock component
│   ├── App.jsx                # Main App component
│   ├── App.css                # Styles
│   └── main.jsx               # React entry point
├── index.html                 # HTML template
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies and scripts
```

## Comparison Points

When comparing this React version to the web components version:

1. **File Size**: Check the built bundle size vs raw web components
2. **Dependencies**: Compare `package.json` complexity vs zero dependencies
3. **Build Time**: React requires transpilation and bundling
4. **Runtime Performance**: React's virtual DOM vs direct DOM manipulation
5. **Learning Curve**: JSX, hooks, and React concepts vs standard web APIs

## Components

### Clock Component
A simple clock that displays the current time and updates every second. Demonstrates:
- React hooks (`useState`, `useEffect`)
- Component lifecycle management
- State management
- Timer cleanup

---

*This is the React branch. Switch to the main branch to see the same functionality implemented with vanilla web components.*