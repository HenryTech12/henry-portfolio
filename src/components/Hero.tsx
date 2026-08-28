import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import { getHandle } from '../lib/format';
import { useTypewriter } from '../hooks/useTypewriter';
import { useGitHubStats } from '../hooks/useGitHubStats';
import CornerFrame from './ui/CornerFrame';
import StatusDot from './ui/StatusDot';

const NetworkBackground = lazy(() => import('./NetworkBackground'));

const data = portfolio as PortfolioData;

type LineVariant = 'command' | 'json' | 'blank';
type TerminalLine = { text: string; variant: LineVariant };

interface TerminalBodyProps {
    lines: TerminalLine[];
}

const TerminalBody = ({ lines }: TerminalBodyProps) => {
    const { displayedLines, done } = useTypewriter(
        lines.map((l) => l.text),
        14,
        200
    );

    return (
        <>
            {lines.map((line, i) => {
                const text = displayedLines[i] ?? '';
                const isLastLine = i === lines.length - 1;
                return (
                    <div key={i} className="whitespace-pre min-h-[1.4em]">
                        {line.variant === 'command' ? (
                            <span className="text-ink-primary">
                                <span className="text-accent">{text.startsWith('$') ? '$ ' : ''}</span>
                                {text.replace(/^\$ /, '')}
                            </span>
                        ) : (
                            <span className="text-ink-body">{text}</span>
                        )}
                        {isLastLine && done && (
                            <span className="inline-block w-2 h-3.5 bg-accent align-middle ml-1 animate-caret" />
                        )}
                    </div>
                );
            })}
        </>
    );
};

const GITHUB_FETCH_MAX_WAIT_MS = 1200;

const Hero = () => {
    const { profile, experience, certifications, honors } = data;
    const headlineParts = profile.headline.split('|').map((part) => part.trim());
    const stackList = headlineParts[1] ? headlineParts[1].split(',').map((s) => s.trim()) : [];
    const handle = getHandle(profile.name);
    const githubUsername = profile.social.github.replace(/\/$/, '').split('/').pop() ?? '';

    const { stats: ghStats, isLive: ghIsLive, loading: ghLoading } = useGitHubStats(githubUsername);
    const [readyToType, setReadyToType] = useState(!ghLoading);

    useEffect(() => {
        if (!ghLoading) {
            setReadyToType(true);
            return;
        }
        const timer = setTimeout(() => setReadyToType(true), GITHUB_FETCH_MAX_WAIT_MS);
        return () => clearTimeout(timer);
    }, [ghLoading]);

    const liveRepoCount = ghStats?.publicRepos ?? profile.githubProjectCount;

    const terminalLines: TerminalLine[] = [
        { text: `$ curl -s https://api.${handle}.dev/profile`, variant: 'command' },
        { text: '{', variant: 'json' },
        { text: `  "name": "${profile.name}",`, variant: 'json' },
        { text: `  "role": "${headlineParts[0] ?? ''}",`, variant: 'json' },
        { text: `  "stack": [${stackList.map((s) => `"${s}"`).join(', ')}],`, variant: 'json' },
        { text: `  "focus": "${headlineParts[2] ?? ''}",`, variant: 'json' },
        { text: `  "status": "available"`, variant: 'json' },
        { text: '}', variant: 'json' },
        { text: '', variant: 'blank' },
        { text: `$ curl -s https://api.github.com/users/${githubUsername}`, variant: 'command' },
        { text: '{', variant: 'json' },
        { text: `  "public_repos": ${liveRepoCount},`, variant: 'json' },
        { text: `  "followers": ${ghStats?.followers ?? '…'},`, variant: 'json' },
        {
            text: `  "member_since": "${ghStats ? new Date(ghStats.createdAt).getFullYear() : '…'}"`,
            variant: 'json',
        },
        { text: '}', variant: 'json' },
    ];

    const stats = [
        { value: experience.length, suffix: '', label: 'Internships', live: false },
        { value: liveRepoCount, suffix: '+', label: 'GitHub Projects', live: ghIsLive },
        { value: certifications.length, suffix: '', label: 'Certifications', live: false },
        { value: honors.length, suffix: '', label: 'Hackathon Wins', live: false },
    ];

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
            <div className="absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_35%,black,transparent)]" />
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_65%_65%_at_50%_38%,black,transparent)]">
                <Suspense fallback={null}>
                    <NetworkBackground />
                </Suspense>
            </div>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

            <div className="relative max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-center mb-8">
                    <MapPin className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                    <span className="font-mono text-ink-muted text-xs tracking-wide">{profile.location}</span>
                </div>

                <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-2xl shadow-black/40">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-raised">
                        <span className="w-2.5 h-2.5 rounded-full bg-ink-faint/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-ink-faint/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-ink-faint/60" />
                        <span className="ml-3 font-mono text-xs text-ink-muted">
                            {handle}@backend:~
                        </span>
                    </div>

                    <div className="px-5 sm:px-8 py-6 sm:py-8 font-mono text-xs sm:text-sm leading-relaxed text-left overflow-x-auto min-h-[280px] sm:min-h-[320px]">
                        {readyToType ? (
                            <TerminalBody lines={terminalLines} />
                        ) : (
                            <span className="inline-block w-2 h-3.5 bg-accent align-middle animate-caret" />
                        )}
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <StatusDot label="available for opportunities" />
                </div>

                <h1 className="mt-10 text-hero font-extrabold leading-[1.05] text-center text-ink-primary text-balance">
                    {profile.name}
                </h1>
                <p className="mt-4 text-hero-sub text-center text-ink-muted max-w-2xl mx-auto body-text">
                    {headlineParts.join(' · ')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 mb-16">
                    <button
                        onClick={() => {
                            const element = document.getElementById('contact');
                            element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group px-6 py-3.5 bg-canvas border border-accent/60 text-accent rounded-md font-mono text-sm hover:bg-accent hover:text-canvas transition-all duration-150 ease-out"
                    >
                        $ get_in_touch
                        <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <a
                        href={profile.resumeUrl}
                        className="px-6 py-3.5 border border-border text-ink-body rounded-md font-mono text-sm hover:border-ink-body hover:text-ink-primary transition-colors duration-150 ease-out"
                    >
                        <Download className="inline-block mr-2 w-4 h-4" />
                        [ resume.pdf ]
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    {stats.map((stat) => (
                        <CornerFrame key={stat.label} className="text-center py-6 px-2">
                            <div className="text-2xl sm:text-3xl font-mono font-semibold text-ink-primary tabular-nums">
                                {stat.value}
                                {stat.suffix}
                            </div>
                            <div className="mt-2 flex items-center justify-center gap-1.5 text-ink-muted text-[0.65rem] sm:text-xs font-mono uppercase tracking-widest">
                                {stat.live && (
                                    <span
                                        className="w-1.5 h-1.5 rounded-full bg-accent animate-status-pulse"
                                        title="Live from GitHub"
                                    />
                                )}
                                {stat.label}
                            </div>
                        </CornerFrame>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
