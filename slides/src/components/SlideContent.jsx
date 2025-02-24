import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'

// Base SlideContent component
export const SlideContent = ({ index }) => {
  switch(index) {
    case 0:
      return <HomeSlide />
    case 1:
      return <AboutSlide />
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

const HomeSlide = () => (
  <div className="home-slide">
    <div className="square-container">
      <div 
        className="expanding-square"
        style={{
          backgroundImage: `url(${img1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
    </div>
  </div>
)

const AboutSlide = () => (
  <div className="about-slide">
    <div className="square-container">
      <div 
        className="expanding-square about-square"
        style={{
          backgroundImage: `url(${img2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
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