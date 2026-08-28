import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';

const data = portfolio as PortfolioData;

const quickLinks = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

const Footer = () => {
    const { profile } = data;
    const currentYear = new Date().getFullYear();
    const tagline = profile.headline.split('|')[0].trim();

    return (
        <footer className="bg-surface text-slate-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-gradient-chrome">{profile.name}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed body-text">{tagline}</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() =>
                                            document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
                                        }
                                        className="text-slate-500 hover:text-accent-cyan transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
                        <div className="flex space-x-4 mb-4">
                            <a
                                href={profile.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:border-accent-cyan/50 hover:text-accent-cyan transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href={profile.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:border-accent-cyan/50 hover:text-accent-cyan transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href={`mailto:${profile.social.email}`}
                                className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:border-accent-cyan/50 hover:text-accent-cyan transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                        <p className="text-slate-500 text-sm">
                            <Mail className="inline-block w-4 h-4 mr-1" />
                            {profile.social.email}
                        </p>
                    </div>
                </div>

                <div className="border-t border-border pt-8 text-center">
                    <p className="text-slate-500 text-sm">
                        {currentYear} {profile.name}. Built with{' '}
                        <Heart className="inline-block w-4 h-4 text-accent-indigo" /> using React, TypeScript &
                        Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
