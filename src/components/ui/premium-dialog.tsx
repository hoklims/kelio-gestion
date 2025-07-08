'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

const PremiumDialog = DialogPrimitive.Root

const PremiumDialogTrigger = DialogPrimitive.Trigger

const PremiumDialogPortal = DialogPrimitive.Portal

const PremiumDialogClose = DialogPrimitive.Close

const PremiumDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/70 backdrop-blur-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
PremiumDialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const PremiumDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    variant?: 'client' | 'mission' | 'objective' | 'default'
  }
>(({ className, children, variant = 'default', ...props }, ref) => {
  const variantStyles = {
    client: 'from-blue-500/20 to-blue-600/20 border-blue-500/40 ring-blue-500/30',
    mission: 'from-purple-500/20 to-violet-600/20 border-purple-500/40 ring-purple-500/30',
    objective: 'from-green-500/20 to-emerald-600/20 border-green-500/40 ring-green-500/30',
    default: 'from-blue-500/20 to-purple-500/20 border-blue-500/40 ring-blue-500/30'
  }

  const glowStyles = {
    client: 'from-blue-500/20 to-indigo-600/20',
    mission: 'from-purple-500/20 to-violet-600/20',
    objective: 'from-green-500/20 to-emerald-600/20',
    default: 'from-blue-500/20 to-purple-500/20'
  }

  return (
    <PremiumDialogPortal>
      <PremiumDialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-6 border-2 bg-gradient-to-br from-background/98 to-background/95 backdrop-blur-xl p-8 shadow-2xl duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl ring-2 overflow-hidden',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {/* Glow effect */}
        <div className={cn(
          'absolute -inset-2 bg-gradient-to-br rounded-2xl blur-xl opacity-40 -z-10',
          glowStyles[variant]
        )} />
        
        {/* Inner glow */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-br rounded-2xl opacity-20 -z-10',
          glowStyles[variant]
        )} />
        
        {children}
        
        <DialogPrimitive.Close className="absolute right-6 top-6 rounded-xl p-2 opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-white/10 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none group">
          <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </PremiumDialogPortal>
  )
})
PremiumDialogContent.displayName = DialogPrimitive.Content.displayName

const PremiumDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className
    )}
    {...props}
  />
)
PremiumDialogHeader.displayName = 'PremiumDialogHeader'

const PremiumDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 pt-4 border-t border-white/10',
      className
    )}
    {...props}
  />
)
PremiumDialogFooter.displayName = 'PremiumDialogFooter'

const PremiumDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-2xl font-bold leading-none tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent',
      className
    )}
    {...props}
  />
))
PremiumDialogTitle.displayName = DialogPrimitive.Title.displayName

const PremiumDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground/90', className)}
    {...props}
  />
))
PremiumDialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  PremiumDialog,
  PremiumDialogPortal,
  PremiumDialogOverlay,
  PremiumDialogClose,
  PremiumDialogTrigger,
  PremiumDialogContent,
  PremiumDialogHeader,
  PremiumDialogFooter,
  PremiumDialogTitle,
  PremiumDialogDescription,
}
