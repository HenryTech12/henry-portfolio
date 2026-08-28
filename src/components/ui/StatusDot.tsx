interface StatusDotProps {
    label: string;
    pulse?: boolean;
}

const StatusDot = ({ label, pulse = true }: StatusDotProps) => (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-muted">
        <span className={`w-1.5 h-1.5 rounded-full bg-accent ${pulse ? 'animate-status-pulse' : ''}`} />
        {label}
    </span>
);

export default StatusDot;
