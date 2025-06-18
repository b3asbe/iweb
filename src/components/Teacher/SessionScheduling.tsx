import React, { useState } from 'react';
import { Plus, Calendar, Clock, Users, Edit, Trash2, Play, Pause, Settings } from 'lucide-react';

export const SessionScheduling: React.FC = () => {
  const [sessions, setSessions] = useState([
    {
      id: '1',
      contentId: '1',
      contentTitle: 'Introducción a Docker',
      subject: 'Infraestructura TI',
      scheduledDate: '2024-01-20',
      scheduledTime: '19:00',
      duration: 10,
      type: 'pre-class',
      status: 'scheduled',
      enrolledStudents: 42,
      completedStudents: 0,
      autoRelease: true,
      reminderSent: false
    },
    {
      id: '2',
      contentId: '2',
      contentTitle: 'Bases de Datos NoSQL',
      subject: 'Base de Datos',
      scheduledDate: '2024-01-22',
      scheduledTime: '19:30',
      duration: 12,
      type: 'post-class',
      status: 'active',
      enrolledStudents: 38,
      completedStudents: 25,
      autoRelease: true,
      reminderSent: true
    },
    {
      id: '3',
      contentId: '3',
      contentTitle: 'API REST con Node.js',
      subject: 'Desarrollo Web',
      scheduledDate: '2024-01-24',
      scheduledTime: '18:00',
      duration: 15,
      type: 'reinforcement',
      status: 'completed',
      enrolledStudents: 40,
      completedStudents: 37,
      autoRelease: false,
      reminderSent: true
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingSession, setEditingSession] = useState<any>(null);

  const [formData, setFormData] = useState({
    contentId: '',
    scheduledDate: '',
    scheduledTime: '',
    type: 'pre-class',
    autoRelease: true,
    sendReminder: true,
    reminderTime: 30 // minutes before
  });

  const contents = [
    { id: '1', title: 'Introducción a Docker', subject: 'Infraestructura TI', duration: 10 },
    { id: '2', title: 'Bases de Datos NoSQL', subject: 'Base de Datos', duration: 12 },
    { id: '3', title: 'API REST con Node.js', subject: 'Desarrollo Web', duration: 15 },
    { id: '4', title: 'Kubernetes Básico', subject: 'Infraestructura TI', duration: 8 },
    { id: '5', title: 'Seguridad en APIs', subject: 'Desarrollo Web', duration: 10 }
  ];

  const sessionTypes = [
    { value: 'pre-class', label: 'Pre-clase', description: 'Antes de la clase presencial' },
    { value: 'post-class', label: 'Post-clase', description: 'Después de la clase presencial' },
    { value: 'reinforcement', label: 'Refuerzo', description: 'Contenido de refuerzo' },
    { value: 'evaluation', label: 'Evaluación', description: 'Sesión de evaluación' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedContent = contents.find(c => c.id === formData.contentId);
    
    if (editingSession) {
      setSessions(sessions.map(s => 
        s.id === editingSession.id 
          ? { 
              ...s,
              ...formData,
              contentTitle: selectedContent?.title || '',
              subject: selectedContent?.subject || '',
              duration: selectedContent?.duration || 10
            }
          : s
      ));
    } else {
      const newSession = {
        ...formData,
        id: Date.now().toString(),
        contentTitle: selectedContent?.title || '',
        subject: selectedContent?.subject || '',
        duration: selectedContent?.duration || 10,
        status: 'scheduled',
        enrolledStudents: 42, // Mock data
        completedStudents: 0,
        reminderSent: false
      };
      setSessions([...sessions, newSession]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      contentId: '',
      scheduledDate: '',
      scheduledTime: '',
      type: 'pre-class',
      autoRelease: true,
      sendReminder: true,
      reminderTime: 30
    });
    setEditingSession(null);
    setShowModal(false);
  };

  const handleEdit = (session: any) => {
    setFormData({
      contentId: session.contentId,
      scheduledDate: session.scheduledDate,
      scheduledTime: session.scheduledTime,
      type: session.type,
      autoRelease: session.autoRelease,
      sendReminder: true,
      reminderTime: 30
    });
    setEditingSession(session);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta sesión programada?')) {
      setSessions(sessions.filter(s => s.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setSessions(sessions.map(s => 
      s.id === id ? { ...s, status: newStatus } : s
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pre-class': return 'bg-blue-100 text-blue-800';
      case 'post-class': return 'bg-green-100 text-green-800';
      case 'reinforcement': return 'bg-purple-100 text-purple-800';
      case 'evaluation': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    return sessionTypes.find(t => t.value === type)?.label || type;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programación de Sesiones</h1>
          <p className="mt-1 text-sm text-gray-600">
            Programa y gestiona la liberación automática de contenidos
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Programar Sesión
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-lg p-3">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sesiones Programadas</p>
              <p className="text-2xl font-semibold text-gray-900">
                {sessions.filter(s => s.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-lg p-3">
              <Play className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sesiones Activas</p>
              <p className="text-2xl font-semibold text-gray-900">
                {sessions.filter(s => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 rounded-lg p-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Participación Promedio</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(sessions.reduce((sum, s) => sum + (s.completedStudents / s.enrolledStudents * 100), 0) / sessions.length)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-orange-500 rounded-lg p-3">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Próxima Sesión</p>
              <p className="text-lg font-semibold text-gray-900">Hoy 19:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contenido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{session.contentTitle}</div>
                      <div className="text-sm text-gray-500">{session.subject}</div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{session.duration} min</span>
                        {session.autoRelease && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Auto
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{session.scheduledDate}</div>
                    <div className="text-sm text-gray-500">{session.scheduledTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(session.type)}`}>
                      {getTypeLabel(session.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900">
                        {session.completedStudents}/{session.enrolledStudents}
                      </div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(session.completedStudents / session.enrolledStudents) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">
                        {Math.round((session.completedStudents / session.enrolledStudents) * 100)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={session.status}
                      onChange={(e) => handleStatusChange(session.id, e.target.value)}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(session.status)}`}
                    >
                      <option value="scheduled">Programada</option>
                      <option value="active">Activa</option>
                      <option value="completed">Completada</option>
                      <option value="cancelled">Cancelada</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(session)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(session.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        title="Configurar"
                      >
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingSession ? 'Editar Sesión Programada' : 'Programar Nueva Sesión'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contenido *
                </label>
                <select
                  required
                  value={formData.contentId}
                  onChange={(e) => setFormData({...formData, contentId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Seleccionar contenido</option>
                  {contents.map(content => (
                    <option key={content.id} value={content.id}>
                      {content.title} - {content.subject} ({content.duration} min)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Liberación *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hora de Liberación *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.scheduledTime}
                    onChange={(e) => setFormData({...formData, scheduledTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Sesión *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {sessionTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} - {type.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Configuraciones</h3>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.autoRelease}
                    onChange={(e) => setFormData({...formData, autoRelease: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Liberación automática en la fecha y hora programada
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.sendReminder}
                    onChange={(e) => setFormData({...formData, sendReminder: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Enviar recordatorio a estudiantes
                  </span>
                </label>

                {formData.sendReminder && (
                  <div className="ml-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tiempo de recordatorio (minutos antes)
                    </label>
                    <select
                      value={formData.reminderTime}
                      onChange={(e) => setFormData({...formData, reminderTime: parseInt(e.target.value)})}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={15}>15 minutos</option>
                      <option value={30}>30 minutos</option>
                      <option value={60}>1 hora</option>
                      <option value={120}>2 horas</option>
                      <option value={1440}>1 día</option>
                    </select>
                  </div>
                )}
              </div>
              
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
                  {editingSession ? 'Actualizar' : 'Programar'} Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};