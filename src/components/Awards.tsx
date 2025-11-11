import { Trophy, Medal, Calendar } from 'lucide-react';

const Awards = () => {
    const awards = [
        {
            title: 'Hackathon Winner – Top Project for Verifact',
            organization: 'AI Campus Network, University of Lagos',
            date: 'Nov 2025',
            description:
                'Awarded Top Project for Verifact, a fact-checking based web application, at the AI Campus Network Demo Hackathon.',
            icon: Trophy,
            color: 'from-yellow-500 to-orange-500',
            path: 'https://mediacareerng.org/fact-checking-app-tops-ai-campus-network-demo/'
        },
        {
            title: '1st Runner-up, Debate & Quiz Competition',
            organization: 'University of Lagos (EE & Computer Engineering Students)',
            date: 'Jan 2025',
            description:
                'Achieved 1st Runner-up among 1st - 3rd year Electrical/Electronics & Computer Engineering Students as a first-year student in a University of Lagos engineering competition.',
            icon: Medal,
            color: 'from-blue-500 to-cyan-500',
        },
    ];

    return (
        <section id="awards" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Recognition for technical excellence and competitive achievement
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {awards.map((award, index) => {
                        const Icon = award.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group hover:-translate-y-1"
                            >
                                <div className={`h-2 bg-gradient-to-r ${award.color}`}></div>
                                <div className="p-8">
                                    <div>
                                        <div
                                            className={`w-16 h-16 bg-gradient-to-r ${award.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                                        >
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        {
                                            index == 0 && award.path && (
                                                <a
                                                    href={award.path}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    View Post
                                                </a>
                                            )
                                        }
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{award.title}</h3>

                                    <div className="flex items-center text-gray-600 mb-4">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span className="text-sm font-medium">{award.date}</span>
                                    </div>

                                    <p className="text-blue-600 font-medium mb-4">{award.organization}</p>

                                    <p className="text-gray-600 leading-relaxed">{award.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-4">Performance Recognition</h3>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Consistently recognized for technical excellence, achieving an A+ performance grade at
                            Badkul Technology and earning top honors in competitive academic and professional
                            environments.
                        </p>
                        <div className="flex justify-center gap-8 flex-wrap">
                            <div>
                                <p className="text-3xl font-bold mb-1">A+</p>
                                <p className="text-blue-100 text-sm">Performance Grade</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold mb-1">2</p>
                                <p className="text-blue-100 text-sm">Major Awards</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold mb-1">Top</p>
                                <p className="text-blue-100 text-sm">Project Winner</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Awards;
