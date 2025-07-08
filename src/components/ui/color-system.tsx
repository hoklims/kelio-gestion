import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Système de couleurs enrichi basé sur Oklab/CAM16
 * Fournit des gradients harmonieux et des accents colorés pour l'UI
 */

export const colorAccents = {
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950',
    text: 'text-emerald-700 dark:text-emerald-300',
    textStrong: 'text-emerald-900 dark:text-emerald-100',
    border: 'border-emerald-200 dark:border-emerald-800',
    hover: 'hover:bg-emerald-100 dark:hover:bg-emerald-900',
    gradient: 'from-emerald-200 to-emerald-50 dark:from-emerald-900 dark:to-emerald-950',
    shadow: 'shadow-emerald-200/50 dark:shadow-emerald-800/50',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-950',
    text: 'text-indigo-700 dark:text-indigo-300',
    textStrong: 'text-indigo-900 dark:text-indigo-100',
    border: 'border-indigo-200 dark:border-indigo-800',
    hover: 'hover:bg-indigo-100 dark:hover:bg-indigo-900',
    gradient: 'from-indigo-200 to-indigo-50 dark:from-indigo-900 dark:to-indigo-950',
    shadow: 'shadow-indigo-200/50 dark:shadow-indigo-800/50',
  },
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-950',
    text: 'text-violet-700 dark:text-violet-300',
    textStrong: 'text-violet-900 dark:text-violet-100',
    border: 'border-violet-200 dark:border-violet-800',
    hover: 'hover:bg-violet-100 dark:hover:bg-violet-900',
    gradient: 'from-violet-200 to-violet-50 dark:from-violet-900 dark:to-violet-950',
    shadow: 'shadow-violet-200/50 dark:shadow-violet-800/50',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950',
    text: 'text-amber-700 dark:text-amber-300',
    textStrong: 'text-amber-900 dark:text-amber-100',
    border: 'border-amber-200 dark:border-amber-800',
    hover: 'hover:bg-amber-100 dark:hover:bg-amber-900',
    gradient: 'from-amber-200 to-amber-50 dark:from-amber-900 dark:to-amber-950',
    shadow: 'shadow-amber-200/50 dark:shadow-amber-800/50',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-950',
    text: 'text-rose-700 dark:text-rose-300',
    textStrong: 'text-rose-900 dark:text-rose-100',
    border: 'border-rose-200 dark:border-rose-800',
    hover: 'hover:bg-rose-100 dark:hover:bg-rose-900',
    gradient: 'from-rose-200 to-rose-50 dark:from-rose-900 dark:to-rose-950',
    shadow: 'shadow-rose-200/50 dark:shadow-rose-800/50',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-950',
    text: 'text-teal-700 dark:text-teal-300',
    textStrong: 'text-teal-900 dark:text-teal-100',
    border: 'border-teal-200 dark:border-teal-800',
    hover: 'hover:bg-teal-100 dark:hover:bg-teal-900',
    gradient: 'from-teal-200 to-teal-50 dark:from-teal-900 dark:to-teal-950',
    shadow: 'shadow-teal-200/50 dark:shadow-teal-800/50',
  },
  coral: {
    bg: 'bg-coral-50 dark:bg-coral-950',
    text: 'text-coral-700 dark:text-coral-300',
    textStrong: 'text-coral-900 dark:text-coral-100',
    border: 'border-coral-200 dark:border-coral-800',
    hover: 'hover:bg-coral-100 dark:hover:bg-coral-900',
    gradient: 'from-coral-200 to-coral-50 dark:from-coral-900 dark:to-coral-950',
    shadow: 'shadow-coral-200/50 dark:shadow-coral-800/50',
  },
  mint: {
    bg: 'bg-mint-50 dark:bg-mint-950',
    text: 'text-mint-700 dark:text-mint-300',
    textStrong: 'text-mint-900 dark:text-mint-100',
    border: 'border-mint-200 dark:border-mint-800',
    hover: 'hover:bg-mint-100 dark:hover:bg-mint-900',
    gradient: 'from-mint-200 to-mint-50 dark:from-mint-900 dark:to-mint-950',
    shadow: 'shadow-mint-200/50 dark:shadow-mint-800/50',
  },
  lavender: {
    bg: 'bg-lavender-50 dark:bg-lavender-950',
    text: 'text-lavender-700 dark:text-lavender-300',
    textStrong: 'text-lavender-900 dark:text-lavender-100',
    border: 'border-lavender-200 dark:border-lavender-800',
    hover: 'hover:bg-lavender-100 dark:hover:bg-lavender-900',
    gradient: 'from-lavender-200 to-lavender-50 dark:from-lavender-900 dark:to-lavender-950',
    shadow: 'shadow-lavender-200/50 dark:shadow-lavender-800/50',
  },
  peach: {
    bg: 'bg-peach-50 dark:bg-peach-950',
    text: 'text-peach-700 dark:text-peach-300',
    textStrong: 'text-peach-900 dark:text-peach-100',
    border: 'border-peach-200 dark:border-peach-800',
    hover: 'hover:bg-peach-100 dark:hover:bg-peach-900',
    gradient: 'from-peach-200 to-peach-50 dark:from-peach-900 dark:to-peach-950',
    shadow: 'shadow-peach-200/50 dark:shadow-peach-800/50',
  },
  sage: {
    bg: 'bg-sage-50 dark:bg-sage-950',
    text: 'text-sage-700 dark:text-sage-300',
    textStrong: 'text-sage-900 dark:text-sage-100',
    border: 'border-sage-200 dark:border-sage-800',
    hover: 'hover:bg-sage-100 dark:hover:bg-sage-900',
    gradient: 'from-sage-200 to-sage-50 dark:from-sage-900 dark:to-sage-950',
    shadow: 'shadow-sage-200/50 dark:shadow-sage-800/50',
  },
  sky: {
    bg: 'bg-sky-50 dark:bg-sky-950',
    text: 'text-sky-700 dark:text-sky-300',
    textStrong: 'text-sky-900 dark:text-sky-100',
    border: 'border-sky-200 dark:border-sky-800',
    hover: 'hover:bg-sky-100 dark:hover:bg-sky-900',
    gradient: 'from-sky-200 to-sky-50 dark:from-sky-900 dark:to-sky-950',
    shadow: 'shadow-sky-200/50 dark:shadow-sky-800/50',
  },
  info: {
    bg: 'bg-info-50 dark:bg-info-950',
    text: 'text-info-700 dark:text-info-300',
    textStrong: 'text-info-900 dark:text-info-100',
    border: 'border-info-200 dark:border-info-800',
    hover: 'hover:bg-info-100 dark:hover:bg-info-900',
    gradient: 'from-info-200 to-info-50 dark:from-info-900 dark:to-info-950',
    shadow: 'shadow-info-200/50 dark:shadow-info-800/50',
  },
  success: {
    bg: 'bg-success-50 dark:bg-success-950',
    text: 'text-success-700 dark:text-success-300',
    textStrong: 'text-success-900 dark:text-success-100',
    border: 'border-success-200 dark:border-success-800',
    hover: 'hover:bg-success-100 dark:hover:bg-success-900',
    gradient: 'from-success-200 to-success-50 dark:from-success-900 dark:to-success-950',
    shadow: 'shadow-success-200/50 dark:shadow-success-800/50',
  },
} as const

