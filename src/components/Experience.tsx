import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
    const experiences = [
        {
            role: 'Java Developer Intern',
            company: 'Badkul Technology Pvt. Ltd.',
            location: 'Remote, India',
            period: 'Sep 2025 - Sep 2025',
            achievements: [
                'Developed and maintained a RESTful Trip Management System backend using Spring Boot, Hibernate (JPA), and MySQL to efficiently handle travel data',
                'Designed and developed a RESTful Trip Management API, enabling efficient handling, search by destination, and filtering by status for travel data',
                'Integrated pagination and sorting functionalities for optimized API responses, enhancing data retrieval performance',
                'Implemented custom validation, global exception handling, and Swagger API documentation, improving API robustness, testability, and visibility',
                'Achieved an A+ performance grade, recognized for technical excellence and professional conduct',
            ],
            color: 'from-blue-600 to-cyan-600',
        },
        {
            role: 'Intermediate Java Developer Intern',
            company: 'FlexiSAF Edusoft Limited',
            location: 'Lagos, Nigeria',
            period: 'May 2025 - Aug 2025',
            achievements: [
                'Contributed to backend development initiatives, building RESTful APIs and system logic using Java, Spring Boot, and MySQL within an agile environment',
                'Developed a web-based Ambulance Service Provider using Spring Boot, Thymeleaf, and MySQL, streamlining patient requests and efficient dispatch',
                'Implemented secure role-based authentication via Spring Security and designed ETA-based assignment logic, reducing dispatch delays to a 30-minute guarantee',
                'Engineered robust error-handling and logging mechanisms, minimizing system downtime and enhancing debugging efficiency',
                'Integrated automated email notifications, cutting manual follow-up efforts by 40% and improving patient updates',
                'Optimized database schema and Hibernate Queries, achieving a 25% reduction in system response time',
            ],
            color: 'from-cyan-600 to-blue-600',
        },
    ];

    return (
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Work Experience</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
                </div>

                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                        >
                            <div className={`h-2 bg-gradient-to-r ${exp.color}`}></div>
                            <div className="p-8">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.role}</h3>
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <Briefcase className="w-4 h-4 mr-2" />
                                            <span className="font-medium">{exp.company}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="text-sm">{exp.period}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="text-sm">{exp.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <ul className="space-y-3">
                                    {exp.achievements.map((achievement, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            <span className="text-gray-600 leading-relaxed">{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
