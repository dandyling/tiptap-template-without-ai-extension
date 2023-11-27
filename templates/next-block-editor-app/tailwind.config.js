const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  safelist: ['ProseMirror'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontSize: {
        xxs: '0.625rem',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        headline: ['Cal Sans', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        editor: {
          foreground: 'hsl(var(--editor-foreground))',
          background: 'hsl(var(--editor-background))',
        },
        toolbar: {
          foreground: 'hsl(var(--toolbar-foreground))',
          background: 'hsl(var(--toolbar-background))',
        },
        panel: {
          foreground: 'hsl(var(--panel-foreground))',
          background: 'hsl(var(--panel-background))',
        },
        border: {
          DEFAULT: 'hsl(var(--border))',
          dark: 'hsl(var(--border-dark))',
          light: 'hsl(var(--border-light))',
        },
        connection: {
          connecting: 'hsl(var(--connection-connecting))',
          connected: 'hsl(var(--connection-connected))',
          disconnected: 'hsl(var(--connection-disconnected))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        dark: '#131415',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
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
          background: 'hsl(var(--card-background))',
        },
        transparency: {
          box: {
            3: 'rgba(13, 13, 13, 0.03)',
            5: 'rgba(13, 13, 13, 0.05)',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      boxShadow: {
        code: '0px 0px 0px 1px rgba(255, 255, 255, 0.2)',
        embed: '0px 0px 0px 2px #000',
        toolbar:
          '0px 1.1970183849334717px 2.0615315437316895px 0px rgba(21, 21, 19, 0.04), 0px 4.020535469055176px 6.924255847930908px 0px rgba(21, 21, 19, 0.07), 0px 18px 31px 0px rgba(21, 21, 19, 0.11)',
      },
      transitionTimingFunction: {
        'embed-shadow': 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      transitionDuration: {
        1600: '1600ms',
      },
      transitionDelay: {
        '-1600': '-1600ms',
        '-1000': '-1000ms',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // color: '#333',
            h1: {
              fontSize: theme('fontSize.3xl'),
              fontWeight: theme('fontWeight.bold'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