export type ColorAccent = keyof typeof colorAccents

interface ColoredIconBoxProps {
  children: React.ReactNode
  accent: ColorAccent
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-3',
}

export function ColoredIconBox({ 
  children, 
  accent, 
  className, 
  size = 'md' 
}: ColoredIconBoxProps) {
  const colors = colorAccents[accent]
  
  return (
    <div
      className={cn(
        'rounded-lg transition-all duration-200',
        colors.bg,
        colors.hover,
        sizeClasses[size],
        className
      )}
    >
      <div className={colors.text}>
        {children}
      </div>
    </div>
  )
}

interface GradientBackgroundProps {
  variant?: 'ocean' | 'sunset' | 'forest' | 'cosmic' | 'warm' | 'cool' | 'vibrant' | 'subtle'
  className?: string
  children?: React.ReactNode
}

const gradientVariants = {
  ocean: 'bg-gradient-to-br from-sky-200 via-teal-100 to-indigo-200 dark:from-sky-900 dark:via-teal-950 dark:to-indigo-900',
  sunset: 'bg-gradient-to-br from-peach-200 via-coral-100 to-rose-200 dark:from-peach-900 dark:via-coral-950 dark:to-rose-900',
  forest: 'bg-gradient-to-br from-emerald-200 via-sage-100 to-mint-200 dark:from-emerald-900 dark:via-sage-950 dark:to-mint-900',
  cosmic: 'bg-gradient-to-br from-violet-200 via-lavender-100 to-indigo-200 dark:from-violet-900 dark:via-lavender-950 dark:to-indigo-900',
  warm: 'bg-gradient-to-br from-amber-200 via-peach-100 to-coral-200 dark:from-amber-900 dark:via-peach-950 dark:to-coral-900',
  cool: 'bg-gradient-to-br from-mint-200 via-sky-100 to-teal-200 dark:from-mint-900 dark:via-sky-950 dark:to-teal-900',
  vibrant: 'bg-gradient-to-br from-rose-100 via-violet-100 via-emerald-100 to-amber-100 dark:from-rose-950 dark:via-violet-950 dark:via-emerald-950 dark:to-amber-950',
  subtle: 'bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950',
}

export function GradientBackground({ 
  variant = 'subtle', 
  className, 
  children 
}: GradientBackgroundProps) {
  return (
    <div className={cn(
      'relative',
      gradientVariants[variant],
      className
    )}>
      {children}
    </div>
  )
}

interface ColoredBorderProps {
  children: React.ReactNode
  accent: ColorAccent
  className?: string
  intensity?: 'light' | 'medium' | 'strong'
}

