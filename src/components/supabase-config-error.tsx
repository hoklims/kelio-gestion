'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Database, Key, ExternalLink } from 'lucide-react'

export default function SupabaseConfigError() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-900">Configuration Supabase Requise</CardTitle>
          <CardDescription className="text-lg">
            Votre application nécessite une configuration Supabase pour fonctionner.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Étapes de configuration :
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Créez un compte gratuit sur <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline inline-flex items-center">Supabase <ExternalLink className="w-3 h-3 ml-1" /></a></li>
              <li>Créez un nouveau projet</li>
              <li>Allez dans Settings → API</li>
              <li>Copiez l&apos;URL du projet et la clé publique anonyme</li>
              <li>Remplacez les valeurs dans <code className="bg-blue-100 px-1 rounded">.env.local</code></li>
              <li>Exécutez le script SQL dans <code className="bg-blue-100 px-1 rounded">supabase/init.sql</code></li>
              <li>Redémarrez le serveur de développement</li>
            </ol>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Key className="w-5 h-5 mr-2" />
              Remplacez dans .env.local :
            </h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anonyme`}
            </pre>
            <p className="text-xs text-gray-600 mt-2">
              Actuellement configuré avec des valeurs placeholder. Remplacez-les par vos vraies clés Supabase.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">💡 Note importante :</h3>
            <p className="text-sm text-yellow-800">
              Supabase offre un tier gratuit généreux parfaitement adapté pour cette application avec 2 utilisateurs.
              Aucun coût n&apos;est requis pour commencer.
            </p>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Une fois configuré, rechargez cette page pour accéder à l&apos;application.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
