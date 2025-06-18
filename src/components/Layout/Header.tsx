import React from 'react';
import { Bell, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador Académico';
      case 'teacher': return 'Docente';
      case 'student': return 'Estudiante';
      default: return '';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ML</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">MicroLearning IESTP</h1>
              <p className="text-sm text-gray-500">Sistema de Aprendizaje Adaptativo</p>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {user?.avatar ? (
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={user.avatar}
                    alt={user.name}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                )}
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                <div className="text-xs text-gray-500">{getRoleLabel(user?.role || '')}</div>
              </div>
            </div>

            {/* Settings */}
            <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors">
              <Settings className="h-5 w-5" />
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};