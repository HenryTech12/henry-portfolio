import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: 'Full Stack WhatsApp Clone (Version 1)',
            period: 'Oct 2025',
            description:
                'Developed a full-stack WhatsApp Clone in 3 days, featuring real-time chat, user authentication, online/offline status, AI assistant integration, and real-time translation for multilingual communication. Fully containerized with Docker.',
            technologies: ['Spring Boot', 'WebSocket', 'Docker', 'Real-time', 'AI Integration'],
            metrics: ['40% faster deployment', '3-day development cycle', 'Multi-language support'],
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Job Tracker Application',
            period: 'Sep 2025',
            description:
                'Spearheaded the development of a microservices-based job application tracking system using Java Spring Boot, enhancing system performance by 3% as validated through load testing and monitoring metrics.',
            technologies: [
                'Spring Boot',
                'Microservices',
                'Spring Cloud',
                'Load Testing',
                'Monitoring',
            ],
            metrics: ['3% performance improvement', 'Microservices architecture', 'Load tested'],
            gradient: 'from-cyan-500 to-blue-500',
        },
        {
            title: 'Ambulance Dispatch Management System',
            period: 'May 2025 - Aug 2025',
            description:
                'Web-based platform streamlining patient requests and ambulance dispatch with ETA-based assignment logic, role-based authentication, and automated email notifications.',
            technologies: ['Spring Boot', 'Thymeleaf', 'MySQL', 'Spring Security', 'Email API'],
            metrics: ['30-min dispatch guarantee', '40% reduced manual efforts', '25% faster response'],
            gradient: 'from-blue-600 to-cyan-600',
        },
        {
            title: 'AgroScan',
            period: 'May 2025',
            description:
                'Collaborated with a team to build the backend system for an AI-powered crop disease diagnosis platform using Python Django, integrating machine learning models through RESTful APIs for image upload and prediction retrieval. Developed Twilio webhooks to enable SMS bot support, offline mode, and WhatsApp bot interactions for seamless user communication.',
            technologies: ['Django', 'Python', 'RESTful APIs', 'ML Integration', 'Image Processing', 'Twilio API', 'WhatsApp Bot'],
            metrics: ['AI-powered diagnosis', 'Real-time predictions', 'SMS & WhatsApp bot support', 'Offline mode enabled'],
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            title: 'Verifact',
            period: 'Apr 2025',
            description:
                'Award-winning fact-checking application. Collaborated with cross-functional team to design and deliver web-based platform, building backend system with Django and MySQL including RESTful APIs and authentication.',
            technologies: ['Django', 'MySQL', 'REST API', 'Security', 'Team Collaboration'],
            metrics: ['Hackathon Winner', 'Cross-functional team', 'Production-ready'],
            gradient: 'from-blue-500 to-violet-500',
        },
        {
            title: 'Mail Validator System',
            period: 'Feb 2025',
            description:
                'Spring Boot application to efficiently validate email addresses, increasing user authenticity by 40% and reducing fake or disposable email signups by 35%, strengthening overall system security.',
            technologies: ['Spring Boot', 'Email Validation', 'Security', 'API Integration'],
            metrics: ['40% authenticity increase', '35% fake email reduction', 'Enhanced security'],
            gradient: 'from-cyan-500 to-blue-500',
        },
        {
            title: 'DeenWise',
            period: 'Jan 2025',
            description:
                'Built both frontend and backend of Deenwise, a web platform that empowers users to learn the Quran interactively, using Spring Boot, Thymeleaf, JavaScript, and Tailwind CSS for seamless experience.',
            technologies: ['Spring Boot', 'Thymeleaf', 'JavaScript', 'Tailwind CSS', 'Full Stack'],
            metrics: ['Interactive learning', 'Full-stack development', 'Responsive design'],
            gradient: 'from-emerald-500 to-teal-500',
        },
        {
            title: 'NaijaTrust Web Scanner',
            period: 'Sep 2025 - Nov 2025',
            description:
                'Collaborated with a team to build a web-based platform and browser extension that scans websites to detect data collection practices, interprets privacy policies in plain English and Pidgin, and identifies if websites are safe or risky. I built the backend APIs using Python and Django, implementing asynchronous operations that reduced scan and AI processing time from ~1 minute to 20 seconds, delivering real-time privacy insights.',
            technologies: ['Python', 'Django', 'Beautiful Soup', 'Gemini API'],
            metrics: ['80% faster privacy scans', 'Real-time AI policy summaries', 'Safe/unsafe website detection'],
            gradient: 'from-pink-400 via-purple-500 to-cyan-400',
            path: 'https://naijatrust.vercel.app',
        },
    ];

    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Real-world applications demonstrating expertise in backend development, microservices,
                        and full-stack solutions
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
                        >
                            <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
                            <div className="p-6">
                                {
                                    project.path && (
                                        <a
                                            href={project.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            Live Mode
                                        </a>
                                    )
                                }
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {project.title}
                                    </h3>
                                </div>

                                <p className="text-sm text-gray-500 mb-4">{project.period}</p>

                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{project.description}</p>

                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {project.technologies.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-slate-100 text-gray-700 rounded-full text-xs font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <div className="space-y-2">
                                        {project.metrics.map((metric, i) => (
                                            <div key={i} className="flex items-center text-sm">
                                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                                                <span className="text-gray-600">{metric}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="https://github.com/HenryTech12?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
                    >
                        <Github className="w-5 h-5 mr-2" />
                        View More on GitHub
                        <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
