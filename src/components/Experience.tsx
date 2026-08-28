import { Briefcase, MapPin } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import SectionHeading from './ui/SectionHeading';

const data = portfolio as PortfolioData;

const Experience = () => {
    const { experience } = data;

    if (experience.length === 0) return null;

    return (
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
            <div className="max-w-7xl mx-auto">
                <SectionHeading eyebrow="career" title="Work Experience" />

                <div className="relative max-w-3xl mx-auto">
                    <div
                        className="absolute left-[5px] top-2 bottom-2 w-px bg-border"
                        aria-hidden="true"
                    />
                    <div className="space-y-12">
                        {experience.map((exp, index) => (
                            <div key={index} className="relative pl-10">
                                <span className="absolute left-0 top-1.5 w-[11px] h-[11px] rotate-45 bg-canvas border border-accent" />

                                <div className="font-mono text-xs text-ink-muted mb-2 tracking-wide">
                                    {exp.period}
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-ink-primary mb-2">{exp.role}</h3>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-ink-muted mb-5">
                                    <span className="flex items-center gap-1.5">
                                        <Briefcase className="w-3.5 h-3.5" />
                                        {exp.company}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {exp.location}
                                    </span>
                                </div>

                                <ul className="space-y-2.5">
                                    {exp.achievements.map((achievement, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-ink-body leading-relaxed body-text">
                                            <span className="text-accent font-mono flex-shrink-0 select-none">{'>'}</span>
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
