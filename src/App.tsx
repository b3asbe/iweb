import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { AdminDashboard } from './components/Dashboard/AdminDashboard';
import { TeacherDashboard } from './components/Dashboard/TeacherDashboard';
import { StudentDashboard } from './components/Dashboard/StudentDashboard';
import { MicrolearningSession } from './components/Learning/MicrolearningSession';
import { GamificationPanel } from './components/Gamification/GamificationPanel';
import { TeacherManagement } from './components/Admin/TeacherManagement';
import { SubjectManagement } from './components/Admin/SubjectManagement';
import { SystemConfiguration } from './components/Admin/SystemConfiguration';
import { ReportsManagement } from './components/Admin/ReportsManagement';
import { ContentManagement } from './components/Teacher/ContentManagement';
import { EvaluationManagement } from './components/Teacher/EvaluationManagement';
import { StudentMessageCenter } from './components/Student/MessageCenter';
import { PasswordRecovery } from './components/Auth/PasswordRecovery';
import { StudentManagement } from './components/Admin/StudentManagement';
import { SessionManagement } from './components/Teacher/SessionManagement';
import { MyStudents } from './components/Teacher/MyStudents';
import { TeacherMessageCenter } from './components/Teacher/MessageCenter';
import { StudentProgress } from './components/Student/Progress';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMicrolearning, setShowMicrolearning] = useState(false);

  if (!user) {
    return <LoginForm />;
  }

  if (showMicrolearning) {
    return <MicrolearningSession onBack={() => setShowMicrolearning(false)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (user.role === 'admin') return <AdminDashboard />;
        if (user.role === 'teacher') return <TeacherDashboard />;
        if (user.role === 'student') return <StudentDashboard />;
        break;
      
      // Admin modules
      case 'teachers':
        return user.role === 'admin' ? <TeacherManagement /> : null;
      
      case 'subjects':
        return user.role === 'admin' ? <SubjectManagement /> : null;
      
      case 'config':
        return user.role === 'admin' ? <SystemConfiguration /> : null;
      
      case 'reports':
        return (user.role === 'admin' || user.role === 'teacher') ? <ReportsManagement /> : null;

      case 'sessions':
        return user.role === 'teacher' ? <SessionManagement /> : null;

      case 'messages':
        if (user.role === 'teacher') return <TeacherMessageCenter />;
        if (user.role === 'student') return <StudentMessageCenter />;
        return null;

      case 'progress':
        return user.role === 'student' ? <StudentProgress /> : null;

      // Teacher modules
      case 'content':
        return user.role === 'teacher' ? <ContentManagement /> : null;
      
      case 'evaluations':
        return user.role === 'teacher' ? <EvaluationManagement /> : null;
      
      case 'learning':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sesiones de Microlearning</h1>
              <p className="mt-1 text-sm text-gray-600">
                Selecciona una sesión para comenzar tu aprendizaje
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((session) => (
                <div
                  key={session}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setShowMicrolearning(true)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      10 min
                    </span>
                    <span className="text-sm text-gray-500">Intermedio</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Docker y Contenedores {session}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Aprende los conceptos básicos de containerización con Docker
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.floor(Math.random() * 100)}% completado
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'gamification':
        return <GamificationPanel />;

      case 'students':
        return user.role === 'admin' ? <StudentManagement /> : <MyStudents />;
      
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sección en Desarrollo
            </h2>
            <p className="text-gray-600">
              Esta funcionalidad estará disponible próximamente.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;