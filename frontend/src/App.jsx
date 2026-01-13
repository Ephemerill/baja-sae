import { useState, useEffect, useRef } from 'react';
import ScrollFloat from './ScrollFloat';
import GradientText from './GradientText';
import './App.css';
const NavLink = ({ href, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {isHovered ? (
        <GradientText
          colors={["#ee0000ff", "#ff8e71ff", "#ff0f0f"]}
          animationSpeed={2}
          showBorder={false}
          className="nav-gradient-text"
        >
          {children}
        </GradientText>
      ) : (
        <span>{children}</span>
      )}
    </a>
  );
};


function App() {
  const [scrolledPast, setScrolledPast] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPast(window.scrollY > window.innerHeight * 0.9);
    };

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        // More blue tint: rgba(60, 100, 255, 0.15)
        cursorRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(42, 80, 229, 0.15), transparent 40%)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="app">
      <div className="cursor-light" ref={cursorRef}></div>
      <nav className={`navbar ${scrolledPast ? 'dark-mode' : ''}`}>
        <div className="nav-brand">Biola Racing</div>
        <div className="nav-links">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#team">Team</NavLink>
          <NavLink href="#car">Car</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>
      </nav>
      <div className="hero-container">
        <img src="/baja-web.jpg" alt="Biola Baja SAE" className="hero-image" />
        <h1 className="hero-text">Biola Faith Buzzwords</h1>
      </div>

      <div className="scroll-section">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.02}
        >
          Baja SAE
        </ScrollFloat>
        <div className="scroll-subtext">
          <span>at</span>
          <GradientText
            colors={["#ee0000ff", "#ff8e71ff", "#ff0f0f"]}
            animationSpeed={3}
            showBorder={false}
            className="biola-gradient"
          >
            Biola
          </GradientText>
        </div>
      </div>

      <div className="split-section">
        <div className="split-text">
          <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.02}
            textClassName="split-text-content"
          >
            Engineering Excellence
          </ScrollFloat>
        </div>
        <div className="split-image-container">
          <img src="/baja-web.jpg" alt="Engineering Excellence" className="split-image" />
        </div>
      </div>
    </div>
  );
}

export default App;
