/**
 * Kelio Gestion - Premium Color System
 * Système de couleurs sophistiqué avec gradients et nuances travaillées
 */

// Couleurs premium avec OKLCH pour une perception uniforme
export const premiumColors = {
  // Palette principale - Bleu sophistiqué avec nuances
  primary: {
    50: 'oklch(0.985 0.015 240)',
    100: 'oklch(0.96 0.04 240)',
    200: 'oklch(0.92 0.08 240)',
    300: 'oklch(0.85 0.12 240)',
    400: 'oklch(0.75 0.16 240)',
    500: 'oklch(0.65 0.20 240)',
    600: 'oklch(0.55 0.22 240)',
    700: 'oklch(0.45 0.22 240)',
    800: 'oklch(0.35 0.20 240)',
    900: 'oklch(0.25 0.16 240)',
    950: 'oklch(0.15 0.12 240)',
  },

  // Palette accent - Violet premium
  accent: {
    50: 'oklch(0.985 0.015 280)',
    100: 'oklch(0.96 0.04 280)',
    200: 'oklch(0.92 0.08 280)',
    300: 'oklch(0.85 0.12 280)',
    400: 'oklch(0.75 0.16 280)',
    500: 'oklch(0.65 0.20 280)',
    600: 'oklch(0.55 0.22 280)',
    700: 'oklch(0.45 0.22 280)',
    800: 'oklch(0.35 0.20 280)',
    900: 'oklch(0.25 0.16 280)',
  },

  // Palette neutre premium avec teintes chaudes
  neutral: {
    0: 'oklch(1.0 0 0)',
    50: 'oklch(0.985 0.005 60)',
    100: 'oklch(0.96 0.008 60)',
    200: 'oklch(0.92 0.012 60)',
    300: 'oklch(0.85 0.015 60)',
    400: 'oklch(0.70 0.018 60)',
    500: 'oklch(0.55 0.020 60)',
    600: 'oklch(0.45 0.018 60)',
    700: 'oklch(0.35 0.015 60)',
    800: 'oklch(0.25 0.012 60)',
    900: 'oklch(0.15 0.008 60)',
    950: 'oklch(0.08 0.005 60)',
  },

  // Couleurs sémantiques avec variations
  success: {
    50: 'oklch(0.985 0.015 150)',
    100: 'oklch(0.96 0.04 150)',
    200: 'oklch(0.92 0.08 150)',
    300: 'oklch(0.85 0.12 150)',
    400: 'oklch(0.75 0.16 150)',
    500: 'oklch(0.65 0.20 150)',
    600: 'oklch(0.55 0.22 150)',
    700: 'oklch(0.45 0.22 150)',
    800: 'oklch(0.35 0.20 150)',
    900: 'oklch(0.25 0.16 150)',
  },

  warning: {
    50: 'oklch(0.985 0.015 70)',
    100: 'oklch(0.96 0.04 70)',
    200: 'oklch(0.92 0.08 70)',
    300: 'oklch(0.85 0.12 70)',
    400: 'oklch(0.75 0.16 70)',
    500: 'oklch(0.65 0.20 70)',
    600: 'oklch(0.55 0.22 70)',
    700: 'oklch(0.45 0.22 70)',
    800: 'oklch(0.35 0.20 70)',
    900: 'oklch(0.25 0.16 70)',
  },

  error: {
    50: 'oklch(0.985 0.015 15)',
    100: 'oklch(0.96 0.04 15)',
    200: 'oklch(0.92 0.08 15)',
    300: 'oklch(0.85 0.12 15)',
    400: 'oklch(0.75 0.16 15)',
    500: 'oklch(0.65 0.20 15)',
    600: 'oklch(0.55 0.22 15)',
    700: 'oklch(0.45 0.22 15)',
    800: 'oklch(0.35 0.20 15)',
    900: 'oklch(0.25 0.16 15)',
  },

  // Gradients sophistiqués
  gradients: {
    primary: 'linear-gradient(135deg, oklch(0.65 0.20 240) 0%, oklch(0.55 0.22 260) 100%)',
    accent: 'linear-gradient(135deg, oklch(0.65 0.20 280) 0%, oklch(0.55 0.22 300) 100%)',
    success: 'linear-gradient(135deg, oklch(0.65 0.20 150) 0%, oklch(0.55 0.22 170) 100%)',
    warning: 'linear-gradient(135deg, oklch(0.65 0.20 70) 0%, oklch(0.55 0.22 90) 100%)',
    error: 'linear-gradient(135deg, oklch(0.65 0.20 15) 0%, oklch(0.55 0.22 35) 100%)',
    neutral: 'linear-gradient(135deg, oklch(0.96 0.008 60) 0%, oklch(0.92 0.012 60) 100%)',
    glass: 'linear-gradient(135deg, oklch(0.985 0.005 60 / 0.8) 0%, oklch(0.96 0.008 60 / 0.6) 100%)',
  },

  // Ombres sophistiquées
  shadows: {
    sm: '0 1px 2px oklch(0.25 0.012 60 / 0.08)',
    md: '0 4px 6px oklch(0.25 0.012 60 / 0.12), 0 2px 4px oklch(0.25 0.012 60 / 0.06)',
    lg: '0 10px 15px oklch(0.25 0.012 60 / 0.15), 0 4px 6px oklch(0.25 0.012 60 / 0.10)',
    xl: '0 20px 25px oklch(0.25 0.012 60 / 0.15), 0 10px 10px oklch(0.25 0.012 60 / 0.10)',
    glass: '0 8px 32px oklch(0.25 0.012 60 / 0.12)',
    colored: {
      primary: '0 4px 14px oklch(0.65 0.20 240 / 0.25)',
      accent: '0 4px 14px oklch(0.65 0.20 280 / 0.25)',
      success: '0 4px 14px oklch(0.65 0.20 150 / 0.25)',
      warning: '0 4px 14px oklch(0.65 0.20 70 / 0.25)',
      error: '0 4px 14px oklch(0.65 0.20 15 / 0.25)',
    }
  },

  // Effets de surface
  surfaces: {
    glass: 'oklch(0.985 0.005 60 / 0.8)',
    frosted: 'oklch(0.96 0.008 60 / 0.9)',
    elevated: 'oklch(0.992 0.003 60)',
    overlay: 'oklch(0.15 0.008 60 / 0.8)',
    modal: 'oklch(0.985 0.005 60 / 0.95)',
  }
} as const

