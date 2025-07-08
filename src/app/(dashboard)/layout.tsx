'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  TrendingUp,
  Search,
  Bell,
  Menu,
  X,
  Settings,
  LogOut,
  ChevronRight,
  Zap,
  Target,
  Database
} from 'lucide-react'

// Types
interface User {
  id: string
  email: string
  full_name?: string
}

// Navigation moderne et contextuelle
const navigation = [
  { 
    name: 'Vue d\'ensemble', 
    href: '/dashboard', 
    icon: LayoutDashboard,
    description: 'KPIs et activité récente',
    color: 'from-blue-500 to-indigo-600'
  },
  { 
    name: 'Clients', 
    href: '/clients', 
    icon: Users,
    description: 'Gestion des relations clients',
    color: 'from-green-500 to-emerald-600'
  },
  { 
    name: 'Missions', 
    href: '/missions', 
    icon: Briefcase,
    description: 'Projets et deadlines',
    color: 'from-purple-500 to-violet-600'
  },
  { 
    name: 'Finances', 
    href: '/finances', 
    icon: TrendingUp,
    description: 'CA, paiements, objectifs',
    color: 'from-orange-500 to-red-600'
  },
  { 
    name: 'Objectifs', 
    href: '/objectifs', 
    icon: Target,
    description: 'Objectifs mensuels et KPIs',
    color: 'from-cyan-500 to-blue-600'
  },
  { 
    name: 'Administration', 
    href: '/admin', 
    icon: Settings,
    description: 'Paramètres et gestion système',
    color: 'from-gray-500 to-neutral-600'
  },
  { 
    name: 'Demo', 
    href: '/demo', 
    icon: Database,
    description: 'Gestion des données de démonstration',
    color: 'from-indigo-500 to-purple-600'
  },
]

// Actions rapides
const quickActions = [
  { name: 'Nouveau client', icon: Users, href: '/clients?action=new' },
  { name: 'Nouvelle mission', icon: Briefcase, href: '/missions?action=new' },
  { name: 'Objectifs', icon: Target, href: '/objectifs' },
]

// Breadcrumb names mapping
const breadcrumbNames: Record<string, string> = {
  '/dashboard': 'Vue d\'ensemble',
  '/clients': 'Clients',
  '/missions': 'Missions',
  '/finances': 'Finances',
  '/objectifs': 'Objectifs',
  '/admin': 'Administration',
  '/demo': 'Demo'
}

