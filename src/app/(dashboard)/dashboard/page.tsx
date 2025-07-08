'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useDashboardStats, useMissions } from '@/hooks/use-data'
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  Target, 
  Calendar, 
  CheckCircle, 
  Clock,
  ArrowUpRight,
  ChevronRight,
  Edit,
  Euro,
  Loader2,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

// Function pour obtenir la couleur du statut
function getStatusColor(status: string) {
  switch (status) {
    case 'pending':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    case 'in_progress':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'completed':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'paid':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'pending': return 'En attente'
    case 'in_progress': return 'En cours'
    case 'completed': return 'Terminée'
    case 'paid': return 'Payée'
    default: return status
  }
}

export default function DashboardPage() {
  const { stats, loading: statsLoading, error: statsError } = useDashboardStats()
  const { missions, loading: missionsLoading } = useMissions()
  
  const loading = statsLoading || missionsLoading
  const error = statsError

  // Récupérer les missions récentes (5 dernières)
  const recentMissions = missions.slice(0, 5)

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Tableau de Bord
          </h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre activité
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Analyses
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-1">
                  Clients
                </p>
                <p className="text-2xl font-bold text-foreground">{stats.totalClients}</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4" />
                  +5% ce mois
                </p>
              </div>
              <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm text-blue-400">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-1">
                  Missions
                </p>
                <p className="text-2xl font-bold text-foreground">{stats.totalMissions}</p>
                <p className="text-sm text-blue-400 flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  {stats.completedMissions} terminées
                </p>
              </div>
              <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm text-purple-400">
                <Briefcase className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-1">
                  Chiffre total
                </p>
                <p className="text-2xl font-bold text-foreground">{(stats.totalRevenue / 1000).toFixed(0)}k€</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4" />
                  +12% ce mois
                </p>
              </div>
              <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm text-green-400">
                <Euro className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-1">
                  Ce mois
                </p>
                <p className="text-2xl font-bold text-foreground">{(stats.thisMonthRevenue / 1000).toFixed(0)}k€</p>
                <p className="text-sm text-orange-400 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  En cours
                </p>
              </div>
              <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm text-orange-400">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/clients">
          <Card className="group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Nouveau client</h3>
                  <p className="text-sm text-muted-foreground">Ajouter un client</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/missions">
          <Card className="group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Nouvelle mission</h3>
                  <p className="text-sm text-muted-foreground">Créer une mission</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/finances">
          <Card className="group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Finances</h3>
                  <p className="text-sm text-muted-foreground">Voir les revenus</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/objectifs">
          <Card className="group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Objectifs</h3>
                  <p className="text-sm text-muted-foreground">Suivre les objectifs</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Missions récentes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Missions récentes
              </CardTitle>
              <CardDescription>
                Dernières missions créées
              </CardDescription>
            </div>
            <Link href="/missions">
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentMissions.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucune mission pour le moment</p>
              <Link href="/missions">
                <Button className="mt-4">
                  Créer votre première mission
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentMissions.map((mission) => (
                <div key={mission.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div>
                      <h4 className="font-medium">{mission.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {mission.client_name} • {mission.total_amount.toLocaleString('fr-FR')} €
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`text-xs border ${getStatusColor(mission.status)}`}>
                      {getStatusLabel(mission.status)}
                    </Badge>
                    {mission.deadline && (
                      <p className="text-sm text-muted-foreground">
                        {new Date(mission.deadline).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                    <Link href="/missions">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
