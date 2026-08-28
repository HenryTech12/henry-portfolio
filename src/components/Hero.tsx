import { ArrowRight, Download, MapPin } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';

const data = portfolio as PortfolioData;

const Hero = () => {
    const { profile, experience, projects, certifications, honors } = data;
    const headlineParts = profile.headline.split('|').map((part) => part.trim());

    const stats = [
        { value: experience.length, label: 'Internships' },
        { value: projects.length, label: 'Projects Shipped' },
        { value: certifications.length, label: 'Certifications' },
        { value: honors.length, label: 'Hackathon Podiums' },
    ];

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto w-full">
                <div className="text-center">
                    <div className="flex items-center justify-center mb-6">
                        <MapPin className="w-4 h-4 text-accent-cyan mr-2 flex-shrink-0" />
                        <span className="font-mono text-slate-400 text-xs sm:text-sm tracking-wide">
                            {profile.location}
                        </span>
                    </div>

                    <h1 className="text-hero font-extrabold leading-[1.05] mb-6 text-gradient-chrome text-balance">
                        {profile.name}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 max-w-4xl mx-auto mb-8">
                        {headlineParts.map((part, index) => (
                            <span key={index} className="flex items-center gap-x-3">
                                <span className="text-hero-sub font-semibold text-gradient-accent leading-snug">
                                    {part}
                                </span>
                                {index < headlineParts.length - 1 && (
                                    <span className="text-slate-600 text-lg hidden sm:inline">/</span>
                                )}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 mt-2">
                        <button
                            onClick={() => {
                                const element = document.getElementById('contact');
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group px-8 py-4 bg-accent-gradient text-white rounded-lg font-medium hover:brightness-110 transition-all shadow-lg shadow-accent-cyan/10 hover:shadow-xl hover:shadow-accent-cyan/20 transform hover:-translate-y-0.5"
                        >
                            Get In Touch
                            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <a
                            href={profile.resumeUrl}
                            className="px-8 py-4 border border-accent-cyan/60 text-accent-cyan rounded-lg font-medium hover:bg-accent-cyan/10 transition-all"
                        >
                            <Download className="inline-block mr-2 w-5 h-5" />
                            Download Resume
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-gradient-accent mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-slate-400 text-xs sm:text-sm font-mono">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
