import { Trophy, Medal, Calendar, ExternalLink } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import SectionHeading from './ui/SectionHeading';

const data = portfolio as PortfolioData;

const Awards = () => {
    const { honors } = data;

    if (honors.length === 0) return null;

    return (
        <section id="awards" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="Recognition"
                    title="Honors & Awards"
                    description="Recognition for technical excellence and competitive achievement across hackathons and academic competitions."
                />

                <div className="grid md:grid-cols-2 gap-6">
                    {honors.map((award, index) => {
                        const Icon = award.title.toLowerCase().includes('winner') ? Trophy : Medal;
                        return (
                            <div
                                key={index}
                                className="bg-background rounded-2xl border border-border hover:border-accent-cyan/40 transition-all overflow-hidden group"
                            >
                                <div className="h-1.5 bg-accent-gradient" />
                                <div className="p-6 sm:p-8">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-14 h-14 bg-accent-gradient rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        {award.url && (
                                            <a
                                                href={award.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-sm text-accent-cyan hover:text-accent-indigo transition-colors"
                                            >
                                                View Post
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3">{award.title}</h3>

                                    {award.date && (
                                        <div className="flex items-center text-slate-500 mb-3">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            <span className="text-xs font-mono">{award.date}</span>
                                        </div>
                                    )}

                                    {award.organization && (
                                        <p className="text-accent-cyan font-medium mb-3 text-sm">{award.organization}</p>
                                    )}

                                    {award.description && (
                                        <p className="text-slate-400 leading-relaxed body-text text-sm">{award.description}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Awards;
