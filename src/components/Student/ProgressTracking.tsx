import React, { useState } from 'react';
import { TrendingUp, Target, Clock, Award, BookOpen, Calendar, BarChart3, Download } from 'lucide-react';

export const ProgressTracking: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const overallStats = {
    totalSessions: 47,
    completedSessions: 42,
    totalHours: 12.5,
    averageScore: 85.2,
    currentStreak: 7,
    level: 8,
    points: 890,
    ranking: 3
  };

  const subjectProgress = [
    {
      name: 'Desarrollo Web',
      totalSessions: 15,
      completedSessions: 13,
      averageScore: 88.5,
      timeSpent: 4.2,
      progress: 87,
      lastActivity: '2 horas',
      nextSession: 'Frameworks JavaScript',
      color: 'bg-blue-500'
    },
    {
      name: 'Base de Datos',
      totalSessions: 12,
      completedSessions: 11,
      averageScore: 82.1,
      timeSpent: 3.8,
      progress: 92,
      lastActivity: '1 día',
      nextSession: 'Optimización de Consultas',
      color: 'bg-green-500'
    },
    {
      name: 'Infraestructura TI',
      totalSessions: 10,
      completedSessions: 9,
      averageScore: 85.7,
      timeSpent: 2.9,
      progress: 90,
      lastActivity: '3 horas',
      nextSession: 'Kubernetes Básico',
      color: 'bg-purple-500'
    },
    {
      name: 'Seguridad',
      totalSessions: 8,
      completedSessions: 6,
      averageScore: 79.3,
      timeSpent: 1.6,
      progress: 75,
      lastActivity: '2 días',
      nextSession: 'Criptografía',
      color: 'bg-orange-500'
    }
  ];

  const weeklyActivity = [
    { day: 'Lun', sessions: 3, hours: 0.8 },
    { day: 'Mar', sessions: 2, hours: 0.5 },
    { day: 'Mié', sessions: 4, hours: 1.2 },
    { day: 'Jue', sessions: 3, hours: 0.9 },
    { day: 'Vie', sessions: 2, hours: 0.6 },
    { day: 'Sáb', sessions: 1, hours: 0.3 },
    { day: 'Dom', sessions: 2, hours: 0.7 }
  ];

  const achievements = [
    {
      title: 'Estudiante Constante',
      description: '7 días consecutivos',
      date: 'Hoy',
      icon: '🔥',
      type: 'streak'
    },
    {
      title: 'Perfeccionista',
      description: '100% en evaluación',
      date: 'Ayer',
      icon: '⭐',
      type: 'score'
    },
    {
      title: 'Explorador',
      description: 'Completó contenido opcional',
      date: 'Hace 2 días',
      icon: '🗺️',
      type: 'exploration'
    }
  ];

  const learningGoals = [
    {
      title: 'Completar Módulo Docker',
      progress: 80,
      target: 100,
      deadline: '2024-01-25',
      status: 'on-track'
    },
    {
      title: 'Mejorar Promedio en BD',
      progress: 82,
      target: 85,
      deadline: '2024-01-30',
      status: 'on-track'
    },
    {
      title: 'Alcanzar Nivel 10',
      progress: 890,
      target: 1000,
      deadline: '2024-02-01',
      status: 'behind'
    }
  ];

  const generateReport = () => {
    alert('Generando reporte de progreso...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mi Progreso</h1>
          <p className="mt-1 text-sm text-gray-600">
            Seguimiento detallado de tu aprendizaje y rendimiento académico
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="semester">Este semestre</option>
          </select>
          <button
            onClick={generateReport}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-lg p-3">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sesiones Completadas</p>
              <p className="text-2xl font-semibold text-gray-900">
                {overallStats.completedSessions}/{overallStats.totalSessions}
              </p>
              <p className="text-sm text-green-600">
                {Math.round((overallStats.completedSessions / overallStats.totalSessions) * 100)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-lg p-3">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tiempo Total</p>
              <p className="text-2xl font-semibold text-gray-900">{overallStats.totalHours}h</p>
              <p className="text-sm text-blue-600">Promedio: 18min/sesión</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 rounded-lg p-3">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Promedio General</p>
              <p className="text-2xl font-semibold text-gray-900">{overallStats.averageScore}%</p>
              <p className="text-sm text-green-600">+3.2% vs mes anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-orange-500 rounded-lg p-3">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ranking</p>
              <p className="text-2xl font-semibold text-gray-900">#{overallStats.ranking}</p>
              <p className="text-sm text-blue-600">Nivel {overallStats.level}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress by Subject */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Progreso por Asignatura</h3>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas las asignaturas</option>
            {subjectProgress.map(subject => (
              <option key={subject.name} value={subject.name}>{subject.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjectProgress.map((subject, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{subject.name}</h4>
                <span className="text-sm text-gray-500">{subject.lastActivity}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progreso</span>
                  <span className="font-medium">{subject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${subject.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Sesiones:</span>
                    <span className="ml-1 font-medium">
                      {subject.completedSessions}/{subject.totalSessions}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Promedio:</span>
                    <span className="ml-1 font-medium">{subject.averageScore}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tiempo:</span>
                    <span className="ml-1 font-medium">{subject.timeSpent}h</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Próximo:</span>
                    <span className="ml-1 font-medium text-blue-600">{subject.nextSession}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Actividad Semanal</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900 w-8">{day.day}</span>
                  <div className="flex-1 w-32">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(day.sessions / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{day.sessions} sesiones</div>
                  <div className="text-xs text-gray-500">{day.hours}h</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Goals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Metas de Aprendizaje</h3>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {learningGoals.map((goal, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{goal.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    goal.status === 'on-track' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {goal.status === 'on-track' ? 'En progreso' : 'Retrasado'}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progreso</span>
                    <span className="font-medium">{goal.progress}/{goal.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        goal.status === 'on-track' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Meta: {goal.deadline}</span>
                    <span>{Math.round((goal.progress / goal.target) * 100)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Logros Recientes</h3>
          <Award className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <div className="text-2xl mr-3">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <p className="text-xs text-gray-500">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};