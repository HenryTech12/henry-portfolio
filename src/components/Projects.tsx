import type { ComponentType, ReactNode } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData, Project } from '../data/portfolio.types';
import SectionHeading from './ui/SectionHeading';
import TechBadge from './ui/TechBadge';
import Reveal from './ui/Reveal';
import { useGitHubStats } from '../hooks/useGitHubStats';
import TaraDiagram from './diagrams/TaraDiagram';
import UltraShortDiagram from './diagrams/UltraShortDiagram';
import TestbenchDiagram from './diagrams/TestbenchDiagram';
import XoClashDiagram from './diagrams/XoClashDiagram';
import MedAssistDiagram from './diagrams/MedAssistDiagram';
import JobTrackerDiagram from './diagrams/JobTrackerDiagram';

const data = portfolio as PortfolioData;

// Bespoke diagrams, keyed by project slug, built from that project's actual
// execution/process data. A slug without an entry here falls back to the
// auto-generated ASCII flow derived from its stack.
const customDiagrams: Record<string, ComponentType> = {
    tara: TaraDiagram,
    ultrashort: UltraShortDiagram,
    testbench: TestbenchDiagram,
    'xo-clash': XoClashDiagram,
    'medassist-ai': MedAssistDiagram,
    'job-tracker': JobTrackerDiagram,
};

function buildDiagram(stack: string[]): string {
    const nodes = stack.slice(0, 4);
    return nodes.map((n) => `[ ${n} ]`).join('  ──▶  ');
}

function getTeaser(project: Project): string | null {
    if (project.problem) return project.problem;
    if (project.execution.length > 0) return project.execution[0];
    return null;
}

interface DetailSectionProps {
    label: string;
    defaultOpen?: boolean;
    children: ReactNode;
}

