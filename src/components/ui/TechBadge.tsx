interface TechBadgeProps {
    children: string;
}

const TechBadge = ({ children }: TechBadgeProps) => (
    <span className="px-3 py-1 bg-surface-raised border border-border text-slate-300 rounded-full text-xs font-mono hover:border-accent-cyan/60 hover:text-accent-cyan transition-colors">
        {children}
    </span>
);

export default TechBadge;
