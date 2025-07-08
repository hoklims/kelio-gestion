import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
}

const badgeVariants = {
  default: 'bg-neutral-100 text-neutral-800 border-neutral-200 shadow-sm',
  primary: 'bg-blue-50 text-blue-700 border-blue-200 shadow-blue-100/50',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-emerald-100/50',
  warning: 'bg-amber-50 text-amber-700 border-amber-200 shadow-amber-100/50',
  error: 'bg-red-50 text-red-700 border-red-200 shadow-red-100/50',
  info: 'bg-sky-50 text-sky-700 border-sky-200 shadow-sky-100/50',
  neutral: 'bg-gray-50 text-gray-700 border-gray-200 shadow-gray-100/50'
}

const badgeSizes = {
  sm: 'px-2 py-1 text-xs font-medium',
  md: 'px-2.5 py-1.5 text-sm font-medium',
  lg: 'px-3 py-2 text-sm font-semibold'
}

export function Badge({ 
  className, 
  variant = 'default', 
  size = 'md',
  icon,
  children,
  ...props 
}: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border transition-all duration-200',
        'backdrop-blur-sm hover:shadow-md',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </div>
  )
}

export default Badge