const DetailSection = ({ label, defaultOpen, children }: DetailSectionProps) => (
    <details className="group border-t border-border/60" open={defaultOpen}>
        <summary className="flex items-center justify-between cursor-pointer list-none py-3.5 px-6 sm:px-8 font-mono text-xs uppercase tracking-widest text-ink-body hover:text-accent transition-colors [&::-webkit-details-marker]:hidden">
            <span>[ {label} ]</span>
            <span className="text-ink-muted group-open:hidden">+</span>
            <span className="text-accent hidden group-open:inline">−</span>
        </summary>
        <div className="px-6 sm:px-8 pb-5">{children}</div>
    </details>
);

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const diagram = buildDiagram(project.stack);
    const teaser = getTeaser(project);
    const CustomDiagram = customDiagrams[project.slug];

    return (
        <div
            className={`h-full bg-surface border overflow-hidden transition-colors ${project.pinned
                    ? 'border-accent/50 shadow-glow'
                    : 'border-border hover:border-accent/40'
                }`}
        >
            <div className={`${project.pinned ? 'lg:flex lg:items-start' : ''}`}>
                {CustomDiagram ? (
                    <div
                        className={`bg-canvas border-b border-border/60 px-5 py-6 flex items-center justify-center ${project.pinned ? 'lg:w-[42%] lg:border-b-0 lg:border-r lg:sticky lg:top-24' : ''
                            }`}
                    >
                        <CustomDiagram />
                    </div>
                ) : (
                    diagram && (
                        <div
                            className={`bg-canvas border-b border-border/60 px-5 py-6 flex items-center overflow-x-auto ${project.pinned ? 'lg:w-[42%] lg:border-b-0 lg:border-r lg:sticky lg:top-24' : ''
                                }`}
                        >
                            <pre className="font-mono text-[0.7rem] sm:text-xs text-ink-muted whitespace-pre">
                                <span className="text-accent">{diagram}</span>
                            </pre>
                        </div>
                    )
                )}

                <div className={project.pinned ? 'lg:flex-1' : ''}>
                    <div className="px-6 sm:px-8 pt-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-mono text-xs text-ink-muted tracking-wide">
                                {`project_${String(index + 1).padStart(2, '0')}`}
                                {project.pinned && <span className="text-accent"> · featured</span>}
                            </span>
                            <div className="flex items-center gap-3 flex-shrink-0">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-ink-muted hover:text-accent transition-colors"
                                        aria-label="View live project"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                                {project.repoUrl && (
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-ink-muted hover:text-accent transition-colors"
                                        aria-label="View source on GitHub"
                                    >
                                        <Github className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-ink-primary mb-1">{project.title}</h3>
                        {project.subtitle && (
                            <p className="text-xs text-ink-muted font-mono mb-1">{project.subtitle}</p>
                        )}
                        {project.period && (
                            <p className="text-xs text-ink-faint font-mono mb-4">{project.period}</p>
                        )}
                        {!project.subtitle && !project.period && <div className="mb-4" />}

                        {teaser && (
                            <p className="text-sm text-ink-body leading-relaxed body-text mb-4 line-clamp-2">
                                {teaser}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-2 mb-2">
                            {project.stack.map((tech) => (
                                <TechBadge key={tech}>{tech}</TechBadge>
                            ))}
                        </div>
                    </div>

                    <div className="mt-2">
                        {project.problem && (
                            <DetailSection label="problem">
                                <p className="text-sm text-ink-body leading-relaxed body-text">{project.problem}</p>
                            </DetailSection>
                        )}

                        {project.process && (
                            <DetailSection label="process">
                                <p className="text-sm text-ink-body leading-relaxed body-text">{project.process}</p>
                            </DetailSection>
                        )}

                        {project.execution.length > 0 && (
                            <DetailSection label="execution" defaultOpen>
                                <ul className="space-y-2.5">
                                    {project.execution.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-ink-body leading-relaxed body-text">
                                            <span className="text-accent font-mono flex-shrink-0 select-none">{'>'}</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                {project.scale && project.scale.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-border/60 space-y-1.5">
                                        {project.scale.map((line, i) => (
                                            <p key={i} className="text-xs font-mono text-ink-muted">
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </DetailSection>
                        )}

                        {project.results.length > 0 && (
                            <DetailSection label="results" defaultOpen>
                                <ul className="space-y-2.5">
                                    {project.results.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-ink-primary leading-relaxed body-text">
                                            <span className="text-accent font-mono flex-shrink-0 select-none">{'>'}</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </DetailSection>
                        )}

                        {project.reflection && (
                            <DetailSection label="reflection">
                                <p className="text-sm text-ink-body leading-relaxed body-text">{project.reflection}</p>
                            </DetailSection>
                        )}
                    </div>
                    <div className="h-2" />
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const { projects, profile } = data;
    const githubUsername = profile.social.github.replace(/\/$/, '').split('/').pop() ?? '';
    const { stats: ghStats, isLive: ghIsLive } = useGitHubStats(githubUsername);
    const repoCount = ghStats?.publicRepos ?? profile.githubProjectCount;

    if (projects.length === 0) return null;

    const sorted = [...projects].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-canvas">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="work"
                    title="Featured Projects"
                    description="Real-world systems demonstrating backend architecture, event-driven design, and full-stack delivery."
                />

                <div className="grid md:grid-cols-2 gap-6">
                    {sorted.map((project, i) => (
                        <Reveal
                            key={project.slug}
                            delay={i * 0.06}
                            className={project.pinned ? 'lg:col-span-2' : ''}
                        >
                            <ProjectCard project={project} index={i} />
                        </Reveal>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href={profile.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3.5 bg-canvas border border-border text-ink-body rounded-md font-mono text-sm hover:border-accent/60 hover:text-accent transition-colors"
                    >
                        <Github className="w-4 h-4 mr-2" />
                        browse {repoCount}+ repositories on github
                        {ghIsLive && (
                            <span
                                className="ml-2 w-1.5 h-1.5 rounded-full bg-accent animate-status-pulse"
                                title="Live from GitHub"
                            />
                        )}
                        <ExternalLink className="w-3.5 h-3.5 ml-2" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