// Utilitaires pour les couleurs
export const colorUtils = {
  // Générer des variations de couleur
  generateVariations: (baseColor: string, steps: number = 9) => {
    // Implémentation simplifiée - retourne le même nombre d'étapes demandées
    return Array.from({ length: steps }, () => baseColor)
  },

  // Mélanger deux couleurs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mixColors: (color1: string, color2: string) => {
    // Implémentation simplifiée - retourne la première couleur
    return color1
  },

  // Obtenir une couleur avec transparence
  withOpacity: (color: string, opacity: number) => {
    if (color.includes('oklch')) {
      return color.replace(')', ` / ${opacity})`)
    }
    return color
  }
}

// Tokens sémantiques pour l'usage dans les composants
export const semanticTokens = {
  // Surfaces
  surface: {
    base: premiumColors.neutral[0],
    elevated: premiumColors.surfaces.elevated,
    glass: premiumColors.surfaces.glass,
    frosted: premiumColors.surfaces.frosted,
    overlay: premiumColors.surfaces.overlay,
  },

  // Texte
  text: {
    primary: premiumColors.neutral[900],
    secondary: premiumColors.neutral[700],
    tertiary: premiumColors.neutral[500],
    inverse: premiumColors.neutral[0],
    brand: premiumColors.primary[600],
    accent: premiumColors.accent[600],
  },

  // Bordures
  border: {
    light: premiumColors.neutral[200],
    medium: premiumColors.neutral[300],
    strong: premiumColors.neutral[400],
    brand: premiumColors.primary[300],
  },

  // États interactifs
  interactive: {
    hover: premiumColors.neutral[100],
    pressed: premiumColors.neutral[200],
    focus: premiumColors.primary[100],
    disabled: premiumColors.neutral[300],
  },

  // Statuts
  status: {
    success: premiumColors.success[500],
    warning: premiumColors.warning[500],
    error: premiumColors.error[500],
    info: premiumColors.primary[500],
  }
} as const

export type PremiumColor = typeof premiumColors
export type SemanticToken = typeof semanticTokens
