import { useEffect, useState } from 'react';

function prefersReducedMotion() {
    return (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
}

interface TypewriterResult {
    displayedLines: string[];
    done: boolean;
}

/**
 * Types out each line of `lines` character-by-character, one line after another.
 * Runs once on mount only — callers should pass a stable/initial array.
 */
export function useTypewriter(lines: string[], speedMs = 18, startDelayMs = 300): TypewriterResult {
    const [displayedLines, setDisplayedLines] = useState<string[]>(() =>
        prefersReducedMotion() ? lines : lines.map(() => '')
    );
    const [done, setDone] = useState(prefersReducedMotion());

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const steps: { line: number; text: string }[] = [];
        lines.forEach((line, li) => {
            if (line.length === 0) steps.push({ line: li, text: '' });
            for (let c = 1; c <= line.length; c++) {
                steps.push({ line: li, text: line.slice(0, c) });
            }
        });

        const snapshot = lines.map(() => '');
        let stepIndex = 0;
        let intervalId: number | undefined;

        const timeoutId = window.setTimeout(() => {
            intervalId = window.setInterval(() => {
                if (stepIndex >= steps.length) {
                    if (intervalId) window.clearInterval(intervalId);
                    setDone(true);
                    return;
                }
                const step = steps[stepIndex];
                snapshot[step.line] = step.text;
                setDisplayedLines([...snapshot]);
                stepIndex += 1;
            }, speedMs);
        }, startDelayMs);

        return () => {
            window.clearTimeout(timeoutId);
            if (intervalId) window.clearInterval(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { displayedLines, done };
}
