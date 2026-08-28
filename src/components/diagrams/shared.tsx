export const COLORS = {
    canvas: '#0A0A0B',
    surface: '#131316',
    border: '#2A2A2E',
    borderStrong: '#3A3A40',
    primary: '#F4F4F5',
    muted: '#71717A',
    faint: '#52525B',
    accent: '#10B981',
};

export const FONT = "'Geist Mono', ui-monospace, monospace";

export interface BoxProps {
    x: number;
    y: number;
    w: number;
    h: number;
    title: string;
    subtitle?: string[];
    accentBorder?: boolean;
}

export const Box = ({ x, y, w, h, title, subtitle = [], accentBorder }: BoxProps) => (
    <g>
        <rect
            x={x}
            y={y}
            width={w}
            height={h}
            rx={4}
            fill={COLORS.surface}
            stroke={accentBorder ? COLORS.accent : COLORS.border}
            strokeWidth={1}
        />
        <text
            x={x + w / 2}
            y={y + (subtitle.length ? 20 : h / 2 + 4)}
            textAnchor="middle"
            fontFamily={FONT}
            fontSize={11}
            fontWeight={600}
            fill={COLORS.primary}
        >
            {title}
        </text>
        {subtitle.map((line, i) => (
            <text
                key={i}
                x={x + w / 2}
                y={y + 36 + i * 13}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={9}
                fill={COLORS.muted}
            >
                {line}
            </text>
        ))}
    </g>
);

export interface ArrowProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    dashed?: boolean;
    label?: string;
    bidirectional?: boolean;
}

export const Arrow = ({ x1, y1, x2, y2, dashed, label, bidirectional }: ArrowProps) => (
    <g>
        <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={COLORS.borderStrong}
            strokeWidth={1.25}
            strokeDasharray={dashed ? '3 3' : undefined}
            markerEnd="url(#diagram-arrow)"
            markerStart={bidirectional ? 'url(#diagram-arrow-start)' : undefined}
        />
        {label && (
            <text
                x={(x1 + x2) / 2}
                y={(y1 + y2) / 2 - 6}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={8.5}
                fill={COLORS.muted}
            >
                {label}
            </text>
        )}
    </g>
);

interface CalloutProps {
    x: number;
    y: number;
    children: string;
}

export const Callout = ({ x, y, children }: CalloutProps) => (
    <text
        x={x}
        y={y}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={9}
        fontWeight={600}
        fill={COLORS.accent}
    >
        {children}
    </text>
);

interface NoteProps {
    x: number;
    y: number;
    children: string;
}

export const Note = ({ x, y, children }: NoteProps) => (
    <text x={x} y={y} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={COLORS.faint}>
        {children}
    </text>
);

/** Shared arrowhead marker defs — include once per <svg>. */
export const ArrowMarkers = () => (
    <defs>
        <marker
            id="diagram-arrow"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
        >
            <path d="M0,0 L8,4 L0,8 z" fill={COLORS.borderStrong} />
        </marker>
        <marker
            id="diagram-arrow-start"
            viewBox="0 0 8 8"
            refX="1"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
        >
            <path d="M8,0 L0,4 L8,8 z" fill={COLORS.borderStrong} />
        </marker>
    </defs>
);
