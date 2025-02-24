import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'

// Base SlideContent component
export const SlideContent = ({ index, progress }) => {
  switch(index) {
    case 0:
      return <HomeSlide progress={progress} />
    case 1:
      return <AboutSlide progress={progress} />
    case 2:
      return <WorkSlide />
    case 3:
      return <ServicesSlide />
    case 4:
      return <ContactSlide />
    default:
      return <div>Slide {index}</div>
  }
}

const HomeSlide = ({ progress }) => (
  <div className="home-slide">
    <div className="square-container">
      <div className="expanding-square">
        <img 
          src={img1} 
          alt="Home"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200%',
            height: '200%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: `translate(-50%, -50%) scale(${1 - progress * 0.3})`,
            transformOrigin: 'center'
          }}
        />
      </div>
    </div>
  </div>
)

const AboutSlide = ({ progress }) => (
  <div className="about-slide">
    <div className="square-container">
      <div className="expanding-square">
        <img 
          src={img2} 
          alt="About"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '250%',
            height: '250%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: `translate(-50%, -50%) scale(${1 - progress * 0.3})`,
            transformOrigin: 'center'
          }}
        />
      </div>
    </div>
  </div>
)

const WorkSlide = () => (
  <div className="work-slide">
    <h2>Our Work</h2>
    <p>Check out our projects</p>
  </div>
)

const ServicesSlide = () => (
  <div className="services-slide">
    <h2>Services</h2>
    <p>What we can do for you</p>
  </div>
)

const ContactSlide = () => (
  <div className="contact-slide">
    <h2>Contact</h2>
    <p>Get in touch with us</p>
  </div>
)