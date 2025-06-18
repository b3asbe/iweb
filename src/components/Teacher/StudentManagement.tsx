import React, { useState } from 'react';
import { Plus, Edit, Trash2, User, Mail, Phone, Search, Filter, Download, Upload } from 'lucide-react';

export const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState([
    {
      id: '1',
      name: 'Carlos Miguel Estudiante',
      studentCode: 'EST001',
      dni: '87654321',
      email: 'carlos.estudiante@iestp.edu.pe',
      phone: '987123456',
      cycle: 3,
      enrollmentStatus: 'active',
      lastActivity: '2 horas',
      progress: 78,
      averageScore: 85.2,
      sessionsCompleted: 42,
      totalSessions: 47,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Ana García Ruiz',
      studentCode: 'EST002',
      dni: '12345678',
      email: 'ana.garcia@iestp.edu.pe',
      phone: '987654321',
      cycle: 3,
      enrollmentStatus: 'active',
      lastActivity: '1 hora',
      progress: 92,
      averageScore: 88.7,
      sessionsCompleted: 45,
      totalSessions: 47,
      createdAt: '2024-01-12'
    },
    {
      id: '3',
      name: 'Diego Ruiz Mendoza',
      studentCode: 'EST003',
      dni: '11223344',
      email: 'diego.ruiz@iestp.edu.pe',
      phone: '987789123',
      cycle: 3,
      enrollmentStatus: 'active',
      lastActivity: '1 día',
      progress: 65,
      averageScore: 76.3,
      sessionsCompleted: 38,
      totalSessions: 47,
      createdAt: '2024-01-10'
    },
    {
      id: '4',
      name: 'Laura Vega Torres',
      studentCode: 'EST004',
      dni: '55667788',
      email: 'laura.vega@iestp.edu.pe',
      phone: '987456789',
      cycle: 3,
      enrollmentStatus: 'inactive',
      lastActivity: '1 semana',
      progress: 45,
      averageScore: 72.1,
      sessionsCompleted: 28,
      totalSessions: 47,
      createdAt: '2024-01-08'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cycleFilter, setCycleFilter] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    studentCode: '',
    dni: '',
    email: '',
    phone: '',
    cycle: 3,
    enrollmentStatus: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStudent) {
      setStudents(students.map(s => 
        s.id === editingStudent.id 
          ? { 
              ...s,
              ...formData,
              email: `${formData.studentCode.toLowerCase()}@iestp.edu.pe`
            }
          : s
      ));
    } else {
      const newStudent = {
        ...formData,
        id: Date.now().toString(),
        email: `${formData.studentCode.toLowerCase()}@iestp.edu.pe`,
        lastActivity: 'Nunca',
        progress: 0,
        averageScore: 0,
        sessionsCompleted: 0,
        totalSessions: 47,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setStudents([...students, newStudent]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      studentCode: '',
      dni: '',
      email: '',
      phone: '',
      cycle: 3,
      enrollmentStatus: 'active'
    });
    setEditingStudent(null);
    setShowModal(false);
  };

  const handleEdit = (student: any) => {
    setFormData({
      name: student.name,
      studentCode: student.studentCode,
      dni: student.dni,
      email: student.email,
      phone: student.phone,
      cycle: student.cycle,
      enrollmentStatus: student.enrollmentStatus
    });
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este estudiante?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleBulkImport = () => {
    alert('Función de importación masiva - Aquí se abriría un modal para subir archivo CSV/Excel');
  };

  const handleExport = () => {
    alert('Exportando lista de estudiantes...');
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.enrollmentStatus === statusFilter;
    const matchesCycle = cycleFilter === 'all' || student.cycle.toString() === cycleFilter;
    return matchesSearch && matchesStatus && matchesCycle;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Estudiantes</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gestiona los estudiantes asignados a tus asignaturas
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleBulkImport}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </button>
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Estudiante
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-lg p-3">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Estudiantes</p>
              <p className="text-2xl font-semibold text-gray-900">{students.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-lg p-3">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Activos</p>
              <p className="text-2xl font-semibold text-gray-900">
                {students.filter(s => s.enrollmentStatus === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 rounded-lg p-3">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Progreso Promedio</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-orange-500 rounded-lg p-3">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Promedio General</p>
              <p className="text-2xl font-semibold text-gray-900">
                {(students.reduce((sum, s) => sum + s.averageScore, 0) / students.length).toFixed(1)}%
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
                placeholder="Buscar por nombre, código o email..."
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
                <option value="suspended">Suspendidos</option>
              </select>
            </div>
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
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estudiante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progreso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rendimiento
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
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.studentCode} • Ciclo {student.cycle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-gray-400" />
                      {student.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="h-4 w-4 mr-1 text-gray-400" />
                      {student.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{student.progress}%</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {student.sessionsCompleted}/{student.totalSessions} sesiones
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.averageScore}%</div>
                    <div className="text-xs text-gray-500">Última actividad: {student.lastActivity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.enrollmentStatus === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : student.enrollmentStatus === 'inactive'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.enrollmentStatus === 'active' ? 'Activo' : 
                       student.enrollmentStatus === 'inactive' ? 'Inactivo' : 'Suspendido'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Eliminar"
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
              {editingStudent ? 'Editar Estudiante' : 'Nuevo Estudiante'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Completo *
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
                    Código de Estudiante *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentCode}
                    onChange={(e) => setFormData({...formData, studentCode: e.target.value.toUpperCase()})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="EST001"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    DNI *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    value={formData.dni}
                    onChange={(e) => setFormData({...formData, dni: e.target.value.replace(/\D/g, '')})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                    Estado de Matrícula
                  </label>
                  <select
                    value={formData.enrollmentStatus}
                    onChange={(e) => setFormData({...formData, enrollmentStatus: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                    <option value="suspended">Suspendido</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Institucional
                </label>
                <input
                  type="email"
                  value={`${formData.studentCode.toLowerCase()}@iestp.edu.pe`}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  El email se genera automáticamente basado en el código de estudiante
                </p>
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
                  {editingStudent ? 'Actualizar' : 'Crear'} Estudiante
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};