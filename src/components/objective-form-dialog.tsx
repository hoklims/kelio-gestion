'use client'

import { useState } from 'react'
import { PremiumDialog, PremiumDialogContent, PremiumDialogHeader, PremiumDialogTitle, PremiumDialogFooter, PremiumDialogTrigger } from '@/components/ui/premium-dialog'
import { Form, FormField, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useObjectives, Objective } from '@/hooks/use-data'
import { Plus, Target } from 'lucide-react'

interface ObjectiveFormProps {
  objective?: Partial<Objective>
  onSuccess?: () => void
  trigger?: React.ReactNode
}

const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

export function ObjectiveFormDialog({ objective, onSuccess, trigger }: ObjectiveFormProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { createObjective, updateObjective } = useObjectives()

  const [formData, setFormData] = useState({
    month: objective?.month || '',
    year: objective?.year || new Date().getFullYear(),
    target_missions: objective?.target_missions || 0,
    target_revenue: objective?.target_revenue || 0
  })

  const isEditing = !!objective?.id

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.month) newErrors.month = 'Le mois est requis'
    if (!formData.year) newErrors.year = 'L\'année est requise'
    if (formData.target_missions < 1) newErrors.target_missions = 'Minimum 1 mission'
    if (formData.target_revenue < 0) newErrors.target_revenue = 'Le montant doit être positif'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      setLoading(true)
      
      if (isEditing && objective?.id) {
        await updateObjective(objective.id, formData)
      } else {
        await createObjective(formData)
      }
      
      setFormData({
        month: '',
        year: new Date().getFullYear(),
        target_missions: 0,
        target_revenue: 0
      })
      setOpen(false)
      onSuccess?.()
    } catch (error) {
      console.error('Error saving objective:', error)
      // In a real app, you'd show a toast notification here
    } finally {
      setLoading(false)
    }
  }

  const defaultTrigger = (
    <Button className="gap-2">
      <Plus className="h-4 w-4" />
      Nouvel objectif
    </Button>
  )

  return (
    <PremiumDialog open={open} onOpenChange={setOpen}>
      <PremiumDialogTrigger asChild>
        {trigger || defaultTrigger}
      </PremiumDialogTrigger>
      <PremiumDialogContent variant="objective" className="sm:max-w-[500px]">
        <PremiumDialogHeader>
          <PremiumDialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-400" />
            {isEditing ? 'Modifier l\'objectif' : 'Nouvel objectif'}
          </PremiumDialogTitle>
        </PremiumDialogHeader>

        <Form onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <FormField>
              <FormLabel className="text-green-400">Mois</FormLabel>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                className="flex h-10 w-full rounded-md border-2 border-green-500/30 bg-background/50 backdrop-blur-sm px-3 py-2 text-sm focus:border-green-500/60 focus:ring-green-500/20 focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
              >
                <option value="">Sélectionner un mois</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              {errors.month && (
                <div className="mt-1 text-sm text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                  {errors.month}
                </div>
              )}
            </FormField>

            <FormField>
              <FormLabel className="text-green-400">Année</FormLabel>
              <Input
                type="number"
                min={2020}
                max={2030}
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="border-2 border-green-500/30 bg-background/50 backdrop-blur-sm focus:border-green-500/60 focus:ring-green-500/20 transition-all duration-300"
              />
              {errors.year && (
                <div className="mt-1 text-sm text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                  {errors.year}
                </div>
              )}
            </FormField>
          </div>

          <FormField>
            <FormLabel className="text-green-400">Objectif missions</FormLabel>
            <Input
              type="number"
              min={1}
              placeholder="Nombre de missions à réaliser"
              value={formData.target_missions}
              onChange={(e) => setFormData({ ...formData, target_missions: parseInt(e.target.value) })}
              className="border-2 border-green-500/30 bg-background/50 backdrop-blur-sm focus:border-green-500/60 focus:ring-green-500/20 transition-all duration-300"
            />
            {errors.target_missions && (
              <div className="mt-1 text-sm text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                {errors.target_missions}
              </div>
            )}
          </FormField>

          <FormField>
            <FormLabel className="text-green-400">Objectif CA (€)</FormLabel>
            <Input
              type="number"
              min={0}
              step={0.01}
              placeholder="Chiffre d'affaires cible"
              value={formData.target_revenue}
              onChange={(e) => setFormData({ ...formData, target_revenue: parseFloat(e.target.value) })}
              className="border-2 border-green-500/30 bg-background/50 backdrop-blur-sm focus:border-green-500/60 focus:ring-green-500/20 transition-all duration-300"
            />
            {errors.target_revenue && (
              <div className="mt-1 text-sm text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                {errors.target_revenue}
              </div>
            )}
          </FormField>

        <PremiumDialogFooter>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="hover:bg-red-500/10 hover:border-red-500/30 transition-all"
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enregistrement...
                </div>
              ) : (
                isEditing ? 'Mettre à jour' : 'Créer'
              )}
            </Button>
          </div>
        </PremiumDialogFooter>
        </Form>
      </PremiumDialogContent>
    </PremiumDialog>
  )
}
