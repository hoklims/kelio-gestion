'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SupabaseConfigError from '@/components/supabase-config-error'

export default function Home() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSupabaseConfig = async () => {
      try {
        // Import dynamique pour éviter l'erreur lors du build
        const { supabase, isSupabaseConfigured } = await import('@/lib/supabase')
        
        if (!isSupabaseConfigured()) {
          setError('Supabase is not properly configured. Please check your environment variables.')
          return
        }
        
        const { data: { user } } = await supabase!.auth.getUser()
        if (user) {
          router.push('/dashboard')
        } else {
          // Pour la demo, on redirige vers le dashboard même sans auth
          router.push('/dashboard')
        }
      } catch (err) {
        console.error('Supabase configuration error:', err)
        setError(err instanceof Error ? err.message : 'Configuration error')
      } finally {
        setLoading(false)
      }
    }

    checkSupabaseConfig()
  }, [router])

  if (error) {
    return <SupabaseConfigError />
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    )
  }

  return null
}
