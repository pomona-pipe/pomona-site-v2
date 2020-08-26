import colors from 'vuetify/es5/util/colors'
import { Theme, VuetifyThemeVariant } from 'vuetify/types/services/theme'

// custom theme colors
interface IExtendedTheme extends VuetifyThemeVariant {
  brandGrey: string
  mainBackground: string
  headerBackground: string
}

export default {
  dark: false,
  themes: {
    light: {
      primary: colors.blue.lighten2,
      secondary: '#003c60',
      accent: colors.lightBlue.lighten2,
      error: colors.red.lighten2,
      warning: colors.amber.lighten2,
      info: colors.lightBlue.lighten2,
      success: colors.green.lighten2,
      brandGrey: '#E6E6E6',
      mainBackground: '#fafafa',
      headerBackground: '#fafafa'
    } as Partial<IExtendedTheme>,
    dark: {
      primary: colors.blue.darken2,
      secondary: '#003c60',
      accent: colors.deepPurple.darken2,
      error: colors.red.darken2,
      warning: colors.amber.darken2,
      info: colors.lightBlue.darken2,
      success: colors.green.darken2,
      brandGrey: '#E6E6E6',
      mainBackground: '#fafafa',
      headerBackground: '#fafafa'
    } as Partial<IExtendedTheme>
  },
  options: {
    customProperties: true
  }
} as Theme
