import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import ScrollFloat from './ScrollFloat';
import GradientText from './GradientText';
import LogoLoop from './LogoLoop';
import './App.css';

// --- CONFIGURATION: Add your image paths here ---
const heroImages = [
  "/hero-1.png",
  "/hero-2.png",
  "/hero-3.png",
  "/hero-4.png",
  "/hero-5.png"
];

const NavLink = ({ href, children, setIsNavigating }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      // 1. Enter Navigation Mode (disables heavy interactions/animations)
      setIsNavigating(true);

      // 2. Calculate target position
      let scrollTarget = element.offsetTop;

      // Adjust for the "Track" sections (About/Car) so we land 
      // in the middle where the text is fully visible.
      if (targetId === 'about' || targetId === 'car') {
        scrollTarget += element.offsetHeight * 0.55;
      }

      // 3. Smooth scroll
      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
      });

      // 4. Exit Navigation Mode after scroll settles (approx 1000ms)
      setTimeout(() => {
        setIsNavigating(false);
      }, 1000);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
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
    description: "The Drivetrain team bridges the gap between raw power and forward motion. We will design and build a custom gearbox and tune the CVT to maximize efficiency and torque transfer. This system is vital to vehicle performance, ensuring the engine’s output is effectively delivered to the wheels to conquer steep climbs and rugged terrain."
  },
  {
    title: "Suspension",
    id: "suspension",
    icon: "amort",
    logo: "/logos/suspension.svg",
    description: "The suspension team will work to develop a suspension system that provides a cushion against the rough baja race conditions. It needs to be soft yet firm at the right times. A good suspension system is vital to vehicle performance, ensuring the vehicle's stability and control during the race."
  },
  {
    title: "Brakes",
    id: "brakes",
    icon: "🛑",
    logo: "/logos/brakes.svg",
    description: "The brakes team will focus on making a braking system that provides a safe and effective way to slow down the vehicle. This system must be bulletproof so that both the driver and the spectators are protected."
  },
  {
    title: "Frame",
    id: "frame",
    icon: "🏗️",
    logo: "/logos/frame.svg",
    description: "The frame team will fabricate a frame that provides a stable and durable structure for the vehicle. It needs to be strong and durable so that the vehicle can withstand the rough conditions of the race."
  },
  {
    title: "Interface",
    id: "interface",
    icon: "🖥️",
    logo: "/logos/interface.svg",
    description: "The interface team will develop a user interface that provides a safe and effective way to control the vehicle. It needs to be reliable to ensure safe and prescice control of the vehicle during extreme conditions"
  },
  {
    title: "Business",
    id: "business",
    icon: "💼",
    logo: "/logos/business.svg",
    description: "I dont know what this team does but its important so we need you on it."
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
    content: "I don't collect anything trust me ;) (seriously though)"
  },
  {
    id: "terms",
    title: "Terms of Service",
    content: "You can look at this website. There is not really anything to agree to."
  },
  {
    id: "cookie",
    title: "Cookie Policy",
    content: "I literally use no cookies yet so dont worry about it bro."
  }
];

