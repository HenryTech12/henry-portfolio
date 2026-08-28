import { Code, Server, Database, ShieldCheck, Cloud, Wrench } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import SectionHeading from './ui/SectionHeading';
import TechBadge from './ui/TechBadge';

const data = portfolio as PortfolioData;

const categoryIcons: Record<string, typeof Code> = {
    Languages: Code,
    'Backend & Frameworks': Server,
    'Data & Messaging': Database,
    'Reliability & Testing': ShieldCheck,
    'DevOps & Cloud': Cloud,
    Security: ShieldCheck,
};

const Skills = () => {
    const { skills, coreCompetencies } = data;

    if (skills.length === 0) return null;

    return (
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="Toolbox"
                    title="Technical Skills"
                    description="Technologies and practices used to design, build, and ship production backend systems."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {skills.map((category) => {
                        const Icon = categoryIcons[category.category] ?? Wrench;
                        return (
                            <div
                                key={category.category}
                                className="bg-background rounded-xl border border-border p-6 hover:border-accent-cyan/40 transition-colors"
                            >
                                <div className="w-12 h-12 bg-accent-gradient rounded-lg flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-4">{category.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.items.map((skill) => (
                                        <TechBadge key={skill}>{skill}</TechBadge>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {coreCompetencies.length > 0 && (
                    <div className="bg-background rounded-xl border border-border p-8">
                        <h3 className="text-xl font-bold text-white mb-6 text-center">Core Competencies</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {coreCompetencies.map((competency) => (
                                <span
                                    key={competency}
                                    className="px-4 py-2 bg-surface text-slate-300 rounded-lg text-sm font-medium border border-border hover:border-accent-cyan/40 transition-colors"
                                >
                                    {competency}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Skills;
