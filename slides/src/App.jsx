import { useState, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
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
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    const handleScroll = (e) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = e.animatedScroll / maxScroll
      setScrollProgress(progress)
    }

    lenis.on('scroll', handleScroll)

    return () => {
      lenis.destroy()
    }
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
        {slides.map((_, index) => {
          const targetScroll = (index / (slides.length - 1)) * 
            (document.documentElement.scrollHeight - window.innerHeight)
            
          return (
            <div 
              key={index}
              className={`nav-indicator ${Math.round(scrollProgress * (slides.length - 1)) === index ? 'active' : ''}`}
              onClick={() => {
                // Use Lenis's scrollTo instead of window.scrollTo
                window.lenis.scrollTo(targetScroll, {
                  duration: 1.2
                })
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
