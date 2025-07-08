/**
 * Status Badge component using Oklab color system
 * Provides consistent status indicators across the application
 */
import React from 'react'
import { cn } from '@/lib/utils'
import { useThemeColor } from '@/hooks/use-theme-color'
import { CheckCircle, Clock, Play, DollarSign, Calendar, AlertTriangle } from 'lucide-react'

export type StatusType = 'pending' | 'in_progress' | 'completed' | 'paid' | 'overdue' | 'draft'

interface StatusBadgeProps {
  status: StatusType
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
}

const statusConfig: Record<StatusType, {
  label: string
  icon: React.ComponentType<{ className?: string }>
  semanticStatus: 'success' | 'warning' | 'error' | 'info' | 'neutral'
}> = {
  pending: {
    label: 'En attente',
    icon: Clock,
    semanticStatus: 'warning'
  },
  in_progress: {
    label: 'En cours',
    icon: Play,
    semanticStatus: 'info'
  },
  completed: {
    label: 'Terminé',
    icon: CheckCircle,
    semanticStatus: 'success'
  },
  paid: {
    label: 'Payé',
    icon: DollarSign,
    semanticStatus: 'success'
  },
  overdue: {
    label: 'En retard',
    icon: AlertTriangle,
    semanticStatus: 'error'
  },
  draft: {
    label: 'Brouillon',
    icon: Calendar,
    semanticStatus: 'neutral'
  }
}

const sizeConfig = {
  sm: 'px-2 py-1 text-xs gap-1',
  md: 'px-3 py-1.5 text-sm gap-1.5',
  lg: 'px-4 py-2 text-base gap-2'
}

export function StatusBadge({ 
  status, 
  className, 
  size = 'md', 
  showIcon = true 
}: StatusBadgeProps) {
  const { getStatusColor } = useThemeColor();
  const config = statusConfig[status];
  const Icon = config.icon;
  
  const statusColor = getStatusColor(config.semanticStatus) || '#6b7280';
  
  // Create lighter background and border colors
  const bgStyle = {
    backgroundColor: `${statusColor}15`, // 15% opacity
    color: statusColor,
    borderColor: `${statusColor}30`, // 30% opacity
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg font-medium border transition-all duration-200 animate-scale-in',
        sizeConfig[size],
        className
      )}
      style={bgStyle}
    >
      {showIcon && <Icon className={cn(
        'flex-shrink-0',
        size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'
      )} />}
      {config.label}
    </span>
  )
}

export { statusConfig }
