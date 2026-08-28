/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                background: '#0C0C0C',
                surface: '#161616',
                'surface-raised': '#1E1E1E',
                border: {
                    DEFAULT: '#2A2A2A',
                    subtle: '#1F1F1F',
                },
                chrome: {
                    start: '#646973',
                    end: '#BBCCD7',
                },
                accent: {
                    teal: '#0EA5A5',
                    cyan: '#22D3EE',
                    indigo: '#6366F1',
                },
            },
            backgroundImage: {
                'accent-gradient': 'linear-gradient(90deg, #0EA5A5 0%, #22D3EE 50%, #6366F1 100%)',
                'chrome-gradient': 'linear-gradient(135deg, #646973 0%, #BBCCD7 100%)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
            },
            fontSize: {
                hero: 'clamp(2.5rem, 1.4rem + 4.5vw, 5.5rem)',
                'hero-sub': 'clamp(1.1rem, 0.9rem + 1vw, 1.75rem)',
            },
        },
    },
    plugins: [],
};
