import { Server, Database, Cloud, Shield, Code, Wrench,Globe } from 'lucide-react';

const Skills = () => {
    const skillCategories = [
        {
            icon: Code,
            title: 'Programming Languages',
            skills: ['Java', 'JavaScript', 'Python'],
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Server,
            title: 'Backend Development',
            skills: [
                'Spring Boot',
                'Spring Cloud',
                'Django',
                'Hibernate (JPA)',
                'RESTful APIs',
                'Microservices',
                'Thymeleaf',
                'JSP/Servlet',
                'Spring Cloud Gateway',
                'Feign Clients',
                'Eureka Service Discovery',
            ],
            color: 'from-cyan-500 to-blue-500',
        },
        {
            icon: Database,
            title: 'Database Management',
            skills: [
                'MySQL',
                'PostgreSQL',
                'Cloud Databases',
                'Schema Optimization',
                'Hibernate Queries',
                'Query Tuning',
                'Database Indexing',
            ],
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: Cloud,
            title: 'DevOps & Cloud',
            skills: [
                'Docker',
                'Containerization',
                'Render',
                'Cloud Deployment',
                'Git',
                'GitHub',
                'CI/CD',
            ],
            color: 'from-violet-500 to-blue-500',
        },
        {
            icon: Globe,
            title: 'Web Development',
            skills: [
                'HTML5 & CSS3',
                'JavaScript (ES6+)',
                'Responsive Design',
                'Version Control (Git)',
            ],
            color: 'from-rose-500 to-pink-400'
        },
        {
            icon: Shield,
            title: 'Security',
            skills: [
                'Spring Security',
                'JWT Authentication',
                'Role-Based Access Control',
                'Secure Coding Practices',
                'API Security',
            ],
            color: 'from-red-500 to-orange-500',
        },
        {
            icon: Wrench,
            title: 'Tools & Methodologies',
            skills: [
                'Postman',
                'IntelliJ IDEA',
                'Eclipse',
                'Swagger',
                'Maven',
                'JUnit',
                'Mockito',
                'Apache Kafka',
                'MVC Architecture',
                'Error Handling',
                'Logging',
                'Caching Strategies',
            ],
            color: 'from-amber-500 to-orange-500',
        },
    ];

    const coreCompetencies = [
        'Problem-Solving',
        'Teamwork',
        'Collaboration',
        'Innovation',
        'Technical Expertise',
        'Clean Code',
        'Best Practices',
        'Code Storytelling',
        'Documentation',
        'System Thinking',
        'Debugging',
        'Performance Optimization',
    ];

    return (
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Comprehensive technology stack and professional competencies
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {skillCategories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                            >
                                <div
                                    className={`w-14 h-14 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4`}
                                >
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-slate-100 text-gray-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Core Competencies
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {coreCompetencies.map((competency, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-gray-700 rounded-lg text-sm font-medium border border-blue-100 hover:border-blue-300 transition-colors"
                            >
                                {competency}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4">Continuous Learning</h3>
                        <p className="text-blue-100 max-w-3xl mx-auto">
                            Currently deepening expertise in backend fundamentals, including networking, system
                            design, and optimization strategies, with a focus on building reliable, maintainable,
                            and high-performance backend solutions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
