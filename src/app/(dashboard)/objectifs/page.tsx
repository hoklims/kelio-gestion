'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ObjectiveFormDialog } from '@/components/objective-form-dialog'
import { useObjectives } from '@/hooks/use-data'
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  Plus, 
  Award,
  Activity,
  MoreHorizontal
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'

export default function ObjectifsPage() {
  const { objectives, loading, error, refetch } = useObjectives()

  // Calculs pour les KPIs
  const totalTargetRevenue = objectives.reduce((sum, obj) => sum + obj.target_revenue, 0)
  const totalTargetMissions = objectives.reduce((sum, obj) => sum + obj.target_missions, 0)

  const kpis = [
    {
      title: 'Objectifs CA total',
      value: `${totalTargetRevenue.toLocaleString('fr-FR')} €`,
      achieved: `${objectives.length} objectifs`,
      progress: objectives.length > 0 ? 100 : 0,
      icon: Target,
      gradient: 'from-blue-500/20 to-blue-600/20',
      border: 'border-blue-500/30',
      iconBg: 'bg-blue-500/20 text-blue-400'
    },
    {
      title: 'Missions cibles',
      value: `${totalTargetMissions}`,
      achieved: `${objectives.length} objectifs`,
      progress: objectives.length > 0 ? 100 : 0,
      icon: Activity,
      gradient: 'from-purple-500/20 to-purple-600/20',
      border: 'border-purple-500/30',
      iconBg: 'bg-purple-500/20 text-purple-400'
    },
    {
      title: 'Objectifs définis',
      value: `${objectives.length}`,
      achieved: 'Objectifs créés',
      progress: objectives.length > 0 ? 100 : 0,
      icon: TrendingUp,
      gradient: 'from-green-500/20 to-emerald-600/20',
      border: 'border-green-500/30',
      iconBg: 'bg-green-500/20 text-green-400'
    },
    {
      title: 'Moyenne CA',
      value: objectives.length > 0 ? `${Math.round(totalTargetRevenue / objectives.length).toLocaleString('fr-FR')} €` : '0 €',
      achieved: 'Par objectif',
      progress: objectives.length > 0 ? 100 : 0,
      icon: Calendar,
      gradient: 'from-orange-500/20 to-orange-600/20',
      border: 'border-orange-500/30',
      iconBg: 'bg-orange-500/20 text-orange-400'
    }
  ]

  const handleObjectiveCreated = () => {
    refetch()
  }

  if (loading) {
    return (
      <div className="p-6 space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-destructive mb-2">Erreur</h2>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Objectifs
          </h1>
          <p className="text-muted-foreground mt-2">
            Suivez vos objectifs mensuels et annuels
          </p>
        </div>
        
        <ObjectiveFormDialog
          trigger={
            <Button className="gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-2xl transition-all duration-300">
              <Plus className="h-4 w-4" />
              Nouvel objectif
            </Button>
          }
          onSuccess={handleObjectiveCreated}
        />
      </div>

      {/* KPIs */}
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
              <CardContent className="pt-0 space-y-3">
                <div className="text-2xl font-bold text-foreground">
                  {kpi.value}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{kpi.achieved}</span>
                    <span className="font-medium">{Math.round(kpi.progress)}%</span>
                  </div>
                  <Progress 
                    value={kpi.progress} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Objectifs List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="h-6 w-6 text-blue-400" />
          Objectifs par mois
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {objectives.map((objective, index) => {
            return (
              <Card 
                key={objective.id} 
                className={`
                  card group cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl 
                  relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20
                  animate-fade-in-up
                `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        {objective.month} {objective.year}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Objectifs du mois
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        <Calendar className="h-3 w-3 mr-1" />
                        Objectif
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Revenue Objective */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-green-400" />
                        <span className="font-medium">Chiffre d&apos;affaires</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          {objective.target_revenue.toLocaleString('fr-FR')} €
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Objectif
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mission Objective */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-400" />
                        <span className="font-medium">Missions</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          {objective.target_missions}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Objectif
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Badge */}
                  <div className="pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Créé le</span>
                      <Badge className="bg-background/50 border border-border/50">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(objective.created_at).toLocaleDateString('fr-FR')}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card group cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl relative overflow-hidden bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/20 text-green-400">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Rapport mensuel</h3>
                <p className="text-sm text-muted-foreground">Analyser les performances</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card group cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Ajuster objectifs</h3>
                <p className="text-sm text-muted-foreground">Modifier les cibles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card group cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-violet-600/10 border-purple-500/20">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Prévisions</h3>
                <p className="text-sm text-muted-foreground">Projections futures</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
