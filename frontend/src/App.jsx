import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import ScrollFloat from './ScrollFloat';
import GradientText from './GradientText';
import ScrollLine from './ScrollLine';
import LogoLoop from './LogoLoop';
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

const sponsorLogos = [
  { node: <span style={{ fontFamily: 'sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#fff' }}>SOLIDWORKS</span>, title: "SolidWorks" },
  { node: <span style={{ fontFamily: 'serif', fontWeight: 800, fontSize: '1.5rem', color: '#ccc' }}>TESLA</span>, title: "Tesla" },
  { node: <span style={{ fontFamily: 'sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '1.5rem', color: '#ff8e71' }}>ANSYS</span>, title: "Ansys" },
  { node: <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '1.5rem', color: '#fff' }}>HONDARACING</span>, title: "Honda" },
  { node: <span style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#888' }}>MAAS</span>, title: "Maas" },
  { node: <span style={{ fontFamily: 'sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#fff', border: '2px solid white', padding: '0 5px' }}>FOX</span>, title: "Fox Shocks" },
  { node: <span style={{ fontFamily: 'serif', fontWeight: 700, fontSize: '1.5rem', color: '#fff' }}>LINCOLN</span>, title: "Lincoln Electric" },
];

const teamsData = [
  {
    title: "Drivetrain",
    id: "drivetrain",
    icon: "⚙️",
    description: "The heartbeat of the car. Our drivetrain team engineers the continuously variable transmission (CVT) and gearbox to efficiently transfer power from the engine to the wheels. We focus on tuning for maximum torque and acceleration while maintaining reliability under extreme off-road shock loads."
  },
  {
    title: "Suspension",
    id: "suspension",
    icon: "amort",
    description: "Conquering the terrain. We design and validate custom double-wishbone front and trailing-arm rear suspension geometries. Using Adams Car simulation, we optimize camber curves and damping ratios to ensure our drivers can tackle 6-foot drops and rock gardens with confidence."
  },
  {
    title: "Brakes",
    id: "brakes",
    icon: "🛑",
    description: "Stopping power is safety. This team is responsible for the complete hydraulic braking system, ensuring we can lock all four wheels at any speed. We meticulously design custom calipers, rotors, and pedal assemblies to minimize weight while maximizing thermal efficiency."
  },
  {
    title: "Frame",
    id: "frame",
    icon: "🏗️",
    description: "The backbone of safety. Our chassis team designs a lightweight 4130 chromoly steel spaceframe that exceeds strict SAE safety standards. Through rigorous FEA impact analysis, we ensure the driver is protected from rollovers and collisions while keeping the center of gravity low."
  },
  {
    title: "Interface",
    id: "interface",
    icon: "🖥️",
    description: "Driver-machine connection. We focus on ergonomics and data acquisition. From steering wheel design to dashboard displays that relay real-time engine telemetry, we ensure the driver has total control and situational awareness during the endurance race."
  },
  {
    title: "Business",
    id: "business",
    icon: "💼",
    description: "Fueling the operation. Our business team manages the $50k+ annual budget, secures corporate sponsorships, and handles logistics. We treat the racing team as a startup, focusing on marketing, project management, and delivering ROI to our partners."
  },
];

const TeamSection = () => {
  const [selectedId, setSelectedId] = useState(null);

  // --- 1. ESCAPE KEY LISTENER ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- 2. SCROLL LOCK ---
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedId]);

  return (
    <section className="teams-section">
      <div className="teams-header">
        <h2 className="teams-title">Our Teams</h2>
        <div className="teams-underline"></div>
      </div>

      <div className="teams-container-wrapper">

        {/* GRID VIEW */}
        <motion.div
          className="teams-grid"
          animate={{ opacity: selectedId ? 0.3 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {teamsData.map((team, index) => (
            <motion.div
              key={team.id}
              layoutId={`card-${team.id}`}
              className={`team-card compact ${selectedId === team.id ? 'hidden-card' : ''}`}
              onClick={() => setSelectedId(team.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: index * 0.05
              }}
              whileHover={{ y: -5 }}
              // Ensure pointer events are ALWAYS auto here so we can click them immediately
              style={{ pointerEvents: 'auto' }}
            >
              <div className="team-card-glow"></div>
              <div className="team-card-content">
                <motion.div
                  className="team-logo-placeholder"
                  layoutId={`logo-${team.id}`}
                >
                  <div className="logo-circle"></div>
                </motion.div>
                <motion.h3
                  className="team-name"
                  layoutId={`title-${team.id}`}
                >
                  {team.title}
                </motion.h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* EXPANDED VIEW + BACKDROP */}
        <AnimatePresence>
          {selectedId && (
            <>
              {/* BACKDROP */}
              <motion.div
                className="overlay-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // CRITICAL: pointerEvents: "none" in exit prop ensures instant click-through
                exit={{ opacity: 0, pointerEvents: "none" }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedId(null)}
              />

              {/* EXPANDED CARD */}
              <motion.div
                layoutId={`card-${selectedId}`}
                key={`expanded-card-${selectedId}`}
                className="team-card expanded"
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                // CRITICAL: Disable pointer events instantly when exit animation starts
                exit={{ opacity: 0, scale: 0.95, pointerEvents: "none" }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  className="close-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(null);
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, pointerEvents: "none" }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </motion.button>

                <div className="team-card-glow"></div>

                <div className="team-card-content expanded-content">
                  <motion.div
                    className="team-logo-placeholder expanded-logo"
                    layoutId={`logo-${selectedId}`}
                  >
                    <div className="logo-circle"></div>
                  </motion.div>

                  <div className="text-container">
                    <motion.h3
                      className="team-name expanded-title"
                      layoutId={`title-${selectedId}`}
                    >
                      {teamsData.find(t => t.id === selectedId).title}
                    </motion.h3>

                    <motion.div
                      className="team-description-wrapper"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                    >
                      <p className="team-description">
                        {teamsData.find(t => t.id === selectedId).description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

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
                style={{ scale, transformOrigin: "center left" }}
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
    const handleScroll = () => setScrolledPast(window.scrollY > window.innerHeight * 0.9);
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
          fadeOutColor="#050510"
          className="my-logo-loop"
        />
      </div>

      <EngineeringSection />

      <TeamSection />

      <div style={{ height: '20vh' }}></div>
    </div>
  );
}

export default App;