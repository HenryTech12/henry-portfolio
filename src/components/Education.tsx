import { GraduationCap, Award, Calendar } from 'lucide-react';

const Education = () => {
    const education = [
        {
            degree: "Bachelor's Degree in Electrical/Electronic Engineering",
            institution: 'University of Lagos',
            location: 'Lagos, Nigeria',
            period: 'Nov 2024 - Present',
            status: 'In Progress',
            color: 'from-blue-600 to-cyan-600',
        },
        {
            degree: 'Secondary School Certificate',
            institution: 'Grano Model College',
            location: 'Abeokuta, Ogun, Nigeria',
            period: 'Jan 2020 - May 2022',
            status: 'Completed',
            color: 'from-cyan-600 to-blue-600',
        },
    ];

    const certifications = [
        {
            title: 'Java & Problem-Solving Certification',
            issuer: 'HackerRank',
            icon: Award,
        },
        {
            title: 'Java Backend Certificate (Remote)',
            issuer: 'FlexiSAF Edusoft Limited',
            icon: Award,
        },
        {
            title: 'Software Engineer Intern (Remote)',
            issuer: 'HackerRank',
            icon: Award,
        },
    ];

    return (
        <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Education & Certifications</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
                </div>

                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                        <GraduationCap className="w-6 h-6 mr-2 text-blue-600" />
                        Academic Background
                    </h3>
                    <div className="space-y-6">
                        {education.map((edu, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100"
                            >
                                <div className={`h-2 bg-gradient-to-r ${edu.color}`}></div>
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div className="mb-4 md:mb-0">
                                            <h4 className="text-xl font-bold text-gray-900 mb-2">{edu.degree}</h4>
                                            <p className="text-gray-700 font-medium mb-1">{edu.institution}</p>
                                            <p className="text-gray-600 text-sm">{edu.location}</p>
                                        </div>
                                        <div className="flex flex-col items-start md:items-end gap-2">
                                            <div className="flex items-center text-gray-600">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span className="text-sm">{edu.period}</span>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${edu.status === 'In Progress'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-green-100 text-green-700'
                                                    }`}
                                            >
                                                {edu.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                        <Award className="w-6 h-6 mr-2 text-blue-600" />
                        Professional Certifications
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {certifications.map((cert, index) => {
                            const Icon = cert.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{cert.title}</h4>
                                    <p className="text-gray-600 text-sm">{cert.issuer}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4">Languages</h3>
                        <div className="flex justify-center gap-8 flex-wrap">
                            <div>
                                <p className="text-xl font-semibold">English</p>
                                <p className="text-blue-100">Fluent</p>
                            </div>
                            <div>
                                <p className="text-xl font-semibold">Japanese</p>
                                <p className="text-blue-100">Conversational</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
