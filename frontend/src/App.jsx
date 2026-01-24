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
      className="nav-link-item"
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedId]);

  const updateMousePosition = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  const handleCardMouseEnter = (e) => {
    updateMousePosition(e);
  };

  const handleCardMouseLeave = (e) => {
    updateMousePosition(e);
  };

  return (
    <section className="teams-section" id="team">
      <div className="teams-header">
        <h2 className="teams-title">Our Teams</h2>
        <div className="teams-underline"></div>
      </div>

      <div className="teams-container-wrapper">
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
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
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
              style={{ pointerEvents: 'auto' }}
            >
              <div className="gradient-border-mask"></div>

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

        <AnimatePresence>
          {selectedId && (
            <>
              <motion.div
                className="overlay-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, pointerEvents: "none" }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedId(null)}
              />

              <motion.div
                layoutId={`card-${selectedId}`}
                key={`expanded-card-${selectedId}`}
                className="team-card expanded"
                transition={{
                  type: "spring",
                  stiffness: isMobile ? 400 : 80,
                  damping: isMobile ? 30 : 20
                }}
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

                <div className="gradient-border-mask expanded-mask"></div>

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

  const scale = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.8]);
  const bodyOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.4, 0.6], [20, 0]);

  return (
    <div ref={containerRef} className="engineering-track" id="car">
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

const SupportSection = () => {
  return (
    <section className="support-section" id="contact">
      <div className="support-bg-glass"></div>
      <div className="support-glow-blob"></div>

      <motion.div
        className="support-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <GradientText
          colors={["#ee0000ff", "#ff8e71ff", "#ffffff"]}
          animationSpeed={6}
          showBorder={false}
          className="support-title"
        >
          FUEL OUR PASSION
        </GradientText>

        <p className="support-text">
          Building a championship-winning vehicle takes more than just engineering—it takes a community. Your support provides the materials, tools, and travel logistics needed to cross the finish line.
        </p>

        <button className="donate-btn">
          <div className="donate-btn-shine"></div>
          Support the Team
        </button>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Biola Racing</h3>
          <p className="footer-text">
            Pushing the limits of engineering and endurance. Designed and built by students at Biola University.
          </p>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <div className="footer-links">
            <a href="#about" className="footer-link">About</a>
            <a href="#team" className="footer-link">Team</a>
            <a href="#car" className="footer-link">Car</a>
            <a href="#contact" className="footer-link">Support</a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Legal</h4>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Cookie Policy</a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <div className="footer-links">
            <a href="mailto:racing@biola.edu" className="footer-link">racing@biola.edu</a>
            <span className="footer-text">13800 Biola Ave<br />La Mirada, CA 90639</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="copyright">© {new Date().getFullYear()} Biola Racing. All rights reserved.</span>
        <div className="social-icons">
          {/* Simple SVG Social Icons */}
          <div className="social-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </div>
          <div className="social-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </div>
          <div className="social-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [scrolledPast, setScrolledPast] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolledPast(window.scrollY > window.innerHeight * 0.9);
    const handleMouseMove = (e) => {
      if (cursorRef.current && window.matchMedia("(hover: hover)").matches) {
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

      <div className="hero-container" id="about">
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

      <SupportSection />

      <Footer />
    </div>
  );
}

export default App;