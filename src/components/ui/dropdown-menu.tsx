'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface DropdownMenuProps {
  children: React.ReactNode
  trigger: React.ReactNode
  align?: 'left' | 'right'
}

interface DropdownMenuItemProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  icon?: React.ElementType
}

export function DropdownMenu({ children, trigger, align = 'right' }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      
      {isOpen && (
        <div className={cn(
          "absolute top-full mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50",
          align === 'right' ? 'right-0' : 'left-0'
        )}>
          {children}
        </div>
      )}
    </div>
  )
}

export function DropdownMenuItem({ 
  children, 
  onClick, 
  className,
  icon: Icon 
}: DropdownMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2",
        className
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{children}</span>
    </button>
  )
}
