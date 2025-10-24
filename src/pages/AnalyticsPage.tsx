import { useState, useMemo } from 'react'
import { BarChart, PieChart, TrendingUp, Calendar, CheckSquare, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

function AnalyticsPage() {
  // Données mockées pour les statistiques
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  
  const tasksData = [
    { id: 1, title: 'Finaliser le rapport mensuel', priority: 'high', category: 'Travail', completed: false, createdAt: '2024-01-10', completedAt: null },
    { id: 2, title: 'Préparer la présentation client', priority: 'high', category: 'Travail', completed: true, createdAt: '2024-01-08', completedAt: '2024-01-11' },
    { id: 3, title: 'Réviser le code de l\'application', priority: 'medium', category: 'Développement', completed: true, createdAt: '2024-01-05', completedAt: '2024-01-09' },
    { id: 4, title: 'Planifier les réunions de la semaine', priority: 'low', category: 'Organisation', completed: true, createdAt: '2024-01-03', completedAt: '2024-01-06' },
    { id: 5, title: 'Faire les courses', priority: 'medium', category: 'Personnel', completed: false, createdAt: '2024-01-11', completedAt: null },
    { id: 6, title: 'Mettre à jour le portfolio', priority: 'low', category: 'Personnel', completed: true, createdAt: '2024-01-09', completedAt: '2024-01-12' },
    { id: 7, title: 'Formation React avancé', priority: 'medium', category: 'Formation', completed: false, createdAt: '2024-01-07', completedAt: null },
    { id: 8, title: 'Optimiser les performances du site', priority: 'high', category: 'Développement', completed: true, createdAt: '2024-01-06', completedAt: '2024-01-10' },
    { id: 9, title: 'Réunion équipe marketing', priority: 'medium', category: 'Travail', completed: true, createdAt: '2024-01-04', completedAt: '2024-01-08' },
    { id: 10, title: 'Backup des données', priority: 'high', category: 'Technique', completed: true, createdAt: '2024-01-02', completedAt: '2024-01-05' }
  ]

  const stats = useMemo(() => {
    const total = tasksData.length
    const completed = tasksData.filter(task => task.completed).length
    const pending = total - completed
    const completionRate = Math.round((completed / total) * 100)
    
    // Statistiques par priorité
    const priorityStats = {
      high: { total: 0, completed: 0 },
      medium: { total: 0, completed: 0 },
      low: { total: 0, completed: 0 }
    }
    
    // Statistiques par catégorie
    const categoryStats: { [key: string]: { total: number, completed: number } } = {}
    
    tasksData.forEach(task => {
      // Priorité
      priorityStats[task.priority].total++
      if (task.completed) {
        priorityStats[task.priority].completed++
      }
      
      // Catégorie
      if (!categoryStats[task.category]) {
        categoryStats[task.category] = { total: 0, completed: 0 }
      }
      categoryStats[task.category].total++
      if (task.completed) {
        categoryStats[task.category].completed++
      }
    })
    
    // Temps moyen de completion (en jours)
    const completedTasks = tasksData.filter(task => task.completed && task.completedAt)
    const avgCompletionTime = completedTasks.length > 0 
      ? Math.round(
          completedTasks.reduce((acc, task) => {
            const created = new Date(task.createdAt)
            const completed = new Date(task.completedAt!)
            const days = Math.ceil((completed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
            return acc + days
          }, 0) / completedTasks.length
        )
      : 0
    
    return {
      total,
      completed,
      pending,
      completionRate,
      priorityStats,
      categoryStats,
      avgCompletionTime
    }
  }, [tasksData])

  // Données pour le graphique de productivité (derniers 7 jours)
  const productivityData = [
    { day: 'Lun', completed: 3, created: 2 },
    { day: 'Mar', completed: 2, created: 4 },
    { day: 'Mer', completed: 4, created: 1 },
    { day: 'Jeu', completed: 1, created: 3 },
    { day: 'Ven', completed: 5, created: 2 },
    { day: 'Sam', completed: 2, created: 1 },
    { day: 'Dim', completed: 1, created: 0 }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Haute'
      case 'medium': return 'Moyenne'
      case 'low': return 'Basse'
      default: return 'Normale'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Statistiques</h1>
          <p className="text-gray-600">
            Analysez votre productivité et vos performances
          </p>
        </div>
        
        <div className="flex space-x-2 mt-4 lg:mt-0">
          <Button
            variant={selectedPeriod === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('week')}
          >
            Cette semaine
          </Button>
          <Button
            variant={selectedPeriod === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('month')}
          >
            Ce mois
          </Button>
          <Button
            variant={selectedPeriod === 'year' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('year')}
          >
            Cette année
          </Button>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des tâches</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Toutes vos tâches créées
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de réussite</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.completed} sur {stats.total} tâches
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Tâches à terminer
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps moyen</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.avgCompletionTime}</div>
            <p className="text-xs text-muted-foreground">
              Jours pour terminer
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Répartition par priorité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Répartition par priorité</span>
            </CardTitle>
            <CardDescription>
              Distribution de vos tâches selon leur priorité
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.priorityStats).map(([priority, data]) => {
                const percentage = stats.total > 0 ? Math.round((data.total / stats.total) * 100) : 0
                const completionRate = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0
                
                return (
                  <div key={priority} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${getPriorityColor(priority)}`}>
                        {getPriorityLabel(priority)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {data.completed}/{data.total} ({completionRate}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          priority === 'high' ? 'bg-red-500' :
                          priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Productivité hebdomadaire */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="h-5 w-5" />
              <span>Productivité de la semaine</span>
            </CardTitle>
            <CardDescription>
              Tâches créées vs terminées par jour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productivityData.map((day) => (
                <div key={day.day} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{day.day}</span>
                    <div className="flex space-x-4 text-sm">
                      <span className="text-green-600">✓ {day.completed}</span>
                      <span className="text-blue-600">+ {day.created}</span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${Math.min(100, (day.completed / 6) * 100)}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${Math.min(100, (day.created / 6) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Répartition par catégorie */}
      <Card>
        <CardHeader>
          <CardTitle>Performance par catégorie</CardTitle>
          <CardDescription>
            Analysez votre efficacité dans chaque domaine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(stats.categoryStats).map(([category, data]) => {
              const completionRate = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0
              
              return (
                <div key={category} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-900">{category}</h4>
                    <span className={`text-sm font-medium ${
                      completionRate >= 80 ? 'text-green-600' :
                      completionRate >= 50 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {completionRate}%
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Terminées: {data.completed}</span>
                      <span>Total: {data.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          completionRate >= 80 ? 'bg-green-500' :
                          completionRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsPage