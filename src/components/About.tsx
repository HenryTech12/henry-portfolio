import { Code2, Server, Layers, Languages as LanguagesIcon } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import SectionHeading from './ui/SectionHeading';

const data = portfolio as PortfolioData;

const skillIcons = [Code2, Server, Layers];

const About = () => {
    const { profile } = data;

    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-7xl mx-auto">
                <SectionHeading eyebrow="About" title="About Me" />

                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    <div className="lg:col-span-3">
                        <h3 className="text-2xl font-bold text-white mb-6">Backend-focused, systems-minded</h3>
                        <p className="text-slate-400 leading-relaxed body-text">{profile.bio}</p>

                        {profile.languages.length > 0 && (
                            <div className="mt-8 flex items-start gap-3">
                                <LanguagesIcon className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-1" />
                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                    {profile.languages.map((lang) => (
                                        <div key={lang.name} className="text-sm">
                                            <span className="text-slate-200 font-medium">{lang.name}</span>
                                            <span className="text-slate-500 font-mono ml-2">{lang.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {profile.topSkills.length > 0 && (
                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                            {profile.topSkills.map((skill, index) => {
                                const Icon = skillIcons[index % skillIcons.length];
                                return (
                                    <div
                                        key={skill}
                                        className="p-6 bg-surface border border-border rounded-xl hover:border-accent-cyan/40 transition-colors"
                                    >
                                        <div className="w-12 h-12 bg-accent-gradient rounded-lg flex items-center justify-center mb-4">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h4 className="text-base font-semibold text-white">{skill}</h4>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default About;
