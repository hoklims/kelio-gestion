'use client'

import { useState } from 'react'
import { PremiumDialog, PremiumDialogContent, PremiumDialogHeader, PremiumDialogTitle, PremiumDialogFooter } from '@/components/ui/premium-dialog'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormLabel, FormControl, Textarea } from '@/components/ui/form'
import { useClients, type Client } from '@/hooks/use-data'
import { User, Mail, Phone, Building, FileText } from 'lucide-react'

interface ClientFormData {
  name: string
  email: string
  phone: string
  company: string
  notes: string
}

interface ClientFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client?: Client | null
}

export function ClientFormDialog({ open, onOpenChange, client }: ClientFormDialogProps) {
  const { createClient, updateClient } = useClients()
  const [formData, setFormData] = useState<ClientFormData>({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    company: client?.company || '',
    notes: client?.notes || ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      setError('Le nom du client est requis')
      return
    }

    try {
      setLoading(true)
      setError(null)

      if (client) {
        // Mise à jour
        await updateClient(client.id, formData)
      } else {
        // Création
        await createClient(formData)
      }

      onOpenChange(false)
      setFormData({ name: '', email: '', phone: '', company: '', notes: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof ClientFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  return (
    <PremiumDialog open={open} onOpenChange={onOpenChange}>
      <PremiumDialogContent variant="client" className="sm:max-w-[500px]">
        <PremiumDialogHeader>
          <PremiumDialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-400" />
            {client ? 'Modifier le client' : 'Nouveau client'}
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
              <FormLabel className="flex items-center gap-2 text-blue-400">
                <User className="h-4 w-4" />
                Nom du client *
              </FormLabel>
              <FormControl
                type="text"
                placeholder="Nom ou entreprise"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                className="border-2 border-blue-500/30 bg-background/50 backdrop-blur-sm focus:border-blue-500/60 focus:ring-blue-500/20 transition-all duration-300"
              />
            </FormField>

            <FormField>
              <FormLabel className="flex items-center gap-2 text-blue-400">
                <Mail className="h-4 w-4" />
                Email
              </FormLabel>
              <FormControl
                type="email"
                placeholder="contact@exemple.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="border-2 border-blue-500/30 bg-background/50 backdrop-blur-sm focus:border-blue-500/60 focus:ring-blue-500/20 transition-all duration-300"
              />
            </FormField>

            <FormField>
              <FormLabel className="flex items-center gap-2 text-blue-400">
                <Phone className="h-4 w-4" />
                Téléphone
              </FormLabel>
              <FormControl
                type="tel"
                placeholder="+33 1 23 45 67 89"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="border-2 border-blue-500/30 bg-background/50 backdrop-blur-sm focus:border-blue-500/60 focus:ring-blue-500/20 transition-all duration-300"
              />
            </FormField>

            <FormField>
              <FormLabel className="flex items-center gap-2 text-blue-400">
                <Building className="h-4 w-4" />
                Entreprise
              </FormLabel>
              <FormControl
                type="text"
                placeholder="Nom de l'entreprise"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="border-2 border-blue-500/30 bg-background/50 backdrop-blur-sm focus:border-blue-500/60 focus:ring-blue-500/20 transition-all duration-300"
              />
            </FormField>

            <FormField>
              <FormLabel className="flex items-center gap-2 text-blue-400">
                <FileText className="h-4 w-4" />
                Notes
              </FormLabel>
              <Textarea
                placeholder="Notes, besoins spécifiques, historique..."
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={4}
                className="border-2 border-blue-500/30 bg-background/50 backdrop-blur-sm focus:border-blue-500/60 focus:ring-blue-500/20 transition-all duration-300 resize-none"
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
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enregistrement...
                </div>
              ) : (
                client ? 'Mettre à jour' : 'Créer le client'
              )}
            </Button>
          </PremiumDialogFooter>
        </Form>
      </PremiumDialogContent>
    </PremiumDialog>
  )
}
