import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const BrinmaltePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{orange.50}',
      100: '{orange.100}',
      200: '{orange.200}',
      300: '{orange.300}',
      400: '{orange.400}',
      500: '#e67f20', // Il nostro colore principale
      600: '{orange.600}',
      700: '{orange.700}',
      800: '{orange.800}',
      900: '{orange.900}',
      950: '{orange.950}'
    },
    colorScheme: {
      light: {
        primary: {
          color: '#e67f20',
          contrastColor: '#ffffff',
          hoverColor: '#d76016',
          activeColor: '#b24915'
        },
        surface: {
          0: '#ffffff',
          50: '#fdfcfb',  // cream-50
          100: '#faf8f5', // cream-100 - nostro colore base
          200: '#f5f1ea',
          300: '#ebe4d7',
          400: '#ddd1bc',
          500: '#cdb89f',
          600: '#b89d81',
          700: '#a38669',
          800: '#886f58',
          900: '#705c4b',
          950: '#423e3d' // secondary - marrone scuro
        }
      },
      dark: {
        primary: {
          color: '#e67f20',
          contrastColor: '#ffffff',
          hoverColor: '#f38a44',
          activeColor: '#f7b47a'
        },
        surface: {
          0: '#ffffff',
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
          950: '#2a2726'
        }
      }
    }
  }
})

export default BrinmaltePreset

