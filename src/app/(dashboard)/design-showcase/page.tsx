'use client'

/**
 * Design Showcase Page - Demonstrates the new Oklab color system
 * This page showcases all the updated components using the centralized design system
 */

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { useThemeColor } from '@/hooks/use-theme-color'
import { testColorGeneration, debugColors, COLORS } from '@/lib/design-system/colors'
import { 
  Palette, 
  Heart, 
  Star, 
  Zap, 
  Target, 
  Gem, 
  Sun, 
  Moon,
  Users,
  Briefcase,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

export default function DesignShowcasePage() {
  const { getButtonColors, getStatusColor, getSemanticColor } = useThemeColor()
  const [showColorDebug, setShowColorDebug] = useState(false)

  const handleDebugColors = () => {
    debugColors()
    testColorGeneration()
    setShowColorDebug(!showColorDebug)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Palette className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Design System Showcase</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Découvrez notre nouveau système de design basé sur les couleurs Oklab/CAM16 pour une expérience visuelle optimale et accessible.
        </p>
        <Button onClick={handleDebugColors} variant="outline">
          <Zap className="mr-2 h-4 w-4" />
          Debug Color System
        </Button>
      </div>

      {/* Button Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Button Variants
          </CardTitle>
          <CardDescription>
            Tous les variants de boutons utilisant le système de couleurs Oklab
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Variants principaux</h4>
              <div className="space-y-2">
                <Button variant="default" className="w-full">
                  <Heart className="mr-2 h-4 w-4" />
                  Primary Button
                </Button>
                <Button variant="secondary" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Secondary Button
                </Button>
                <Button variant="destructive" className="w-full">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Danger Button
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Variants spéciaux</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Outline Button
                </Button>
                <Button variant="ghost" className="w-full">
                  <Moon className="mr-2 h-4 w-4" />
                  Ghost Button
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Tailles</h4>
              <div className="space-y-2">
                <Button size="sm" className="w-full">
                  <Star className="mr-2 h-3 w-3" />
                  Small
                </Button>
                <Button size="default" className="w-full">
                  <Gem className="mr-2 h-4 w-4" />
                  Medium
                </Button>
                <Button size="lg" className="w-full">
                  <Sun className="mr-2 h-5 w-5" />
                  Large
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Badge Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Status Badges
          </CardTitle>
          <CardDescription>
            Badges de statut avec couleurs sémantiques
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">États de mission</h4>
              <div className="space-y-2">
                <div><StatusBadge status="pending" /></div>
                <div><StatusBadge status="in_progress" /></div>
                <div><StatusBadge status="completed" /></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm">États financiers</h4>
              <div className="space-y-2">
                <div><StatusBadge status="paid" /></div>
                <div><StatusBadge status="overdue" /></div>
                <div><StatusBadge status="draft" /></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Tailles</h4>
              <div className="space-y-2">
                <div><StatusBadge status="completed" size="sm" /></div>
                <div><StatusBadge status="completed" size="md" /></div>
                <div><StatusBadge status="completed" size="lg" /></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color System Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Palette Preview
          </CardTitle>
          <CardDescription>
            Aperçu des couleurs brand générées avec Oklab
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Primary Colors */}
            <div className="space-y-3">
              <h4 className="font-medium">Primary</h4>
              <div className="grid grid-cols-11 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => (
                  <div key={shade} className="space-y-1">
                    <div 
                      className="h-12 w-full rounded border"
                      style={{ backgroundColor: COLORS.primary?.[shade] || '#000' }}
                    />
                    <span className="text-xs text-center block">{shade}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Secondary Colors */}
            <div className="space-y-3">
              <h4 className="font-medium">Secondary</h4>
              <div className="grid grid-cols-11 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => (
                  <div key={shade} className="space-y-1">
                    <div 
                      className="h-12 w-full rounded border"
                      style={{ backgroundColor: COLORS.secondary?.[shade] || '#000' }}
                    />
                    <span className="text-xs text-center block">{shade}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Accent Colors */}
            <div className="space-y-3">
              <h4 className="font-medium">Accent</h4>
              <div className="grid grid-cols-11 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => (
                  <div key={shade} className="space-y-1">
                    <div 
                      className="h-12 w-full rounded border"
                      style={{ backgroundColor: COLORS.accent?.[shade] || '#000' }}
                    />
                    <span className="text-xs text-center block">{shade}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Debug Information */}
      {showColorDebug && (
        <Card>
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
            <CardDescription>
              Informations de débogage du système de couleurs (voir la console)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Button Colors (Primary)</h4>
                  <div className="space-y-1 text-sm">
                    <div>BG: {getButtonColors('primary').bg}</div>
                    <div>Hover: {getButtonColors('primary').hover}</div>
                    <div>Active: {getButtonColors('primary').active}</div>
                    <div>Text: {getButtonColors('primary').text}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Status Colors</h4>
                  <div className="space-y-1 text-sm">
                    <div>Success: {getStatusColor('success')}</div>
                    <div>Warning: {getStatusColor('warning')}</div>
                    <div>Error: {getStatusColor('error')}</div>
                    <div>Info: {getStatusColor('info')}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Semantic Colors</h4>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 text-sm">
                  <div>Surface Default: {getSemanticColor('surface', 'default')}</div>
                  <div>Text Default: {getSemanticColor('text', 'default')}</div>
                  <div>Border Default: {getSemanticColor('border', 'default')}</div>
                  <div>Interactive Hover: {getSemanticColor('interactive', 'hover')}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Exemples d&apos;utilisation</CardTitle>
          <CardDescription>
            Comment utiliser le nouveau système de design dans vos composants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Utilisation des hooks</h4>
              <pre className="text-sm overflow-x-auto">
{`import { useThemeColor } from '@/hooks/use-theme-color'

function MyComponent() {
  const { getButtonColors, getStatusColor } = useThemeColor();
  
  return (
    <button style={{ backgroundColor: getButtonColors('primary').bg }}>
      Mon bouton
    </button>
  );
}`}
              </pre>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Composants mis à jour</h4>
              <pre className="text-sm overflow-x-auto">
{`<Button variant="default">Action principale</Button>
<StatusBadge status="completed" />
<Card>...</Card> // Utilise automatiquement les nouvelles couleurs`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
