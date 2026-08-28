import Reveal from './Reveal';

interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: 'center' | 'left';
}

const SectionHeading = ({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) => {
    const isCenter = align === 'center';

    return (
        <Reveal className={`mb-16 ${isCenter ? 'text-center' : 'text-left'}`}>
            {eyebrow && (
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
                    {'// '}
                    {eyebrow}
                </p>
            )}
            <h2 className="text-3xl sm:text-4xl font-bold text-ink-primary mb-4">{title}</h2>
            <div className={`w-10 h-0.5 bg-accent mb-4 ${isCenter ? 'mx-auto' : ''}`} />
            {description && (
                <p className={`text-ink-muted body-text ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
                    {description}
                </p>
            )}
        </Reveal>
    );
};

export default SectionHeading;
