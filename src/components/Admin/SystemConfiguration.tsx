import React, { useState } from 'react';
import { Save, Upload, Settings, Palette, Bell, Clock, Shield, Database } from 'lucide-react';

export const SystemConfiguration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const [generalConfig, setGeneralConfig] = useState({
    institutionName: 'IESTP Huancavelica',
    logo: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    contactEmail: 'contacto@iestp.edu.pe',
    contactPhone: '067-452789',
    address: 'Jr. Virrey Toledo 123, Huancavelica',
    welcomeMessage: 'Bienvenido al Sistema de Microlearning del IESTP Huancavelica'
  });

  const [microlearningConfig, setMicrolearningConfig] = useState({
    minSessionDuration: 5,
    maxSessionDuration: 15,
    maxDailyNotifications: 3,
    maxDailySessions: 10,
    offlineMode: true,
    autoSync: true,
    contentTypes: {
      video: true,
      text: true,
      interactive: true,
      audio: false
    }
  });

  const [gamificationConfig, setGamificationConfig] = useState({
    pointsPerSession: 10,
    pointsPerEvaluation: 20,
    pointsPerPerfectScore: 50,
    streakBonus: 5,
    levelThreshold: 100,
    badgeSystem: true,
    leaderboard: true,
    weeklyRanking: true
  });

  const [notificationConfig, setNotificationConfig] = useState({
    studyReminders: true,
    achievementNotifications: true,
    newContentAlerts: true,
    weeklyReports: true,
    reminderTimes: ['09:00', '15:00', '20:00'],
    customMessages: {
      morning: '¡Buenos días! Es hora de aprender algo nuevo 🌅',
      afternoon: '¡Continúa con tu aprendizaje! 📚',
      evening: '¡Termina el día con conocimiento! 🌙'
    }
  });

  const [securityConfig, setSecurityConfig] = useState({
    sessionTimeout: 120,
    maxLoginAttempts: 3,
    passwordMinLength: 6,
    requireSpecialChars: false,
    twoFactorAuth: false,
    biometricAuth: true,
    dataEncryption: true
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'microlearning', label: 'Microlearning', icon: Clock },
    { id: 'gamification', label: 'Gamificación', icon: Database },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'security', label: 'Seguridad', icon: Shield }
  ];

  const handleSave = () => {
    alert('Configuración guardada exitosamente');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setGeneralConfig(prev => ({
          ...prev,
          logo: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de la Institución
          </label>
          <input
            type="text"
            value={generalConfig.institutionName}
            onChange={(e) => setGeneralConfig(prev => ({...prev, institutionName: e.target.value}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email de Contacto
          </label>
          <input
            type="email"
            value={generalConfig.contactEmail}
            onChange={(e) => setGeneralConfig(prev => ({...prev, contactEmail: e.target.value}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono de Contacto
          </label>
          <input
            type="tel"
            value={generalConfig.contactPhone}
            onChange={(e) => setGeneralConfig(prev => ({...prev, contactPhone: e.target.value}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dirección
          </label>
          <input
            type="text"
            value={generalConfig.address}
            onChange={(e) => setGeneralConfig(prev => ({...prev, address: e.target.value}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo Institucional
        </label>
        <div className="flex items-center space-x-4">
          {generalConfig.logo && (
            <img src={generalConfig.logo} alt="Logo" className="h-16 w-16 object-contain" />
          )}
          <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Subir Logo
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color Primario
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={generalConfig.primaryColor}
              onChange={(e) => setGeneralConfig(prev => ({...prev, primaryColor: e.target.value}))}
              className="h-10 w-16 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={generalConfig.primaryColor}
              onChange={(e) => setGeneralConfig(prev => ({...prev, primaryColor: e.target.value}))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color Secundario
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={generalConfig.secondaryColor}
              onChange={(e) => setGeneralConfig(prev => ({...prev, secondaryColor: e.target.value}))}
              className="h-10 w-16 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={generalConfig.secondaryColor}
              onChange={(e) => setGeneralConfig(prev => ({...prev, secondaryColor: e.target.value}))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mensaje de Bienvenida
        </label>
        <textarea
          value={generalConfig.welcomeMessage}
          onChange={(e) => setGeneralConfig(prev => ({...prev, welcomeMessage: e.target.value}))}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderMicrolearningTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duración Mínima de Sesión (minutos)
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={microlearningConfig.minSessionDuration}
            onChange={(e) => setMicrolearningConfig(prev => ({...prev, minSessionDuration: parseInt(e.target.value)}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duración Máxima de Sesión (minutos)
          </label>
          <input
            type="number"
            min="5"
            max="60"
            value={microlearningConfig.maxSessionDuration}
            onChange={(e) => setMicrolearningConfig(prev => ({...prev, maxSessionDuration: parseInt(e.target.value)}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Máximo de Notificaciones Diarias
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={microlearningConfig.maxDailyNotifications}
            onChange={(e) => setMicrolearningConfig(prev => ({...prev, maxDailyNotifications: parseInt(e.target.value)}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Máximo de Sesiones Diarias
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={microlearningConfig.maxDailySessions}
            onChange={(e) => setMicrolearningConfig(prev => ({...prev, maxDailySessions: parseInt(e.target.value)}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Tipos de Contenido Permitidos</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(microlearningConfig.contentTypes).map(([type, enabled]) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setMicrolearningConfig(prev => ({
                  ...prev,
                  contentTypes: { ...prev.contentTypes, [type]: e.target.checked }
                }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">{type}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Configuraciones Adicionales</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={microlearningConfig.offlineMode}
              onChange={(e) => setMicrolearningConfig(prev => ({...prev, offlineMode: e.target.checked}))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Permitir modo offline</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={microlearningConfig.autoSync}
              onChange={(e) => setMicrolearningConfig(prev => ({...prev, autoSync: e.target.checked}))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Sincronización automática</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderGamificationTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Puntos por Sesión Completada
          </label>
          <input
            type="number"
            min="1"
            value={gamificationConfig.pointsPerSession}
            onChange={(e) => setGamificationConfig(prev => ({...prev, pointsPerSession: parseInt(e.target.value)}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Puntos por Evaluación Aprobada
          </label>
          <input
            type="number"
            min="1"
            value={gamificationConfig.pointsPerEvaluation}
            onChange={(e) => setGamificationConfig(prev => ({...prev, pointsPerEvaluation: parseInt(e.target.value)}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Puntos por Puntuación Perfecta
          </label>
          <input
            type="number"
            min="1"
            value={gamificationConfig.pointsPerPerfectScore}
            onChange={(e) => setGamificationConfig(prev => ({...prev, pointsPerPerfectScore: parseInt(e.target.value)}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bonus por Racha Diaria
          </label>
          <input
            type="number"
            min="1"
            value={gamificationConfig.streakBonus}
            onChange={(e) => setGamificationConfig(prev => ({...prev, streakBonus: parseInt(e.target.value)}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Puntos para Subir de Nivel
          </label>
          <input
            type="number"
            min="50"
            value={gamificationConfig.levelThreshold}
            onChange={(e) => setGamificationConfig(prev => ({...prev, levelThreshold: parseInt(e.target.value)}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Características de Gamificación</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={gamificationConfig.badgeSystem}
              onChange={(e) => setGamificationConfig(prev => ({...prev, badgeSystem: e.target.checked}))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Sistema de insignias</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={gamificationConfig.leaderboard}
              onChange={(e) => setGamificationConfig(prev => ({...prev, leaderboard: e.target.checked}))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Tabla de clasificación</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={gamificationConfig.weeklyRanking}
              onChange={(e) => setGamificationConfig(prev => ({...prev, weeklyRanking: e.target.checked}))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Ranking semanal</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Tipos de Notificaciones</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationConfig.studyReminders}
              onChange={(e) => setNotificationConfig(prev => ({...prev, studyReminders: e.target.checked}))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Recordatorios de estudio</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationConfig.achievementNotifications}
              onChange={(e) => setNotificationConfig(prev => ({...prev, achievementNotifications: e.target.checked}))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Notificaciones de logros</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationConfig.newContentAlerts}
              onChange={(e) => setNotificationConfig(prev => ({...prev, newContentAlerts: e.target.checked}))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Alertas de nuevo contenido</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notificationConfig.weeklyReports}
              onChange={(e) => setNotificationConfig(prev => ({...prev, weeklyReports: e.target.checked}))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Reportes semanales</span>
          </label>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Horarios de Recordatorios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {notificationConfig.reminderTimes.map((time, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recordatorio {index + 1}
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => {
                  const newTimes = [...notificationConfig.reminderTimes];
                  newTimes[index] = e.target.value;
                  setNotificationConfig(prev => ({...prev, reminderTimes: newTimes}));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Mensajes Personalizados</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje Matutino
            </label>
            <input
              type="text"
              value={notificationConfig.customMessages.morning}
              onChange={(e) => setNotificationConfig(prev => ({
                ...prev,
                customMessages: { ...prev.customMessages, morning: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje Vespertino
            </label>
            <input
              type="text"
              value={notificationConfig.customMessages.afternoon}
              onChange={(e) => setNotificationConfig(prev => ({
                ...prev,
                customMessages: { ...prev.customMessages, afternoon: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje Nocturno
            </label>
            <input
              type="text"
              value={notificationConfig.customMessages.evening}
              onChange={(e) => setNotificationConfig(prev => ({
                ...prev,
                customMessages: { ...prev.customMessages, evening: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tiempo de Sesión (minutos)
          </label>
          <input
            type="number"
            min="30"
            max="480"
            value={securityConfig.sessionTimeout}
            onChange={(e) => setSecurityConfig(prev => ({...prev, sessionTimeout: parseInt(e.target.value)}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Máximo Intentos de Login
          </label>
          <input
            type="number"
            min="3"
            max="10"
            value={securityConfig.maxLoginAttempts}
            onChange={(e) => setSecurityConfig(prev => ({...prev, maxLoginAttempts: parseInt(e.target.value)}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Longitud Mínima de Contraseña
          </label>
          <input
            type="number"
            min="6"
            max="20"
            value={securityConfig.passwordMinLength}
            onChange={(e) => setSecurityConfig(prev => ({...prev, passwordMinLength: parseInt(e.target.value)}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Configuraciones de Seguridad</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={securityConfig.requireSpecialChars}
              onChange={(e) => setSecurityConfig(prev => ({...prev, requireSpecialChars: e.target.checked}))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Requerir caracteres especiales en contraseñas</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={securityConfig.twoFactorAuth}
              onChange={(e) => setSecurityConfig(prev => ({...prev, twoFactorAuth: e.target.checked}))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Autenticación de dos factores</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={securityConfig.biometricAuth}
              onChange={(e) => setSecurityConfig(prev => ({...prev, biometricAuth: e.target.checked}))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Autenticación biométrica (estudiantes)</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={securityConfig.dataEncryption}
              onChange={(e) => setSecurityConfig(prev => ({...prev, dataEncryption: e.target.checked}))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Encriptación de datos</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralTab();
      case 'microlearning': return renderMicrolearningTab();
      case 'gamification': return renderGamificationTab();
      case 'notifications': return renderNotificationsTab();
      case 'security': return renderSecurityTab();
      default: return renderGeneralTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuración del Sistema</h1>
          <p className="mt-1 text-sm text-gray-600">
            Configura los parámetros generales del sistema de microlearning
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="h-5 w-5 mr-2" />
          Guardar Cambios
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};