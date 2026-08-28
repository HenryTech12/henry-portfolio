import { Languages as LanguagesIcon } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import SectionHeading from './ui/SectionHeading';
import TechBadge from './ui/TechBadge';

const data = portfolio as PortfolioData;

const About = () => {
    const { profile } = data;

    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-canvas">
            <div className="max-w-7xl mx-auto">
                <SectionHeading eyebrow="about" title="About Me" />

                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    <div className="lg:col-span-3">
                        <h3 className="text-xl font-bold text-ink-primary mb-6">
                            Backend-focused, systems-minded
                        </h3>
                        <p className="text-ink-body leading-relaxed body-text">{profile.bio}</p>

                        {profile.languages.length > 0 && (
                            <div className="mt-8 flex items-start gap-3">
                                <LanguagesIcon className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                                <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
                                    {profile.languages.map((lang) => (
                                        <div key={lang.name}>
                                            <span className="text-ink-primary">{lang.name}</span>
                                            <span className="text-ink-muted ml-2">// {lang.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {profile.topSkills.length > 0 && (
                        <div className="lg:col-span-2">
                            <p className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-4">
                                core_skills
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {profile.topSkills.map((skill) => (
                                    <TechBadge key={skill}>{skill}</TechBadge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default About;
