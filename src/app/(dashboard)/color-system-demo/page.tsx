'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { COLORS, testColorGeneration, debugColors } from '@/lib/design-system/colors';
import { Palette, TestTube, Eye, Info } from 'lucide-react';

// Helper function to determine text color based on background luminance
function getTextColor(rgbString: string): string {
  const match = rgbString.match(/rgb\((\d+), (\d+), (\d+)\)/);
  if (!match) return '#000000';
  
  const [, r, g, b] = match.map(Number);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

export default function ColorSystemDemo() {
  const [showDebug, setShowDebug] = React.useState(false);
  const [debugOutput, setDebugOutput] = React.useState<string>('');

  const handleDebug = () => {
    // Capture console output
    const originalLog = console.log;
    let output = '';
    console.log = (...args) => {
      output += args.join(' ') + '\n';
      originalLog(...args);
    };
    
    debugColors();
    testColorGeneration();
    
    console.log = originalLog;
    setDebugOutput(output);
    setShowDebug(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-neutral-900">
          Système de Couleurs Oklab/CAM16
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Démo des couleurs de marque avec conversion perceptuelle uniforme
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={handleDebug} variant="outline" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Tester les couleurs
          </Button>
          <Button onClick={() => setShowDebug(!showDebug)} variant="outline" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            {showDebug ? 'Masquer' : 'Voir'} le debug
          </Button>
        </div>
      </div>

      {/* Debug Output */}
      {showDebug && (
        <Card className="bg-neutral-50 border-neutral-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Debug des couleurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
              {debugOutput || 'Cliquez sur "Tester les couleurs" pour voir le debug'}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Brand Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Couleurs de marque
          </CardTitle>
          <CardDescription>
            Palette générée avec Oklab pour une perception uniforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Primary Colors */}
            <div className="space-y-3">
              <h3 className="font-semibold text-neutral-900">primary</h3>
              <div className="grid grid-cols-11 gap-1">
                {COLORS.primary && Object.entries(COLORS.primary).map(([shade, color]) => (
                  <div key={shade} className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-lg border border-neutral-200 flex items-center justify-center text-xs font-medium"
                      style={{ 
                        backgroundColor: color,
                        color: getTextColor(color)
                      }}
                    >
                      {shade}
                    </div>
                    <span className="text-xs text-neutral-500 mt-1">{shade}</span>
                    <span className="text-xs text-neutral-400 mt-1 font-mono">{color}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="space-y-3">
              <h3 className="font-semibold text-neutral-900">secondary</h3>
              <div className="grid grid-cols-11 gap-1">
                {COLORS.secondary && Object.entries(COLORS.secondary).map(([shade, color]) => (
                  <div key={shade} className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-lg border border-neutral-200 flex items-center justify-center text-xs font-medium"
                      style={{ 
                        backgroundColor: color,
                        color: getTextColor(color)
                      }}
                    >
                      {shade}
                    </div>
                    <span className="text-xs text-neutral-500 mt-1">{shade}</span>
                    <span className="text-xs text-neutral-400 mt-1 font-mono">{color}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Colors */}
            <div className="space-y-3">
              <h3 className="font-semibold text-neutral-900">accent</h3>
              <div className="grid grid-cols-11 gap-1">
                {COLORS.accent && Object.entries(COLORS.accent).map(([shade, color]) => (
                  <div key={shade} className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-lg border border-neutral-200 flex items-center justify-center text-xs font-medium"
                      style={{ 
                        backgroundColor: color,
                        color: getTextColor(color)
                      }}
                    >
                      {shade}
                    </div>
                    <span className="text-xs text-neutral-500 mt-1">{shade}</span>
                    <span className="text-xs text-neutral-400 mt-1 font-mono">{color}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Semantic Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Couleurs sémantiques</CardTitle>
          <CardDescription>
            Couleurs pour les états et actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {['success', 'warning', 'error', 'info'].map((semantic) => (
              <div key={semantic} className="space-y-2">
                <h4 className="font-medium text-neutral-900">{semantic}</h4>
                <div className="flex gap-2">
                  {COLORS[semantic] && Object.entries(COLORS[semantic]).map(([variant, color]) => (
                    <div key={variant} className="flex flex-col items-center">
                      <div
                        className="w-16 h-16 rounded-lg border border-neutral-200 flex items-center justify-center text-xs font-medium"
                        style={{ 
                          backgroundColor: color,
                          color: getTextColor(color)
                        }}
                      >
                        {variant}
                      </div>
                      <span className="text-xs text-neutral-500 mt-1">{variant}</span>
                      <span className="text-xs text-neutral-400 mt-1 font-mono">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Neutral Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Couleurs neutres</CardTitle>
          <CardDescription>
            Échelle de gris pour textes et arrière-plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-1">
            {COLORS.neutral && Object.entries(COLORS.neutral).map(([shade, color]) => (
              <div key={shade} className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-lg border border-neutral-200 flex items-center justify-center text-xs font-medium"
                  style={{ 
                    backgroundColor: color,
                    color: getTextColor(color)
                  }}
                >
                  {shade}
                </div>
                <span className="text-xs text-neutral-500 mt-1">{shade}</span>
                <span className="text-xs text-neutral-400 mt-1 font-mono">{color}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Exemples d&apos;utilisation</CardTitle>
          <CardDescription>
            Comment utiliser les couleurs dans vos composants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <button 
                className="px-4 py-2 rounded-lg font-medium"
                style={{ 
                  backgroundColor: COLORS.primary?.[500],
                  color: getTextColor(COLORS.primary?.[500] || '#000000')
                }}
              >
                Bouton Principal
              </button>
              <button 
                className="px-4 py-2 rounded-lg font-medium"
                style={{ 
                  backgroundColor: COLORS.secondary?.[500],
                  color: getTextColor(COLORS.secondary?.[500] || '#000000')
                }}
              >
                Bouton Secondaire
              </button>
              <button 
                className="px-4 py-2 rounded-lg font-medium"
                style={{ 
                  backgroundColor: COLORS.accent?.[500],
                  color: getTextColor(COLORS.accent?.[500] || '#000000')
                }}
              >
                Bouton Accent
              </button>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <div 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: COLORS.success?.DEFAULT,
                  color: getTextColor(COLORS.success?.DEFAULT || '#000000')
                }}
              >
                Succès
              </div>
              <div 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: COLORS.warning?.DEFAULT,
                  color: getTextColor(COLORS.warning?.DEFAULT || '#000000')
                }}
              >
                Attention
              </div>
              <div 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: COLORS.error?.DEFAULT,
                  color: getTextColor(COLORS.error?.DEFAULT || '#000000')
                }}
              >
                Erreur
              </div>
              <div 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: COLORS.info?.DEFAULT,
                  color: getTextColor(COLORS.info?.DEFAULT || '#000000')
                }}
              >
                Info
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
