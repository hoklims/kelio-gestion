'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Badge from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useClients, type Client } from '@/hooks/use-data'
import { ClientFormDialog } from '@/components/client-form-dialog'
import { 
  Users, 
  Search,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  Building,
  Calendar,
  TrendingUp,
  Edit,
  Plus,
  Archive,
  Loader2
} from 'lucide-react'

// Component pour les stats en header
function ClientStats({ totalClients }: { totalClients: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in-up">
      <Card className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-1">
                Clients actifs
              </p>
              <p className="text-2xl font-bold text-foreground">{totalClients}</p>
            </div>
            <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm text-blue-400">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-1">
                Nouveaux ce mois
              </p>
              <p className="text-2xl font-bold text-foreground">3</p>
            </div>
            <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm text-green-400">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-1">
                Taux de rétention
              </p>
              <p className="text-2xl font-bold text-foreground">92%</p>
            </div>
            <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm text-purple-400">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Component pour une card client
function ClientCard({ client, onEdit, onArchive }: { 
  client: Client, 
  onEdit: (client: Client) => void,
  onArchive: (client: Client) => void
}) {
  const [showActions, setShowActions] = useState(false)

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-neutral-500/10 to-neutral-600/10 border-neutral-500/20">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
              {client.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{client.name}</h3>
              {client.company && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  {client.company}
                </p>
              )}
            </div>
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
                    onEdit(client)
                    setShowActions(false)
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-accent flex items-center gap-2 text-sm"
                >
                  <Edit className="h-4 w-4" />
                  Modifier
                </button>
                <button
                  onClick={() => {
                    onArchive(client)
                    setShowActions(false)
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-accent flex items-center gap-2 text-sm text-orange-400"
                >
                  <Archive className="h-4 w-4" />
                  Archiver
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {client.email && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              {client.email}
            </div>
          )}
          
          {client.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              {client.phone}
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Créé le {new Date(client.created_at).toLocaleDateString('fr-FR')}
          </div>
        </div>

        {client.notes && (
          <div className="mt-4 p-3 bg-background/50 rounded-lg">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {client.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function ClientsPage() {
  const { clients, loading, error, archiveClient } = useClients()
  const [searchTerm, setSearchTerm] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (client: Client) => {
    setSelectedClient(client)
    setShowDialog(true)
  }

  const handleArchive = async (client: Client) => {
    if (confirm(`Êtes-vous sûr de vouloir archiver le client "${client.name}" ?`)) {
      try {
        await archiveClient(client.id)
      } catch (error) {
        console.error('Erreur lors de l\'archivage:', error)
      }
    }
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
    setSelectedClient(null)
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
            Gestion des Clients
          </h1>
          <p className="text-muted-foreground">
            Gérez vos clients et leurs informations
          </p>
        </div>
        <Button 
          onClick={() => setShowDialog(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau client
        </Button>
      </div>

      {/* Stats */}
      <ClientStats totalClients={clients.length} />

      {/* Barre de recherche */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
      </div>

      {/* Liste des clients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onEdit={handleEdit}
            onArchive={handleArchive}
          />
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {searchTerm ? 'Aucun client trouvé' : 'Aucun client'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm 
              ? 'Essayez de modifier votre recherche' 
              : 'Commencez par ajouter votre premier client'
            }
          </p>
          {!searchTerm && (
            <Button onClick={() => setShowDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un client
            </Button>
          )}
        </div>
      )}

      {/* Dialog pour créer/éditer un client */}
      <ClientFormDialog
        open={showDialog}
        onOpenChange={handleCloseDialog}
        client={selectedClient}
      />
    </div>
  )
}
