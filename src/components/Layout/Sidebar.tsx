import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Play, 
  Trophy, 
  BarChart3, 
  Settings,
  UserPlus,
  Calendar,
  Award,
  MessageSquare,
  FileText,
  Target
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'teachers', label: 'Gestión de Docentes', icon: UserPlus },
          { id: 'students', label: 'Gestión de Estudiantes', icon: Users },
          { id: 'subjects', label: 'Asignaturas', icon: BookOpen },
          { id: 'config', label: 'Configuración', icon: Settings },
          { id: 'reports', label: 'Reportes', icon: BarChart3 },
        ];
      
      case 'teacher':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'content', label: 'Gestión de Contenidos', icon: BookOpen },
          { id: 'sessions', label: 'Sesiones', icon: Play },
          { id: 'evaluations', label: 'Evaluaciones', icon: Award },
          { id: 'students', label: 'Mis Estudiantes', icon: Users },
          { id: 'reports', label: 'Reportes', icon: BarChart3 },
          { id: 'messages', label: 'Mensajes', icon: MessageSquare },
        ];
      
      case 'student':
        return [
          { id: 'dashboard', label: 'Mi Dashboard', icon: LayoutDashboard },
          { id: 'learning', label: 'Microlearning', icon: Play },
          { id: 'schedule', label: 'Mi Cronograma', icon: Calendar },
          { id: 'gamification', label: 'Logros', icon: Trophy },
          { id: 'progress', label: 'Mi Progreso', icon: BarChart3 },
          { id: 'messages', label: 'Mensajes', icon: MessageSquare },
        ];
      
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="bg-white w-64 min-h-screen shadow-sm border-r border-gray-200">
      <nav className="mt-8">
        <div className="px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 mb-1 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${
                  activeTab === item.id ? 'text-blue-600' : 'text-gray-400'
                }`} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};