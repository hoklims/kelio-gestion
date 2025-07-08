'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface PremiumCardProps {
  children: React.ReactNode
  variant?: 'default' | 'glass' | 'gradient' | 'elevated' | 'colored'
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral'
  className?: string
  hover?: boolean
  glow?: boolean
}

export function PremiumCard({ 
  children, 
  variant = 'default', 
  color = 'neutral',
  className,
  hover = false,
  glow = false
}: PremiumCardProps) {
  const baseStyles = "rounded-xl border transition-all duration-300"
  
  const variantStyles = {
    default: "bg-white border-neutral-200 shadow-sm",
    glass: "bg-white/80 backdrop-blur-md border-white/20 shadow-lg",
    gradient: "border-transparent shadow-lg",
    elevated: "bg-white border-neutral-100 shadow-md",
    colored: "border-transparent shadow-lg"
  }

  const gradientStyles = {
    primary: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
    accent: "bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50",
    success: "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50",
    warning: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50",
    error: "bg-gradient-to-br from-red-50 via-pink-50 to-rose-50",
    neutral: "bg-gradient-to-br from-neutral-50 via-gray-50 to-slate-50"
  }

  const coloredStyles = {
    primary: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
    accent: "bg-gradient-to-br from-purple-500 to-violet-600 text-white",
    success: "bg-gradient-to-br from-emerald-500 to-green-600 text-white",
    warning: "bg-gradient-to-br from-amber-500 to-orange-600 text-white",
    error: "bg-gradient-to-br from-red-500 to-pink-600 text-white",
    neutral: "bg-gradient-to-br from-neutral-500 to-gray-600 text-white"
  }

  const hoverStyles = hover ? {
    default: "hover:shadow-md hover:border-neutral-300 hover:-translate-y-0.5",
    glass: "hover:bg-white/90 hover:shadow-xl hover:-translate-y-0.5",
    gradient: "hover:shadow-xl hover:-translate-y-0.5",
    elevated: "hover:shadow-lg hover:-translate-y-0.5",
    colored: "hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02]"
  } : {}

  const glowStyles = glow ? {
    primary: "shadow-blue-500/25",
    accent: "shadow-purple-500/25",
    success: "shadow-emerald-500/25",
    warning: "shadow-amber-500/25",
    error: "shadow-red-500/25",
    neutral: "shadow-neutral-500/25"
  } : {}

  const getVariantClass = () => {
    if (variant === 'gradient') {
      return gradientStyles[color]
    }
    if (variant === 'colored') {
      return coloredStyles[color]
    }
    return variantStyles[variant]
  }

  return (
    <div 
      className={cn(
        baseStyles,
        getVariantClass(),
        hover && hoverStyles[variant],
        glow && glowStyles[color],
        className
      )}
    >
      {children}
    </div>
  )
}

// Composant header premium pour les cartes
interface PremiumCardHeaderProps {
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
  badge?: React.ReactNode
}

export function PremiumCardHeader({ children, className, icon, badge }: PremiumCardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between p-6 pb-4", className)}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="p-2 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200">
            {icon}
          </div>
        )}
        <div>{children}</div>
      </div>
      {badge}
    </div>
  )
}

// Composant content premium pour les cartes
interface PremiumCardContentProps {
  children: React.ReactNode
  className?: string
}

export function PremiumCardContent({ children, className }: PremiumCardContentProps) {
  return (
    <div className={cn("px-6 pb-6", className)}>
      {children}
    </div>
  )
}

// Badge premium avec gradients
interface PremiumBadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'gradient' | 'outline' | 'soft'
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PremiumBadge({ 
  children, 
  variant = 'default', 
  color = 'neutral',
  size = 'md',
  className 
}: PremiumBadgeProps) {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-all duration-200"
  
  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-2.5 py-1.5 text-sm",
    lg: "px-3 py-2 text-base"
  }

  const variantStyles = {
    default: {
      primary: "bg-blue-100 text-blue-800 border border-blue-200",
      accent: "bg-purple-100 text-purple-800 border border-purple-200",
      success: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      warning: "bg-amber-100 text-amber-800 border border-amber-200",
      error: "bg-red-100 text-red-800 border border-red-200",
      neutral: "bg-neutral-100 text-neutral-800 border border-neutral-200"
    },
    gradient: {
      primary: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25",
      accent: "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/25",
      success: "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25",
      warning: "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25",
      error: "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/25",
      neutral: "bg-gradient-to-r from-neutral-500 to-gray-600 text-white shadow-lg shadow-neutral-500/25"
    },
    outline: {
      primary: "border-2 border-blue-500 text-blue-700 bg-blue-50/50",
      accent: "border-2 border-purple-500 text-purple-700 bg-purple-50/50",
      success: "border-2 border-emerald-500 text-emerald-700 bg-emerald-50/50",
      warning: "border-2 border-amber-500 text-amber-700 bg-amber-50/50",
      error: "border-2 border-red-500 text-red-700 bg-red-50/50",
      neutral: "border-2 border-neutral-500 text-neutral-700 bg-neutral-50/50"
    },
    soft: {
      primary: "bg-blue-50 text-blue-700 border border-blue-100",
      accent: "bg-purple-50 text-purple-700 border border-purple-100",
      success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
      warning: "bg-amber-50 text-amber-700 border border-amber-100",
      error: "bg-red-50 text-red-700 border border-red-100",
      neutral: "bg-neutral-50 text-neutral-700 border border-neutral-100"
    }
  }

  return (
    <span className={cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant][color],
      className
    )}>
      {children}
    </span>
  )
}
