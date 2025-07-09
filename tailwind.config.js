/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: [
          'Space Grotesk'
        ],
        serif: [
          'Albert Sans'
        ],
        sora: [
          'Sora'
        ]
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        spacing: 'margin, padding',
        border: 'border-color'
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        overdueBlue: {
          DEFAULT: '#2F00FF',
          light: '#6347FF',
          dark: '#2500CC'
        },
        aquaBlue: {
          DEFAULT: '#1B88F8',
          light: '#51A9FA',
          dark: '#0B6ED1'
        },
        cornSilk: {
          DEFAULT: '#111B71',
          light: '#384999',
          dark: '#0B1457'
        },
        charcoal: {
          DEFAULT: '#303030',
          light: '#4D4D4D',
          dark: '#1A1A1A'
        },
        nblue: {
          '50': '#E6E8ED',
          '100': '#CED0DB',
          '200': '#B5B9C8',
          '300': '#9DA2B6',
          '400': '#848AA4',
          '500': '#6B7392',
          '600': '#535C80',
          '700': '#3A456D',
          '800': '#222D5B',
          '900': '#091649',
          '950': '#080808',
          '999': '#020D38',
          DEFAULT: '#091649'
        },
        borderColor: {
          DEFAULT: 'hsl(var(--border))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
            opacity: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
            opacity: '1'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
            opacity: '1'
          },
          to: {
            height: '0',
            opacity: '0'
          }
        },
        'background-flow': {
          '0%': {
            backgroundPosition: '0% 50%'
          },
          '50%': {
            backgroundPosition: '100% 100%'
          },
          '100%': {
            backgroundPosition: '0% 50%'
          }
        },
        wiggle: {
          '0%, 100%': {
            transform: 'translateX(-5px)'
          },
          '50%': {
            transform: 'translateX(5px)'
          }
        },
        down: {
          from: {
            transform: 'translateY(-20%)'
          },
          to: {
            transform: 'translateY(0)'
          }
        },
        'slide-in-right': {
          from: {
            opacity: '0',
            position: 'absolute',
            right: '0',
            transform: 'translateX(100%)'
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
            position: 'fixed'
          }
        },
        grid: {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'accordion-up': 'accordion-up 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'background-flow': 'background-flow 200ms infinite',
        wiggle: 'wiggle 0.2s ease-in-out',
        down: 'down 0.2s ease-out',
        'slide-in-right': 'slide-in-right 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
        grid: 'grid 50s linear infinite'
      },
      fontSize: {
        'clamp-head': 'clamp(1.5rem, 3vw, 3.5rem)',
        'clamp-subhead': 'clamp(13px, 1.5vw, 17px)'
      }
    }
  },
  important: true,
  plugins: [tailwindcssAnimate],
}