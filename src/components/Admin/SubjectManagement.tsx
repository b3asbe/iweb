import React, { useState } from 'react';
import { Plus, Edit, Trash2, BookOpen, Search, Filter, Users } from 'lucide-react';

export const SubjectManagement: React.FC = () => {
  const [subjects, setSubjects] = useState([
    {
      id: '1',
      name: 'Desarrollo Web Frontend',
      code: 'DWF-301',
      cycle: 3,
      credits: 4,
      competencies: [
        'Desarrollar interfaces web responsivas',
        'Implementar frameworks JavaScript modernos',
        'Aplicar principios de UX/UI'
      ],
      teacherId: '1',
      teacherName: 'María Elena Torres',
      status: 'active',
      students: 42
    },
    {
      id: '2',
      name: 'Base de Datos Avanzadas',
      code: 'BDA-302',
      cycle: 3,
      credits: 5,
      competencies: [
        'Diseñar bases de datos relacionales',
        'Optimizar consultas SQL',
        'Implementar procedimientos almacenados'
      ],
      teacherId: '1',
      teacherName: 'María Elena Torres',
      status: 'active',
      students: 38
    },
    {
      id: '3',
      name: 'Infraestructura de TI',
      code: 'ITI-303',
      cycle: 3,
      credits: 4,
      competencies: [
        'Administrar servidores Linux',
        'Configurar redes empresariales',
        'Implementar soluciones de virtualización'
      ],
      teacherId: '2',
      teacherName: 'Jorge Luis Vásquez',
      status: 'active',
      students: 35
    },
    {
      id: '4',
      name: 'Seguridad Informática',
      code: 'SEG-304',
      cycle: 3,
      credits: 3,
      competencies: [
        'Evaluar vulnerabilidades de sistemas',
        'Implementar políticas de seguridad',
        'Realizar auditorías de seguridad'
      ],
      teacherId: '2',
      teacherName: 'Jorge Luis Vásquez',
      status: 'inactive',
      students: 0
    }
  ]);

  const [teachers] = useState([
    { id: '1', name: 'María Elena Torres' },
    { id: '2', name: 'Jorge Luis Vásquez' },
    { id: '3', name: 'Ana Patricia Ruiz' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cycleFilter, setCycleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    cycle: 1,
    credits: 1,
    competencies: [''],
    teacherId: '',
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const teacherName = teachers.find(t => t.id === formData.teacherId)?.name || '';
    
    if (editingSubject) {
      setSubjects(subjects.map(s => 
        s.id === editingSubject.id 
          ? { 
              ...formData, 
              id: editingSubject.id, 
              teacherName,
              students: editingSubject.students,
              competencies: formData.competencies.filter(c => c.trim() !== '')
            }
          : s
      ));
    } else {
      const newSubject = {
        ...formData,
        id: Date.now().toString(),
        teacherName,
        students: 0,
        competencies: formData.competencies.filter(c => c.trim() !== '')
      };
      setSubjects([...subjects, newSubject]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      cycle: 1,
      credits: 1,
      competencies: [''],
      teacherId: '',
      status: 'active'
    });
    setEditingSubject(null);
    setShowModal(false);
  };

  const handleEdit = (subject: any) => {
    setFormData({
      ...subject,
      competencies: [...subject.competencies, '']
    });
    setEditingSubject(subject);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta asignatura?')) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const addCompetency = () => {
    setFormData(prev => ({
      ...prev,
      competencies: [...prev.competencies, '']
    }));
  };

  const updateCompetency = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      competencies: prev.competencies.map((c, i) => i === index ? value : c)
    }));
  };

  const removeCompetency = (index: number) => {
    setFormData(prev => ({
      ...prev,
      competencies: prev.competencies.filter((_, i) => i !== index)
    }));
  };

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCycle = cycleFilter === 'all' || subject.cycle.toString() === cycleFilter;
    const matchesStatus = statusFilter === 'all' || subject.status === statusFilter;
    return matchesSearch && matchesCycle && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Asignaturas</h1>
          <p className="mt-1 text-sm text-gray-600">
            Administra las asignaturas del plan curricular
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nueva Asignatura
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
              <p className="text-sm font-medium text-gray-600">Total Asignaturas</p>
              <p className="text-2xl font-semibold text-gray-900">{subjects.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-lg p-3">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Activas</p>
              <p className="text-2xl font-semibold text-gray-900">
                {subjects.filter(s => s.status === 'active').length}
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
              <p className="text-sm font-medium text-gray-600">Total Estudiantes</p>
              <p className="text-2xl font-semibold text-gray-900">
                {subjects.reduce((sum, s) => sum + s.students, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-orange-500 rounded-lg p-3">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Promedio Créditos</p>
              <p className="text-2xl font-semibold text-gray-900">
                {(subjects.reduce((sum, s) => sum + s.credits, 0) / subjects.length).toFixed(1)}
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
                placeholder="Buscar por nombre o código..."
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
                value={cycleFilter}
                onChange={(e) => setCycleFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los ciclos</option>
                <option value="1">Ciclo I</option>
                <option value="2">Ciclo II</option>
                <option value="3">Ciclo III</option>
                <option value="4">Ciclo IV</option>
                <option value="5">Ciclo V</option>
                <option value="6">Ciclo VI</option>
              </select>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activas</option>
              <option value="inactive">Inactivas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subjects Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asignatura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ciclo/Créditos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Docente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estudiantes
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
              {filteredSubjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{subject.name}</div>
                      <div className="text-sm text-gray-500">{subject.code}</div>
                      <div className="mt-1">
                        {subject.competencies.slice(0, 2).map((comp, index) => (
                          <div key={index} className="text-xs text-gray-600">• {comp}</div>
                        ))}
                        {subject.competencies.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{subject.competencies.length - 2} más...
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Ciclo {subject.cycle}</div>
                    <div className="text-sm text-gray-500">{subject.credits} créditos</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subject.teacherName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{subject.students}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      subject.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {subject.status === 'active' ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(subject)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(subject.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
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
              {editingSubject ? 'Editar Asignatura' : 'Nueva Asignatura'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de la Asignatura *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ciclo Académico *
                  </label>
                  <select
                    value={formData.cycle}
                    onChange={(e) => setFormData({...formData, cycle: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1,2,3,4,5,6].map(cycle => (
                      <option key={cycle} value={cycle}>Ciclo {cycle}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Créditos *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    required
                    value={formData.credits}
                    onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Docente Asignado *
                  </label>
                  <select
                    required
                    value={formData.teacherId}
                    onChange={(e) => setFormData({...formData, teacherId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar docente</option>
                    {teachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
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
                    <option value="active">Activa</option>
                    <option value="inactive">Inactiva</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Competencias a Desarrollar *
                </label>
                {formData.competencies.map((competency, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={competency}
                      onChange={(e) => updateCompetency(index, e.target.value)}
                      placeholder={`Competencia ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {formData.competencies.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCompetency(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCompetency}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Agregar competencia
                </button>
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
                  {editingSubject ? 'Actualizar' : 'Crear'} Asignatura
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};