import { Heart, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Henry Fakorode
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Full Stack Java Developer specializing in building scalable backend systems with
                            Spring Boot, microservices, and modern cloud technologies.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <button
                                    onClick={() =>
                                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                                    }
                                    className="text-gray-400 hover:text-blue-400 transition-colors"
                                >
                                    About
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() =>
                                        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
                                    }
                                    className="text-gray-400 hover:text-blue-400 transition-colors"
                                >
                                    Experience
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() =>
                                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                                    }
                                    className="text-gray-400 hover:text-blue-400 transition-colors"
                                >
                                    Projects
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() =>
                                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                                    }
                                    className="text-gray-400 hover:text-blue-400 transition-colors"
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect</h4>
                        <div className="flex space-x-4 mb-4">
                            <a
                                href="https://github.com/HenryTech12"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/fakorode-henry-2663422aa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:fakorodehenry@gmail.com"
                                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                        <p className="text-gray-400 text-sm">
                            <Mail className="inline-block w-4 h-4 mr-1" />
                            fakorodehenry@gmail.com
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        {currentYear} Fakorode Odunayo Henry. Built with{' '}
                        <Heart className="inline-block w-4 h-4 text-red-500" /> using React, TypeScript &
                        Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
