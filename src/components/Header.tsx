import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

interface HeaderProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
}

const Header = ({ activeSection, setActiveSection }: HeaderProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'skills', label: 'Skills' },
        { id: 'contact', label: 'Contact' },
    ];

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
                    ? 'bg-white/95 backdrop-blur-md shadow-lg py-4'
                    : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => scrollToSection('home')}
                        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-cyan-700 transition-all"
                    >
                        Henry Fakorode
                    </button>

                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`text-sm font-medium transition-colors relative group ${activeSection === item.id
                                        ? 'text-blue-600'
                                        : 'text-gray-700 hover:text-blue-600'
                                    }`}
                            >
                                {item.label}
                                <span
                                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform transition-transform origin-left ${activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`}
                                />
                            </button>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <a
                            href="https://github.com/HenryTech12"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/fakorode-henry-2663422aa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                            href="mailto:fakorodehenry@gmail.com"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>

                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
                        <nav className="flex flex-col space-y-4 mt-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`text-left text-sm font-medium transition-colors ${activeSection === item.id
                                            ? 'text-blue-600'
                                            : 'text-gray-700 hover:text-blue-600'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <div className="flex items-center space-x-4 pt-4">
                                <a
                                    href="https://github.com/HenryTech12"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/fakorode-henry-2663422aa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href="mailto:fakorodehenry@gmail.com"
                                    className="text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
