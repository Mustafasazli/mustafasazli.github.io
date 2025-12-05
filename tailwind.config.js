/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Deep space background
                space: {
                    900: '#0a0e27',
                    800: '#0f1629',
                    700: '#1a1f3a',
                },
                // Vibrant neon accent colors
                neon: {
                    cyan: '#00ffff',      // Brighter cyan
                    magenta: '#ff00ff',   // Vibrant magenta
                    blue: '#0099ff',      // Electric blue
                    purple: '#cc00ff',    // Vivid purple
                    pink: '#ff0080',      // Hot pink
                    green: '#00ff88',     // Neon green
                    yellow: '#ffff00',    // Bright yellow
                },
            },
            fontFamily: {
                heading: ['Orbitron', 'Rajdhani', 'sans-serif'],
                display: ['Orbitron', 'sans-serif'],
                body: ['Exo 2', 'Rajdhani', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'neon-cyan': '0 0 20px rgba(0, 255, 255, 0.6)',
                'neon-magenta': '0 0 20px rgba(255, 0, 255, 0.6)',
                'neon-blue': '0 0 20px rgba(0, 153, 255, 0.6)',
                'neon-pink': '0 0 20px rgba(255, 0, 128, 0.6)',
                'glass': '0 8px 32px 0 rgba(0, 255, 255, 0.15)',
            },
            animation: {
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'slide-up': 'slide-up 0.5s ease-out',
            },
            keyframes: {
                'glow-pulse': {
                    '0%, 100%': {
                        textShadow: '0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.4)',
                    },
                    '50%': {
                        textShadow: '0 0 20px rgba(0, 255, 255, 0.9), 0 0 30px rgba(0, 255, 255, 0.6)',
                    },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'slide-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(30px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
        },
    },
    plugins: [],
}
