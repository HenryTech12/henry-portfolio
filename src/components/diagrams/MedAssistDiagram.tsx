import { Box, Arrow, ArrowMarkers, Note } from './shared';

/**
 * Deliberately minimal diagram for MedAssist AI: portfolio.json states
 * only three capabilities and that it's a team project with Henry's exact
 * contribution unconfirmed — so this shows exactly those three
 * capabilities rather than inventing internal architecture that isn't
 * documented anywhere.
 */
const MedAssistDiagram = () => (
    <svg
        viewBox="0 0 320 200"
        className="w-full h-auto max-w-[280px] mx-auto"
        role="img"
        aria-label="MedAssist AI: clinic staff and patients interact with a Spring Boot AI assistant that automates appointments, patient communication, and feedback collection."
    >
        <ArrowMarkers />

        <Box x={80} y={8} w={160} h={34} title="Clinic Staff / Patients" />
        <Arrow x1={160} y1={42} x2={160} y2={62} />

        <Box x={90} y={64} w={140} h={44} title="MedAssist AI" subtitle={['Spring Boot · Java']} accentBorder />

        <Arrow x1={115} y1={108} x2={60} y2={128} />
        <Arrow x1={160} y1={108} x2={160} y2={128} />
        <Arrow x1={205} y1={108} x2={260} y2={128} />

        <Box x={15} y={130} w={90} h={40} title="Appointments" />
        <Box x={115} y={130} w={90} h={40} title="Patient Comms" />
        <Box x={215} y={130} w={90} h={40} title="Feedback" />

        <Note x={160} y={188}>team project · Henry's contribution to be confirmed</Note>
    </svg>
);

export default MedAssistDiagram;
