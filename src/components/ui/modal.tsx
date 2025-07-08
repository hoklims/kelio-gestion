'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ModalContextType {
  isOpen: boolean
  openModal: (content: ReactNode, options?: ModalOptions) => void
  closeModal: () => void
}

interface ModalOptions {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
  overlay?: boolean
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<ReactNode>(null)
  const [options, setOptions] = useState<ModalOptions>({})

  const openModal = useCallback((content: ReactNode, modalOptions: ModalOptions = {}) => {
    setContent(content)
    setOptions({ size: 'md', closable: true, overlay: true, ...modalOptions })
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => {
      setContent(null)
      setOptions({})
    }, 200) // Wait for animation to complete
  }, [])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && options.closable !== false) {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, options.closable, closeModal])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && (
        <ModalContainer onClose={closeModal} options={options}>
          {content}
        </ModalContainer>
      )}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

interface ModalContainerProps {
  children: ReactNode
  onClose: () => void
  options: ModalOptions
}

function ModalContainer({ children, onClose, options }: ModalContainerProps) {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      {options.overlay !== false && (
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={options.closable !== false ? onClose : undefined}
        />
      )}
      
      {/* Modal */}
      <div className={cn(
        "relative bg-white rounded-lg shadow-xl w-full animate-in zoom-in-95 duration-200",
        sizeClasses[options.size || 'md']
      )}>
        {/* Close button */}
        {options.closable !== false && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 z-10"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

// Simple Modal component for direct use
interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
}

export function Modal({ 
  open, 
  onClose, 
  title, 
  description, 
  children, 
  size = 'md', 
  closable = true 
}: ModalProps) {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open && closable) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, closable, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={closable ? onClose : undefined}
      />
      
      {/* Modal */}
      <div className={cn(
        "relative bg-white rounded-lg shadow-xl w-full animate-in zoom-in-95 duration-200",
        sizeClasses[size]
      )}>
        {/* Close button */}
        {closable && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 z-10"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        
        {/* Content */}
        <div className="p-6">
          {/* Header */}
          {(title || description) && (
            <div className="mb-6">
              {title && (
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              )}
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
          )}
          
          {/* Body */}
          {children}
        </div>
      </div>
    </div>
  )
}
