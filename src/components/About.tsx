import { Languages as LanguagesIcon } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import SectionHeading from './ui/SectionHeading';
import TechBadge from './ui/TechBadge';
import { getHandle } from '../lib/format';

const data = portfolio as PortfolioData;

const About = () => {
    const { profile } = data;
    const handle = getHandle(profile.name);

    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-canvas">
            <div className="max-w-7xl mx-auto">
                <SectionHeading eyebrow="about" title="About Me" />

                <div className="grid lg:grid-cols-5 gap-12 items-start mb-12">
                    {profile.photoUrl && (
                        <div className="lg:col-span-2">
                            <div className="border border-border bg-surface p-2 hover:border-accent/40 transition-colors">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={profile.photoUrl}
                                        alt={profile.name}
                                        className="w-full h-auto grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-500 ease-snap"
                                    />
                                    <div className="absolute inset-0 bg-accent/10 mix-blend-multiply pointer-events-none" />
                                </div>
                            </div>
                            <p className="mt-3 font-mono text-xs text-ink-faint">
                                {`[ ~/${handle}/profile.jpg ]`}
                            </p>
                        </div>
                    )}

                    <div className={profile.photoUrl ? 'lg:col-span-3' : 'lg:col-span-5'}>
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
                </div>

                {profile.topSkills.length > 0 && (
                    <div>
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
        </section>
    );
};

export default About;
