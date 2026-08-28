import { Github, Linkedin, Mail } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import { getHandle } from '../lib/format';

const data = portfolio as PortfolioData;

const quickLinks = [
    { id: 'about', label: 'about' },
    { id: 'experience', label: 'experience' },
    { id: 'projects', label: 'projects' },
    { id: 'contact', label: 'contact' },
];

const Footer = () => {
    const { profile } = data;
    const currentYear = new Date().getFullYear();
    const tagline = profile.headline.split('|')[0].trim();
    const handle = getHandle(profile.name);

    return (
        <footer className="bg-surface text-ink-body py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="font-mono text-lg text-ink-primary mb-3">
                            ~/{handle}
                        </h3>
                        <p className="text-ink-muted text-sm leading-relaxed body-text">{tagline}</p>
                    </div>

                    <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-4">
                            quick_links
                        </h4>
                        <ul className="space-y-2 text-sm font-mono">
                            {quickLinks.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() =>
                                            document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
                                        }
                                        className="text-ink-muted hover:text-accent transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-4">
                            connect
                        </h4>
                        <div className="flex space-x-3 mb-4">
                            <a
                                href={profile.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-canvas border border-border flex items-center justify-center hover:border-accent/60 hover:text-accent transition-colors"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a
                                href={profile.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-canvas border border-border flex items-center justify-center hover:border-accent/60 hover:text-accent transition-colors"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href={`mailto:${profile.social.email}`}
                                className="w-9 h-9 bg-canvas border border-border flex items-center justify-center hover:border-accent/60 hover:text-accent transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>
                        <p className="text-ink-muted text-sm font-mono">{profile.social.email}</p>
                    </div>
                </div>

                <div className="border-t border-border pt-8 text-center">
                    <p className="text-ink-faint text-xs font-mono">
                        © {currentYear} {profile.name} · built with React, TypeScript &amp; Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
