import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';

const data = portfolio as PortfolioData;

interface HeaderProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
}

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'awards', label: 'Awards' },
    { id: 'contact', label: 'Contact' },
];

const Header = ({ activeSection, setActiveSection }: HeaderProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const nameParts = data.profile.name.split(' ');
    const brandName = `${nameParts[nameParts.length - 1]} ${nameParts[0]}`;

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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-background/90 backdrop-blur-md shadow-lg shadow-black/30 py-4 border-b border-border-subtle'
                    : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => scrollToSection('home')}
                        className="text-xl sm:text-2xl font-bold text-gradient-chrome hover:opacity-80 transition-opacity"
                    >
                        {brandName}
                    </button>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`text-sm font-medium transition-colors relative group ${activeSection === item.id
                                        ? 'text-accent-cyan'
                                        : 'text-slate-300 hover:text-accent-cyan'
                                    }`}
                            >
                                {item.label}
                                <span
                                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-accent-gradient transform transition-transform origin-left ${activeSection === item.id
                                            ? 'scale-x-100'
                                            : 'scale-x-0 group-hover:scale-x-100'
                                        }`}
                                />
                            </button>
                        ))}
                    </nav>

                    {/* Desktop Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a
                            href={data.profile.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 hover:text-accent-cyan transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href={data.profile.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 hover:text-accent-cyan transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                            href={`mailto:${data.profile.social.email}`}
                            className="text-slate-300 hover:text-accent-cyan transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-slate-200 transition-transform duration-300"
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

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-x-0 top-[72px] z-40 bg-background/95 backdrop-blur-lg shadow-lg border-t border-border-subtle max-h-[calc(100vh-72px)] overflow-y-auto"
                    >
                        <nav className="flex flex-col items-center space-y-6 py-6">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`text-lg font-medium transition-colors ${activeSection === item.id
                                            ? 'text-accent-cyan'
                                            : 'text-slate-300 hover:text-accent-cyan'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <div className="flex items-center space-x-6 pt-4">
                                <a
                                    href={data.profile.social.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-300 hover:text-accent-cyan transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href={data.profile.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-300 hover:text-accent-cyan transition-colors"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href={`mailto:${data.profile.social.email}`}
                                    className="text-slate-300 hover:text-accent-cyan transition-colors"
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
