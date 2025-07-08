'use client'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  CreditCard,
  Target,
  PieChart as PieChartIcon,
  BarChart3,
  Calendar,
  Filter,
  Download
} from 'lucide-react'
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Area,
  AreaChart
} from 'recharts'

interface FinancialData {
  totalRevenue: number
  totalPaid: number
  totalPending: number
  totalAdvances: number
  monthlyData: Array<{
    month: string
    revenue: number
    missions: number
  }>
  statusData: Array<{
    name: string
    value: number
    color: string
  }>
}


export default function FinancesPage() {
  const [data, setData] = useState<FinancialData>({
    totalRevenue: 0,
    totalPaid: 0,
    totalPending: 0,
    totalAdvances: 0,
    monthlyData: [],
    statusData: []
  })
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration
  useEffect(() => {
    const mockData: FinancialData = {
      totalRevenue: 150000,
      totalPaid: 120000,
      totalPending: 30000,
      totalAdvances: 45000,
      monthlyData: [
        { month: 'Jan', revenue: 15000, missions: 8 },
        { month: 'Fév', revenue: 18000, missions: 10 },
        { month: 'Mar', revenue: 22000, missions: 12 },
        { month: 'Avr', revenue: 19000, missions: 9 },
        { month: 'Mai', revenue: 25000, missions: 14 },
        { month: 'Jun', revenue: 28000, missions: 16 }
      ],
      statusData: [
        { name: 'Payées', value: 120000, color: 'oklch(0.7 0.15 160)' },
        { name: 'En attente', value: 30000, color: 'oklch(0.7 0.15 40)' },
        { name: 'En cours', value: 45000, color: 'oklch(0.7 0.15 250)' }
      ]
    }
    
    setTimeout(() => {
      setData(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        <div className="h-8 bg-muted rounded-lg w-64"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-xl"></div>
          ))}
        </div>
      </div>
    )
  }

  const revenueGrowth = data.monthlyData.length > 1 
    ? ((data.monthlyData[data.monthlyData.length - 1].revenue - data.monthlyData[data.monthlyData.length - 2].revenue) / data.monthlyData[data.monthlyData.length - 2].revenue) * 100
    : 0

  const kpis = [
    {
      title: 'Chiffre d&apos;affaires total',
      value: `${data.totalRevenue.toLocaleString('fr-FR')} €`,
      change: `+${revenueGrowth.toFixed(1)}%`,
      changeType: revenueGrowth >= 0 ? 'positive' : 'negative',
      icon: DollarSign,
      gradient: 'from-green-500/20 to-emerald-600/20',
      border: 'border-green-500/30',
      iconBg: 'bg-green-500/20 text-green-400'
    },
    {
      title: 'Montants payés',
      value: `${data.totalPaid.toLocaleString('fr-FR')} €`,
      change: `${((data.totalPaid / data.totalRevenue) * 100).toFixed(1)}%`,
      changeType: 'positive',
      icon: CreditCard,
      gradient: 'from-blue-500/20 to-blue-600/20',
      border: 'border-blue-500/30',
      iconBg: 'bg-blue-500/20 text-blue-400'
    },
    {
      title: 'En attente de paiement',
      value: `${data.totalPending.toLocaleString('fr-FR')} €`,
      change: `${((data.totalPending / data.totalRevenue) * 100).toFixed(1)}%`,
      changeType: 'warning',
      icon: Target,
      gradient: 'from-orange-500/20 to-orange-600/20',
      border: 'border-orange-500/30',
      iconBg: 'bg-orange-500/20 text-orange-400'
    },
    {
      title: 'Avances versées',
      value: `${data.totalAdvances.toLocaleString('fr-FR')} €`,
      change: `${((data.totalAdvances / data.totalRevenue) * 100).toFixed(1)}%`,
      changeType: 'neutral',
      icon: TrendingUp,
      gradient: 'from-purple-500/20 to-purple-600/20',
      border: 'border-purple-500/30',
      iconBg: 'bg-purple-500/20 text-purple-400'
    }
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header avec actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Finances
          </h1>
          <p className="text-muted-foreground mt-2">
            Vue d&apos;ensemble de vos performances financières
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtres
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card 
              key={kpi.title}
              className={`
                card relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl 
                bg-gradient-to-br ${kpi.gradient} ${kpi.border}
                animate-fade-in-up
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardDescription>
                  <div className={`p-3 rounded-xl bg-background/50 backdrop-blur-sm ${kpi.iconBg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {kpi.value}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {kpi.changeType === 'positive' && <ArrowUpRight className="h-3 w-3 text-green-400" />}
                      {kpi.changeType === 'negative' && <ArrowDownRight className="h-3 w-3 text-red-400" />}
                      <span className={`text-xs font-medium ${
                        kpi.changeType === 'positive' ? 'text-green-400' :
                        kpi.changeType === 'negative' ? 'text-red-400' :
                        kpi.changeType === 'warning' ? 'text-orange-400' :
                        'text-muted-foreground'
                      }`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Evolution Chart */}
        <Card className="card relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              Évolution du chiffre d&apos;affaires
            </CardTitle>
            <CardDescription>Progression mensuelle des revenus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.monthlyData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.7 0.15 250)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="oklch(0.7 0.15 250)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0.05 240)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="oklch(0.7 0.05 240)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="oklch(0.7 0.05 240)"
                    fontSize={12}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'oklch(0.28 0.05 240)',
                      border: '1px solid oklch(0.5 0.1 240)',
                      borderRadius: '12px',
                      color: 'oklch(0.9 0.05 240)'
                    }}
                    formatter={(value: number) => [`${value.toLocaleString('fr-FR')} €`, 'Revenus']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="oklch(0.7 0.15 250)" 
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution Chart */}
        <Card className="card relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-violet-600/10 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-purple-400" />
              Répartition des revenus
            </CardTitle>
            <CardDescription>Distribution par statut de paiement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'oklch(0.28 0.05 240)',
                      border: '1px solid oklch(0.5 0.1 240)',
                      borderRadius: '12px',
                      color: 'oklch(0.9 0.05 240)'
                    }}
                    formatter={(value: number) => [`${value.toLocaleString('fr-FR')} €`, 'Montant']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {data.statusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card group cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl relative overflow-hidden bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/20 text-green-400">
                <Download className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Export financier</h3>
                <p className="text-sm text-muted-foreground">Exporter les données comptables</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card group cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Rapport mensuel</h3>
                <p className="text-sm text-muted-foreground">Générer le bilan du mois</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card group cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-red-600/10 border-orange-500/20">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-500/20 text-orange-400">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Relances clients</h3>
                <p className="text-sm text-muted-foreground">Gérer les impayés</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
