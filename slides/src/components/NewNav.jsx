import { useState } from 'react'

export const NewNav = ({ scrollProgress }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className={`new-nav ${isMenuOpen ? 'menu-open' : ''}`}>
      <button 
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="hamburger">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </span>
      </button>

      <div className="menu-overlay">
        <div className="menu-half left"></div>
        <div className="menu-half right">
          <div className="menu-content">
            <div className="menu-links">
              <a href="#home">Home</a>
              <a href="#work">Work</a>
              <a href="#studio">Studio</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 