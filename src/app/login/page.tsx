'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PremiumCard } from '@/components/ui/premium-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User, Shield, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Rediriger vers la page demandée ou le dashboard
        const redirect = new URLSearchParams(window.location.search).get('redirect');
        router.push(redirect || '/dashboard');
      } else {
        setError(data.error || 'Erreur de connexion');
      }
    } catch {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Kelio Gestion
          </h1>
          <p className="text-muted-foreground mt-2">
            Accès administrateur sécurisé
          </p>
        </div>

        {/* Formulaire de connexion */}
        <PremiumCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Message d'erreur */}
            {error && (
              <div className="p-4 text-sm text-red-400 bg-gradient-to-r from-red-500/20 to-red-600/20 border-2 border-red-500/30 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  {error}
                </div>
              </div>
            )}

            {/* Nom d'utilisateur */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Nom d&apos;utilisateur
              </label>
              <Input
                type="text"
                value={formData.username}
                onChange={handleChange('username')}
                placeholder="Entrez votre nom d'utilisateur"
                required
                disabled={loading}
                className="border-2 border-blue-500/30 bg-background/50 backdrop-blur-sm focus:border-blue-500/60 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            {/* Mot de passe */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Mot de passe
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange('password')}
                  placeholder="Entrez votre mot de passe"
                  required
                  disabled={loading}
                  className="border-2 border-blue-500/30 bg-background/50 backdrop-blur-sm focus:border-blue-500/60 focus:ring-blue-500/20 transition-all duration-300 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Bouton de connexion */}
            <Button
              type="submit"
              disabled={loading || !formData.username || !formData.password}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connexion...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Se connecter
                </div>
              )}
            </Button>
          </form>
        </PremiumCard>

        {/* Informations de sécurité */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>🔒 Connexion sécurisée avec chiffrement JWT</p>
          <p className="mt-1">Session expirée après 24 heures d&apos;inactivité</p>
        </div>
      </div>
    </div>
  );
}
