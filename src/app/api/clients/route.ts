import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

// GET - Récupérer tous les clients
export async function GET() {
  try {
    const supabase = getSupabaseClient()
    
    const { data: clients, error } = await supabase
      .from('clients')
      .select('*')
      .eq('archived', false)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, data: clients })
  } catch (error) {
    console.error('Erreur GET clients:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}

// POST - Créer un nouveau client
export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()
    
    // Validation basique
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Le nom du client est requis' },
        { status: 400 }
      )
    }

    // Pour la demo, on utilise un userId factice si pas d'auth
    let userId = 'demo-user-default'
    
    try {
      // Essayer de récupérer l'utilisateur authentifié
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (user && !userError) {
        userId = user.id
      }
    } catch (authError) {
      // Ignorer les erreurs d'auth pour la demo
      console.log('Auth non disponible, utilisation du mode demo')
    }

    const { data: client, error } = await supabase
      .from('clients')
      .insert({
        name: body.name.trim(),
        email: body.email?.trim() || null,
        phone: body.phone?.trim() || null,
        company: body.company?.trim() || null,
        notes: body.notes?.trim() || null,
        created_by: userId === 'demo-user-default' ? null : userId,
        archived: false
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, data: client }, { status: 201 })
  } catch (error) {
    console.error('Erreur POST clients:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour un client
export async function PUT(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()
    
    if (!body.id) {
      return NextResponse.json(
        { success: false, error: 'ID du client requis' },
        { status: 400 }
      )
    }

    // Pour la demo, on utilise un userId factice si pas d'auth
    let userId = 'demo-user-default'
    
    try {
      // Essayer de récupérer l'utilisateur authentifié
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (user && !userError) {
        userId = user.id
      }
    } catch {
      // Ignorer les erreurs d'auth pour la demo
      console.log('Auth non disponible, utilisation du mode demo')
    }

    const updateData: Record<string, any> = {}
    if (body.name !== undefined) updateData.name = body.name.trim()
    if (body.email !== undefined) updateData.email = body.email?.trim() || null
    if (body.phone !== undefined) updateData.phone = body.phone?.trim() || null
    if (body.company !== undefined) updateData.company = body.company?.trim() || null
    if (body.notes !== undefined) updateData.notes = body.notes?.trim() || null

    // Pour la demo, on ne filtre pas par created_by si pas d'auth
    const query = supabase
      .from('clients')
      .update(updateData)
      .eq('id', body.id)

    if (userId !== 'demo-user-default') {
      query.eq('created_by', userId)
    }

    const { data: client, error } = await query
      .select()
      .single()

    if (error) {
      throw error
    }

    if (!client) {
      return NextResponse.json(
        { success: false, error: 'Client non trouvé ou accès refusé' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: client })
  } catch (error) {
    console.error('Erreur PUT clients:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}

// PATCH - Archiver un client
export async function PATCH(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()
    
    if (!body.id) {
      return NextResponse.json(
        { success: false, error: 'ID du client requis' },
        { status: 400 }
      )
    }

    // Pour la demo, on utilise un userId factice si pas d'auth
    let userId = 'demo-user-default'
    
    try {
      // Essayer de récupérer l'utilisateur authentifié
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (user && !userError) {
        userId = user.id
      }
    } catch {
      // Ignorer les erreurs d'auth pour la demo
      console.log('Auth non disponible, utilisation du mode demo')
    }

    // Pour la demo, on ne filtre pas par created_by si pas d'auth
    const query = supabase
      .from('clients')
      .update({ archived: true })
      .eq('id', body.id)

    if (userId !== 'demo-user-default') {
      query.eq('created_by', userId)
    }

    const { data: client, error } = await query
      .select()
      .single()

    if (error) {
      throw error
    }

    if (!client) {
      return NextResponse.json(
        { success: false, error: 'Client non trouvé ou accès refusé' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: client })
  } catch (error) {
    console.error('Erreur PATCH clients:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}
