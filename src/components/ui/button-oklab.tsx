/**
 * Updated Button component using the new Oklab color system
 * Demonstrates integration with the centralized theme
 */
import React from 'react';
import { useThemeColor } from '@/hooks/use-theme-color';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const { getButtonColors } = useThemeColor();
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const baseClasses = [
    'font-medium',
    'rounded-md',
    'border',
    'transition-colors',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    sizeClasses[size],
  ].join(' ');
  
  // Handle ghost variant separately since it's not in the color system
  if (variant === 'ghost') {
    return (
      <button
        className={cn(
          baseClasses,
          'text-neutral-600 bg-transparent border-transparent',
          'hover:bg-neutral-100 hover:text-neutral-900',
          'focus:ring-neutral-500',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
  
  const buttonColors = getButtonColors(variant as 'primary' | 'secondary' | 'danger');
  
  return (
    <button
      className={cn(baseClasses, className)}
      style={{
        backgroundColor: buttonColors.bg,
        color: buttonColors.text,
        borderColor: buttonColors.bg,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = buttonColors.hover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = buttonColors.bg;
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.backgroundColor = buttonColors.active;
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.backgroundColor = buttonColors.hover;
      }}
      {...props}
    >
      {children}
    </button>
  );
}
