'use client'

import { useState, useEffect } from 'react'
import { PremiumDialog, PremiumDialogContent, PremiumDialogHeader, PremiumDialogTitle, PremiumDialogFooter } from '@/components/ui/premium-dialog'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormLabel, FormControl, Select, Textarea } from '@/components/ui/form'
import { useClients, useMissions, type Mission } from '@/hooks/use-data'
import { Briefcase, User, Calendar, DollarSign, FileText, Target } from 'lucide-react'

interface MissionFormData {
  title: string
  description: string
  client_id: string
  deadline: string
  total_amount: string
  advance_amount: string
  status: 'pending' | 'in_progress' | 'completed' | 'paid'
  notes: string
}

interface MissionFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mission?: Mission | null
}

export function MissionFormDialog({ open, onOpenChange, mission }: MissionFormDialogProps) {
  const { clients } = useClients()
  const { createMission, updateMission } = useMissions()
  const [formData, setFormData] = useState<MissionFormData>({
    title: mission?.title || '',
    description: mission?.description || '',
    client_id: mission?.client_id || '',
    deadline: mission?.deadline || '',
    total_amount: mission?.total_amount?.toString() || '',
    advance_amount: mission?.advance_amount?.toString() || '',
    status: mission?.status || 'pending',
    notes: mission?.notes || ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Réinitialiser le formulaire quand la mission change
  useEffect(() => {
    if (mission) {
      setFormData({
        title: mission.title || '',
        description: mission.description || '',
        client_id: mission.client_id || '',
        deadline: mission.deadline || '',
        total_amount: mission.total_amount?.toString() || '',
        advance_amount: mission.advance_amount?.toString() || '',
        status: mission.status || 'pending',
        notes: mission.notes || ''
      })
    } else {
      setFormData({
        title: '',
        description: '',
        client_id: '',
        deadline: '',
        total_amount: '',
        advance_amount: '',
        status: 'pending',
        notes: ''
      })
    }
  }, [mission])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      setError('Le titre de la mission est requis')
      return
    }

    if (!formData.client_id) {
      setError('Veuillez sélectionner un client')
      return
    }

    if (!formData.total_amount || isNaN(Number(formData.total_amount))) {
      setError('Le montant total doit être un nombre valide')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const missionData = {
        ...formData,
        total_amount: Number(formData.total_amount),
        advance_amount: Number(formData.advance_amount) || 0,
        deadline: formData.deadline || undefined
      }

      if (mission) {
        // Mise à jour
        await updateMission(mission.id, missionData)
      } else {
        // Création
        await createMission(missionData)
      }

      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof MissionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const statusOptions = [
    { value: 'pending', label: 'En attente', color: 'orange' },
    { value: 'in_progress', label: 'En cours', color: 'blue' },
    { value: 'completed', label: 'Terminée', color: 'green' },
    { value: 'paid', label: 'Payée', color: 'emerald' }
  ]

  return (
    <PremiumDialog open={open} onOpenChange={onOpenChange}>
      <PremiumDialogContent variant="mission" className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <PremiumDialogHeader>
          <PremiumDialogTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-purple-400" />
            {mission ? 'Modifier la mission' : 'Nouvelle mission'}
          </PremiumDialogTitle>
        </PremiumDialogHeader>

        <Form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {error && (
              <div className="p-4 text-sm text-red-400 bg-gradient-to-r from-red-500/20 to-red-600/20 border-2 border-red-500/30 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  {error}
                </div>
              </div>
            )}

            <FormField>
              <FormLabel className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Titre de la mission *
              </FormLabel>
              <FormControl
                type="text"
                placeholder="Ex: Refonte site web, Application mobile..."
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </FormField>

            <FormField>
              <FormLabel className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Client *
              </FormLabel>
              <Select
                value={formData.client_id}
                onChange={(e) => handleChange('client_id', e.target.value)}
                required
              >
                <option value="">Sélectionner un client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name} {client.company && `(${client.company})`}
                  </option>
                ))}
              </Select>
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField>
                <FormLabel className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Montant total (€) *
                </FormLabel>
                <FormControl
                  type="number"
                  placeholder="5000"
                  value={formData.total_amount}
                  onChange={(e) => handleChange('total_amount', e.target.value)}
                  required
                  min="0"
                  step="0.01"
                />
              </FormField>

              <FormField>
                <FormLabel className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Acompte (€)
                </FormLabel>
                <FormControl
                  type="number"
                  placeholder="1500"
                  value={formData.advance_amount}
                  onChange={(e) => handleChange('advance_amount', e.target.value)}
                  min="0"
                  step="0.01"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField>
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date limite
                </FormLabel>
                <FormControl
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleChange('deadline', e.target.value)}
                />
              </FormField>

              <FormField>
                <FormLabel className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Statut
                </FormLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value as MissionFormData['status'])}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormField>
            </div>

            <FormField>
              <FormLabel className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Description
              </FormLabel>
              <Textarea
                placeholder="Description détaillée de la mission, objectifs, livrables..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
              />
            </FormField>

            <FormField>
              <FormLabel className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Notes internes
              </FormLabel>
              <Textarea
                placeholder="Notes stratégiques, points d'attention, historique..."
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={3}
              />
            </FormField>
          </div>

          <PremiumDialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="hover:bg-red-500/10 hover:border-red-500/30 transition-all"
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enregistrement...
                </div>
              ) : (
                mission ? 'Mettre à jour' : 'Créer la mission'
              )}
            </Button>
          </PremiumDialogFooter>
        </Form>
      </PremiumDialogContent>
    </PremiumDialog>
  )
}
