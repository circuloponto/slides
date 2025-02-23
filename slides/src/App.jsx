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
      smoothWheel: true,
      wheelMultiplier: 1,
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
    if (index === 0) return 1; // First slide is always fully visible
    
    const sectionSize = 1 / (slides.length - 1)
    const sectionStart = (index - 1) * sectionSize
    const sectionEnd = index * sectionSize
    
    const progress = (scrollProgress - sectionStart) / (sectionEnd - sectionStart)
    return Math.max(0, Math.min(1, progress))
  }

  const getSlidePosition = (direction, progress) => {
    const distance = 100 * (1 - progress)
    
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
          {slides.map((_, index) => {
            const targetScroll = (index / (slides.length - 1)) * 
              (document.documentElement.scrollHeight - window.innerHeight)
            
            return (
              <li 
                key={index}
                onClick={() => {
                  window.lenis.scrollTo(targetScroll, {
                    duration: 1.2,
                    easing: (t) => t // Linear easing for smoother animation
                  })
                }}
              >
                {index === 0 ? 'Home' : 
                 index === 1 ? 'About' :
                 index === 2 ? 'Work' :
                 index === 3 ? 'Services' :
                 'Contact'}
              </li>
            )
          })}
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
                  duration: 1.2,
                  easing: (t) => t
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
