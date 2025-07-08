import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { 
  mockupClients, 
  mockupMissions,
  mockupObjectives,
  mockupNotes
} from '@/lib/demo-data';

// Fonction pour générer un UUID v4 simple
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export async function POST() {
  try {
    const supabase = getSupabaseClient();

    // Générer un UUID valide pour la demo
    const userId = generateUUID();
    
    console.log('Tentative de chargement des données pour userId:', userId);

    // 1. Charger les clients (version simplifiée pour la demo)
    const clientsForDemo = mockupClients.map(client => ({
      ...client, 
      created_by: null // Ignorer la contrainte FK pour la demo
    }));

    const { data: clientsData, error: clientsError } = await supabase
      .from('clients')
      .insert(clientsForDemo)
      .select();

    if (clientsError) {
      console.error('Erreur lors du chargement des clients:', clientsError);
      return NextResponse.json({ 
        error: 'Erreur lors du chargement des clients', 
        details: clientsError 
      }, { status: 500 });
    }

    console.log('Clients chargés:', clientsData?.length);

    // 2. Charger les missions (avec les IDs réels des clients)
    const missionsWithClientIds = mockupMissions.map((mission) => ({
      ...mission,
      client_id: clientsData![mission.client_id - 1]?.id,
      created_by: null // Ignorer la contrainte FK pour la demo
    }));

    const { data: missionsData, error: missionsError } = await supabase
      .from('missions')
      .insert(missionsWithClientIds)
      .select();

    if (missionsError) {
      console.error('Erreur lors du chargement des missions:', missionsError);
      return NextResponse.json({ 
        error: 'Erreur lors du chargement des missions', 
        details: missionsError 
      }, { status: 500 });
    }

    console.log('Missions chargées:', missionsData?.length);

    // 3. Créer des profiles demo pour les contraintes FK
    const demoProfileId1 = generateUUID();
    const demoProfileId2 = generateUUID();
    
    const demoProfiles = [
      { 
        id: demoProfileId1, 
        email: 'demo1@kelio-demo.local', 
        full_name: 'Demo User 1', 
        role: 'commercial' 
      },
      { 
        id: demoProfileId2, 
        email: 'demo2@kelio-demo.local', 
        full_name: 'Demo User 2', 
        role: 'commercial' 
      }
    ];

    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .upsert(demoProfiles, { onConflict: 'id' })
      .select();

    if (profilesError) {
      console.error('Erreur lors de la création des profiles demo:', profilesError);
    } else {
      console.log('Profiles demo créés:', profilesData?.length || 0);
    }

    // 4. Charger les objectifs (avec created_by valide)
    let objectivesLoaded = 0;
    const objectivesForDemo = mockupObjectives.map(obj => ({ 
      ...obj, 
      created_by: demoProfileId1 // Utiliser un profile demo valide
    }));

    const { data: objectivesData, error: objectivesError } = await supabase
      .from('objectives')
      .insert(objectivesForDemo)
      .select();

    if (objectivesError) {
      console.error('Erreur lors du chargement des objectifs:', objectivesError);
    } else {
      objectivesLoaded = objectivesData?.length || 0;
      console.log('Objectifs chargés:', objectivesLoaded);
    }

    // 5. Charger les paramètres de commission (avec user_id valide)
    let commissionsLoaded = 0;
    const commissionsForDemo = [
      { user_id: demoProfileId1, commission_percentage: 8.5 },
      { user_id: demoProfileId2, commission_percentage: 6.0 }
    ];

    const { data: commissionsData, error: commissionError } = await supabase
      .from('commission_settings')
      .insert(commissionsForDemo)
      .select();

    if (commissionError) {
      console.error('Erreur lors du chargement des commissions:', commissionError);
    } else {
      commissionsLoaded = commissionsData?.length || 0;
      console.log('Commissions chargées:', commissionsLoaded);
    }

    // 5. Charger les notes (table peut ne pas exister)
    let notesLoaded = 0;
    try {
      const notesWithIds = mockupNotes.map(note => ({
        ...note,
        client_id: note.client_id ? clientsData![note.client_id - 1]?.id : null,
        mission_id: note.mission_id ? missionsData![note.mission_id - 1]?.id : null,
        created_by: null
      }));

      const { data: notesData, error: notesError } = await supabase
        .from('notes')
        .insert(notesWithIds)
        .select();

      if (notesError) {
        console.error('Notes ignorées (table peut ne pas exister):', notesError.message);
      } else {
        notesLoaded = notesData?.length || 0;
        console.log('Notes chargées:', notesLoaded);
      }
    } catch {
      console.log('Table notes non disponible, ignorée pour la demo');
    }

    // Pour la demo, on ne charge que les clients et missions
    return NextResponse.json({ 
      success: true, 
      message: 'Données mockup chargées avec succès',
      data: {
        clients: clientsData?.length || 0,
        missions: missionsData?.length || 0,
        objectives: objectivesLoaded,
        commission_settings: commissionsLoaded,
        notes: notesLoaded
      }
    });

  } catch (error) {
    console.error('Erreur lors du chargement des données mockup:', error);
    return NextResponse.json({ 
      error: 'Erreur interne du serveur', 
      details: error 
    }, { status: 500 });
  }
}
