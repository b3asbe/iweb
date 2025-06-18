import React, { useState } from 'react';
import { Download, Calendar, Filter, BarChart3, Users, BookOpen, TrendingUp, FileText, Eye } from 'lucide-react';

export const ReportsManagement: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('participation');
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });
  const [filters, setFilters] = useState({
    subject: 'all',
    teacher: 'all',
    cycle: 'all'
  });

  const reportTypes = [
    {
      id: 'participation',
      name: 'Participación Estudiantil',
      description: 'Análisis de participación y actividad de estudiantes',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      id: 'performance',
      name: 'Rendimiento Académico',
      description: 'Calificaciones y progreso por asignatura',
      icon: BarChart3,
      color: 'bg-green-500'
    },
    {
      id: 'content',
      name: 'Uso de Contenidos',
      description: 'Estadísticas de consumo de material educativo',
      icon: BookOpen,
      color: 'bg-purple-500'
    },
    {
      id: 'gamification',
      name: 'Gamificación',
      description: 'Puntos, niveles y logros obtenidos',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const mockData = {
    participation: {
      totalStudents: 156,
      activeStudents: 142,
      averageSessionsPerWeek: 8.5,
      completionRate: 87,
      topPerformers: [
        { name: 'Ana García', sessions: 45, hours: 12.5 },
        { name: 'Carlos Miguel', sessions: 42, hours: 11.8 },
        { name: 'Laura Vega', sessions: 38, hours: 10.2 }
      ],
      weeklyActivity: [
        { week: 'Sem 1', sessions: 320 },
        { week: 'Sem 2', sessions: 385 },
        { week: 'Sem 3', sessions: 412 },
        { week: 'Sem 4', sessions: 398 }
      ]
    },
    performance: {
      averageScore: 85.2,
      passRate: 92,
      subjectPerformance: [
        { subject: 'Desarrollo Web', average: 88.5, students: 42 },
        { subject: 'Base de Datos', average: 84.2, students: 38 },
        { subject: 'Infraestructura TI', average: 82.1, students: 35 },
        { subject: 'Seguridad', average: 86.8, students: 28 }
      ],
      difficultyAreas: [
        { topic: 'Consultas SQL Avanzadas', errorRate: 35 },
        { topic: 'Configuración de Servidores', errorRate: 28 },
        { topic: 'Frameworks JavaScript', errorRate: 22 }
      ]
    },
    content: {
      totalSessions: 1247,
      averageSessionTime: 8.5,
      mostPopularContent: [
        { title: 'Introducción a Docker', views: 156, completion: 94 },
        { title: 'Bases de Datos NoSQL', views: 142, completion: 89 },
        { title: 'API REST con Node.js', views: 138, completion: 91 }
      ],
      contentByType: [
        { type: 'Video', count: 45, engagement: 92 },
        { type: 'Texto', count: 38, engagement: 78 },
        { type: 'Interactivo', count: 32, engagement: 96 }
      ]
    },
    gamification: {
      totalPointsAwarded: 125680,
      averageLevel: 8.2,
      badgesEarned: 342,
      topRanking: [
        { name: 'Ana García', points: 1250, level: 12, badges: 8 },
        { name: 'Miguel Torres', points: 1100, level: 10, badges: 6 },
        { name: 'Carlos Miguel', points: 890, level: 8, badges: 5 }
      ]
    }
  };

  const generateReport = (format: 'pdf' | 'excel') => {
    alert(`Generando reporte en formato ${format.toUpperCase()}...`);
  };

  const renderParticipationReport = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Estudiantes Totales</p>
              <p className="text-2xl font-semibold text-gray-900">{mockData.participation.totalStudents}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-3">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Estudiantes Activos</p>
              <p className="text-2xl font-semibold text-gray-900">{mockData.participation.activeStudents}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-lg p-3">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sesiones/Semana</p>
              <p className="text-2xl font-semibold text-gray-900">{mockData.participation.averageSessionsPerWeek}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 rounded-lg p-3">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tasa Finalización</p>
              <p className="text-2xl font-semibold text-gray-900">{mockData.participation.completionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Semanal</h3>
          <div className="space-y-3">
            {mockData.participation.weeklyActivity.map((week, index) => (
              <div key={index} className="flex items-center">
                <div className="w-16 text-sm text-gray-600">{week.week}</div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: `${(week.sessions / 450) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-sm font-medium text-gray-900">{week.sessions}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mejores Estudiantes</h3>
          <div className="space-y-3">
            {mockData.participation.topPerformers.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{student.name}</div>
                  <div className="text-sm text-gray-600">{student.sessions} sesiones</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{student.hours}h</div>
                  <div className="text-sm text-gray-600">tiempo total</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformanceReport = () => (
    <div className="space-y-6">
      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento General</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Promedio General:</span>
              <span className="font-semibold text-green-600">{mockData.performance.averageScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tasa de Aprobación:</span>
              <span className="font-semibold text-green-600">{mockData.performance.passRate}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Áreas de Dificultad</h3>
          <div className="space-y-3">
            {mockData.performance.difficultyAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{area.topic}</span>
                <span className="text-sm font-medium text-red-600">{area.errorRate}% error</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento por Asignatura</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Asignatura</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Estudiantes</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Promedio</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Progreso</th>
              </tr>
            </thead>
            <tbody>
              {mockData.performance.subjectPerformance.map((subject, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">{subject.subject}</td>
                  <td className="py-3 px-4 text-gray-600">{subject.students}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">{subject.average}%</td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${subject.average}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContentReport = () => (
    <div className="space-y-6">
      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sesiones</p>
              <p className="text-2xl font-semibold text-gray-900">{mockData.content.totalSessions}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-3">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
              <p className="text-2xl font-semibold text-gray-900">{mockData.content.averageSessionTime} min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contenido Más Popular</h3>
        <div className="space-y-4">
          {mockData.content.mostPopularContent.map((content, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{content.title}</div>
                <div className="text-sm text-gray-600">{content.views} visualizaciones</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-600">{content.completion}%</div>
                <div className="text-sm text-gray-600">completado</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content by Type */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contenido por Tipo</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockData.content.contentByType.map((type, index) => (
            <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{type.count}</div>
              <div className="text-sm text-gray-600">{type.type}</div>
              <div className="text-sm font-medium text-blue-600">{type.engagement}% engagement</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGamificationReport = () => (
    <div className="space-y-6">
      {/* Gamification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-lg p-3">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Puntos Totales</p>
              <p className="text-2xl font-semibold text-gray-900">{mockData.gamification.totalPointsAwarded.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-lg p-3">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Nivel Promedio</p>
              <p className="text-2xl font-semibold text-gray-900">{mockData.gamification.averageLevel}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 rounded-lg p-3">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Insignias Ganadas</p>
              <p className="text-2xl font-semibold text-gray-900">{mockData.gamification.badgesEarned}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Ranking */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ranking de Estudiantes</h3>
        <div className="space-y-4">
          {mockData.gamification.topRanking.map((student, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  index === 0 ? 'bg-yellow-400 text-yellow-900' :
                  index === 1 ? 'bg-gray-300 text-gray-700' :
                  'bg-orange-400 text-orange-900'
                }`}>
                  {index + 1}
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">{student.name}</div>
                  <div className="text-sm text-gray-600">Nivel {student.level} • {student.badges} insignias</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{student.points}</div>
                <div className="text-sm text-gray-600">puntos</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'participation': return renderParticipationReport();
      case 'performance': return renderPerformanceReport();
      case 'content': return renderContentReport();
      case 'gamification': return renderGamificationReport();
      default: return renderParticipationReport();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reportes y Analíticas</h1>
          <p className="mt-1 text-sm text-gray-600">
            Genera y visualiza reportes del sistema de microlearning
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => generateReport('pdf')}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </button>
          <button
            onClick={() => generateReport('excel')}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Excel
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedReport === report.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <div className={`${report.color} rounded-lg p-2`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="ml-3 font-medium text-gray-900">{report.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{report.description}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({...prev, startDate: e.target.value}))}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-gray-500">a</span>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({...prev, endDate: e.target.value}))}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filters.subject}
                onChange={(e) => setFilters(prev => ({...prev, subject: e.target.value}))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas las asignaturas</option>
                <option value="web">Desarrollo Web</option>
                <option value="db">Base de Datos</option>
                <option value="infra">Infraestructura TI</option>
                <option value="security">Seguridad</option>
              </select>
            </div>
            
            <select
              value={filters.cycle}
              onChange={(e) => setFilters(prev => ({...prev, cycle: e.target.value}))}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los ciclos</option>
              <option value="1">Ciclo I</option>
              <option value="2">Ciclo II</option>
              <option value="3">Ciclo III</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {renderReportContent()}
      </div>
    </div>
  );
};