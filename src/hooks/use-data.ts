import { useState, useEffect } from 'react'
import { getSupabaseClient } from '@/lib/supabase'

// Types
export interface Client {
  id: string
  name: string
  email?: string
  phone?: string
  company?: string
  notes?: string
  archived: boolean
  created_by: string
  created_at: string
  updated_at: string
}

export interface Mission {
  id: string
  title: string
  description?: string
  client_id: string
  client_name?: string
  deadline?: string
  total_amount: number
  advance_amount: number
  status: 'pending' | 'in_progress' | 'completed' | 'paid'
  notes?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface CommissionSetting {
  id: string
  user_id: string
  commission_percentage: number
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string
  full_name?: string
  role: 'admin' | 'commercial' | 'developer'
  created_at: string
  updated_at: string
}

export interface Objective {
  id: string
  month: string
  year: number
  target_missions: number
  target_revenue: number
  created_by: string
  created_at: string
  updated_at: string
}

// Hook pour les clients
export function useClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClients = async () => {
    try {
      setLoading(true)
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('archived', false)
        .order('created_at', { ascending: false })

      if (error) throw error
      setClients(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des clients')
    } finally {
      setLoading(false)
    }
  }

  const createClient = async (clientData: Omit<Client, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'archived'>) => {
    try {
      const supabase = getSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Utilisateur non connecté')

      const { data, error } = await supabase
        .from('clients')
        .insert({
          ...clientData,
          created_by: user.id,
          archived: false
        })
        .select()
        .single()

      if (error) throw error
      await fetchClients()
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la création du client')
    }
  }

  const updateClient = async (id: string, clientData: Partial<Client>) => {
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('clients')
        .update(clientData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      await fetchClients()
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la mise à jour du client')
    }
  }

  const archiveClient = async (id: string) => {
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase
        .from('clients')
        .update({ archived: true })
        .eq('id', id)

      if (error) throw error
      await fetchClients()
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de l\'archivage du client')
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return {
    clients,
    loading,
    error,
    createClient,
    updateClient,
    archiveClient,
    refetch: fetchClients
  }
}

// Hook pour les missions
export function useMissions() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMissions = async () => {
    try {
      setLoading(true)
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('missions')
        .select(`
          *,
          clients!inner(name)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      const missionsWithClientName = data?.map((mission: Mission & { clients?: { name: string } }) => ({
        ...mission,
        client_name: mission.clients?.name || 'Client inconnu'
      })) || []

      setMissions(missionsWithClientName)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des missions')
    } finally {
      setLoading(false)
    }
  }

  const createMission = async (missionData: Omit<Mission, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'client_name'>) => {
    try {
      const supabase = getSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Utilisateur non connecté')

      const { data, error } = await supabase
        .from('missions')
        .insert({
          ...missionData,
          created_by: user.id
        })
        .select()
        .single()

      if (error) throw error
      await fetchMissions()
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la création de la mission')
    }
  }

  const updateMission = async (id: string, missionData: Partial<Mission>) => {
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('missions')
        .update(missionData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      await fetchMissions()
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la mise à jour de la mission')
    }
  }

  const deleteMission = async (id: string) => {
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase
        .from('missions')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchMissions()
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la suppression de la mission')
    }
  }

  useEffect(() => {
    fetchMissions()
  }, [])

  return {
    missions,
    loading,
    error,
    createMission,
    updateMission,
    deleteMission,
    refetch: fetchMissions
  }
}

// Hook pour les statistiques du dashboard
export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalMissions: 0,
    totalRevenue: 0,
    completedMissions: 0,
    pendingMissions: 0,
    thisMonthRevenue: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const supabase = getSupabaseClient()
      
      // Compter les clients
      const { count: clientCount } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true })
        .eq('archived', false)

      // Compter les missions
      const { count: missionCount } = await supabase
        .from('missions')
        .select('*', { count: 'exact', head: true })

      // Missions terminées
      const { count: completedCount } = await supabase
        .from('missions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed')

      // Missions en attente
      const { count: pendingCount } = await supabase
        .from('missions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

      // Revenus totaux
      const { data: revenueData } = await supabase
        .from('missions')
        .select('total_amount')

      const totalRevenue = revenueData?.reduce((sum: number, mission: { total_amount: number }) => sum + mission.total_amount, 0) || 0

      // Revenus du mois en cours
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const { data: monthlyRevenueData } = await supabase
        .from('missions')
        .select('total_amount')
        .gte('created_at', startOfMonth.toISOString())

      const thisMonthRevenue = monthlyRevenueData?.reduce((sum: number, mission: { total_amount: number }) => sum + mission.total_amount, 0) || 0

      setStats({
        totalClients: clientCount || 0,
        totalMissions: missionCount || 0,
        totalRevenue,
        completedMissions: completedCount || 0,
        pendingMissions: pendingCount || 0,
        thisMonthRevenue
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des statistiques')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  }
}

// Hook pour les objectifs
export function useObjectives() {
  const [objectives, setObjectives] = useState<Objective[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchObjectives = async () => {
    try {
      setLoading(true)
      // Utiliser l'API pour récupérer les objectifs
      const response = await fetch('/api/objectives')
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors du chargement des objectifs')
      }

      const result = await response.json()
      setObjectives(result.objectives || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des objectifs')
    } finally {
      setLoading(false)
    }
  }

  const createObjective = async (objectiveData: Omit<Objective, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    try {
      // Utiliser l'API pour créer l'objectif (comme pour les clients)
      const response = await fetch('/api/objectives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objectiveData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la création de l\'objectif')
      }

      const result = await response.json()
      await fetchObjectives()
      return result.objective
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la création de l\'objectif')
    }
  }

  const updateObjective = async (id: string, objectiveData: Partial<Objective>) => {
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('objectives')
        .update(objectiveData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      await fetchObjectives()
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la mise à jour de l\'objectif')
    }
  }

  const deleteObjective = async (id: string) => {
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase
        .from('objectives')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchObjectives()
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la suppression de l\'objectif')
    }
  }

  useEffect(() => {
    fetchObjectives()
  }, [])

  return {
    objectives,
    loading,
    error,
    createObjective,
    updateObjective,
    deleteObjective,
    refetch: fetchObjectives
  }
}

// Hook pour les paramètres de commission
export function useCommissionSettings() {
  const [commissionSettings, setCommissionSettings] = useState<CommissionSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCommissionSettings = async () => {
    try {
      setLoading(true)
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('commission_settings')
        .select(`
          *,
          profiles!inner(full_name, email, role)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setCommissionSettings(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des paramètres de commission')
    } finally {
      setLoading(false)
    }
  }

  const createCommissionSetting = async (settingData: Omit<CommissionSetting, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('commission_settings')
        .insert(settingData)
        .select()
        .single()

      if (error) throw error
      await fetchCommissionSettings()
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la création du paramètre de commission')
    }
  }

  const updateCommissionSetting = async (userId: string, percentage: number) => {
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('commission_settings')
        .update({ commission_percentage: percentage })
        .eq('user_id', userId)
        .select()
        .single()

      if (error) throw error
      await fetchCommissionSettings()
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la mise à jour du paramètre de commission')
    }
  }

  const deleteCommissionSetting = async (userId: string) => {
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase
        .from('commission_settings')
        .delete()
        .eq('user_id', userId)

      if (error) throw error
      await fetchCommissionSettings()
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la suppression du paramètre de commission')
    }
  }

  useEffect(() => {
    fetchCommissionSettings()
  }, [])

  return {
    commissionSettings,
    loading,
    error,
    createCommissionSetting,
    updateCommissionSetting,
    deleteCommissionSetting,
    refetch: fetchCommissionSettings
  }
}

// Hook pour les profils utilisateur
export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfiles = async () => {
    try {
      setLoading(true)
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProfiles(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des profils')
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (id: string, profileData: { full_name?: string; role?: 'admin' | 'commercial' | 'developer' }) => {
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      await fetchProfiles()
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la mise à jour du profil')
    }
  }

  useEffect(() => {
    fetchProfiles()
  }, [])

  return {
    profiles,
    loading,
    error,
    updateProfile,
    refetch: fetchProfiles
  }
}
