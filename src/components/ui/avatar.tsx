import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeConfig = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
  xl: 'h-12 w-12 text-lg'
}

export function Avatar({ 
  src, 
  alt = '', 
  fallback = '', 
  size = 'md', 
  className 
}: AvatarProps) {
  const initials = fallback
    ? fallback.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : alt.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className={cn(
      'relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 shadow-card transition-all duration-200 hover:shadow-card-hover',
      sizeConfig[size],
      className
    )}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size === 'sm' ? 24 : size === 'md' ? 32 : size === 'lg' ? 40 : 48}
          height={size === 'sm' ? 24 : size === 'md' ? 32 : size === 'lg' ? 40 : 48}
          className={cn(
            'rounded-full object-cover',
            sizeConfig[size]
          )}
        />
      ) : initials ? (
        <span className="font-medium text-primary">
          {initials}
        </span>
      ) : (
        <User className={cn(
          'text-primary',
          size === 'sm' ? 'h-3 w-3' : 
          size === 'md' ? 'h-4 w-4' : 
          size === 'lg' ? 'h-5 w-5' : 'h-6 w-6'
        )} />
      )}
    </div>
  )
}

export function AvatarGroup({ 
  avatars, 
  max = 3, 
  size = 'md' 
}: {
  avatars: Array<{ src?: string; alt?: string; fallback?: string }>
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  const visibleAvatars = avatars.slice(0, max)
  const remainingCount = avatars.length - max

  return (
    <div className="flex -space-x-2">
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          {...avatar}
          size={size}
          className="ring-2 ring-background"
        />
      ))}
      {remainingCount > 0 && (
        <div className={cn(
          'relative inline-flex items-center justify-center rounded-full bg-muted border border-border shadow-card ring-2 ring-background',
          sizeConfig[size]
        )}>
          <span className="text-xs font-medium text-muted-foreground">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  )
}
