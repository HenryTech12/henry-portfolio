import type { ReactNode } from 'react';

interface CornerFrameProps {
    children: ReactNode;
    className?: string;
}

/**
 * Renders four short corner brackets that "complete" a rectangle in the
 * viewer's eye, instead of a full border — the systems-console card motif.
 */
const CornerFrame = ({ children, className = '' }: CornerFrameProps) => (
    <div className={`corner-frame ${className}`}>
        {children}
        <span className="corner-frame-br" />
        <span className="corner-frame-bl" />
    </div>
);

export default CornerFrame;
