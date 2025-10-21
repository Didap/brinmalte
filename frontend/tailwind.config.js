/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#e67f20',
          foreground: '#ffffff',
          50: '#fef6ee',
          100: '#fdebd7',
          200: '#fad3ae',
          300: '#f7b47a',
          400: '#f38a44',
          500: '#e67f20',
          600: '#d76016',
          700: '#b24915',
          800: '#8e3c19',
          900: '#733317',
        },
        secondary: {
          DEFAULT: '#423e3d',
          foreground: '#ffffff',
          50: '#f6f5f5',
          100: '#e7e6e5',
          200: '#d1cfce',
          300: '#b0adab',
          400: '#888481',
          500: '#6e6a68',
          600: '#5d5958',
          700: '#4e4b4a',
          800: '#423e3d',
          900: '#3a3736',
        },
        cream: {
          DEFAULT: '#faf8f5',
          50: '#fdfcfb',
          100: '#faf8f5',
          200: '#f5f1ea',
          300: '#ebe4d7',
          400: '#ddd1bc',
          500: '#cdb89f',
          600: '#b89d81',
          700: '#a38669',
          800: '#886f58',
          900: '#705c4b',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

