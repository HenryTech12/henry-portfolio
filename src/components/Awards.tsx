import { ExternalLink } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import SectionHeading from './ui/SectionHeading';
import CornerFrame from './ui/CornerFrame';

const data = portfolio as PortfolioData;

const Awards = () => {
    const { honors } = data;

    if (honors.length === 0) return null;

    return (
        <section id="awards" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="recognition"
                    title="Honors & Awards"
                    description="Recognition for technical excellence and competitive achievement across hackathons and academic competitions."
                />

                <div className="grid md:grid-cols-2 gap-4">
                    {honors.map((award, index) => {
                        const tag = award.title.toLowerCase().includes('winner') ? 'winner' : 'runner-up';
                        return (
                            <CornerFrame key={index} className="bg-canvas p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <span
                                        className={`px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-widest border ${tag === 'winner'
                                                ? 'border-accent/50 text-accent'
                                                : 'border-ink-faint/50 text-ink-muted'
                                            }`}
                                    >
                                        {tag}
                                    </span>
                                    {award.url && (
                                        <a
                                            href={award.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-xs font-mono text-ink-muted hover:text-accent transition-colors"
                                        >
                                            view post
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>

                                <h3 className="text-base font-bold text-ink-primary mb-2">{award.title}</h3>

                                {award.date && (
                                    <div className="font-mono text-xs text-ink-faint mb-2">{award.date}</div>
                                )}

                                {award.organization && (
                                    <p className="text-accent font-mono text-xs mb-3">{award.organization}</p>
                                )}

                                {award.description && (
                                    <p className="text-ink-body text-sm leading-relaxed body-text">
                                        {award.description}
                                    </p>
                                )}
                            </CornerFrame>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Awards;
