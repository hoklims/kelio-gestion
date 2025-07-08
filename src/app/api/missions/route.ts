import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Récupérer toutes les missions ou filtrer
export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Configuration Supabase manquante' },
        { status: 500 }
      )
    }
    const { searchParams } = new URL(request.url)
    
    const status = searchParams.get('status')
    const client_id = searchParams.get('client_id')
    const search = searchParams.get('search')
    
    let query = supabase
      .from('missions')
      .select(`
        *,
        clients (
          id,
          name,
          email,
          company
        )
      `)
      .order('created_at', { ascending: false })

    // Filtrer par statut
    if (status) {
      query = query.eq('status', status)
    }

    // Filtrer par client
    if (client_id) {
      query = query.eq('client_id', client_id)
    }

    // Recherche textuelle
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching missions:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des missions', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ missions: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}

// POST - Créer une nouvelle mission
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
      title,
      description,
      client_id,
      amount,
      deadline,
      status = 'pending'
    } = body

    // Validation des champs requis
    if (!title || !client_id || !amount) {
      return NextResponse.json(
        { error: 'Les champs titre, client et montant sont requis' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('missions')
      .insert({
        title,
        description,
        client_id,
        amount: parseFloat(amount),
        deadline,
        status
      })
      .select(`
        *,
        clients (
          id,
          name,
          email,
          company
        )
      `)
      .single()

    if (error) {
      console.error('Error creating mission:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la création de la mission', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ mission: data }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour une mission (remplacement complet)
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
      title,
      description,
      client_id,
      amount,
      deadline,
      status
    } = body

    // Validation des champs requis
    if (!id || !title || !client_id || !amount) {
      return NextResponse.json(
        { error: 'Les champs id, titre, client et montant sont requis' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('missions')
      .update({
        title,
        description,
        client_id,
        amount: parseFloat(amount),
        deadline,
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        clients (
          id,
          name,
          email,
          company
        )
      `)
      .single()

    if (error) {
      console.error('Error updating mission:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour de la mission', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Mission non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json({ mission: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}

// PATCH - Mise à jour partielle d'une mission
export async function PATCH(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Configuration Supabase manquante' },
        { status: 500 }
      )
    }
    const body = await request.json()

    const { id, ...updateFields } = body

    if (!id) {
      return NextResponse.json(
        { error: 'L\'ID de la mission est requis' },
        { status: 400 }
      )
    }

    // Convertir amount en nombre si présent
    if (updateFields.amount) {
      updateFields.amount = parseFloat(updateFields.amount)
    }

    // Ajouter updated_at automatiquement
    updateFields.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('missions')
      .update(updateFields)
      .eq('id', id)
      .select(`
        *,
        clients (
          id,
          name,
          email,
          company
        )
      `)
      .single()

    if (error) {
      console.error('Error updating mission:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour de la mission', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Mission non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json({ mission: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une mission
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
        { error: 'L\'ID de la mission est requis' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('missions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting mission:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la suppression de la mission', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Mission supprimée avec succès' })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue' },
      { status: 500 }
    )
  }
}
