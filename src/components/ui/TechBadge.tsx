interface TechBadgeProps {
    children: string;
}

const TechBadge = ({ children }: TechBadgeProps) => (
    <span className="px-2.5 py-1 bg-canvas border border-border text-ink-body rounded-sm text-xs font-mono hover:border-accent/60 hover:text-accent transition-colors">
        [{children}]
    </span>
);

export default TechBadge;
