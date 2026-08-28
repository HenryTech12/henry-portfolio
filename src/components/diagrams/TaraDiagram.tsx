const COLORS = {
    canvas: '#0A0A0B',
    surface: '#131316',
    border: '#2A2A2E',
    borderStrong: '#3A3A40',
    primary: '#F4F4F5',
    muted: '#71717A',
    faint: '#52525B',
    accent: '#10B981',
};

const FONT = "'Geist Mono', ui-monospace, monospace";

interface BoxProps {
    x: number;
    y: number;
    w: number;
    h: number;
    title: string;
    subtitle?: string[];
    accentBorder?: boolean;
}

const Box = ({ x, y, w, h, title, subtitle = [], accentBorder }: BoxProps) => (
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

interface ArrowProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    dashed?: boolean;
    label?: string;
}

const Arrow = ({ x1, y1, x2, y2, dashed, label }: ArrowProps) => (
    <g>
        <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={COLORS.borderStrong}
            strokeWidth={1.25}
            strokeDasharray={dashed ? '3 3' : undefined}
            markerEnd="url(#tara-arrow)"
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

/**
 * Hand-built architecture diagram for TARA, the pinned/featured project —
 * reflects the actual system described in portfolio.json (execution/process
 * fields), not a generic placeholder. Other project cards use an
 * auto-generated ASCII diagram from their stack; this one project gets a
 * bespoke visual since it's the flagship case study.
 */
const TaraDiagram = () => (
    <svg
        viewBox="0 0 320 480"
        className="w-full h-auto max-w-[280px] mx-auto"
        role="img"
        aria-label="TARA system architecture: client requests flow through the FastAPI backend, which calls QoreID for identity verification, feeds a fraud-detection engine and trust-scoring engine, and persists to an in-memory graph and Postgres."
    >
        <defs>
            <marker
                id="tara-arrow"
                viewBox="0 0 8 8"
                refX="7"
                refY="4"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
            >
                <path d="M0,0 L8,4 L0,8 z" fill={COLORS.borderStrong} />
            </marker>
        </defs>

        <Box x={90} y={8} w={140} h={34} title="Client / Frontend" />
        <Arrow x1={160} y1={42} x2={160} y2={62} />

        <Box x={85} y={64} w={150} h={40} title="FastAPI Backend" subtitle={['4 REST endpoints']} accentBorder />
        <Arrow x1={235} y1={84} x2={245} y2={84} />
        <Box x={245} y={62} w={65} h={44} title="QoreID API" subtitle={['BVN / NIN', '~55min cache']} />
        <Arrow x1={160} y1={104} x2={160} y2={124} />

        <Box
            x={50}
            y={126}
            w={220}
            h={64}
            title="Fraud Detection Engine"
            subtitle={['shared-attribute clustering', 'identity fragmentation (RapidFuzz)', 'onboarding velocity']}
        />
        <Arrow x1={160} y1={190} x2={160} y2={210} />

        <Box
            x={70}
            y={212}
            w={180}
            h={54}
            title="Trust Scoring Engine"
            subtitle={['explainable · additive', 'max severity: REVIEW']}
            accentBorder
        />

        <Arrow x1={130} y1={266} x2={95} y2={296} />
        <Arrow x1={190} y1={266} x2={225} y2={296} />

        <Box x={40} y={298} w={110} h={44} title="In-Memory Graph" subtitle={['detection-speed reads']} />
        <Box x={170} y={298} w={110} h={44} title="PostgreSQL" subtitle={['Aiven · durable store']} />

        <text
            x={160}
            y={362}
            textAnchor="middle"
            fontFamily={FONT}
            fontSize={9}
            fill={COLORS.faint}
        >
            dual-layer persistence · BVN-based idempotency
        </text>

        <rect x={40} y={392} width={240} height={70} rx={4} fill={COLORS.canvas} stroke={COLORS.border} />
        <text x={160} y={410} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={600} fill={COLORS.muted}>
            deployment
        </text>
        <text x={160} y={426} textAnchor="middle" fontFamily={FONT} fontSize={8.5} fill={COLORS.faint}>
            Docker · self-healing config
        </text>
        <text x={160} y={440} textAnchor="middle" fontFamily={FONT} fontSize={8.5} fill={COLORS.faint}>
            live on Render
        </text>
        <text x={160} y={454} textAnchor="middle" fontFamily={FONT} fontSize={8.5} fill={COLORS.faint}>
            (auto-fallback to stub on QoreID failure)
        </text>
    </svg>
);

export default TaraDiagram;
