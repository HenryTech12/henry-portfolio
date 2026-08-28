interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: 'center' | 'left';
}

const SectionHeading = ({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) => {
    const isCenter = align === 'center';

    return (
        <div className={`mb-16 ${isCenter ? 'text-center' : 'text-left'}`}>
            {eyebrow && (
                <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-accent-cyan mb-3">
                    {eyebrow}
                </p>
            )}
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{title}</h2>
            <div className={`w-16 h-1 bg-accent-gradient rounded-full mb-4 ${isCenter ? 'mx-auto' : ''}`} />
            {description && (
                <p className={`text-slate-400 body-text ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeading;
