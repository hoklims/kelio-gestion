import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

export async function DELETE() {
  try {
    const supabase = getSupabaseClient();

    console.log('Tentative de suppression des données demo...');

    // Supprimer les données dans l'ordre inverse pour respecter les contraintes FK
    const results = {
      notes: 0,
      commission_settings: 0,
      objectives: 0,
      missions: 0,
      clients: 0,
      profiles: 0
    };

    // 1. Supprimer les notes (si elles existent)
    try {
      const { error: notesError, count: notesCount } = await supabase
        .from('notes')
        .delete()
        .is('created_by', null);

      if (!notesError) {
        results.notes = notesCount || 0;
        console.log('Notes supprimées:', results.notes);
      }
    } catch {
      console.log('Table notes ignorée');
    }

    // 2. Récupérer les IDs des profiles demo pour nettoyer les références
    const { data: demoProfiles } = await supabase
      .from('profiles')
      .select('id')
      .like('email', '%@kelio-demo.local');
    
    const demoProfileIds = demoProfiles?.map(p => p.id) || [];

    // 3. Supprimer les paramètres de commission (si ils existent)
    try {
      const { error: commissionError, count: commissionCount } = await supabase
        .from('commission_settings')
        .delete()
        .in('user_id', demoProfileIds);

      if (!commissionError) {
        results.commission_settings = commissionCount || 0;
        console.log('Commissions supprimées:', results.commission_settings);
      }
    } catch {
      console.log('Table commission_settings ignorée');
    }

    // 4. Supprimer les objectifs (si ils existent)
    try {
      const { error: objectivesError, count: objectivesCount } = await supabase
        .from('objectives')
        .delete()
        .in('created_by', demoProfileIds);

      if (!objectivesError) {
        results.objectives = objectivesCount || 0;
        console.log('Objectifs supprimés:', results.objectives);
      }
    } catch {
      console.log('Table objectives ignorée');
    }

    // 5. Supprimer les missions (où created_by est null pour la demo)
    const { error: missionsError, count: missionsCount } = await supabase
      .from('missions')
      .delete()
      .is('created_by', null);

    if (missionsError) {
      console.error('Erreur lors de la suppression des missions:', missionsError);
      return NextResponse.json({ 
        error: 'Erreur lors de la suppression des missions', 
        details: missionsError 
      }, { status: 500 });
    }
    results.missions = missionsCount || 0;

    // 6. Supprimer les clients (où created_by est null pour la demo)
    const { error: clientsError, count: clientsCount } = await supabase
      .from('clients')
      .delete()
      .is('created_by', null);

    if (clientsError) {
      console.error('Erreur lors de la suppression des clients:', clientsError);
      return NextResponse.json({ 
        error: 'Erreur lors de la suppression des clients', 
        details: clientsError 
      }, { status: 500 });
    }
    results.clients = clientsCount || 0;

    // 7. Supprimer les profiles demo
    try {
      const { error: profilesError, count: profilesCount } = await supabase
        .from('profiles')
        .delete()
        .like('email', '%@kelio-demo.local');

      if (!profilesError) {
        results.profiles = profilesCount || 0;
        console.log('Profiles demo supprimés:', results.profiles);
      }
    } catch {
      console.log('Profiles demo ignorés');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Données demo supprimées avec succès',
      data: results
    });

  } catch (error) {
    console.error('Erreur lors de la suppression des données:', error);
    return NextResponse.json({ 
      error: 'Erreur interne du serveur', 
      details: error 
    }, { status: 500 });
  }
}
