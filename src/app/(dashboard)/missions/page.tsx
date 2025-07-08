'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Badge from '@/components/ui/badge'
import { useMissions, useClients, type Mission } from '@/hooks/use-data'
import { MissionFormDialog } from '@/components/mission-form-dialog'
import { 
  Briefcase, 
  Search,
  Filter,
  MoreVertical,
  Calendar,
  DollarSign,
  User,
  Eye,
  Edit,
  TrendingUp,
  Target,
  Plus,
  Trash2,
  Loader2,
  Euro,
  Clock
} from 'lucide-react'

// Component pour les stats des missions
function MissionStats({ missions }: { missions: Mission[] }) {
  const totalMissions = missions.length
  const completedMissions = missions.filter(m => m.status === 'completed').length
  const totalRevenue = missions.reduce((sum, m) => sum + m.total_amount, 0)
  const averageAmount = totalMissions > 0 ? totalRevenue / totalMissions : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-fade-in-up">
      <Card className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-1">
                Total missions
              </p>
              <p className="text-2xl font-bold text-foreground">{totalMissions}</p>
            </div>
            <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm text-blue-400">
              <Briefcase className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-1">
                Terminées
              </p>
              <p className="text-2xl font-bold text-foreground">{completedMissions}</p>
            </div>
            <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm text-green-400">
              <Target className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-1">
                Chiffre total
              </p>
              <p className="text-2xl font-bold text-foreground">{(totalRevenue / 1000).toFixed(0)}k€</p>
            </div>
            <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm text-purple-400">
              <Euro className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-1">
                Montant moyen
              </p>
              <p className="text-2xl font-bold text-foreground">{(averageAmount / 1000).toFixed(0)}k€</p>
            </div>
            <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm text-orange-400">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Fonction pour obtenir la couleur du statut
function getStatusColor(status: string) {
  switch (status) {
    case 'pending':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    case 'in_progress':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'completed':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'paid':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

// Fonction pour obtenir le label du statut
function getStatusLabel(status: string) {
  switch (status) {
    case 'pending': return 'En attente'
    case 'in_progress': return 'En cours'
    case 'completed': return 'Terminée'
    case 'paid': return 'Payée'
    default: return status
  }
}

// Component pour une card mission
function MissionCard({ mission, onEdit, onDelete }: { 
  mission: Mission, 
  onEdit: (mission: Mission) => void,
  onDelete: (mission: Mission) => void
}) {
  const [showActions, setShowActions] = useState(false)

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-neutral-500/10 to-neutral-600/10 border-neutral-500/20">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">{mission.title}</h3>
            <Badge className={`text-xs border ${getStatusColor(mission.status)}`}>
              {getStatusLabel(mission.status)}
            </Badge>
          </div>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowActions(!showActions)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
            
            {showActions && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-background border rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    onEdit(mission)
                    setShowActions(false)
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-accent flex items-center gap-2 text-sm"
                >
                  <Edit className="h-4 w-4" />
                  Modifier
                </button>
                <button
                  onClick={() => {
                    onDelete(mission)
                    setShowActions(false)
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-accent flex items-center gap-2 text-sm text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            {mission.client_name || 'Client non défini'}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            {mission.total_amount.toLocaleString('fr-FR')} €
            {mission.advance_amount > 0 && (
              <span className="text-xs text-green-400">
                (Acompte: {mission.advance_amount.toLocaleString('fr-FR')} €)
              </span>
            )}
          </div>
          
          {mission.deadline && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Échéance: {new Date(mission.deadline).toLocaleDateString('fr-FR')}
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Créée le {new Date(mission.created_at).toLocaleDateString('fr-FR')}
          </div>
        </div>

        {mission.description && (
          <div className="mt-4 p-3 bg-background/50 rounded-lg">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {mission.description}
            </p>
          </div>
        )}

        {mission.notes && (
          <div className="mt-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-sm text-blue-400 line-clamp-2">
              📝 {mission.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function MissionsPage() {
  const { missions, loading, error, deleteMission } = useMissions()
  const { clients } = useClients()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showDialog, setShowDialog] = useState(false)
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)

  const filteredMissions = missions.filter(mission => {
    const matchesSearch = 
      mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || mission.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleEdit = (mission: Mission) => {
    setSelectedMission(mission)
    setShowDialog(true)
  }

  const handleDelete = async (mission: Mission) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la mission "${mission.title}" ?`)) {
      try {
        await deleteMission(mission.id)
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
        alert('Erreur lors de la suppression de la mission')
      }
    }
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
    setSelectedMission(null)
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Gestion des Missions
          </h1>
          <p className="text-muted-foreground">
            Suivez vos projets et leurs avancement
          </p>
        </div>
        <Button 
          onClick={() => setShowDialog(true)}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
          disabled={clients.length === 0}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle mission
        </Button>
      </div>

      {/* Stats */}
      <MissionStats missions={missions} />

      {/* Filtres et recherche */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher une mission..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg bg-background text-sm"
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="in_progress">En cours</option>
          <option value="completed">Terminées</option>
          <option value="paid">Payées</option>
        </select>
        
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
      </div>

      {/* Message si pas de clients */}
      {clients.length === 0 && (
        <div className="text-center py-8 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <p className="text-orange-400 mb-2">Aucun client disponible</p>
          <p className="text-sm text-muted-foreground">
            Vous devez d'abord créer des clients avant de pouvoir créer des missions.
          </p>
        </div>
      )}

      {/* Liste des missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMissions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredMissions.length === 0 && clients.length > 0 && (
        <div className="text-center py-12">
          <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {searchTerm || statusFilter !== 'all' ? 'Aucune mission trouvée' : 'Aucune mission'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== 'all'
              ? 'Essayez de modifier vos filtres de recherche' 
              : 'Commencez par créer votre première mission'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Button onClick={() => setShowDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Créer une mission
            </Button>
          )}
        </div>
      )}

      {/* Dialog pour créer/éditer une mission */}
      <MissionFormDialog
        open={showDialog}
        onOpenChange={handleCloseDialog}
        mission={selectedMission}
      />
    </div>
  )
}
