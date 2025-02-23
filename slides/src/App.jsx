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
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
    window.lenis = lenis

    return () => {
      lenis.destroy()
    }
  }, [])

  const getSlideProgress = (index) => {
    // Calculate how many sections we've scrolled through
    const totalSections = slides.length - 1
    const currentSection = scrollProgress * totalSections
    
    // Calculate progress for this specific slide
    const slideStart = index - 0.5 // Start transition slightly before reaching the slide
    const slideProgress = (currentSection - slideStart) / 0.5 // Complete transition over 50% of the scroll section
    
    return Math.max(0, Math.min(1, slideProgress))
  }

  const getSlidePosition = (direction, progress) => {
    const distance = 100 * (1 - progress) // Slides move from 100% to 0%
    
    switch(direction) {
      case 'right':
        return `translate3d(${distance}%, 0, 0)`
      case 'bottom':
        return `translate3d(0, ${distance}%, 0)`
      case 'left':
        return `translate3d(${-distance}%, 0, 0)`
      case 'top':
        return `translate3d(0, ${-distance}%, 0)`
      default:
        return 'translate3d(0, 0, 0)'
    }
  }

  return (
    <div className="app-container" style={{ height: `${slides.length * 100}vh` }}>
      <nav className={`main-nav ${scrollProgress > 0.05 ? 'scrolled' : ''}`}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Work</li>
          <li>Contact</li>
        </ul>
      </nav>

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
