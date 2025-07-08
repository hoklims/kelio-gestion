import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DatabaseErrorProps {
  error: string
  onRetry: () => void
  title?: string
  description?: string
}

export function DatabaseError({ 
  error, 
  onRetry, 
  title = "Erreur de chargement",
  description 
}: DatabaseErrorProps) {
  const isConfigError = error.includes('base de données n\'est pas encore configurée') || 
                       error.includes('script SQL d\'initialisation')

  return (
    <div className="space-y-6">
      {description && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
      )}
      
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="h-5 w-5 text-red-400">⚠️</div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">
                {isConfigError ? 'Configuration requise' : 'Erreur de chargement'}
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <div className="flex space-x-2">
                  <Button
                    onClick={onRetry}
                    variant="outline"
                    size="sm"
                    className="border-red-300 text-red-700 hover:bg-red-100"
                  >
                    Réessayer
                  </Button>
                  {isConfigError && (
                    <Button
                      onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Aller à Supabase
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {isConfigError && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Instructions de configuration</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">1. Connectez-vous à votre projet Supabase</p>
                <p className="text-sm text-gray-600">
                  Rendez-vous sur{' '}
                  <a href="https://supabase.com/dashboard" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                    supabase.com/dashboard
                  </a>
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">2. Ouvrez l&apos;éditeur SQL</p>
                <p className="text-sm text-gray-600">
                  Dans votre projet, allez dans l&apos;onglet &quot;SQL Editor&quot;
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">3. Exécutez le script d&apos;initialisation</p>
                <p className="text-sm text-gray-600">
                  Copiez et exécutez le contenu du fichier <code className="bg-gray-100 px-1 rounded">supabase/init.sql</code> dans l&apos;éditeur SQL
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">4. Actualisez cette page</p>
                <p className="text-sm text-gray-600">
                  Une fois le script exécuté, rechargez cette page
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
