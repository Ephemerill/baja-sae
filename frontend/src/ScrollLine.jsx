import { useRef } from 'react';
import {
    motion,
    useScroll,
    useSpring,
    useAnimationFrame,
    useMotionValue,
    useTransform
} from 'motion/react';
import './App.css';

const ScrollLine = ({ pathString }) => {
    // 1. SETUP SCROLL-DRAW ANIMATION
    const { scrollYProgress } = useScroll();

    // Smooth the drawing so it doesn't feel jittery
    const pathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // 2. SETUP GRADIENT FLOW ANIMATION (Matches your GradientText logic)
    const gradientProgress = useMotionValue(0);
    const animationSpeed = 4; // Adjust to match text speed

    useAnimationFrame((time) => {
        const duration = animationSpeed * 1000;
        // Simple loop 0% to 100%
        const progress = (time % duration) / duration;
        gradientProgress.set(progress);
    });

    // Create a moving gradient by shifting x1/x2 coordinates
    // This simulates the "background-position" sliding effect in SVG
    const x1 = useTransform(gradientProgress, [0, 1], ["0%", "100%"]);
    const x2 = useTransform(gradientProgress, [0, 1], ["100%", "200%"]);

    return (
        <div className="scroll-line-container">
            <svg className="scroll-line-svg">
                <defs>
                    {/* Animated Gradient 
            We make it "spreadMethod=reflect" so the colors repeat smoothly 
            as the coordinates shift.
          */}
                    <motion.linearGradient
                        id="movingGradient"
                        gradientUnits="userSpaceOnUse"
                        // We animate the coordinates to make the colors "slide"
                        x1={x1}
                        x2={x2}
                        y1="0%"
                        y2="100%" // Diagonal flow
                        spreadMethod="reflect"
                    >
                        {/* These match your GradientText colors */}
                        <stop offset="0%" stopColor="#ee0000ff" />
                        <stop offset="50%" stopColor="#ff8e71ff" />
                        <stop offset="100%" stopColor="#ff0f0f" />
                    </motion.linearGradient>

                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <motion.path
                    d={pathString}
                    fill="none"
                    stroke="url(#movingGradient)"
                    strokeWidth="6" // Thicker looks better with gradients
                    strokeLinecap="round"
                    filter="url(#glow)"
                    style={{
                        pathLength: pathLength, // <--- This makes it draw on scroll
                        opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]) // Fade in at start
                    }}
                />
            </svg>
        </div>
    );
};

export default ScrollLine;