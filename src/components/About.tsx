import { Code2, Database, Lock, Zap } from 'lucide-react';

const About = () => {
    const highlights = [
        {
            icon: Code2,
            title: 'Backend Architecture',
            description: 'Expert in Spring Boot, microservices, and RESTful API design',
        },
        {
            icon: Database,
            title: 'Database Management',
            description: 'Proficient in PostgreSQL, MySQL with optimization expertise',
        },
        {
            icon: Lock,
            title: 'Security First',
            description: 'Implementing robust authentication and role-based access control',
        },
        {
            icon: Zap,
            title: 'Performance',
            description: 'Focused on optimization, caching, and efficient resource management',
        },
    ];

    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Results-Driven Java Developer
                        </h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                I'm a passionate Full Stack Java Developer with hands-on experience in building
                                scalable and secure web applications. My expertise spans across Spring Boot, Spring
                                Cloud, Hibernate, and modern database technologies like PostgreSQL and MySQL.
                            </p>
                            <p>
                                I specialize in developing RESTful APIs, microservices architectures, and backend
                                systems with a strong emphasis on security, performance optimization, and clean code
                                practices. My approach combines technical excellence with practical problem-solving
                                to deliver maintainable, high-performance solutions.
                            </p>
                            <p>
                                Recently, I've successfully delivered an Ambulance Dispatch Management System
                                featuring ETA-based allocation, automated notifications, and comprehensive admin
                                controls, demonstrating my ability to build real-world production systems.
                            </p>
                            <p>
                                Currently pursuing my Bachelor's in Electrical/Electronic Engineering at the
                                University of Lagos while continuously deepening my expertise in system design,
                                networking, and optimization strategies.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {highlights.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl hover:shadow-lg transition-shadow"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h4 className="text-3xl font-bold mb-2">25%</h4>
                            <p className="text-blue-100">Response Time Reduction</p>
                        </div>
                        <div>
                            <h4 className="text-3xl font-bold mb-2">40%</h4>
                            <p className="text-blue-100">Deployment Speed Improvement</p>
                        </div>
                        <div>
                            <h4 className="text-3xl font-bold mb-2">35%</h4>
                            <p className="text-blue-100">Fake Email Reduction</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
