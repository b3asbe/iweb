import React from 'react';
import { Play, Trophy, Clock, Target, Star, Calendar, Zap, Award } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const studentStats = [
    {
      name: 'Sesiones Completadas',
      value: '47',
      progress: 78,
      icon: Play,
      color: 'bg-blue-500'
    },
    {
      name: 'Tiempo de Estudio',
      value: '12.5h',
      progress: 65,
      icon: Clock,
      color: 'bg-green-500'
    },
    {
      name: 'Puntos Totales',
      value: '890',
      progress: 89,
      icon: Star,
      color: 'bg-purple-500'
    },
    {
      name: 'Racha Actual',
      value: '7 días',
      progress: 70,
      icon: Zap,
      color: 'bg-orange-500'
    }
  ];

  const upcomingLessons = [
    {
      title: 'Docker y Contenedores',
      subject: 'Infraestructura TI',
      time: '19:00',
      duration: '10 min',
      type: 'pre-class'
    },
    {
      title: 'Patrones MVC',
      subject: 'Desarrollo Web',
      time: '20:30',
      duration: '12 min',
      type: 'post-class'
    },
    {
      title: 'Seguridad en APIs',
      subject: 'Desarrollo Web',
      time: '21:15',
      duration: '8 min',
      type: 'reinforcement'
    }
  ];

  const recentBadges = [
    { name: 'Estudiante Constante', description: '7 días consecutivos', earned: 'Hoy', icon: '🔥' },
    { name: 'Perfeccionista', description: '100% en evaluación', earned: 'Ayer', icon: '⭐' },
    { name: 'Madrugador', description: 'Sesión antes de 7 AM', earned: 'Hace 3 días', icon: '🌅' }
  ];

  const subjectProgress = [
    { name: 'Desarrollo Web', progress: 85, sessions: 15, color: 'bg-blue-500' },
    { name: 'Base de Datos', progress: 72, sessions: 12, color: 'bg-green-500' },
    { name: 'Infraestructura TI', progress: 68, sessions: 10, color: 'bg-purple-500' },
    { name: 'Seguridad', progress: 45, sessions: 6, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header con saludo personalizado */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">¡Buen trabajo, Carlos! 🎉</h1>
            <p className="mt-1 text-blue-100">
              Llevas 7 días consecutivos estudiando. ¡Sigue así!
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">Nivel 8</div>
            <div className="text-blue-100">890 puntos</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {studentStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-2">{stat.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${stat.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximas Sesiones */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Próximas Sesiones</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingLessons.map((lesson, index) => (
              <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                  lesson.type === 'pre-class' ? 'bg-blue-100' :
                  lesson.type === 'post-class' ? 'bg-green-100' : 'bg-purple-100'
                }`}>
                  <Play className={`h-6 w-6 ${
                    lesson.type === 'pre-class' ? 'text-blue-600' :
                    lesson.type === 'post-class' ? 'text-green-600' : 'text-purple-600'
                  }`} />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                  <p className="text-sm text-gray-600">{lesson.subject}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {lesson.time} • {lesson.duration}
                  </div>
                </div>
                <button className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Iniciar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Logros Recientes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Logros Recientes</h3>
            <Trophy className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {recentBadges.map((badge, index) => (
              <div key={index} className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <div className="text-2xl mr-3">{badge.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{badge.name}</h4>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                  <p className="text-xs text-gray-500">{badge.earned}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progreso por Asignatura */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Progreso por Asignatura</h3>
          <Target className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjectProgress.map((subject, index) => (
            <div key={index} className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - subject.progress / 100)}`}
                    className={subject.color.replace('bg-', 'text-')}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">{subject.progress}%</span>
                </div>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{subject.name}</h4>
              <p className="text-sm text-gray-600">{subject.sessions} sesiones</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};