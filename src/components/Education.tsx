import { GraduationCap, Award, Calendar } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import SectionHeading from './ui/SectionHeading';

const data = portfolio as PortfolioData;

const Education = () => {
    const { education, certifications } = data;

    if (education.length === 0 && certifications.length === 0) return null;

    return (
        <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-7xl mx-auto">
                <SectionHeading eyebrow="Background" title="Education & Certifications" />

                {education.length > 0 && (
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                            <GraduationCap className="w-6 h-6 mr-2 text-accent-cyan" />
                            Academic Background
                        </h3>
                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="bg-surface rounded-xl border border-border hover:border-accent-cyan/30 transition-colors overflow-hidden"
                                >
                                    <div className="h-1.5 bg-accent-gradient" />
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div>
                                                <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                                                <p className="text-slate-300 font-medium mb-1">{edu.institution}</p>
                                                <p className="text-slate-500 text-sm font-mono">{edu.location}</p>
                                            </div>
                                            <div className="flex flex-col items-start md:items-end gap-2">
                                                <div className="flex items-center text-slate-500">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    <span className="text-sm font-mono">{edu.period}</span>
                                                </div>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${edu.status === 'In Progress'
                                                            ? 'bg-accent-indigo/15 text-accent-indigo'
                                                            : 'bg-accent-teal/15 text-accent-teal'
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
                )}

                {certifications.length > 0 && (
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                            <Award className="w-6 h-6 mr-2 text-accent-cyan" />
                            Professional Certifications
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certifications.map((cert, index) => (
                                <div
                                    key={index}
                                    className="bg-surface rounded-xl p-6 border border-border hover:border-accent-cyan/40 transition-colors"
                                >
                                    <div className="w-12 h-12 bg-accent-gradient rounded-lg flex items-center justify-center mb-4">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="text-base font-bold text-white mb-2">{cert.title}</h4>
                                    <p className="text-slate-400 text-sm mb-2">{cert.issuer}</p>
                                    {(cert.issued || cert.expires) && (
                                        <p className="text-slate-600 text-xs font-mono">
                                            {cert.issued && `Issued ${cert.issued}`}
                                            {cert.issued && cert.expires && ' · '}
                                            {cert.expires && `Expires ${cert.expires}`}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Education;
