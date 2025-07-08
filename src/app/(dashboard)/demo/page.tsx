'use client'

import { DemoDataManager } from '@/components/demo-data-manager'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DemoPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-blue-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Gestion des Données Demo
            </h1>
          </div>
        </div>
      </div>

      {/* Description */}
      <Card className="bg-blue-500/10 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-400">
            Outils de Démonstration
          </CardTitle>
          <CardDescription>
            Utilisez cette page pour préparer vos démonstrations en chargeant rapidement des données d&apos;exemple 
            ou en vidant complètement la base de données.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-foreground mb-2">🚀 Chargement des données</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Ajoute des clients, missions et objectifs réalistes</li>
                <li>• Données cohérentes avec des relations correctes</li>
                <li>• Parfait pour montrer toutes les fonctionnalités</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">🧹 Nettoyage des données</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Supprime toutes les données de votre compte</li>
                <li>• Remet à zéro pour un nouveau départ</li>
                <li>• Action irréversible - utilisez avec précaution</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gestionnaire principal */}
      <DemoDataManager />

      {/* Informations techniques */}
      <Card className="bg-neutral-500/10 border-neutral-500/30">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-neutral-400">
            Informations Techniques
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-foreground mb-2">API Endpoints</h4>
              <div className="space-y-1 text-muted-foreground font-mono text-xs">
                <p><span className="text-green-400">POST</span> /api/demo/load</p>
                <p><span className="text-red-400">DELETE</span> /api/demo/clear</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Tables affectées</h4>
              <div className="space-y-1 text-muted-foreground text-xs">
                <p>• clients, missions, objectives</p>
                <p>• commission_settings, notes</p>
                <p>• Respect des contraintes de clés étrangères</p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <strong>Note :</strong> Toutes les opérations sont limitées aux données de votre compte utilisateur. 
              Les données des autres utilisateurs ne sont jamais affectées.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
