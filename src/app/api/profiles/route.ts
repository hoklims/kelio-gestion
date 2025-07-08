import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Récupérer tous les profils utilisateur
export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Configuration Supabase manquante' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const user_id = searchParams.get('user_id')

    let query = supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    // Filtrer par rôle si spécifié
    if (role) {
      query = query.eq('role', role)
    }

    // Récupérer un utilisateur spécifique
    if (user_id) {
      query = query.eq('id', user_id)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching profiles:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des profils', details: error.message },
        { status: 500 }
      )
    }

    // Si on cherche un utilisateur spécifique, retourner directement l'objet
    if (user_id) {
      const profile = data?.[0] || null
      return NextResponse.json({ profile })
    }

    return NextResponse.json({ profiles: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour un profil utilisateur
export async function PUT(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Configuration Supabase manquante' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const {
      id,
      full_name,
      role
    } = body

    // Validation des champs requis
    if (!id) {
      return NextResponse.json(
        { error: 'L\'ID de l\'utilisateur est requis' },
        { status: 400 }
      )
    }

    // Validation du rôle
    if (role && !['admin', 'commercial', 'developer'].includes(role)) {
      return NextResponse.json(
        { error: 'Rôle invalide. Doit être admin, commercial ou developer' },
        { status: 400 }
      )
    }

    const updateData: {
      updated_at: string
      full_name?: string
      role?: string
    } = {
      updated_at: new Date().toISOString()
    }

    if (full_name !== undefined) {
      updateData.full_name = full_name
    }

    if (role !== undefined) {
      updateData.role = role
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating profile:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour du profil', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Profil non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({ profile: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un profil utilisateur (administrateurs seulement)
export async function DELETE(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Configuration Supabase manquante' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'L\'ID de l\'utilisateur est requis' },
        { status: 400 }
      )
    }

    // Note: En production, il faudrait vérifier que l'utilisateur actuel est admin
    // et qu'il ne se supprime pas lui-même

    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting profile:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la suppression du profil', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Profil supprimé avec succès' })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}
