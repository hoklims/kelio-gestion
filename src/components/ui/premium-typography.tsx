'use client'

import React from 'react'
import { cn } from '@/lib/utils'

// Composant titre premium avec gradients
interface PremiumHeadingProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  variant?: 'default' | 'gradient' | 'brand' | 'accent'
  align?: 'left' | 'center' | 'right'
  className?: string
}

export function PremiumHeading({ 
  children, 
  level = 1, 
  variant = 'default', 
  align = 'left',
  className 
}: PremiumHeadingProps) {
  const baseStyles = "font-semibold tracking-tight transition-all duration-200"
  
  const levelStyles = {
    1: "text-4xl lg:text-5xl",
    2: "text-3xl lg:text-4xl",
    3: "text-2xl lg:text-3xl",
    4: "text-xl lg:text-2xl",
    5: "text-lg lg:text-xl",
    6: "text-base lg:text-lg"
  }

  const variantStyles = {
    default: "text-neutral-900",
    gradient: "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent",
    brand: "bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent",
    accent: "bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent"
  }

  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  }

  const classes = cn(
    baseStyles,
    levelStyles[level],
    variantStyles[variant],
    alignStyles[align],
    className
  )

  if (level === 1) return <h1 className={classes}>{children}</h1>
  if (level === 2) return <h2 className={classes}>{children}</h2>
  if (level === 3) return <h3 className={classes}>{children}</h3>
  if (level === 4) return <h4 className={classes}>{children}</h4>
  if (level === 5) return <h5 className={classes}>{children}</h5>
  return <h6 className={classes}>{children}</h6>
}

// Composant texte premium avec variations
interface PremiumTextProps {
  children: React.ReactNode
  variant?: 'body' | 'lead' | 'large' | 'small' | 'muted' | 'subtle'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right'
  className?: string
}

export function PremiumText({ 
  children, 
  variant = 'body', 
  weight = 'normal',
  align = 'left',
  className 
}: PremiumTextProps) {
  const baseStyles = "transition-all duration-200"
  
  const variantStyles = {
    body: "text-base text-neutral-700 leading-relaxed",
    lead: "text-lg text-neutral-600 leading-relaxed",
    large: "text-xl text-neutral-700 leading-relaxed",
    small: "text-sm text-neutral-600 leading-normal",
    muted: "text-sm text-neutral-500 leading-normal",
    subtle: "text-xs text-neutral-400 leading-normal uppercase tracking-wider"
  }

  const weightStyles = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold"
  }

  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  }

  return (
    <p className={cn(
      baseStyles,
      variantStyles[variant],
      weightStyles[weight],
      alignStyles[align],
      className
    )}>
      {children}
    </p>
  )
}

// Composant label premium
interface PremiumLabelProps {
  children: React.ReactNode
  variant?: 'default' | 'brand' | 'accent' | 'muted'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PremiumLabel({ 
  children, 
  variant = 'default',
  size = 'md',
  className 
}: PremiumLabelProps) {
  const baseStyles = "font-medium tracking-wide uppercase transition-all duration-200"
  
  const sizeStyles = {
    sm: "text-xs",
    md: "text-sm", 
    lg: "text-base"
  }

  const variantStyles = {
    default: "text-neutral-600",
    brand: "text-blue-600",
    accent: "text-purple-600",
    muted: "text-neutral-500"
  }

  return (
    <span className={cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className
    )}>
      {children}
    </span>
  )
}

// Composant display premium pour les chiffres/métriques
interface PremiumDisplayProps {
  children: React.ReactNode
  variant?: 'default' | 'gradient' | 'large' | 'currency'
  color?: 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'error'
  className?: string
}

export function PremiumDisplay({ 
  children, 
  variant = 'default',
  color = 'neutral',
  className 
}: PremiumDisplayProps) {
  const baseStyles = "font-bold tracking-tight transition-all duration-200"
  
  const variantStyles = {
    default: "text-2xl lg:text-3xl",
    gradient: "text-3xl lg:text-4xl bg-gradient-to-r bg-clip-text text-transparent",
    large: "text-4xl lg:text-5xl",
    currency: "text-2xl lg:text-3xl tabular-nums"
  }

  const colorStyles = {
    neutral: variant === 'gradient' 
      ? "from-neutral-700 to-neutral-900" 
      : "text-neutral-900",
    primary: variant === 'gradient' 
      ? "from-blue-600 to-indigo-700" 
      : "text-blue-600",
    accent: variant === 'gradient' 
      ? "from-purple-600 to-violet-700" 
      : "text-purple-600",
    success: variant === 'gradient' 
      ? "from-emerald-600 to-green-700" 
      : "text-emerald-600",
    warning: variant === 'gradient' 
      ? "from-amber-600 to-orange-700" 
      : "text-amber-600",
    error: variant === 'gradient' 
      ? "from-red-600 to-pink-700" 
      : "text-red-600"
  }

  return (
    <span className={cn(
      baseStyles,
      variantStyles[variant],
      colorStyles[color],
      className
    )}>
      {children}
    </span>
  )
}