interface LayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()

  // Auto-login admin au chargement
  useEffect(() => {
    const autoLoginAdmin = async () => {
      try {
        const response = await fetch('/api/auth/admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.user) {
            setUser({
              id: data.user.id,
              email: data.user.email,
              full_name: data.user.user_metadata?.full_name || 'Admin Kelio'
            })
          }
        }
      } catch (error) {
        console.error('Erreur auto-login admin:', error)
      }
    }

    autoLoginAdmin()
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.location.href = '/login'
  }

  // Generate breadcrumbs
  const generateBreadcrumbs = () => {
    const breadcrumbs: Array<{ name: string; href: string; current: boolean }> = []
    
    if (pathname === '/dashboard') {
      breadcrumbs.push({ name: 'Vue d\'ensemble', href: '/dashboard', current: true })
      return breadcrumbs
    }

    const segments = pathname.split('/').filter(Boolean)
    let currentPath = ''
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === segments.length - 1
      const name = breadcrumbNames[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1)
      
      breadcrumbs.push({
        name,
        href: currentPath,
        current: isLast
      })
    })

    // Add "Vue d'ensemble" as first breadcrumb if not on dashboard
    if (pathname !== '/dashboard' && breadcrumbs.length > 0) {
      breadcrumbs.unshift({
        name: 'Vue d\'ensemble',
        href: '/dashboard',
        current: false
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()
  const currentNavItem = navigation.find(item => item.href === pathname)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-card/95 backdrop-blur-xl shadow-2xl border-r border-border transform transition-transform duration-300 ease-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo & Branding */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Kelio Gestion
                </h1>
                <p className="text-sm text-muted-foreground">Management Pro</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex flex-col px-4 py-4 rounded-2xl transition-all duration-200 relative overflow-hidden",
                    isActive
                      ? "bg-slate-100 dark:bg-slate-800 shadow-lg scale-[1.02] border-l-4 border-indigo-500"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:scale-[1.01] hover:shadow-md"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  {/* Background gradient for active item */}
                  {isActive && (
                    <div className={cn(
                      "absolute inset-0 opacity-5 bg-gradient-to-r",
                      item.color
                    )} />
                  )}
                  
                  <div className="flex items-center relative z-10">
                    <div className={cn(
                      "p-2 rounded-xl mr-4 transition-all duration-200",
                      isActive 
                        ? `bg-gradient-to-r ${item.color} shadow-lg` 
                        : "bg-slate-100 dark:bg-slate-700 group-hover:bg-slate-200 dark:group-hover:bg-slate-600"
                    )}>
                      <item.icon
                        className={cn(
                          "h-5 w-5 transition-colors duration-200",
                          isActive ? "text-white" : "text-slate-600 dark:text-slate-300"
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <p className={cn(
                        "font-semibold text-sm transition-colors duration-200",
                        isActive 
                          ? "text-slate-900 dark:text-white" 
                          : "text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white"
                      )}>
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    {isActive && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Actions rapides */}
          <div className="px-4 py-4 border-t border-slate-200/60 dark:border-slate-700/60">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3 px-2">
              Actions rapides
            </p>
            <div className="grid grid-cols-3 gap-2">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105 transition-all duration-200 group"
                >
                  <action.icon className="h-4 w-4 text-slate-600 dark:text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  <span className="text-xs text-slate-600 dark:text-slate-300 mt-1 text-center font-medium">
                    {action.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* User profile */}
          <div className="p-4 border-t border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-200">
              <div className="relative">
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white">
                    {user?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 border-2 border-white dark:border-slate-800 rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {user?.full_name || 'Admin Kelio'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user?.email || 'admin@kelio.com'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex-shrink-0 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl"
                title="Déconnexion"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Top header */}
        <header className="bg-card/80 backdrop-blur-xl shadow-sm border-b border-border sticky top-0 z-30">
          <div className="px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Left side */}
              <div className="flex items-center">
                {/* Mobile menu button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="mr-4 lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  <Menu className="h-5 w-5" />
                </Button>

                {/* Page info */}
                <div className="hidden lg:block">
                  {currentNavItem && (
                    <div className="flex items-center space-x-4">
                      <div className={cn(
                        "p-2 rounded-xl bg-gradient-to-r shadow-lg",
                        currentNavItem.color
                      )}>
                        <currentNavItem.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-foreground">
                          {currentNavItem.name}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                          {currentNavItem.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Breadcrumbs - mobile */}
                <div className="lg:hidden">
                  <nav className="flex" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                      {breadcrumbs.slice(-2).map((crumb, index) => (
                        <li key={`${crumb.href}-${index}`}>
                          <div className="flex items-center">
                            {index > 0 && (
                              <ChevronRight className="flex-shrink-0 h-3 w-3 text-slate-400 mx-1" />
                            )}
                            <span className={cn(
                              "text-sm font-medium",
                              crumb.current 
                                ? "text-slate-600 dark:text-slate-300" 
                                : "text-slate-900 dark:text-white"
                            )}>
                              {crumb.name}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-3">
                {/* Search */}
                <div className="hidden md:flex items-center">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="pl-10 pr-4 py-2.5 w-64 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Notifications */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  <Bell className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                  <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-white dark:ring-slate-900 animate-pulse" />
                </Button>

                {/* Settings */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  <Settings className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-screen">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
