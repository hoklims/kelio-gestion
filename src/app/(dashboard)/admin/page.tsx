'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Settings, 
  LogOut, 
  User, 
  Shield, 
  Database, 
  Trash2, 
  RefreshCw,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Server,
  Key,
  FileText,
  Download,
  Upload,
  Monitor
} from 'lucide-react'

interface SystemInfo {
  status: 'healthy' | 'warning' | 'error'
  version: string
  uptime: string
  lastBackup: string
  activeUsers: number
  totalUsers: number
  storage: {
    used: number
    total: number
  }
}

const mockSystemInfo: SystemInfo = {
  status: 'healthy',
  version: '1.2.3',
  uptime: '15 jours, 8 heures',
  lastBackup: '2024-01-15 03:00:00',
  activeUsers: 12,
  totalUsers: 45,
  storage: {
    used: 2.3,
    total: 10.0
  }
}

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [systemInfo] = useState<SystemInfo>(mockSystemInfo)

  const handleLogout = () => {
    window.location.href = '/login'
  }

  const handleClearCache = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    alert('Cache vidé avec succès')
  }

  const handleResetData = async () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.')) {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsLoading(false)
      alert('Données réinitialisées avec succès')
    }
  }

  const handleBackup = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    alert('Sauvegarde créée avec succès')
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'healthy':
        return {
          label: 'Opérationnel',
          icon: CheckCircle,
          className: 'bg-green-500/20 text-green-400 border-green-500/30',
          bgClass: 'from-green-500/10 to-emerald-600/10 border-green-500/20'
        }
      case 'warning':
        return {
          label: 'Attention',
          icon: AlertTriangle,
          className: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          bgClass: 'from-orange-500/10 to-orange-600/10 border-orange-500/20'
        }
      default:
        return {
          label: 'Problème',
          icon: AlertTriangle,
          className: 'bg-red-500/20 text-red-400 border-red-500/30',
          bgClass: 'from-red-500/10 to-red-600/10 border-red-500/20'
        }
    }
  }

  const statusConfig = getStatusConfig(systemInfo.status)
  const StatusIcon = statusConfig.icon
  const storagePercent = (systemInfo.storage.used / systemInfo.storage.total) * 100

  const kpis = [
    {
      title: 'Utilisateurs actifs',
      value: systemInfo.activeUsers.toString(),
      subtitle: `sur ${systemInfo.totalUsers} total`,
      icon: Users,
      gradient: 'from-blue-500/20 to-blue-600/20',
      border: 'border-blue-500/30',
      iconBg: 'bg-blue-500/20 text-blue-400'
    },
    {
      title: 'Stockage utilisé',
      value: `${systemInfo.storage.used} GB`,
      subtitle: `sur ${systemInfo.storage.total} GB`,
      icon: Database,
      gradient: 'from-purple-500/20 to-purple-600/20',
      border: 'border-purple-500/30',
      iconBg: 'bg-purple-500/20 text-purple-400'
    },
    {
      title: 'Temps de fonctionnement',
      value: systemInfo.uptime,
      subtitle: `Version ${systemInfo.version}`,
      icon: Clock,
      gradient: 'from-green-500/20 to-emerald-600/20',
      border: 'border-green-500/30',
      iconBg: 'bg-green-500/20 text-green-400'
    },
    {
      title: 'Dernière sauvegarde',
      value: 'Il y a 2 jours',
      subtitle: systemInfo.lastBackup,
      icon: Shield,
      gradient: 'from-orange-500/20 to-orange-600/20',
      border: 'border-orange-500/30',
      iconBg: 'bg-orange-500/20 text-orange-400'
    }
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Administration
          </h1>
          <p className="text-muted-foreground mt-2">
            Gestion des paramètres système et de l&apos;application
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className={statusConfig.className}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusConfig.label}
          </Badge>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* System Status KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card 
              key={kpi.title}
              className={`
                card relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl 
                bg-gradient-to-br ${kpi.gradient} ${kpi.border}
                animate-fade-in-up
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardDescription>
                  <div className={`p-3 rounded-xl bg-background/50 backdrop-blur-sm ${kpi.iconBg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {kpi.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {kpi.subtitle}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* System Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Actions */}
        <Card className="card bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-400" />
              Actions système
            </CardTitle>
            <CardDescription>
              Maintenance et gestion du système
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={handleClearCache}
                disabled={isLoading}
                variant="outline"
                className="justify-start gap-2 h-auto p-4 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <div className="text-left">
                  <div className="font-medium">Vider le cache</div>
                  <div className="text-xs text-muted-foreground">Optimiser les performances</div>
                </div>
              </Button>

              <Button
                onClick={handleBackup}
                disabled={isLoading}
                variant="outline"
                className="justify-start gap-2 h-auto p-4 hover:bg-green-500/10 hover:border-green-500/30 transition-all duration-300"
              >
                <Download className={`h-4 w-4 ${isLoading ? 'animate-pulse' : ''}`} />
                <div className="text-left">
                  <div className="font-medium">Créer sauvegarde</div>
                  <div className="text-xs text-muted-foreground">Sauvegarder les données</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start gap-2 h-auto p-4 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <Upload className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">Restaurer</div>
                  <div className="text-xs text-muted-foreground">Importer sauvegarde</div>
                </div>
              </Button>

              <Button
                onClick={handleResetData}
                disabled={isLoading}
                variant="outline"
                className="justify-start gap-2 h-auto p-4 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300"
              >
                <Trash2 className={`h-4 w-4 ${isLoading ? 'animate-pulse' : ''}`} />
                <div className="text-left">
                  <div className="font-medium">Réinitialiser</div>
                  <div className="text-xs text-muted-foreground">Effacer toutes données</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card className="card bg-gradient-to-br from-purple-500/10 to-violet-600/10 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Monitor className="h-5 w-5 text-purple-400" />
              Informations système
            </CardTitle>
            <CardDescription>
              État actuel du système et ressources
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Version</span>
                </div>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  v{systemInfo.version}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Statut</span>
                </div>
                <Badge className={statusConfig.className}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusConfig.label}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Stockage</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{storagePercent.toFixed(0)}%</div>
                  <div className="text-xs text-muted-foreground">
                    {systemInfo.storage.used}GB / {systemInfo.storage.total}GB
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Utilisateurs</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{systemInfo.activeUsers} actifs</div>
                  <div className="text-xs text-muted-foreground">
                    sur {systemInfo.totalUsers} total
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card group cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl relative overflow-hidden bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/20 text-green-400">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Logs système</h3>
                <p className="text-sm text-muted-foreground">Consulter les journaux</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card group cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Gestion utilisateurs</h3>
                <p className="text-sm text-muted-foreground">Gérer les comptes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card group cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-red-600/10 border-orange-500/20">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-500/20 text-orange-400">
                <Key className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Configuration</h3>
                <p className="text-sm text-muted-foreground">Paramètres avancés</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
