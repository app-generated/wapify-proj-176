import { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash, Check, X } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'

interface Task {
  id: number
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  category: string
  completed: boolean
  dueDate: string
  createdAt: string
}

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Finaliser le rapport mensuel',
      description: 'Compiler les données de vente et créer le rapport pour la direction',
      priority: 'high',
      category: 'Travail',
      completed: false,
      dueDate: '2024-01-15',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      title: 'Préparer la présentation client',
      description: 'Créer les slides pour la réunion avec le client ABC Corp',
      priority: 'high',
      category: 'Travail',
      completed: false,
      dueDate: '2024-01-12',
      createdAt: '2024-01-08'
    },
    {
      id: 3,
      title: 'Réviser le code de l\'application',
      description: 'Code review de la nouvelle fonctionnalité de paiement',
      priority: 'medium',
      category: 'Développement',
      completed: true,
      dueDate: '2024-01-10',
      createdAt: '2024-01-05'
    },
    {
      id: 4,
      title: 'Planifier les réunions de la semaine',
      description: 'Organiser les créneaux pour toutes les réunions importantes',
      priority: 'low',
      category: 'Organisation',
      completed: true,
      dueDate: '2024-01-08',
      createdAt: '2024-01-03'
    },
    {
      id: 5,
      title: 'Faire les courses',
      description: 'Acheter les ingrédients pour le dîner de samedi',
      priority: 'medium',
      category: 'Personnel',
      completed: false,
      dueDate: '2024-01-13',
      createdAt: '2024-01-11'
    },
    {
      id: 6,
      title: 'Mettre à jour le portfolio',
      description: 'Ajouter les nouveaux projets et améliorer le design',
      priority: 'low',
      category: 'Personnel',
      completed: false,
      dueDate: '2024-01-20',
      createdAt: '2024-01-09'
    },
    {
      id: 7,
      title: 'Formation React avancé',
      description: 'Suivre le cours en ligne sur les hooks avancés',
      priority: 'medium',
      category: 'Formation',
      completed: false,
      dueDate: '2024-01-18',
      createdAt: '2024-01-07'
    },
    {
      id: 8,
      title: 'Optimiser les performances du site',
      description: 'Analyser et améliorer les temps de chargement',
      priority: 'high',
      category: 'Développement',
      completed: false,
      dueDate: '2024-01-16',
      createdAt: '2024-01-06'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    category: '',
    dueDate: ''
  })

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'pending' && !task.completed)
    
    return matchesSearch && matchesPriority && matchesStatus
  })

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.title.trim()) return

    const task: Task = {
      id: Math.max(...tasks.map(t => t.id)) + 1,
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      category: newTask.category || 'Général',
      completed: false,
      dueDate: newTask.dueDate,
      createdAt: new Date().toISOString().split('T')[0]
    }

    setTasks([task, ...tasks])
    setNewTask({ title: '', description: '', priority: 'medium', category: '', dueDate: '' })
    setShowAddForm(false)
  }

  const handleEditTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTask) return

    setTasks(tasks.map(task => 
      task.id === editingTask.id ? editingTask : task
    ))
    setEditingTask(null)
  }

  const handleDeleteTask = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Tâches</h1>
          <p className="text-gray-600">
            Gérez et organisez toutes vos tâches en un seul endroit
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="mt-4 lg:mt-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle tâche
        </Button>
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ajouter une nouvelle tâche</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre *
                  </label>
                  <Input
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Titre de la tâche"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <Input
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    placeholder="ex: Travail, Personnel"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Description détaillée de la tâche"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priorité
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date d'échéance
                  </label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button type="submit">
                  Ajouter la tâche
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Formulaire d'édition */}
      {editingTask && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Modifier la tâche</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEditTask} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre *
                  </label>
                  <Input
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <Input
                    value={editingTask.category}
                    onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priorité
                  </label>
                  <select
                    value={editingTask.priority}
                    onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date d'échéance
                  </label>
                  <Input
                    type="date"
                    value={editingTask.dueDate}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button type="submit">
                  Sauvegarder
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditingTask(null)}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Filtres et recherche */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une tâche..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Toutes priorités</option>
                <option value="high">Haute</option>
                <option value="medium">Moyenne</option>
                <option value="low">Basse</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous statuts</option>
                <option value="pending">En cours</option>
                <option value="completed">Terminées</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des tâches */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucune tâche trouvée</p>
              <p className="text-gray-400 mt-2">Essayez de modifier vos filtres ou ajoutez une nouvelle tâche</p>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} className={`transition-all hover:shadow-md ${
              task.completed ? 'opacity-75' : ''
            }`}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {task.completed && <Check className="h-3 w-3" />}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`text-lg font-semibold ${
                          task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                          getPriorityColor(task.priority)
                        }`}>
                          {getPriorityLabel(task.priority)}
                        </span>
                      </div>
                      
                      <p className={`text-gray-600 mb-3 ${
                        task.completed ? 'line-through' : ''
                      }`}>
                        {task.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>📁 {task.category}</span>
                        {task.dueDate && (
                          <span>📅 Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                        )}
                        <span>📝 Créée le: {new Date(task.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingTask(task)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default TasksPage