const HeroCarousel = () => {
  // Initialize at 0 for deterministic hydration and instant first load
  const [index, setIndex] = useState(0);

  const nextImage = useCallback(() => {
    setIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevImage = useCallback(() => {
    setIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 10000);
    return () => clearInterval(timer);
  }, [index, nextImage]);

  return (
    <div className="hero-container" id="home">
      {heroImages.map((img, i) => (
        <motion.img
          key={img}
          src={img}
          alt={`Biola Baja SAE ${i}`}
          className="hero-image"
          // If it's the first image (i===0), force initial opacity to 1.
          // Otherwise start at 0. This ensures instant visibility on load.
          initial={{ opacity: i === 0 ? 1 : 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }} // Faster fade (0.8s)
          style={{
            zIndex: i === index ? 2 : 1,
            pointerEvents: 'none'
          }}
        />
      ))}

      <div className="hero-overlay"></div>

      <div className="carousel-controls">
        <motion.button
          className="carousel-arrow left"
          onClick={prevImage}
          whileHover={{ scale: 1.2, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </motion.button>

        <motion.button
          className="carousel-arrow right"
          onClick={nextImage}
          whileHover={{ scale: 1.2, x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </motion.button>
      </div>

      <h1 className="hero-text">Running The Race</h1>
    </div>
  );
};

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    timelineData.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  const progressRatio = activeNode / (timelineData.length - 1);

  return (
    <section className="timeline-section">
      <div className="timeline-header">
        <h2 className="timeline-title">Our Timeline</h2>
        <div className="timeline-underline"></div>
      </div>

      <div className="timeline-container">
        <div
          className="timeline-track-wrapper"
          style={{
            flexDirection: isMobile ? 'column' : 'row',
            height: isMobile ? '500px' : '100px',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isMobile ? '2rem 0' : '0 2rem'
          }}
        >
          <div
            className="timeline-line-bg"
            style={{
              width: isMobile ? '4px' : 'auto',
              height: isMobile ? 'auto' : '4px',
              left: isMobile ? '50%' : '2rem',
              right: isMobile ? 'auto' : '2rem',
              top: isMobile ? '2rem' : '50%',
              bottom: isMobile ? '2rem' : 'auto',
              transform: isMobile ? 'translateX(-50%)' : 'translateY(-50%)'
            }}
          ></div>

          <div
            className="timeline-line-fill"
            style={{
              width: isMobile ? '4px' : `calc((100% - 4rem) * ${progressRatio})`,
              height: isMobile ? `calc((100% - 4rem) * ${progressRatio})` : '4px',
              left: isMobile ? '50%' : '2rem',
              top: isMobile ? '2rem' : '50%',
              transform: isMobile ? 'translateX(-50%)' : 'translateY(-50%)'
            }}
          ></div>

          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className={`timeline-node-wrapper ${index <= activeNode ? 'active' : ''}`}
              onClick={() => setActiveNode(index)}
              style={{ zIndex: 3 }}
            >
              <div className="timeline-dot"></div>
              <span
                className="timeline-label"
                style={isMobile ? {
                  position: 'absolute',
                  left: '60px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  textAlign: 'left',
                  whiteSpace: 'nowrap'
                } : {}}
              >
                {item.year}
              </span>
            </div>
          ))}
        </div>

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

// --- NEW COMPONENT: About Section ---
const AboutSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.8]);
  const bodyOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.4, 0.6], [20, 0]);

  return (
    <div ref={containerRef} className="engineering-track" id="about">
      <div className="engineering-sticky-view">
        <div className="split-container">

          {/* Left Side: Image (Reversed from Engineering) */}
          <div className="split-left image-mode">
            <div className="image-frame">
              {/* Using hero-3 as a placeholder for the about section */}
              <img src="/team-2.jpg" alt="Who We Are" className="split-image" />
            </div>
          </div>

          {/* Right Side: Text (Reversed from Engineering) */}
          <div className="split-right text-mode">
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
                  Who We Are
                </GradientText>
              </motion.div>
            </div>
            <motion.div
              className="engineering-body-text"
              style={{ opacity: bodyOpacity, y: bodyY }}
            >
              <h2>Driven by Passion.</h2>
              <p>
                Biola Racing is a student-run engineering team dedicated to designing, building,
                and racing an off-road vehicle for the SAE Baja competition. We combine technical
                skills with endurance to push the limits of what is possible in a collegiate environment.
                We bridge the gap between theory and reality, turning designs into dirt-tearing machines.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
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
                Though Biola racing is a brand new team, we are determined to make a name for ourselves by creating a car that excels in every aspect of the competition. We have not fabrictated anything yet but we are on track to design and build a fully functioning racing machine by 2028.
              </p>
            </motion.div>
          </div>
          <div className="split-right">
            <div className="image-frame">
              <img src="/part-cutting.png" alt="Engineering Excellence" className="split-image" />
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
          FUEL OUR TEAM
        </GradientText>

        <p className="support-text">
          Biola racing is a brand new team and because of that we dont have sponsors yet. That means we need to depend on donations to fund our team. Any amount of money helps us get closer to our goal of winning the SAE Baja competition. Please consider donating :)
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
            Pushing the limits of engineering and endurance. (Will Be) Designed and built by students at Biola University.
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

// UPDATED: App Component manages isNavigating state
function App() {
  const [scrolledPast, setScrolledPast] = useState(false);
  const [ready, setReady] = useState(false);
  // Track navigation state to optimize scroll performance
  const [isNavigating, setIsNavigating] = useState(false);
  const cursorRef = useRef(null);

  // --- IMAGE PRELOADER ---
  useEffect(() => {
    const imagesToPreload = [
      ...heroImages,
      ...teamsData.map(team => team.logo).filter(l => l),
      ...timelineData.map(item => item.image),
      "/team-2.jpg",
      "/part-cutting.png"
    ];

    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    // Add class when navigating so CSS can optimize sticky behavior
    <div className={`app ${isNavigating ? 'is-navigating' : ''}`}>
      {ready && <div className="cursor-light" ref={cursorRef}></div>}

      <nav className={`navbar ${scrolledPast ? 'dark-mode' : ''}`}>
        <div className="nav-brand" onClick={scrollToTop}>Biola Racing</div>
        <div className="nav-links">
          {/* Pass setter to NavLinks */}
          <NavLink href="#about" setIsNavigating={setIsNavigating}>About</NavLink>
          <NavLink href="#team" setIsNavigating={setIsNavigating}>Team</NavLink>
          <NavLink href="#car" setIsNavigating={setIsNavigating}>Car</NavLink>
          <NavLink href="#contact" setIsNavigating={setIsNavigating}>Support</NavLink>
        </div>
      </nav>

      {/* Hero Carousel */}
      <HeroCarousel />

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

      {/* New About Section inserted here */}
      <AboutSection />

      <EngineeringSection />

      <TeamSection />

      <TimelineSection />

      <SupportSection />

      <Footer />
    </div>
  );
}

export default App;