/**
 * Status Badge component using Oklab color system
 * Provides consistent status indicators across the application
 */
import React from 'react';
import { useThemeColor } from '@/hooks/use-theme-color';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  children: React.ReactNode;
  size?: 'sm' | 'md';
  className?: string;
}

export function StatusBadge({ 
  status, 
  children, 
  size = 'md', 
  className 
}: StatusBadgeProps) {
  const { getStatusColor } = useThemeColor();
  
  const statusColor = getStatusColor(status);
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };
  
  const baseClasses = [
    'inline-flex',
    'items-center',
    'font-medium',
    'rounded-full',
    'border',
    sizeClasses[size],
  ].join(' ');
  
  return (
    <span
      className={cn(baseClasses, className)}
      style={{
        backgroundColor: `${statusColor}20`, // 20% opacity background
        color: statusColor,
        borderColor: `${statusColor}40`, // 40% opacity border
      }}
    >
      {children}
    </span>
  );
}
