import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import SectionHeading from './ui/SectionHeading';
import CornerFrame from './ui/CornerFrame';
import Reveal from './ui/Reveal';

const data = portfolio as PortfolioData;

const Education = () => {
    const { education, certifications } = data;

    if (education.length === 0 && certifications.length === 0) return null;

    return (
        <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-canvas">
            <div className="max-w-7xl mx-auto">
                <SectionHeading eyebrow="background" title="Education & Certifications" />

                {education.length > 0 && (
                    <div className="mb-16">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-6">
                            academic_background
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <Reveal
                                    key={index}
                                    delay={index * 0.06}
                                    className="bg-surface border border-border hover:border-accent/40 transition-colors p-6"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h4 className="text-lg font-bold text-ink-primary mb-1">{edu.degree}</h4>
                                            <p className="text-ink-body text-sm mb-1">{edu.institution}</p>
                                            <p className="text-ink-muted text-xs font-mono">{edu.location}</p>
                                        </div>
                                        <div className="flex flex-col items-start md:items-end gap-2">
                                            <span className="text-xs font-mono text-ink-muted">{edu.period}</span>
                                            <span
                                                className={`px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-widest border ${edu.status === 'In Progress'
                                                        ? 'border-accent/50 text-accent'
                                                        : 'border-ink-faint/50 text-ink-muted'
                                                    }`}
                                            >
                                                {edu.status}
                                            </span>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                )}

                {certifications.length > 0 && (
                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-6">
                            professional_certifications
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {certifications.map((cert, index) => (
                                <Reveal key={index} delay={index * 0.05}>
                                    <CornerFrame className="bg-surface p-6 h-full">
                                        <h4 className="text-sm font-bold text-ink-primary mb-1.5">{cert.title}</h4>
                                        <p className="text-ink-muted text-sm mb-2">{cert.issuer}</p>
                                        {(cert.issued || cert.expires) && (
                                            <p className="text-ink-faint text-xs font-mono">
                                                {cert.issued && `issued ${cert.issued}`}
                                                {cert.issued && cert.expires && ' · '}
                                                {cert.expires && `expires ${cert.expires}`}
                                            </p>
                                        )}
                                    </CornerFrame>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Education;
