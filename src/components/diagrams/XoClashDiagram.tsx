import { Box, Arrow, ArrowMarkers, Callout, Note } from './shared';

/**
 * Architecture diagram for XO-Clash — real-time move sync over WebSockets,
 * Redis-backed game state, RabbitMQ-driven cross-player notifications, per
 * portfolio.json's execution field. No deployment platform is stated in
 * the source data, so none is shown here.
 */
const XoClashDiagram = () => (
    <svg
        viewBox="0 0 320 250"
        className="w-full h-auto max-w-[280px] mx-auto"
        role="img"
        aria-label="XO-Clash architecture: two player clients connect over WebSocket/STOMP to a JWT-secured Spring Boot game server, which reads and writes global game state in Redis and publishes cross-player notifications via RabbitMQ."
    >
        <ArrowMarkers />

        <Box x={20} y={8} w={120} h={34} title="Player A Client" />
        <Box x={180} y={8} w={120} h={34} title="Player B Client" />
        <Arrow x1={80} y1={42} x2={130} y2={62} bidirectional />
        <Arrow x1={240} y1={42} x2={190} y2={62} bidirectional />

        <Box
            x={70}
            y={64}
            w={180}
            h={48}
            title="Game Server"
            subtitle={['WebSocket (STOMP)', 'JWT-secured']}
            accentBorder
        />
        <Arrow x1={130} y1={112} x2={95} y2={132} />
        <Arrow x1={190} y1={112} x2={225} y2={132} />

        <Box x={40} y={134} w={110} h={44} title="Redis" subtitle={['global game state']} />
        <Box x={170} y={134} w={110} h={44} title="RabbitMQ" subtitle={['cross-player events']} />

        <Note x={160} y={196}>events pushed back over the same socket</Note>

        <Callout x={160} y={224}>sub-second move sync · 20+ concurrent users</Callout>
    </svg>
);

export default XoClashDiagram;
