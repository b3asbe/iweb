import React from 'react';
import { BookOpen, Users, Award, Clock, Play, TrendingUp } from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const teacherStats = [
    {
      name: 'Mis Estudiantes',
      value: '42',
      change: '+3 nuevos',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Sesiones Creadas',
      value: '28',
      change: '5 esta semana',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      name: 'Tiempo Prom. Sesión',
      value: '12 min',
      change: 'Óptimo',
      icon: Clock,
      color: 'bg-purple-500'
    },
    {
      name: 'Participación',
      value: '85%',
      change: '+12%',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const recentSessions = [
    { title: 'Introducción a Microservicios', students: 38, completed: 32, avgScore: 87 },
    { title: 'Bases de Datos NoSQL', students: 40, completed: 35, avgScore: 92 },
    { title: 'Patrones de Diseño', students: 35, completed: 30, avgScore: 78 },
    { title: 'API REST con Node.js', students: 42, completed: 39, avgScore: 89 },
  ];

  const upcomingSessions = [
    { title: 'Docker y Contenedores', scheduledFor: '2024-01-20 19:00', duration: '10 min' },
    { title: 'Kubernetes Básico', scheduledFor: '2024-01-22 19:30', duration: '15 min' },
    { title: 'CI/CD con GitHub Actions', scheduledFor: '2024-01-24 18:00', duration: '12 min' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard del Docente</h1>
        <p className="mt-1 text-sm text-gray-600">
          Gestiona tus contenidos y supervisa el progreso de tus estudiantes
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teacherStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sessions Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Rendimiento de Sesiones</h3>
            <button className="text-sm text-blue-600 hover:text-blue-500">Ver todas</button>
          </div>
          <div className="space-y-4">
            {recentSessions.map((session, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{session.title}</h4>
                  <span className="text-sm font-medium text-green-600">{session.avgScore}%</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <span>{session.completed}/{session.students} completaron</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(session.completed / session.students) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Próximas Sesiones</h3>
            <button className="flex items-center text-sm text-blue-600 hover:text-blue-500">
              <Play className="h-4 w-4 mr-1" />
              Crear nueva
            </button>
          </div>
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Play className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium text-gray-900">{session.title}</h4>
                  <p className="text-sm text-gray-600">{session.scheduledFor}</p>
                  <p className="text-xs text-gray-500">Duración: {session.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all">
            <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Nueva Píldora</p>
              <p className="text-sm text-gray-500">Crear contenido</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-all">
            <Award className="h-8 w-8 text-green-500 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Evaluación</p>
              <p className="text-sm text-gray-500">Crear cuestionario</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all">
            <Users className="h-8 w-8 text-purple-500 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Ver Estudiantes</p>
              <p className="text-sm text-gray-500">Progreso detallado</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-all">
            <Play className="h-8 w-8 text-orange-500 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Programar</p>
              <p className="text-sm text-gray-500">Sesión automática</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};