import React, { useState } from 'react';
import { Send, Users, MessageSquare, Bell, Filter, Search, Plus } from 'lucide-react';

export const TeacherMessaging: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'group' | 'announcements'>('individual');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [messageText, setMessageText] = useState('');
  const [announcementText, setAnnouncementText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    {
      id: '1',
      name: 'Carlos Miguel',
      code: 'EST001',
      lastSeen: '2 horas',
      unreadMessages: 2,
      online: true
    },
    {
      id: '2',
      name: 'Ana García',
      code: 'EST002',
      lastSeen: '1 hora',
      unreadMessages: 0,
      online: true
    },
    {
      id: '3',
      name: 'Diego Ruiz',
      code: 'EST003',
      lastSeen: '1 día',
      unreadMessages: 1,
      online: false
    },
    {
      id: '4',
      name: 'Laura Vega',
      code: 'EST004',
      lastSeen: '3 horas',
      unreadMessages: 0,
      online: false
    }
  ];

  const conversations = [
    {
      id: '1',
      studentId: '1',
      studentName: 'Carlos Miguel',
      lastMessage: 'Gracias por la explicación sobre Docker',
      timestamp: '10:30 AM',
      unread: 2
    },
    {
      id: '2',
      studentId: '3',
      studentName: 'Diego Ruiz',
      lastMessage: '¿Podría revisar mi tarea?',
      timestamp: 'Ayer',
      unread: 1
    }
  ];

  const announcements = [
    {
      id: '1',
      title: 'Cambio de horario - Sesión Docker',
      content: 'La sesión de Docker programada para mañana se ha movido a las 20:00 hrs.',
      sentTo: 'Todos los estudiantes',
      sentAt: '2024-01-15 14:30',
      readCount: 38,
      totalStudents: 42
    },
    {
      id: '2',
      title: 'Material adicional disponible',
      content: 'He subido material complementario sobre Kubernetes en la plataforma.',
      sentTo: 'Estudiantes de Infraestructura TI',
      sentAt: '2024-01-14 16:45',
      readCount: 35,
      totalStudents: 35
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && selectedStudents.length > 0) {
      alert(`Mensaje enviado a ${selectedStudents.length} estudiante(s)`);
      setMessageText('');
      setSelectedStudents([]);
    }
  };

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (announcementText.trim()) {
      alert('Anuncio enviado a todos los estudiantes');
      setAnnouncementText('');
    }
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const selectAllStudents = () => {
    setSelectedStudents(students.map(s => s.id));
  };

  const clearSelection = () => {
    setSelectedStudents([]);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderIndividualTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Student Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Seleccionar Estudiantes</h3>
          <div className="flex space-x-2">
            <button
              onClick={selectAllStudents}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Seleccionar todos
            </button>
            <button
              onClick={clearSelection}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Limpiar
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar estudiantes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              onClick={() => toggleStudentSelection(student.id)}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedStudents.includes(student.id)
                  ? 'bg-blue-50 border-blue-300'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => toggleStudentSelection(student.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.code}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {student.unreadMessages > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {student.unreadMessages}
                    </span>
                  )}
                  <div className={`w-2 h-2 rounded-full ${
                    student.online ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedStudents.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              {selectedStudents.length} estudiante(s) seleccionado(s)
            </p>
          </div>
        )}
      </div>

      {/* Message Composition */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Enviar Mensaje</h3>
        
        <form onSubmit={handleSendMessage} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mensaje
            </label>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>
          
          <button
            type="submit"
            disabled={!messageText.trim() || selectedStudents.length === 0}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4 mr-2" />
            Enviar Mensaje
          </button>
        </form>

        {/* Recent Conversations */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Conversaciones Recientes</h4>
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div key={conv.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{conv.studentName}</span>
                  <span className="text-xs text-gray-500">{conv.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600">{conv.lastMessage}</p>
                {conv.unread > 0 && (
                  <span className="inline-block mt-1 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {conv.unread} nuevo(s)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnnouncementsTab = () => (
    <div className="space-y-6">
      {/* Create Announcement */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Crear Anuncio</h3>
        
        <form onSubmit={handleSendAnnouncement} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anuncio
            </label>
            <textarea
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Escribe tu anuncio aquí..."
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Enviar notificación push</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Enviar por email</span>
            </label>
          </div>
          
          <button
            type="submit"
            disabled={!announcementText.trim()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Bell className="h-4 w-4 mr-2" />
            Enviar Anuncio
          </button>
        </form>
      </div>

      {/* Previous Announcements */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Anuncios Anteriores</h3>
        
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                <span className="text-xs text-gray-500">{announcement.sentAt}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{announcement.content}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Enviado a: {announcement.sentTo}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500">
                    Leído por: {announcement.readCount}/{announcement.totalStudents}
                  </span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(announcement.readCount / announcement.totalStudents) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mensajería</h1>
        <p className="mt-1 text-sm text-gray-600">
          Comunícate con tus estudiantes y envía anuncios importantes
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('individual')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'individual'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Mensajes Individuales
            </div>
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'announcements'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Anuncios Generales
            </div>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {activeTab === 'individual' && renderIndividualTab()}
        {activeTab === 'announcements' && renderAnnouncementsTab()}
      </div>
    </div>
  );
};