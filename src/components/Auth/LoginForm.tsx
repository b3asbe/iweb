import React, { useState } from 'react';
import { Eye, EyeOff, User, GraduationCap, Fingerprint } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginForm: React.FC = () => {
  const [loginType, setLoginType] = useState<'system' | 'student'>('student');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!credentials.email || !credentials.password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    const success = await login(credentials.email, credentials.password, loginType);
    if (!success) {
      setError(loginType === 'student' 
        ? 'Código de estudiante o contraseña incorrectos. Verifica que seas estudiante del turno nocturno de Arquitectura de Plataformas y Servicios de TI.'
        : 'Correo electrónico o contraseña incorrectos.'
      );
    }
  };

  const getDemoCredentials = () => {
    if (loginType === 'student') {
      return { email: 'EST001', password: '123456' };
    }
    return { email: 'admin@iestp.edu.pe', password: '123456' };
  };

  const loadDemoCredentials = () => {
    const demo = getDemoCredentials();
    setCredentials(demo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Sistema MicroLearning
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            IESTP Huancavelica - Turno Nocturno
          </p>
        </div>

        {/* Login Type Selector */}
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setLoginType('student')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginType === 'student'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User className="h-4 w-4 mr-2" />
            Estudiante
          </button>
          <button
            type="button"
            onClick={() => setLoginType('system')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginType === 'system'
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <GraduationCap className="h-4 w-4 mr-2" />
            Personal Académico
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {loginType === 'student' ? 'Código de Estudiante' : 'Correo Electrónico Institucional'}
              </label>
              <input
                id="email"
                name="email"
                type={loginType === 'student' ? 'text' : 'email'}
                required
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={loginType === 'student' ? 'Ej: EST001' : 'usuario@iestp.edu.pe'}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Recordar credenciales</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-all ${
                loginType === 'student'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                loginType === 'student' ? 'focus:ring-blue-500' : 'focus:ring-purple-500'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>

            {loginType === 'student' && (
              <button
                type="button"
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all"
              >
                <Fingerprint className="h-5 w-5 mr-2 text-gray-400" />
                Usar Huella Dactilar
              </button>
            )}

            <button
              type="button"
              onClick={loadDemoCredentials}
              className="w-full text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Cargar credenciales de demostración
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Sistema desarrollado para estudiantes del turno nocturno<br />
            Carrera: Arquitectura de Plataformas y Servicios de TI
          </p>
        </div>
      </div>
    </div>
  );
};