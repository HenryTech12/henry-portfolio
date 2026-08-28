import { Box, Arrow, ArrowMarkers, Note } from './shared';

/**
 * Architecture diagram for the Job Tracker microservices app — three
 * services (User, Job, Notification), Feign for sync REST, Kafka for
 * async interviewer-status events, Eureka for discovery, Gateway for
 * routing — all pulled directly from portfolio.json's execution field.
 */
const JobTrackerDiagram = () => (
    <svg
        viewBox="0 0 320 370"
        className="w-full h-auto max-w-[280px] mx-auto"
        role="img"
        aria-label="Job Tracker architecture: a client goes through Spring Cloud Gateway to the User Service and Job Service, which talk synchronously via Feign; the Job Service publishes interviewer-status events to Kafka, consumed by the Notification Service; all three services register with Eureka."
    >
        <ArrowMarkers />

        <Box x={90} y={8} w={140} h={34} title="Client" />
        <Arrow x1={160} y1={42} x2={160} y2={62} />

        <Box x={70} y={64} w={180} h={40} title="Spring Cloud Gateway" accentBorder />
        <Arrow x1={110} y1={104} x2={80} y2={124} />
        <Arrow x1={210} y1={104} x2={240} y2={124} />

        <Box x={15} y={126} w={130} h={48} title="User Service" subtitle={['registration · auth', '(JWT) · profile']} />
        <Box x={175} y={126} w={130} h={48} title="Job Service" subtitle={['job applications', 'interview scheduling']} />
        <Arrow x1={145} y1={150} x2={175} y2={150} bidirectional />

        <Arrow x1={240} y1={174} x2={240} y2={194} />
        <Box x={185} y={196} w={110} h={40} title="Kafka Topic" subtitle={['status events']} accentBorder />
        <Arrow x1={240} y1={236} x2={240} y2={256} />
        <Box x={185} y={258} w={110} h={44} title="Notification" subtitle={['async · real-time push']} />

        <Arrow x1={160} y1={174} x2={160} y2={318} dashed />
        <Note x={160} y={312}>all 3 services register here</Note>
        <Box x={90} y={320} w={140} h={34} title="Eureka Discovery" />
    </svg>
);

export default JobTrackerDiagram;
