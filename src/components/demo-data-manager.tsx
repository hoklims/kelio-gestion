'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Database, 
  Trash2, 
  Upload, 
  Download, 
  AlertTriangle, 
  CheckCircle,
  Loader2,
  Users,
  Briefcase,
  Target,
  Settings,
  FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface DemoDataManagerProps {
  className?: string
}

interface LoadResult {
  clients: number
  missions: number
  objectives: number
  commission_settings: number
  notes: number
}

interface ClearResult {
  clients: number
  missions: number
  objectives: number
  commission_settings: number
  notes: number
}

export function DemoDataManager({ className }: DemoDataManagerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const [lastAction, setLastAction] = useState<'load' | 'clear' | null>(null)
  const [lastResult, setLastResult] = useState<LoadResult | ClearResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleLoadDemo = async () => {
    setIsLoading(true)
    setError(null)
    setLastAction(null)
    setLastResult(null)

    try {
      const response = await fetch('/api/demo/load', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du chargement des données')
      }

      setLastAction('load')
      setLastResult(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearDemo = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer TOUTES les données ? Cette action est irréversible.')) {
      return
    }

    setIsClearing(true)
    setError(null)
    setLastAction(null)
    setLastResult(null)

    try {
      const response = await fetch('/api/demo/clear', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la suppression des données')
      }

      setLastAction('clear')
      setLastResult(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setIsClearing(false)
    }
  }

  const getDataTypeIcon = (type: string) => {
    switch (type) {
      case 'clients': return Users
      case 'missions': return Briefcase
      case 'objectives': return Target
      case 'commission_settings': return Settings
      case 'notes': return FileText
      default: return Database
    }
  }

  const getDataTypeName = (type: string) => {
    switch (type) {
      case 'clients': return 'Clients'
      case 'missions': return 'Missions'
      case 'objectives': return 'Objectifs'
      case 'commission_settings': return 'Commissions'
      case 'notes': return 'Notes'
      default: return type
    }
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-400" />
          <CardTitle className="text-xl font-bold">Gestionnaire de Données Demo</CardTitle>
        </div>
        <CardDescription>
          Chargez ou videz facilement les données mockup pour vos démonstrations
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm text-green-400">
                    <Upload className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Charger les données</h3>
                    <p className="text-sm text-muted-foreground">Ajouter les données d&apos;exemple</p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={handleLoadDemo}
                disabled={isLoading || isClearing}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Charger Demo
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-red-500/20 to-orange-600/20 border-red-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm text-red-400">
                    <Trash2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Vider les données</h3>
                    <p className="text-sm text-muted-foreground">Supprimer toutes les données</p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={handleClearDemo}
                disabled={isLoading || isClearing}
                variant="destructive"
                className="w-full"
              >
                {isClearing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Vider Tout
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Messages d'erreur */}
        {error && (
          <Card className="border-red-500/30 bg-red-500/10">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-400 mb-1">Erreur</h4>
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Résultats de la dernière action */}
        {lastAction && lastResult && (
          <Card className={cn(
            "border-green-500/30 bg-green-500/10",
            lastAction === 'clear' && "border-orange-500/30 bg-orange-500/10"
          )}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className={cn(
                  "h-5 w-5 flex-shrink-0 mt-0.5",
                  lastAction === 'load' ? "text-green-400" : "text-orange-400"
                )} />
                <div className="flex-1">
                  <h4 className={cn(
                    "font-semibold mb-3",
                    lastAction === 'load' ? "text-green-400" : "text-orange-400"
                  )}>
                    {lastAction === 'load' ? 'Données chargées avec succès' : 'Données supprimées avec succès'}
                  </h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {Object.entries(lastResult).map(([type, count]) => {
                      const Icon = getDataTypeIcon(type)
                      return (
                        <Badge 
                          key={type}
                          variant="default"
                          className="flex items-center gap-1.5 text-xs bg-background/50 text-foreground"
                        >
                          <Icon className="h-3 w-3" />
                          <span>{getDataTypeName(type)}</span>
                          <span className="font-bold">{count}</span>
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Informations sur les données demo */}
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Database className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">Contenu des données demo</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p>• <strong>5 clients</strong> avec profils variés</p>
                    <p>• <strong>8 missions</strong> avec différents statuts</p>
                    <p>• <strong>6 objectifs</strong> mensuels</p>
                  </div>
                  <div>
                    <p>• <strong>2 configurations</strong> de commission</p>
                    <p>• <strong>5 notes</strong> attachées aux clients/missions</p>
                    <p>• Données réalistes pour vos démos</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
