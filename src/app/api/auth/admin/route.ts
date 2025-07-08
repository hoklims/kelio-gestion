import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Récupération des identifiants depuis le body de la requête
    const body = await request.json().catch(() => ({}))
    const { email, password } = body

    // Pour développement : identifiants temporaires
    const adminEmail = 'admin@test.com'
    const adminPassword = 'admin123'

    // Authentification temporaire pour développement
    if (email === adminEmail && password === adminPassword) {
      // Simulation d'une session admin
      const mockUser = {
        id: 'admin-temp-id',
        email: adminEmail,
        user_metadata: {
          full_name: 'Administrateur',
          role: 'admin'
        }
      }

      const mockSession = {
        access_token: 'mock-token',
        refresh_token: 'mock-refresh-token',
        expires_in: 3600,
        user: mockUser
      }

      return NextResponse.json({
        success: true,
        user: mockUser,
        session: mockSession,
        message: 'Connexion admin réussie (mode développement)'
      })
    }

    // Authentification par défaut sans credentials (pour test rapide)
    if (!email && !password) {
      const mockUser = {
        id: 'admin-default-id',
        email: adminEmail,
        user_metadata: {
          full_name: 'Administrateur',
          role: 'admin'
        }
      }

      const mockSession = {
        access_token: 'mock-token-default',
        refresh_token: 'mock-refresh-token-default',
        expires_in: 3600,
        user: mockUser
      }

      return NextResponse.json({
        success: true,
        user: mockUser,
        session: mockSession,
        message: 'Connexion admin par défaut (mode développement)'
      })
    }

    // Si nous arrivons ici avec des identifiants différents
    return NextResponse.json({ 
      error: 'Identifiants invalides',
      hint: `Utilisez email: ${adminEmail}, password: ${adminPassword}`
    }, { status: 400 })

  } catch (error) {
    console.error('Erreur serveur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Endpoint d\'authentification admin - utilisez POST pour vous connecter',
    credentials: {
      email: 'admin@test.com',
      password: 'admin123'
    }
  })
}
