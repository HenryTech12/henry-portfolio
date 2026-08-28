import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

/**
 * Fades/slides content in the moment it scrolls into view, once, then stays.
 * Falls back to a plain div for prefers-reduced-motion.
 */
const Reveal = ({ children, delay = 0, className }: RevealProps) => {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay }}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;
