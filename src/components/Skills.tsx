import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import SectionHeading from './ui/SectionHeading';
import TechBadge from './ui/TechBadge';
import CornerFrame from './ui/CornerFrame';
import Reveal from './ui/Reveal';

const data = portfolio as PortfolioData;

const Skills = () => {
    const { skills, coreCompetencies } = data;

    if (skills.length === 0) return null;

    return (
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="toolbox"
                    title="Technical Skills"
                    description="Technologies and practices used to design, build, and ship production backend systems."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {skills.map((category, i) => (
                        <Reveal key={category.category} delay={i * 0.05}>
                            <div className="h-full bg-canvas border border-border p-6 hover:border-accent/40 transition-colors">
                                <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                                    {'// '}
                                    {category.category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.items.map((skill) => (
                                        <TechBadge key={skill}>{skill}</TechBadge>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {coreCompetencies.length > 0 && (
                    <Reveal>
                        <CornerFrame className="bg-canvas p-8">
                            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-6 text-center">
                                core_competencies
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2">
                                {coreCompetencies.map((competency) => (
                                    <TechBadge key={competency}>{competency}</TechBadge>
                                ))}
                            </div>
                        </CornerFrame>
                    </Reveal>
                )}
            </div>
        </section>
    );
};

export default Skills;
