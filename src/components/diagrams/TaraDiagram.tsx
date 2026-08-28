import { Box, Arrow, ArrowMarkers, Note, COLORS, FONT } from './shared';

/**
 * Hand-built architecture diagram for TARA, the pinned/featured project —
 * reflects the actual system described in portfolio.json (execution/process
 * fields), not a generic placeholder.
 */
const TaraDiagram = () => (
    <svg
        viewBox="0 0 320 480"
        className="w-full h-auto max-w-[280px] mx-auto"
        role="img"
        aria-label="TARA system architecture: client requests flow through the FastAPI backend, which calls QoreID for identity verification, feeds a fraud-detection engine and trust-scoring engine, and persists to an in-memory graph and Postgres."
    >
        <ArrowMarkers />

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

        <Note x={160} y={362}>dual-layer persistence · BVN-based idempotency</Note>

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
