import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Récupérer tous les objectifs ou filtrer
export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Configuration Supabase manquante' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const user_id = searchParams.get('user_id')

    let query = supabase
      .from('objectives')
      .select('*')
      .order('year', { ascending: false })
      .order('month', { ascending: false })

    // Filtrer par année
    if (year) {
      query = query.eq('year', parseInt(year))
    }

    // Filtrer par mois
    if (month) {
      query = query.eq('month', month)
    }

    // Filtrer par utilisateur
    if (user_id) {
      query = query.eq('created_by', user_id)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching objectives:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des objectifs', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ objectives: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}

// POST - Créer un nouvel objectif
export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Configuration Supabase manquante' },
        { status: 500 }
      )
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Corps de la requête invalide' },
        { status: 400 }
      );
    }
    
    const {
      month,
      year,
      target_missions,
      target_revenue
    } = body

    // Validation des champs requis
    if (!month || !year || !target_missions || !target_revenue) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Récupérer l'utilisateur connecté ou utiliser null pour la démo
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id || null // Utiliser null pour la démo (comme pour les clients)

    // Vérifier si l'objectif existe déjà pour ce mois/année (uniquement si on a un userId)
    if (userId) {
      const { data: existing } = await supabase
        .from('objectives')
        .select('id')
        .eq('month', month)
        .eq('year', year)
        .eq('created_by', userId)
        .single()

      if (existing) {
        return NextResponse.json(
          { error: 'Un objectif existe déjà pour ce mois et cette année' },
          { status: 409 }
        )
      }
    }

    const { data, error } = await supabase
      .from('objectives')
      .insert({
        month,
        year: parseInt(year),
        target_missions: parseInt(target_missions),
        target_revenue: parseFloat(target_revenue),
        created_by: userId
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating objective:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la création de l\'objectif', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ objective: data }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour un objectif (remplacement complet)
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
      month,
      year,
      target_missions,
      target_revenue
    } = body

    // Validation des champs requis
    if (!id || !month || !year || !target_missions || !target_revenue) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('objectives')
      .update({
        month,
        year: parseInt(year),
        target_missions: parseInt(target_missions),
        target_revenue: parseFloat(target_revenue),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        profiles (
          id,
          full_name,
          email
        )
      `)
      .single()

    if (error) {
      console.error('Error updating objective:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour de l\'objectif', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Objectif non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({ objective: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un objectif
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
        { error: 'L\'ID de l\'objectif est requis' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('objectives')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting objective:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la suppression de l\'objectif', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Objectif supprimé avec succès' })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}
