import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  const slides = [
    { title: 'Slide One', direction: 'center' },
    { title: 'Slide Two', direction: 'right' },
    { title: 'Slide Three', direction: 'bottom' },
    { title: 'Slide Four', direction: 'left' },
    { title: 'Slide Five', direction: 'top' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollPosition / maxScroll
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getSlideProgress = (index) => {
    const slideProgress = (scrollProgress * (slides.length - 1)) - index
    return Math.max(-1, Math.min(1, slideProgress))
  }

  const getSlidePosition = (direction, progress) => {
    switch(direction) {
      case 'right':
        return `translate(${100 * progress}%, 0%)`;
      case 'bottom':
        return `translate(0%, ${100 * progress}%)`;
      case 'left':
        return `translate(${-100 * progress}%, 0%)`;
      case 'top':
        return `translate(0%, ${-100 * progress}%)`;
      default:
        return 'translate(0%, 0%)';
    }
  }

  return (
    <div className="app-container" style={{ height: `${slides.length * 100}vh` }}>
      <div className="slides-container">
        {slides.map((slide, index) => {
          const progress = getSlideProgress(index)
          
          return (
            <section 
              key={index}
              className="slide"
              style={{
                transform: getSlidePosition(slide.direction, progress)
              }}
            >
              <div className="slide-content">
                <h2>{slide.title}</h2>
              </div>
            </section>
          )
        })}
      </div>

      <div className="navigation">
        {slides.map((_, index) => (
          <div 
            key={index}
            className={`nav-indicator ${Math.round(scrollProgress * (slides.length - 1)) === index ? 'active' : ''}`}
            onClick={() => {
              const targetScroll = (index / (slides.length - 1)) * 
                (document.documentElement.scrollHeight - window.innerHeight)
              window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
              })
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default App