export function ColoredBorder({ 
  children, 
  accent, 
  className, 
  intensity = 'light' 
}: ColoredBorderProps) {
  const colors = colorAccents[accent]
  const intensityClasses = {
    light: 'border-2',
    medium: 'border-4',
    strong: 'border-8',
  }
  
  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-200',
        colors.border,
        colors.hover,
        intensityClasses[intensity],
        className
      )}
    >
      {children}
    </div>
  )
}

interface ColorfulOverlayProps {
  colors?: ColorAccent[]
  opacity?: number
  className?: string
}

export function ColorfulOverlay({ 
  colors = ['emerald', 'violet', 'amber', 'rose'],
  opacity = 0.03,
  className 
}: ColorfulOverlayProps) {
  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      {colors.map((color, index) => (
        <div 
          key={color}
          className={cn(
            `absolute rounded-full blur-3xl`,
            `bg-${color}-100 dark:bg-${color}-900/30`,
            index === 0 && 'top-0 left-0 w-96 h-96',
            index === 1 && 'top-1/3 right-0 w-80 h-80',
            index === 2 && 'bottom-0 left-1/3 w-72 h-72',
            index === 3 && 'bottom-1/4 right-1/4 w-64 h-64'
          )}
          style={{ opacity }}
        />
      ))}
    </div>
  )
}

interface ColorAccentProps {
  color: ColorAccent
  intensity?: 'light' | 'medium' | 'strong'
  children: React.ReactNode
  className?: string
}

export function ColorAccent({ 
  color, 
  intensity = 'light', 
  children, 
  className 
}: ColorAccentProps) {
  const colors = colorAccents[color]
  const intensityMap = {
    light: '50',
    medium: '100',
    strong: '200'
  }
  
  return (
    <div className={cn(
      'border rounded-lg transition-all duration-200',
      colors.bg.replace('50', intensityMap[intensity]),
      colors.border,
      colors.hover,
      className
    )}>
      {children}
    </div>
  )
}

/**
 * Fonction utilitaire pour obtenir les classes de couleur
 */
export function getColorClasses(accent: ColorAccent) {
  return colorAccents[accent]
}

/**
 * Fonction utilitaire pour obtenir des classes de texte cohérentes avec le fond
 */
export function getTextColorForBackground(accent: ColorAccent, intensity: 'light' | 'medium' | 'strong' = 'medium') {
  const colors = colorAccents[accent]
  
  switch (intensity) {
    case 'light':
      return colors.text // Pour les fonds clairs, utilise le texte standard
    case 'medium':
      return colors.textStrong // Pour les fonds moyens, utilise le texte fort
    case 'strong':
      return 'text-white dark:text-slate-900' // Pour les fonds foncés, texte blanc/noir inversé
    default:
      return colors.textStrong
  }
}

/**
 * Fonction pour obtenir un background et son texte cohérent
 */
export function getCoherentColorPair(accent: ColorAccent, backgroundIntensity: 'light' | 'medium' | 'strong' = 'light') {
  const colors = colorAccents[accent]
  
  const backgrounds = {
    light: colors.bg,
    medium: colors.bg.replace('50', '100').replace('950', '900'),
    strong: colors.bg.replace('50', '500').replace('950', '500')
  }
  
  return {
    background: backgrounds[backgroundIntensity],
    text: getTextColorForBackground(accent, backgroundIntensity),
    border: colors.border
  }
}

/**
 * Gradients prédéfinis pour les backgrounds
 */
export const gradientBackgrounds = {
  ocean: 'bg-gradient-to-br from-sky-200 via-teal-100 to-indigo-200 dark:from-sky-900 dark:via-teal-950 dark:to-indigo-900',
  sunset: 'bg-gradient-to-br from-peach-200 via-coral-100 to-rose-200 dark:from-peach-900 dark:via-coral-950 dark:to-rose-900',
  forest: 'bg-gradient-to-br from-emerald-200 via-sage-100 to-mint-200 dark:from-emerald-900 dark:via-sage-950 dark:to-mint-900',
  cosmic: 'bg-gradient-to-br from-violet-200 via-lavender-100 to-indigo-200 dark:from-violet-900 dark:via-lavender-950 dark:to-indigo-900',
  warm: 'bg-gradient-to-br from-amber-200 via-peach-100 to-coral-200 dark:from-amber-900 dark:via-peach-950 dark:to-coral-900',
  cool: 'bg-gradient-to-br from-mint-200 via-sky-100 to-teal-200 dark:from-mint-900 dark:via-sky-950 dark:to-teal-900',
  vibrant: 'bg-gradient-to-br from-rose-100 via-violet-100 via-emerald-100 to-amber-100 dark:from-rose-950 dark:via-violet-950 dark:via-emerald-950 dark:to-amber-950',
  rainbow: 'bg-gradient-to-br from-emerald-100 via-sky-100 via-violet-100 via-peach-100 to-coral-100 dark:from-emerald-950 dark:via-sky-950 dark:via-violet-950 dark:via-peach-950 dark:to-coral-950',
} as const

export type GradientBackground = keyof typeof gradientBackgrounds
