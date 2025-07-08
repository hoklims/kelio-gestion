import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'shimmer'
}

export function Skeleton({ className, variant = 'default', ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg",
        variant === 'shimmer' 
          ? "bg-gradient-to-r from-muted via-muted/60 to-muted bg-[length:200%_100%]"
          : "bg-muted",
        className
      )}
      style={variant === 'shimmer' ? {
        animation: 'shimmer 2s infinite',
      } : undefined}
      {...props}
    />
  )
}

// Composants de skeleton spécialisés
export function CardSkeleton() {
  return (
    <div className="space-y-3 p-6 border border-border rounded-xl shadow-card">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-8 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex space-x-4">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          <Skeleton className="h-12 w-1/4" />
          <Skeleton className="h-12 w-1/4" />
          <Skeleton className="h-12 w-1/4" />
          <Skeleton className="h-12 w-1/4" />
        </div>
      ))}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      
      {/* Actions and Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  )
}
