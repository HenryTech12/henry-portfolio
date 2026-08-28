import { Box, Arrow, ArrowMarkers, Callout, Note, COLORS, FONT } from './shared';

/**
 * Architecture diagram for Testbench — reflects that the FastAPI backend
 * is shared infrastructure consumed by both the Next.js frontend and a
 * separate pipeline service, per portfolio.json's execution field.
 */
const TestbenchDiagram = () => (
    <svg
        viewBox="0 0 320 310"
        className="w-full h-auto max-w-[280px] mx-auto"
        role="img"
        aria-label="Testbench architecture: the Next.js frontend and a separate pipeline service both call a shared FastAPI backend, which owns the Postgres schema and Cloudflare R2 uploads."
    >
        <ArrowMarkers />

        <Box x={20} y={8} w={130} h={34} title="Next.js Frontend" />
        <Box x={170} y={8} w={130} h={34} title="Pipeline Service" />
        <Arrow x1={85} y1={42} x2={145} y2={62} />
        <Arrow x1={235} y1={42} x2={175} y2={62} />

        <Box
            x={70}
            y={64}
            w={180}
            h={48}
            title="FastAPI Backend"
            subtitle={['auth · uploads', 'question-review APIs']}
            accentBorder
        />
        <Arrow x1={130} y1={112} x2={95} y2={132} />
        <Arrow x1={190} y1={112} x2={225} y2={132} />

        <Box x={40} y={134} w={110} h={44} title="PostgreSQL" subtitle={['Alembic migrations']} />
        <Box x={170} y={134} w={110} h={44} title="Cloudflare R2" subtitle={['presigned uploads']} />

        <Note x={160} y={198}>shared Postgres schema across both consumers</Note>

        <Callout x={160} y={226}>PDF → question: 5min → 3min (40% faster)</Callout>

        <rect x={40} y={244} width={240} height={48} rx={4} fill={COLORS.canvas} stroke={COLORS.border} />
        <text x={160} y={264} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={600} fill={COLORS.muted}>
            deployment
        </text>
        <text x={160} y={280} textAnchor="middle" fontFamily={FONT} fontSize={8.5} fill={COLORS.faint}>
            Heroku
        </text>
    </svg>
);

export default TestbenchDiagram;
