const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    plugins: [],
    theme: {
        container: {
            center: true,
            card: { color: '#0070f3' },
            a: { color: '#0070f3' },
        },
        fontFamily: {
            sans: ['Manrope', 'sans-serif'],
            manrope: ['Manrope', 'sans-serif'],
        },
        title: {
            color: 'darkgray',
        },
        fontSize: {
            ...defaultTheme.fontSize,
            xxs: '0.625rem',
        },
        borderWidth: {
            ...defaultTheme.borderWidth,
            1: '1px',
            3: '3px',
        },
        colors: {
            primary: 'var(--primary-color)',
            secondary: 'var(--secondary-color)',
            'secondary-bg': 'var(--secondary-bg)',
            'border-color': 'var(--border-color)',
            shadow: {
                default: 'rgba(var(--shadow),1)',
                100: 'rgba(var(--shadow),.1)',
                200: 'rgba(var(--shadow),.2)',
                300: 'rgba(var(--shadow),.3)',
                400: 'rgba(var(--shadow),.4)',
                500: 'rgba(var(--shadow),.5)',
                600: 'rgba(var(--shadow),.6)',
                700: 'rgba(var(--shadow),.7)',
                800: 'rgba(var(--shadow),.8)',
                900: 'rgba(var(--shadow),.9)',
            },
            fuchsia: '#F11B97',
            purple: '#8042E3',
            tooltip: '#c1c2c5',
            ...colors,
        },
        extend: {
            transitionProperty: {
                height: 'height',
                spacing: 'margin, padding',
                width: 'width, margin',
            },
        },
    },
    corePlugins: {
        preflight: true,
    },
};
