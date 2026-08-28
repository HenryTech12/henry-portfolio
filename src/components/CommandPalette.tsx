import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Copy, Download, Github, Linkedin, Mail } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import { navItems } from '../lib/nav';

const data = portfolio as PortfolioData;

interface Command {
    id: string;
    label: string;
    group: 'navigate' | 'actions';
    icon: typeof ArrowRight;
    run: () => void;
    keepOpenAfterRun?: boolean;
}

interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const CommandPalette = ({ open, onOpenChange }: CommandPaletteProps) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emailCopied, setEmailCopied] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const commands: Command[] = useMemo(
        () => [
            ...navItems.map((item) => ({
                id: `nav-${item.id}`,
                label: `Go to ${item.label}`,
                group: 'navigate' as const,
                icon: ArrowRight,
                run: () => {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                },
            })),
            {
                id: 'copy-email',
                label: `Copy email (${data.profile.social.email})`,
                group: 'actions',
                icon: emailCopied ? Check : Copy,
                keepOpenAfterRun: true,
                run: () => {
                    navigator.clipboard?.writeText(data.profile.social.email).then(() => {
                        setEmailCopied(true);
                        setTimeout(() => setEmailCopied(false), 1500);
                    });
                },
            },
            {
                id: 'resume',
                label: 'Download resume',
                group: 'actions',
                icon: Download,
                run: () => window.open(data.profile.resumeUrl, '_blank'),
            },
            {
                id: 'github',
                label: 'Open GitHub profile',
                group: 'actions',
                icon: Github,
                run: () => window.open(data.profile.social.github, '_blank', 'noopener,noreferrer'),
            },
            {
                id: 'linkedin',
                label: 'Open LinkedIn profile',
                group: 'actions',
                icon: Linkedin,
                run: () => window.open(data.profile.social.linkedin, '_blank', 'noopener,noreferrer'),
            },
            {
                id: 'email',
                label: 'Send an email',
                group: 'actions',
                icon: Mail,
                run: () => window.open(`mailto:${data.profile.social.email}`, '_self'),
            },
        ],
        [emailCopied]
    );

    const filtered = useMemo(() => {
        if (!query.trim()) return commands;
        const q = query.toLowerCase();
        return commands.filter((c) => c.label.toLowerCase().includes(q));
    }, [commands, query]);

    // Global Cmd/Ctrl+K to open, regardless of current open state
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                onOpenChange(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (open) {
            setQuery('');
            setSelectedIndex(0);
            document.body.style.overflow = 'hidden';
            const t = setTimeout(() => inputRef.current?.focus(), 50);
            return () => {
                clearTimeout(t);
                document.body.style.overflow = '';
            };
        }
    }, [open]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    const runCommand = (command: Command) => {
        command.run();
        if (!command.keepOpenAfterRun) onOpenChange(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onOpenChange(false);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const command = filtered[selectedIndex];
            if (command) runCommand(command);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-[100] flex items-start justify-center pt-24 sm:pt-32 px-4 bg-canvas/80 backdrop-blur-sm"
                    onClick={() => onOpenChange(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-lg bg-surface border border-border rounded-lg shadow-2xl shadow-black/50 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Command palette"
                    >
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                            <span className="font-mono text-accent text-sm select-none">$</span>
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a command or search…"
                                className="flex-1 bg-transparent font-mono text-sm text-ink-primary placeholder:text-ink-faint focus:outline-none"
                                aria-label="Command search"
                            />
                            <kbd className="hidden sm:inline font-mono text-[0.65rem] text-ink-faint border border-border rounded px-1.5 py-0.5">
                                esc
                            </kbd>
                        </div>

                        <div className="max-h-80 overflow-y-auto py-2">
                            {filtered.length === 0 && (
                                <p className="px-4 py-6 text-center font-mono text-sm text-ink-muted">
                                    no matching commands
                                </p>
                            )}

                            {filtered.length > 0 && (
                                <>
                                    {(['navigate', 'actions'] as const).map((group) => {
                                        const groupCommands = filtered.filter((c) => c.group === group);
                                        if (groupCommands.length === 0) return null;
                                        return (
                                            <div key={group} className="mb-1 last:mb-0">
                                                <p className="px-4 pt-2 pb-1 font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
                                                    {group}
                                                </p>
                                                {groupCommands.map((command) => {
                                                    const globalIndex = filtered.indexOf(command);
                                                    const isSelected = globalIndex === selectedIndex;
                                                    const Icon = command.icon;
                                                    return (
                                                        <button
                                                            key={command.id}
                                                            onClick={() => runCommand(command)}
                                                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left font-mono text-sm transition-colors ${isSelected
                                                                    ? 'bg-accent/10 text-accent'
                                                                    : 'text-ink-body hover:bg-surface-raised'
                                                                }`}
                                                        >
                                                            <Icon className="w-4 h-4 flex-shrink-0" />
                                                            <span className="flex-1">{command.label}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
