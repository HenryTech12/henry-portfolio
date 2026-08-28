import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Command } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import { getHandle } from '../lib/format';
import { navItems } from '../lib/nav';

const data = portfolio as PortfolioData;

interface HeaderProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    onOpenCommandPalette: () => void;
}

const Header = ({ activeSection, setActiveSection, onOpenCommandPalette }: HeaderProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handle = getHandle(data.profile.name);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(sectionId);
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ease-out ${isScrolled
                    ? 'bg-canvas/90 backdrop-blur-md shadow-lg shadow-black/30 py-4 border-b border-border-subtle'
                    : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => scrollToSection('home')}
                        className="font-mono text-sm text-ink-body hover:text-ink-primary transition-colors"
                    >
                        <span className="text-ink-muted">~/</span>
                        {handle}
                        <span className="text-accent">$</span>
                        <span className="inline-block w-2 h-4 bg-accent align-middle ml-1 animate-caret" />
                    </button>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-7 font-mono text-sm">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`flex items-center gap-2 transition-colors ${activeSection === item.id
                                        ? 'text-ink-primary'
                                        : 'text-ink-muted hover:text-ink-primary'
                                    }`}
                            >
                                <span
                                    className={`w-1 h-1 rounded-full transition-colors ${activeSection === item.id ? 'bg-accent' : 'bg-transparent'
                                        }`}
                                />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Desktop Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={onOpenCommandPalette}
                            className="flex items-center gap-1.5 px-2.5 py-1 border border-border rounded-md font-mono text-xs text-ink-muted hover:border-accent/50 hover:text-accent transition-colors"
                            aria-label="Open command palette"
                        >
                            <Command className="w-3.5 h-3.5" />
                            K
                        </button>
                        <a
                            href={data.profile.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ink-muted hover:text-accent transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href={data.profile.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ink-muted hover:text-accent transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                            href={`mailto:${data.profile.social.email}`}
                            className="text-ink-muted hover:text-accent transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Mobile: command palette + menu */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={onOpenCommandPalette}
                            className="text-ink-muted hover:text-accent transition-colors"
                            aria-label="Open command palette"
                        >
                            <Command className="w-5 h-5" />
                        </button>
                        <button
                            className="text-ink-body transition-transform duration-300"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 rotate-90 transition-transform duration-300" />
                            ) : (
                                <Menu className="w-6 h-6 rotate-0 transition-transform duration-300" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 top-[72px] z-40 bg-canvas/95 backdrop-blur-lg shadow-lg border-t border-border-subtle max-h-[calc(100vh-72px)] overflow-y-auto"
                    >
                        <nav className="flex flex-col items-center space-y-6 py-6 font-mono">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`flex items-center gap-2 text-lg transition-colors ${activeSection === item.id
                                            ? 'text-ink-primary'
                                            : 'text-ink-muted hover:text-ink-primary'
                                        }`}
                                >
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full ${activeSection === item.id ? 'bg-accent' : 'bg-transparent'
                                            }`}
                                    />
                                    {item.label}
                                </button>
                            ))}
                            <div className="flex items-center space-x-6 pt-4">
                                <a
                                    href={data.profile.social.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-ink-muted hover:text-accent transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href={data.profile.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-ink-muted hover:text-accent transition-colors"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href={`mailto:${data.profile.social.email}`}
                                    className="text-ink-muted hover:text-accent transition-colors"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
