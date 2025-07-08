import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Récupérer tous les paramètres de commission
export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Configuration Supabase manquante' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get('user_id')

    let query = supabase
      .from('commission_settings')
      .select(`
        *,
        profiles (
          id,
          full_name,
          email,
          role
        )
      `)
      .order('created_at', { ascending: false })

    // Filtrer par utilisateur si spécifié
    if (user_id) {
      query = query.eq('user_id', user_id)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching commission settings:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des paramètres de commission', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ commission_settings: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}

// POST - Créer un nouveau paramètre de commission
export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Configuration Supabase manquante' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const {
      user_id,
      commission_percentage
    } = body

    // Validation des champs requis
    if (!user_id || commission_percentage === undefined) {
      return NextResponse.json(
        { error: 'Les champs user_id et commission_percentage sont requis' },
        { status: 400 }
      )
    }

    // Validation du pourcentage (entre 0 et 100)
    const percentage = parseFloat(commission_percentage)
    if (percentage < 0 || percentage > 100) {
      return NextResponse.json(
        { error: 'Le pourcentage de commission doit être entre 0 et 100' },
        { status: 400 }
      )
    }

    // Vérifier si l'utilisateur a déjà des paramètres de commission
    const { data: existing } = await supabase
      .from('commission_settings')
      .select('id')
      .eq('user_id', user_id)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Des paramètres de commission existent déjà pour cet utilisateur' },
        { status: 409 }
      )
    }

    const { data, error } = await supabase
      .from('commission_settings')
      .insert({
        user_id,
        commission_percentage: percentage
      })
      .select(`
        *,
        profiles (
          id,
          full_name,
          email,
          role
        )
      `)
      .single()

    if (error) {
      console.error('Error creating commission setting:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la création des paramètres de commission', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ commission_setting: data }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour les paramètres de commission
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
      user_id,
      commission_percentage
    } = body

    // Validation des champs requis
    if (!user_id || commission_percentage === undefined) {
      return NextResponse.json(
        { error: 'Les champs user_id et commission_percentage sont requis' },
        { status: 400 }
      )
    }

    // Validation du pourcentage (entre 0 et 100)
    const percentage = parseFloat(commission_percentage)
    if (percentage < 0 || percentage > 100) {
      return NextResponse.json(
        { error: 'Le pourcentage de commission doit être entre 0 et 100' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('commission_settings')
      .update({
        commission_percentage: percentage,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user_id)
      .select(`
        *,
        profiles (
          id,
          full_name,
          email,
          role
        )
      `)
      .single()

    if (error) {
      console.error('Error updating commission setting:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour des paramètres de commission', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Paramètres de commission non trouvés' },
        { status: 404 }
      )
    }

    return NextResponse.json({ commission_setting: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer les paramètres de commission
export async function DELETE(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Configuration Supabase manquante' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get('user_id')

    if (!user_id) {
      return NextResponse.json(
        { error: 'L\'ID de l\'utilisateur est requis' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('commission_settings')
      .delete()
      .eq('user_id', user_id)

    if (error) {
      console.error('Error deleting commission setting:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la suppression des paramètres de commission', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Paramètres de commission supprimés avec succès' })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}
