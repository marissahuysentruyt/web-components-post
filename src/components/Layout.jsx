import React from 'react'
import './Layout.css'

const Layout = ({ children, className = '' }) => {
  // Convert children to array to handle single child or multiple children
  const childrenArray = React.Children.toArray(children)
  
  return (
    <div className={`layout-container ${className}`}>
      <div className="layout-grid">
        {childrenArray.map((child, index) => {
          // First child gets main area (9 columns), second child gets sidebar (3 columns)
          const gridArea = index === 0 ? 'main' : index === 1 ? 'sidebar' : `item-${index + 1}`
          
          return (
            <div 
              key={index} 
              className={`layout-item layout-${gridArea}`}
            >
              {child}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Layout item wrapper components for explicit usage
export const MainContent = ({ children, className = '' }) => (
  <div className={`layout-main-content ${className}`}>
    {children}
  </div>
)

export const Sidebar = ({ children, className = '' }) => (
  <div className={`layout-sidebar ${className}`}>
    {children}
  </div>
)

export default Layout