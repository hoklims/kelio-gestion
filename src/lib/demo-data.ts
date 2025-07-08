/**
 * Données mockup pour la démo
 */

export const mockupClients = [
  {
    name: "TechCorp Solutions",
    email: "contact@techcorp.com",
    phone: "+33 1 23 45 67 89",
    company: "TechCorp Solutions SAS",
    notes: "Client premium avec de gros projets en cours. Très satisfait de nos services.",
    archived: false
  },
  {
    name: "StartupInnovante",
    email: "hello@startupinnovante.fr",
    phone: "+33 6 78 90 12 34",
    company: "StartupInnovante SARL",
    notes: "Startup dynamique, besoins variés en développement mobile et web.",
    archived: false
  },
  {
    name: "Grand Groupe International",
    email: "projets@grandgroupe.com",
    phone: "+33 1 98 76 54 32",
    company: "Grand Groupe International SA",
    notes: "Multinational avec des projets complexes. Processus de validation long mais budgets importants.",
    archived: false
  },
  {
    name: "PME Familiale",
    email: "direction@pmefamiliale.fr",
    phone: "+33 4 56 78 90 12",
    company: "PME Familiale & Fils",
    notes: "Entreprise familiale traditionnelle en cours de digitalisation.",
    archived: false
  },
  {
    name: "Association EcoTech",
    email: "contact@ecotech-asso.org",
    phone: "+33 5 43 21 09 87",
    company: "Association EcoTech",
    notes: "Association environnementale, projets à impact social.",
    archived: false
  }
];

export const mockupMissions = [
  {
    title: "Développement App Mobile E-commerce",
    description: "Création d'une application mobile native pour la vente en ligne avec paiement intégré",
    total_amount: 45000,
    deadline: "2025-09-15",
    status: "in_progress",
    client_id: 1 // TechCorp Solutions
  },
  {
    title: "Refonte Site Web Corporate",
    description: "Modernisation complète du site web avec nouveau design et CMS",
    total_amount: 28000,
    deadline: "2025-08-30",
    status: "pending",
    client_id: 2 // StartupInnovante
  },
  {
    title: "Système de Gestion Interne",
    description: "Développement d'un ERP personnalisé pour la gestion des ressources",
    total_amount: 120000,
    deadline: "2025-12-31",
    status: "in_progress",
    client_id: 3 // Grand Groupe International
  },
  {
    title: "Boutique en Ligne",
    description: "Création d'une boutique e-commerce avec catalogue produits",
    total_amount: 18000,
    deadline: "2025-07-20",
    status: "completed",
    client_id: 4 // PME Familiale
  },
  {
    title: "Plateforme Collaborative",
    description: "Développement d'une plateforme de collaboration pour les membres",
    total_amount: 35000,
    deadline: "2025-10-15",
    status: "in_progress",
    client_id: 5 // Association EcoTech
  },
  {
    title: "Migration Cloud",
    description: "Migration de l'infrastructure vers le cloud avec optimisation",
    total_amount: 55000,
    deadline: "2025-11-30",
    status: "pending",
    client_id: 1 // TechCorp Solutions
  },
  {
    title: "Application IoT",
    description: "Développement d'une application pour gérer des capteurs IoT",
    total_amount: 40000,
    deadline: "2025-08-15",
    status: "in_progress",
    client_id: 2 // StartupInnovante
  },
  {
    title: "Audit Sécurité",
    description: "Audit complet de sécurité et mise en conformité RGPD",
    total_amount: 15000,
    deadline: "2025-07-30",
    status: "completed",
    client_id: 3 // Grand Groupe International
  }
];

export const mockupObjectives = [
  {
    month: "07",
    year: 2025,
    target_missions: 8,
    target_revenue: 150000
  },
  {
    month: "08", 
    year: 2025,
    target_missions: 10,
    target_revenue: 180000
  },
  {
    month: "09",
    year: 2025,
    target_missions: 12,
    target_revenue: 200000
  },
  {
    month: "10",
    year: 2025,
    target_missions: 9,
    target_revenue: 170000
  },
  {
    month: "11",
    year: 2025,
    target_missions: 14,
    target_revenue: 220000
  },
  {
    month: "12",
    year: 2025,
    target_missions: 15,
    target_revenue: 250000
  }
];

export const mockupCommissionSettings = [
  {
    user_id: "demo-user-1",
    commission_percentage: 8.5
  },
  {
    user_id: "demo-user-2", 
    commission_percentage: 6.0
  }
];

export const mockupNotes = [
  {
    client_id: 1,
    mission_id: null,
    content: "Client très réactif, apprécie la communication régulière. Préfère les réunions en fin de journée.",
    is_important: true
  },
  {
    client_id: 2,
    mission_id: null,
    content: "Startup en croissance rapide, besoins évolutifs. Rester flexible sur les spécifications.",
    is_important: false
  },
  {
    client_id: null,
    mission_id: 1,
    content: "Attention aux délais serrés pour les tests utilisateur. Prévoir une phase de validation supplémentaire.",
    is_important: true
  },
  {
    client_id: null,
    mission_id: 3,
    content: "Projet complexe nécessitant une documentation détaillée. Client très exigeant sur la qualité.",
    is_important: true
  },
  {
    client_id: 5,
    mission_id: null,
    content: "Association avec budget limité mais projet très motivant. Possibilité de réduction tarifaire.",
    is_important: false
  }
];
