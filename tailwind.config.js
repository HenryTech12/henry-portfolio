/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                canvas: '#0A0A0B',
                surface: '#131316',
                'surface-raised': '#1C1C1F',
                border: {
                    DEFAULT: '#2A2A2E',
                    subtle: '#1F1F23',
                },
                ink: {
                    primary: '#F4F4F5',
                    body: '#A1A1AA',
                    muted: '#71717A',
                    faint: '#52525B',
                },
                accent: {
                    DEFAULT: '#10B981',
                    hover: '#34D399',
                    active: '#059669',
                },
            },
            boxShadow: {
                glow: '0 0 24px rgba(16, 185, 129, 0.15)',
                'glow-sm': '0 0 12px rgba(16, 185, 129, 0.12)',
            },
            fontFamily: {
                sans: ['Geist', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
                mono: ['"Geist Mono"', '"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
            },
            fontSize: {
                hero: 'clamp(2.5rem, 1.4rem + 4.5vw, 5rem)',
                'hero-sub': 'clamp(1rem, 0.85rem + 0.7vw, 1.375rem)',
            },
            transitionTimingFunction: {
                snap: 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
    },
    plugins: [],
};
