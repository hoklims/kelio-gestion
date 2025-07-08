import { useState, useEffect } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'

interface UseSupabaseData<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

type FetchFunction<T> = (supabase: SupabaseClient) => Promise<T>

export function useSupabaseData<T>(
  fetchFunction: FetchFunction<T>,
  initialData: T
): UseSupabaseData<T> {
  const [data, setData] = useState<T | null>(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)

  // Charger Supabase
  useEffect(() => {
    const loadSupabase = async () => {
      try {
        const { supabase: supabaseClient, isSupabaseConfigured } = await import('@/lib/supabase')
        
        if (!isSupabaseConfigured()) {
          setError('Configuration Supabase manquante')
          setLoading(false)
          return
        }
        
        setSupabase(supabaseClient)
      } catch (err) {
        console.error('Error loading Supabase:', err)
        setError('Erreur lors du chargement de Supabase')
        setLoading(false)
      }
    }
    loadSupabase()
  }, [])

  // Fonction pour récupérer les données
  const fetchData = async () => {
    if (!supabase) return

    try {
      setLoading(true)
      setError(null)

      // Vérifier l'authentification
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) {
        setError('Erreur d\'authentification. Veuillez vous reconnecter.')
        return
      }
      
      if (!user) {
        setError('Utilisateur non connecté. Veuillez vous connecter.')
        return
      }

      const result = await fetchFunction(supabase)
      setData(result)
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
      
      const errorMessage = (error as Error)?.message || ''
      const errorCode = (error as { code?: string })?.code || ''
      
      if (errorCode === 'PGRST116' || errorMessage.includes('relation') || errorMessage.includes('does not exist')) {
        setError('La base de données n\'est pas encore configurée. Veuillez exécuter le script SQL d\'initialisation dans Supabase.')
      } else {
        setError(`Erreur lors du chargement des données: ${errorMessage}`)
      }
    } finally {
      setLoading(false)
    }
  }

  // Récupérer les données quand Supabase est prêt
  useEffect(() => {
    if (supabase) {
      fetchData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}
