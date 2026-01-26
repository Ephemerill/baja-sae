import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import ScrollFloat from './ScrollFloat';
import GradientText from './GradientText';
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
  { node: <span style={{ fontFamily: 'sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#fff' }}>This</span>, title: "SolidWorks" },
  { node: <span style={{ fontFamily: 'serif', fontWeight: 800, fontSize: '1.5rem', color: '#ccc' }}>Is Where</span>, title: "Tesla" },
  { node: <span style={{ fontFamily: 'sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '1.5rem', color: '#ff8e71' }}>We Would</span>, title: "Ansys" },
  { node: <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '1.5rem', color: '#fff' }}>Put Our Sponsors</span>, title: "Honda" },
  { node: <span style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#888' }}>If We</span>, title: "Maas" },
  { node: <span style={{ fontFamily: 'sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#fff', border: '2px solid white', padding: '0 5px' }}>Had</span>, title: "Fox Shocks" },
  { node: <span style={{ fontFamily: 'serif', fontWeight: 700, fontSize: '1.5rem', color: '#fff' }}>Any</span>, title: "Lincoln Electric" },
];

const teamsData = [
  {
    title: "Drivetrain",
    id: "drivetrain",
    icon: "⚙️",
    logo: "/logos/drivetrain.svg",
    description: "I thought we were making cars and not trains so idk what this is doing here i'm ngl"
  },
  {
    title: "Suspension",
    id: "suspension",
    icon: "amort",
    logo: "/logos/suspension.svg",
    description: "Everyone knows the more suspension the better so basically we need all we can get."
  },
  {
    title: "Brakes",
    id: "brakes",
    icon: "🛑",
    logo: "/logos/brakes.svg",
    description: "Stopping seems important until you realize that brakes make you slower and obviously you cant win a race by going slow."
  },
  {
    title: "Frame",
    id: "frame",
    icon: "🏗️",
    logo: "/logos/frame.svg",
    description: "Holy framer motion mentioned. Generational react animation referenced. This is huge for web developers everywhere."
  },
  {
    title: "Interface",
    id: "interface",
    icon: "🖥️",
    logo: "/logos/interface.svg",
    description: "Driver-machine connection. We focus on ergonomics and data acquisition. From steering wheel design to dashboard displays that relay real-time engine telemetry, we ensure the driver has total control and situational awareness during the endurance race. Yeah you thought I was going to change this one didn't you?"
  },
  {
    title: "Business",
    id: "business",
    icon: "💼",
    logo: "/logos/business.svg",
    description: "Whatever they do it cannot be as difficult as what we do. -Engineering Major"
  },
];

const timelineData = [
  {
    id: 1,
    year: "Team Formation",
    title: "Team Formation - Now",
    description: "All Biola students are welcome to join and compete with us",
    image: "/team.jpg"
  },
  {
    id: 2,
    year: "Preparation",
    title: "Preparation - Fall 2026",
    description: "The team continues to develop a competitive machine",
    image: "/cad.jpg"
  },
  {
    id: 3,
    year: "Garage Completion",
    title: "Garage Completion - Spring 2027",
    description: "Construction of the Engineering Garage is completed in Spring 2027",
    image: "/garage.jpg"
  },
  {
    id: 4,
    year: "Development & Testing",
    title: "Development & Testing - Fall 2027",
    description: "Biola Racing will begin the development of prototypes, split into subsystem teams.",
    image: "/construction.jpg"
  },
  {
    id: 5,
    year: "SAE Competition",
    title: "SAE Competition - May 2028",
    description: "Once SAE inspections are passed, Biola Racing will compete in SAE courses",
    image: "/race.jpg"
  }
];

const legalData = [
  {
    id: "privacy",
    title: "Privacy Policy",
    content: "I don't collect anything trust me ;)"
  },
  {
    id: "terms",
    title: "Terms of Service",
    content: "Basically we are not responsible for anything."
  },
  {
    id: "cookie",
    title: "Cookie Policy",
    content: "Trust me bro I am NOT doing anything with your cookies."
  }
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
                stiffness: 300,
                damping: 30,
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
                  {team.logo ? (
                    <motion.img
                      src={team.logo}
                      alt={team.title}
                      className="team-logo-image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  ) : (
                    <div className="logo-circle"></div>
                  )}
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
                  stiffness: 300,
                  damping: 30
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
                  initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, pointerEvents: "none" }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
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
                    {teamsData.find(t => t.id === selectedId).logo ? (
                      <motion.img
                        src={teamsData.find(t => t.id === selectedId).logo}
                        alt="logo"
                        className="team-logo-image"
                      />
                    ) : (
                      <div className="logo-circle"></div>
                    )}
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

const TimelineSection = () => {
  const [activeNode, setActiveNode] = useState(0);

  // Calculate the ratio (0 to 1) instead of a raw percentage
  const progressRatio = activeNode / (timelineData.length - 1);

  return (
    <section className="timeline-section">
      <div className="timeline-header">
        <h2 className="timeline-title">The Process</h2>
        <div className="timeline-underline"></div>
      </div>

      <div className="timeline-container">
        {/* Navigation Track */}
        <div className="timeline-track-wrapper">
          {/* Background Gray Line */}
          <div className="timeline-line-bg"></div>

          {/* Active Color Line 
              Fixed Logic: We calculate width based on the available track space 
              (100% - 4rem) to account for the 2rem spacing on left and right 
          */}
          <div
            className="timeline-line-fill"
            style={{ width: `calc((100% - 4rem) * ${progressRatio})` }}
          ></div>

          {/* Nodes */}
          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className={`timeline-node-wrapper ${index <= activeNode ? 'active' : ''}`}
              onClick={() => setActiveNode(index)}
            >
              <div className="timeline-dot"></div>
              <span className="timeline-label">{item.year}</span>
            </div>
          ))}
        </div>

        {/* Content Display Area */}
        <div className="timeline-content-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode}
              className="timeline-content-display"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="timeline-image-wrapper">
                <motion.img
                  src={timelineData[activeNode].image}
                  alt={timelineData[activeNode].title}
                  className="timeline-image"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                {/* Gradient overlay on image for style */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                  zIndex: 1
                }}></div>
              </div>

              <div className="timeline-text-content">
                <motion.h3
                  className="timeline-phase-title"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {timelineData[activeNode].title}
                </motion.h3>
                <motion.p
                  className="timeline-phase-desc"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {timelineData[activeNode].description}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
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
                We dont actually build anything and this is all purely hypothetical. When we inevitably do end up building something it will be amazing and well engineered. Currenlty we are devoid of anything worth displaying so this lovely cover image is courtesy of Purdue Baja Racing.
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
          We really need money and we know you have money so basically you should give it to us becasue you cant take it with you.
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
  const [activeLegal, setActiveLegal] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeLegal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeLegal]);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Biola Racing</h3>
          <p className="footer-text">
            Pushing the limits of engineering and endurance. Designed and built by students at Biola University (allegedly).
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
            <button onClick={() => setActiveLegal('privacy')} className="footer-link-btn">Privacy Policy</button>
            <button onClick={() => setActiveLegal('terms')} className="footer-link-btn">Terms of Service</button>
            <button onClick={() => setActiveLegal('cookie')} className="footer-link-btn">Cookie Policy</button>
          </div>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <div className="footer-links">
            <a href="mailto:racing@biola.edu" className="footer-link">biolaracingexample@biola.edu</a>
            <span className="footer-text">13800 Biola Ave<br />La Mirada, CA 90639</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="copyright">© {new Date().getFullYear()} Biola Racing. Some rights reserved.</span>
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

      <AnimatePresence>
        {activeLegal && (
          <>
            <motion.div
              className="overlay-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLegal(null)}
            />

            {/* Added 'legal-modal' class for specific grey border styling */}
            <motion.div
              className="team-card expanded legal-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.button
                className="close-button"
                onClick={() => setActiveLegal(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>

              <div className="team-card-content expanded-content legal-content-layout">

                <div className="text-container">
                  <h3 className="team-name expanded-title">
                    {legalData.find(l => l.id === activeLegal)?.title}
                  </h3>
                  <div className="team-description-wrapper">
                    <p className="team-description legal-text">
                      {legalData.find(l => l.id === activeLegal)?.content}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </footer>
  );
};

function App() {
  const [scrolledPast, setScrolledPast] = useState(false);
  const [ready, setReady] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setReady(true);
      });
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolledPast(window.scrollY > window.innerHeight * 0.9);
    const handleMouseMove = (e) => {
      if (cursorRef.current && window.matchMedia("(hover: hover)").matches) {
        cursorRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(42, 80, 229, 0.15), transparent 40%)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="app">
      {ready && <div className="cursor-light" ref={cursorRef}></div>}

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

      <TimelineSection />

      <SupportSection />

      <Footer />
    </div>
  );
}

export default App;