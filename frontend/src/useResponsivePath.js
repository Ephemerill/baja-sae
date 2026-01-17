import { useState, useEffect } from 'react';

const getCurve = (p1, p2) => {
    // Logic to create a smooth cubic bezier curve between two points
    // We create control points slightly offset to ensure the curve is "S" shaped
    const yDiff = p2.y - p1.y;

    // This "600" is the smoothing factor. Higher = straighter lines, Lower = more curvy
    return `C ${p1.x} ${p1.y + yDiff / 2}, ${p2.x} ${p2.y - yDiff / 2}, ${p2.x} ${p2.y}`;
};

export const useResponsivePath = (refs) => {
    const [path, setPath] = useState("");

    useEffect(() => {
        const calculatePath = () => {
            if (refs.length === 0) return;

            // 1. Get positions of all elements you passed in
            const points = refs.map(ref => {
                if (!ref.current) return { x: 0, y: 0 };
                const rect = ref.current.getBoundingClientRect();
                const scrollTop = window.scrollY;

                // Return the center of the element relative to the document
                return {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2 + scrollTop
                };
            });

            // 2. Start the path at the first point
            let d = `M ${points[0].x} ${points[0].y}`;

            // 3. Loop through points and draw curves to the next one
            for (let i = 0; i < points.length - 1; i++) {
                d += ` ${getCurve(points[i], points[i + 1])}`;
            }

            setPath(d);
        };

        // Calculate on load and on resize
        calculatePath();
        window.addEventListener('resize', calculatePath);

        // Also recalculate after a short delay to ensure fonts/images loaded
        const timeout = setTimeout(calculatePath, 500);

        return () => {
            window.removeEventListener('resize', calculatePath);
            clearTimeout(timeout);
        };
    }, [refs]);

    return path;
};