/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#006D85',
                secondary: {
                    100: 'rgba(0, 0, 0, 0.1)',
                    150: 'rgba(0, 0, 0, 0.2)',
                    200: 'rgba(34, 34, 34, 0.4)',
                    300: 'rgba(34, 34, 34, 0.8)'
                },
            },
            borderRadius: {
                // default: '0.625rem',
            },
            boxShadow: {
                box: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
            },
            dropShadow: {
                tr: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            },
            content: {},
            border: '1px solid '
        },
    },
    plugins: [],
}