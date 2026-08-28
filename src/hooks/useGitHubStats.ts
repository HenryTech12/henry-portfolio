import { useEffect, useState } from 'react';

export interface GitHubStats {
    publicRepos: number;
    followers: number;
    createdAt: string;
}

interface HookResult {
    stats: GitHubStats | null;
    /** true once a network fetch (fresh or cached) has actually resolved successfully */
    isLive: boolean;
    /** true while waiting on the initial fetch (before the bounded wait elapses) */
    loading: boolean;
}

const CACHE_TTL_MS = 15 * 60 * 1000;

function readCache(username: string): GitHubStats | null {
    try {
        const raw = localStorage.getItem(`gh-stats:${username}`);
        if (!raw) return null;
        const { stats, cachedAt } = JSON.parse(raw) as { stats: GitHubStats; cachedAt: number };
        if (Date.now() - cachedAt > CACHE_TTL_MS) return null;
        return stats;
    } catch {
        return null;
    }
}

function writeCache(username: string, stats: GitHubStats) {
    try {
        localStorage.setItem(`gh-stats:${username}`, JSON.stringify({ stats, cachedAt: Date.now() }));
    } catch {
        // storage unavailable (private mode, quota) — non-fatal, just skip caching
    }
}

/**
 * Fetches real public stats from GitHub's REST API for `username`.
 * Never blocks the UI indefinitely and never surfaces an error state —
 * callers should treat `stats === null` as "use the static fallback".
 */
export function useGitHubStats(username: string): HookResult {
    const cached = typeof window !== 'undefined' ? readCache(username) : null;
    const [stats, setStats] = useState<GitHubStats | null>(cached);
    const [isLive, setIsLive] = useState(Boolean(cached));
    const [loading, setLoading] = useState(!cached);

    useEffect(() => {
        if (cached) return;

        let cancelled = false;
        const controller = new AbortController();

        fetch(`https://api.github.com/users/${username}`, { signal: controller.signal })
            .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`status ${res.status}`))))
            .then((data: { public_repos: number; followers: number; created_at: string }) => {
                if (cancelled) return;
                const next: GitHubStats = {
                    publicRepos: data.public_repos,
                    followers: data.followers,
                    createdAt: data.created_at,
                };
                setStats(next);
                setIsLive(true);
                writeCache(username, next);
            })
            .catch(() => {
                // network error, rate limit, or aborted — fall back silently
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    return { stats, isLive, loading };
}
