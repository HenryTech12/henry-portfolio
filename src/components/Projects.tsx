import type { ReactNode } from 'react';
import { ExternalLink, Github, ChevronDown, AlertCircle, Compass, Hammer, TrendingUp, RotateCcw, Sparkles } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData, Project } from '../data/portfolio.types';
import SectionHeading from './ui/SectionHeading';
import TechBadge from './ui/TechBadge';

const data = portfolio as PortfolioData;

interface DetailSectionProps {
    icon: typeof AlertCircle;
    label: string;
    defaultOpen?: boolean;
    children: ReactNode;
}

const DetailSection = ({ icon: Icon, label, defaultOpen, children }: DetailSectionProps) => (
    <details className="group border-t border-border/60" open={defaultOpen}>
        <summary className="flex items-center justify-between cursor-pointer list-none py-3.5 px-6 sm:px-8 text-sm font-semibold text-slate-200 hover:text-accent-cyan transition-colors [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                {label}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-180 flex-shrink-0" />
        </summary>
        <div className="px-6 sm:px-8 pb-5">{children}</div>
    </details>
);

const ProjectCard = ({ project }: { project: Project }) => (
    <div
        className={`bg-surface rounded-2xl border overflow-hidden transition-colors ${project.pinned
                ? 'border-accent-cyan/50 shadow-xl shadow-accent-cyan/10 lg:col-span-2'
                : 'border-border hover:border-accent-cyan/30'
            }`}
    >
        <div className="h-1.5 bg-accent-gradient" />
        <div className="p-6 sm:p-8 pb-0">
            {project.pinned && (
                <span className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wide bg-accent-gradient text-white">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured Project
                </span>
            )}

            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">{project.title}</h3>
                <div className="flex items-center gap-3 flex-shrink-0">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-cyan hover:text-accent-indigo transition-colors"
                            aria-label="View live project"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    )}
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-cyan hover:text-accent-indigo transition-colors"
                            aria-label="View source on GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    )}
                </div>
            </div>

            {project.subtitle && (
                <p className="text-sm text-slate-500 font-mono mb-1">{project.subtitle}</p>
            )}
            {project.period && (
                <p className="text-xs text-slate-600 font-mono mb-4">{project.period}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                ))}
            </div>
        </div>

        <div className="mt-2">
            {project.problem && (
                <DetailSection icon={AlertCircle} label="The Problem">
                    <p className="text-sm text-slate-400 leading-relaxed body-text">{project.problem}</p>
                </DetailSection>
            )}

            {project.process && (
                <DetailSection icon={Compass} label="Thinking Process">
                    <p className="text-sm text-slate-400 leading-relaxed body-text">{project.process}</p>
                </DetailSection>
            )}

            {project.execution.length > 0 && (
                <DetailSection icon={Hammer} label="What He Built" defaultOpen>
                    <ul className="space-y-2.5">
                        {project.execution.map((item, i) => (
                            <li key={i} className="flex items-start text-sm text-slate-400 leading-relaxed body-text">
                                <span className="inline-block w-1.5 h-1.5 bg-accent-cyan rounded-full mt-1.5 mr-3 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    {project.scale && project.scale.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border/60 space-y-1.5">
                            {project.scale.map((line, i) => (
                                <p key={i} className="text-xs font-mono text-slate-500">{line}</p>
                            ))}
                        </div>
                    )}
                </DetailSection>
            )}

            {project.results.length > 0 && (
                <DetailSection icon={TrendingUp} label="Results" defaultOpen>
                    <ul className="space-y-2.5">
                        {project.results.map((item, i) => (
                            <li key={i} className="flex items-start text-sm text-slate-300 leading-relaxed body-text">
                                <span className="inline-block w-1.5 h-1.5 bg-accent-indigo rounded-full mt-1.5 mr-3 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </DetailSection>
            )}

            {project.reflection && (
                <DetailSection icon={RotateCcw} label="What He'd Do Differently">
                    <p className="text-sm text-slate-400 leading-relaxed body-text">{project.reflection}</p>
                </DetailSection>
            )}
        </div>
        <div className="h-2" />
    </div>
);

const Projects = () => {
    const { projects } = data;

    if (projects.length === 0) return null;

    const sorted = [...projects].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="Work"
                    title="Featured Projects"
                    description="Real-world systems demonstrating backend architecture, event-driven design, and full-stack delivery."
                />

                <div className="grid md:grid-cols-2 gap-8">
                    {sorted.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href={data.profile.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-8 py-4 bg-surface border border-border text-white rounded-lg font-medium hover:border-accent-cyan/50 transition-colors shadow-lg"
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
