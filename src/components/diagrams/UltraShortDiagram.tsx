import { Box, Arrow, ArrowMarkers, Callout, Note, COLORS, FONT } from './shared';

/**
 * Architecture diagram for UltraShort, reflecting the cache-aside +
 * resilience pattern described in portfolio.json's execution/results.
 */
const UltraShortDiagram = () => (
    <svg
        viewBox="0 0 320 330"
        className="w-full h-auto max-w-[280px] mx-auto"
        role="img"
        aria-label="UltraShort architecture: the Vercel frontend calls a Spring Boot API guarded by Resilience4j, which reads through a Redis cache-aside layer in front of PostgreSQL."
    >
        <ArrowMarkers />

        <Box x={90} y={8} w={140} h={34} title="Vercel Frontend" />
        <Arrow x1={160} y1={42} x2={160} y2={62} />

        <Box
            x={70}
            y={64}
            w={180}
            h={48}
            title="Spring Boot API"
            subtitle={['Resilience4j: circuit breaker', '+ rate limiter']}
            accentBorder
        />
        <Arrow x1={160} y1={112} x2={160} y2={132} />

        <Box x={40} y={134} w={110} h={44} title="Redis" subtitle={['cache-aside layer']} />
        <Box x={170} y={134} w={110} h={44} title="PostgreSQL" subtitle={['primary store']} />
        <Arrow x1={150} y1={156} x2={170} y2={156} bidirectional />

        <Note x={160} y={198}>cache-aside: miss reads Postgres, populates Redis</Note>

        <Callout x={160} y={230}>100ms avg · 3,000+ req load test</Callout>

        <rect x={40} y={248} width={240} height={62} rx={4} fill={COLORS.canvas} stroke={COLORS.border} />
        <text x={160} y={266} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={600} fill={COLORS.muted}>
            deployment
        </text>
        <text x={160} y={282} textAnchor="middle" fontFamily={FONT} fontSize={8.5} fill={COLORS.faint}>
            Render · backend
        </text>
        <text x={160} y={296} textAnchor="middle" fontFamily={FONT} fontSize={8.5} fill={COLORS.faint}>
            Vercel · frontend
        </text>
    </svg>
);

export default UltraShortDiagram;
