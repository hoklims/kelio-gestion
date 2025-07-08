import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Fonction pour créer le client Supabase avec gestion d'erreur
function createSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      'Missing Supabase environment variables. Please check your .env.local file and ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
    )
    return null
  }

  if (supabaseUrl === 'your-project-url' || supabaseAnonKey === 'your-anon-key') {
    console.error(
      'Please replace the placeholder values in your .env.local file with your actual Supabase project URL and anonymous key.'
    )
    return null
  }

  try {
    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Error creating Supabase client:', error)
    return null
  }
}

export const supabase = createSupabaseClient()

// Helper function to check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  return supabase !== null
}

// Helper function to get a safe Supabase client (throws if not configured)
export function getSupabaseClient() {
  if (!supabase) {
    throw new Error('Supabase is not properly configured. Please check your environment variables.')
  }
  return supabase
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'commercial' | 'developer'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'admin' | 'commercial' | 'developer'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'commercial' | 'developer'
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          company: string | null
          notes: string | null
          archived: boolean
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          company?: string | null
          notes?: string | null
          archived?: boolean
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          phone?: string | null
          company?: string | null
          notes?: string | null
          archived?: boolean
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      missions: {
        Row: {
          id: string
          title: string
          description: string | null
          client_id: string
          deadline: string | null
          total_amount: number
          advance_amount: number
          status: 'pending' | 'in_progress' | 'completed' | 'paid'
          notes: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          client_id: string
          deadline?: string | null
          total_amount: number
          advance_amount?: number
          status?: 'pending' | 'in_progress' | 'completed' | 'paid'
          notes?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          client_id?: string
          deadline?: string | null
          total_amount?: number
          advance_amount?: number
          status?: 'pending' | 'in_progress' | 'completed' | 'paid'
          notes?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      commission_settings: {
        Row: {
          id: string
          user_id: string
          commission_percentage: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          commission_percentage: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          commission_percentage?: number
          created_at?: string
          updated_at?: string
        }
      }
      objectives: {
        Row: {
          id: string
          month: string
          year: number
          target_missions: number
          target_revenue: number
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          month: string
          year: number
          target_missions: number
          target_revenue: number
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          month?: string
          year?: number
          target_missions?: number
          target_revenue?: number
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
