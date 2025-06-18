import React, { useState } from 'react';
import { ArrowLeft, Mail, Key, CheckCircle } from 'lucide-react';

interface PasswordRecoveryProps {
  onBack: () => void;
}

export const PasswordRecovery: React.FC<PasswordRecoveryProps> = ({ onBack }) => {
  const [step, setStep] = useState<'email' | 'code' | 'newPassword' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email.includes('@iestp.edu.pe') || email.startsWith('EST')) {
      setStep('code');
    } else {
      setError('Email no encontrado en el sistema');
    }
    setIsLoading(false);
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (code === '123456') {
      setStep('newPassword');
    } else {
      setError('Código incorrecto. Verifica el código enviado a tu email.');
    }
    setIsLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setStep('success');
    setIsLoading(false);
  };

  const renderEmailStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Recuperar Contraseña</h2>
        <p className="mt-2 text-sm text-gray-600">
          Ingresa tu email institucional o código de estudiante para recibir un código de recuperación
        </p>
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Institucional o Código de Estudiante
          </label>
          <input
            id="email"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="usuario@iestp.edu.pe o EST001"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Enviando código...' : 'Enviar Código de Recuperación'}
        </button>
      </form>
    </div>
  );

  const renderCodeStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
          <Mail className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Código Enviado</h2>
        <p className="mt-2 text-sm text-gray-600">
          Hemos enviado un código de 6 dígitos a <strong>{email}</strong>
        </p>
      </div>

      <form onSubmit={handleCodeSubmit} className="space-y-4">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
            Código de Verificación
          </label>
          <input
            id="code"
            type="text"
            required
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
            placeholder="123456"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || code.length !== 6}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Verificando...' : 'Verificar Código'}
        </button>

        <button
          type="button"
          onClick={() => setStep('email')}
          className="w-full text-sm text-blue-600 hover:text-blue-500"
        >
          ¿No recibiste el código? Reenviar
        </button>
      </form>
    </div>
  );

  const renderPasswordStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center">
          <Key className="h-8 w-8 text-purple-600" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Nueva Contraseña</h2>
        <p className="mt-2 text-sm text-gray-600">
          Crea una nueva contraseña segura para tu cuenta
        </p>
      </div>

      <form onSubmit={handlePasswordSubmit} className="space-y-4">
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Nueva Contraseña
          </label>
          <input
            id="newPassword"
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Repite la contraseña"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Actualizando contraseña...' : 'Actualizar Contraseña'}
        </button>
      </form>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="space-y-6 text-center">
      <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">¡Contraseña Actualizada!</h2>
        <p className="mt-2 text-sm text-gray-600">
          Tu contraseña ha sido actualizada exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.
        </p>
      </div>
      <button
        onClick={onBack}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Volver al Inicio de Sesión
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step !== 'success' && (
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio de sesión
            </button>
          )}

          {step === 'email' && renderEmailStep()}
          {step === 'code' && renderCodeStep()}
          {step === 'newPassword' && renderPasswordStep()}
          {step === 'success' && renderSuccessStep()}
        </div>
      </div>
    </div>
  );
};