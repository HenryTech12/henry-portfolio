import { Box, Arrow, ArrowMarkers, Note } from './shared';

/**
 * MedAssist AI: patients reach the assistant over WhatsApp via Twilio's
 * Business API, which Henry integrated as the project's backend developer.
 * Still deliberately minimal beyond that — portfolio.json doesn't
 * document more of the internal architecture, so nothing further is
 * invented here.
 */
const MedAssistDiagram = () => (
    <svg
        viewBox="0 0 320 260"
        className="w-full h-auto max-w-[280px] mx-auto"
        role="img"
        aria-label="MedAssist AI: patients message the assistant over WhatsApp via Twilio's Business API, which routes into a Spring Boot backend (built by Henry as backend developer) automating appointments, patient communication, and feedback."
    >
        <ArrowMarkers />

        <Box x={90} y={8} w={140} h={34} title="Patients" />
        <Arrow x1={160} y1={42} x2={160} y2={62} />

        <Box
            x={70}
            y={64}
            w={180}
            h={40}
            title="Twilio WhatsApp API"
            subtitle={['WhatsApp Business API']}
            accentBorder
        />
        <Arrow x1={160} y1={104} x2={160} y2={124} />

        <Box
            x={70}
            y={126}
            w={180}
            h={48}
            title="MedAssist AI Backend"
            subtitle={['Spring Boot · Java', 'Henry: backend developer']}
            accentBorder
        />

        <Arrow x1={115} y1={174} x2={60} y2={194} />
        <Arrow x1={160} y1={174} x2={160} y2={194} />
        <Arrow x1={205} y1={174} x2={260} y2={194} />

        <Box x={15} y={196} w={90} h={40} title="Appointments" />
        <Box x={115} y={196} w={90} h={40} title="Patient Comms" />
        <Box x={215} y={196} w={90} h={40} title="Feedback" />

        <Note x={160} y={250}>clinic staff also use the assistant</Note>
    </svg>
);

export default MedAssistDiagram;
