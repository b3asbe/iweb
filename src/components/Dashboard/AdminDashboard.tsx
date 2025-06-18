import React from 'react';
import { Users, BookOpen, BarChart3, TrendingUp, Award, Clock } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const stats = [
    {
      name: 'Estudiantes Activos',
      value: '156',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Sesiones Completadas',
      value: '2,847',
      change: '+23%',
      changeType: 'positive',
      icon: BarChart3,
      color: 'bg-green-500'
    },
    {
      name: 'Tiempo Promedio/Sesión',
      value: '8.5 min',
      change: '-5%',
      changeType: 'negative',
      icon: Clock,
      color: 'bg-purple-500'
    },
    {
      name: 'Tasa de Finalización',
      value: '87%',
      change: '+8%',
      changeType: 'positive',
      icon: Award,
      color: 'bg-orange-500'
    }
  ];

  const recentActivity = [
    { action: 'Nuevo estudiante registrado', user: 'Ana García Ruiz', time: 'hace 2 horas' },
    { action: 'Sesión completada', user: 'Carlos Mendoza', time: 'hace 3 horas' },
    { action: 'Docente actualizado perfil', user: 'María Torres', time: 'hace 5 horas' },
    { action: 'Nueva evaluación creada', user: 'Jorge Vásquez', time: 'hace 1 día' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p className="mt-1 text-sm text-gray-600">
          Resumen general del sistema de microlearning
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
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
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className={`ml-2 text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Uso del Sistema</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">7 días</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">30 días</button>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-2" />
              <p className="text-gray-600">Gráfico de tendencias de uso</p>
              <p className="text-sm text-gray-500">Pico de actividad: 18:00 - 22:00</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-8 w-8 text-blue-500 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Registrar Estudiante</p>
              <p className="text-sm text-gray-500">Agregar nuevo estudiante al sistema</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BookOpen className="h-8 w-8 text-green-500 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Nueva Asignatura</p>
              <p className="text-sm text-gray-500">Crear asignatura en el plan curricular</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="h-8 w-8 text-purple-500 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Generar Reporte</p>
              <p className="text-sm text-gray-500">Crear reporte de participación</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};