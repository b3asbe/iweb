import React, { useState } from 'react';
import { Plus, Edit, Trash2, Play, Clock, Target, BookOpen, Search, Filter, Eye } from 'lucide-react';

export const ContentManagement: React.FC = () => {
  const [contents, setContents] = useState([
    {
      id: '1',
      title: 'Introducción a Docker',
      subject: 'Infraestructura TI',
      duration: 10,
      difficulty: 'intermediate',
      objective: 'Comprender los conceptos básicos de containerización',
      contentType: 'video',
      videoUrl: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
      status: 'active',
      views: 156,
      completionRate: 94,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Bases de Datos NoSQL',
      subject: 'Base de Datos',
      duration: 12,
      difficulty: 'advanced',
      objective: 'Entender las diferencias entre SQL y NoSQL',
      contentType: 'interactive',
      videoUrl: '',
      status: 'active',
      views: 142,
      completionRate: 89,
      createdAt: '2024-01-12'
    },
    {
      id: '3',
      title: 'API REST con Node.js',
      subject: 'Desarrollo Web',
      duration: 15,
      difficulty: 'intermediate',
      objective: 'Crear APIs RESTful usando Node.js y Express',
      contentType: 'video',
      videoUrl: 'https://www.youtube.com/watch?v=pKd0Rpw7O48',
      status: 'draft',
      views: 0,
      completionRate: 0,
      createdAt: '2024-01-10'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    duration: 10,
    difficulty: 'basic',
    objective: '',
    contentType: 'video',
    videoUrl: '',
    textContent: '',
    status: 'draft'
  });

  const subjects = ['Desarrollo Web', 'Base de Datos', 'Infraestructura TI', 'Seguridad'];
  const difficulties = [
    { value: 'basic', label: 'Básico' },
    { value: 'intermediate', label: 'Intermedio' },
    { value: 'advanced', label: 'Avanzado' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingContent) {
      setContents(contents.map(c => 
        c.id === editingContent.id 
          ? { 
              ...formData, 
              id: editingContent.id, 
              views: editingContent.views,
              completionRate: editingContent.completionRate,
              createdAt: editingContent.createdAt
            }
          : c
      ));
    } else {
      const newContent = {
        ...formData,
        id: Date.now().toString(),
        views: 0,
        completionRate: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setContents([...contents, newContent]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subject: '',
      duration: 10,
      difficulty: 'basic',
      objective: '',
      contentType: 'video',
      videoUrl: '',
      textContent: '',
      status: 'draft'
    });
    setEditingContent(null);
    setShowModal(false);
  };

  const handleEdit = (content: any) => {
    setFormData(content);
    setEditingContent(content);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este contenido?')) {
      setContents(contents.filter(c => c.id !== id));
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    return difficulties.find(d => d.value === difficulty)?.label || difficulty;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || content.subject === subjectFilter;
    const matchesStatus = statusFilter === 'all' || content.status === statusFilter;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Contenidos</h1>
          <p className="mt-1 text-sm text-gray-600">
            Crea y administra píldoras de conocimiento para tus estudiantes
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nueva Píldora
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-lg p-3">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Contenidos</p>
              <p className="text-2xl font-semibold text-gray-900">{contents.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-lg p-3">
              <Play className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Activos</p>
              <p className="text-2xl font-semibold text-gray-900">
                {contents.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 rounded-lg p-3">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Vistas</p>
              <p className="text-2xl font-semibold text-gray-900">
                {contents.reduce((sum, c) => sum + c.views, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-orange-500 rounded-lg p-3">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Promedio Finalización</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(contents.reduce((sum, c) => sum + c.completionRate, 0) / contents.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar contenidos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas las asignaturas</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="draft">Borradores</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContents.map((content) => (
          <div key={content.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Content Preview */}
            <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              {content.contentType === 'video' && content.videoUrl ? (
                <div className="relative w-full h-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${content.videoUrl.split('v=')[1]?.split('&')[0] || content.videoUrl.split('/').pop()}`}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="text-center">
                  <Play className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-gray-600 capitalize">{content.contentType}</p>
                </div>
              )}
            </div>
            
            {/* Content Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(content.difficulty)}`}>
                  {getDifficultyLabel(content.difficulty)}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {content.duration} min
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{content.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{content.subject}</p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{content.objective}</p>
              
              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {content.views} vistas
                </div>
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  {content.completionRate}% completado
                </div>
              </div>
              
              {/* Status */}
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  content.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {content.status === 'active' ? 'Activo' : 'Borrador'}
                </span>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(content)}
                  className="flex-1 flex items-center justify-center px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(content.id)}
                  className="px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingContent ? 'Editar Contenido' : 'Nueva Píldora de Conocimiento'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Asignatura *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar asignatura</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duración (minutos) *
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="15"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dificultad *
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {difficulties.map(diff => (
                      <option key={diff.value} value={diff.value}>{diff.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Contenido *
                  </label>
                  <select
                    value={formData.contentType}
                    onChange={(e) => setFormData({...formData, contentType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="video">Video</option>
                    <option value="text">Texto</option>
                    <option value="interactive">Interactivo</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Borrador</option>
                    <option value="active">Activo</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Objetivo de Aprendizaje *
                </label>
                <textarea
                  required
                  value={formData.objective}
                  onChange={(e) => setFormData({...formData, objective: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe qué aprenderá el estudiante con este contenido"
                />
              </div>
              
              {formData.contentType === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL del Video (YouTube) *
                  </label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              )}
              
              {formData.contentType === 'text' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contenido de Texto *
                  </label>
                  <textarea
                    value={formData.textContent}
                    onChange={(e) => setFormData({...formData, textContent: e.target.value})}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Escribe el contenido educativo aquí..."
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingContent ? 'Actualizar' : 'Crear'} Contenido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};