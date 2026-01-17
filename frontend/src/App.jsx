import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import ScrollFloat from './ScrollFloat';
import GradientText from './GradientText';
import ScrollLine from './ScrollLine';
import LogoLoop from './LogoLoop'; // Import the new component
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

// Generic Text-based logos for now (avoiding external image dependencies)
const sponsorLogos = [
  { node: <span style={{ fontFamily: 'sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#fff' }}>SOLIDWORKS</span>, title: "SolidWorks" },
  { node: <span style={{ fontFamily: 'serif', fontWeight: 800, fontSize: '1.5rem', color: '#ccc' }}>TESLA</span>, title: "Tesla" },
  { node: <span style={{ fontFamily: 'sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '1.5rem', color: '#ff8e71' }}>ANSYS</span>, title: "Ansys" },
  { node: <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '1.5rem', color: '#fff' }}>HONDARACING</span>, title: "Honda" },
  { node: <span style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#888' }}>MAAS</span>, title: "Maas" },
  { node: <span style={{ fontFamily: 'sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#fff', border: '2px solid white', padding: '0 5px' }}>FOX</span>, title: "Fox Shocks" },
  { node: <span style={{ fontFamily: 'serif', fontWeight: 700, fontSize: '1.5rem', color: '#fff' }}>LINCOLN</span>, title: "Lincoln Electric" },
];

const EngineeringSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.65]);
  const bodyOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.4, 0.6], [20, 0]);

  return (
    <div ref={containerRef} className="engineering-track">
      <div className="engineering-sticky-view">
        <div className="split-container">
          <div className="split-left">
            <div className="title-anchor-wrapper">
              <motion.div
                style={{
                  scale,
                  transformOrigin: "center left"
                }}
                className="engineering-title-inner"
              >
                <GradientText
                  colors={["#ee0000ff", "#ff8e71ff", "#ff0f0f", "#40c9ff"]}
                  animationSpeed={5}
                  showBorder={false}
                  className="engineering-gradient-header"
                >
                  Engineering Excellence
                </GradientText>
              </motion.div>
            </div>

            <motion.div
              className="engineering-body-text"
              style={{ opacity: bodyOpacity, y: bodyY }}
            >
              <h2>Precision in every part.</h2>
              <p>
                Our design philosophy revolves around the relentless pursuit of performance.
                By utilizing advanced FEA analysis and iterative testing, we reduce weight
                without compromising structural integrity. Every bolt, bracket, and suspension
                link is optimized to withstand the brutal conditions of Baja SAE competition.
              </p>
            </motion.div>
          </div>

          <div className="split-right">
            <div className="image-frame">
              <img src="/baja-web.jpg" alt="Engineering Excellence" className="split-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
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

      <div className="scroll-line-container">
        <ScrollLine />
        <div className="anchor start-anchor" id="start-anchor"></div>
        <div className="anchor hero-anchor" id="hero-anchor"></div>
        <div className="anchor mid-anchor" id="mid-anchor"></div>
        {/* Adjusted anchor position to account for the inserted logo section */}
        <div className="anchor split-anchor" id="split-anchor"></div>
        <div className="anchor end-anchor" id="end-anchor"></div>
      </div>

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

      {/* --- NEW LOGO SECTION --- */}
      <div className="logo-section">
        <h3 className="sponsor-header">Supported By</h3>
        <LogoLoop
          logos={sponsorLogos}
          speed={50}
          direction="left"
          logoHeight={30}
          gap={60}
          hoverSpeed={10}
          scaleOnHover={true}
          fadeOut={true}
          fadeOutColor="#050510" // Matches standard bg
          className="my-logo-loop"
        />
      </div>

      <EngineeringSection />

      <div style={{ height: '50vh' }}></div>
    </div>
  );
}

export default App;