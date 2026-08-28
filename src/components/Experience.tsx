import { Briefcase, Calendar, MapPin } from 'lucide-react';
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
                <SectionHeading eyebrow="Career" title="Work Experience" />

                <div className="space-y-8">
                    {experience.map((exp, index) => (
                        <div
                            key={index}
                            className="bg-background rounded-2xl border border-border hover:border-accent-cyan/30 shadow-lg shadow-black/20 transition-colors overflow-hidden"
                        >
                            <div className="h-1.5 bg-accent-gradient" />
                            <div className="p-6 sm:p-8">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{exp.role}</h3>
                                        <div className="flex items-center text-slate-400">
                                            <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="font-medium">{exp.company}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:items-end">
                                        <div className="flex items-center text-slate-500">
                                            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm font-mono">{exp.period}</span>
                                        </div>
                                        <div className="flex items-center text-slate-500">
                                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm font-mono">{exp.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <ul className="space-y-3">
                                    {exp.achievements.map((achievement, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="inline-block w-1.5 h-1.5 bg-accent-cyan rounded-full mt-2 mr-3 flex-shrink-0" />
                                            <span className="text-slate-400 leading-relaxed body-text">{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
