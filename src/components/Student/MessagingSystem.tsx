import React, { useState } from 'react';
import { Send, Search, Filter, MessageSquare, User, Clock, Paperclip, Star, Archive } from 'lucide-react';

export const MessagingSystem: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const conversations = [
    {
      id: '1',
      type: 'teacher',
      name: 'María Elena Torres',
      subject: 'Desarrollo Web',
      lastMessage: '¿Tienes alguna duda sobre la sesión de Docker?',
      timestamp: '10:30 AM',
      unread: 2,
      avatar: '👩‍🏫',
      online: true
    },
    {
      id: '2',
      type: 'teacher',
      name: 'Jorge Luis Vásquez',
      subject: 'Infraestructura TI',
      lastMessage: 'Recuerda revisar el material antes de la clase',
      timestamp: 'Ayer',
      unread: 0,
      avatar: '👨‍🏫',
      online: false
    },
    {
      id: '3',
      type: 'announcement',
      name: 'Anuncios Generales',
      subject: 'Sistema',
      lastMessage: 'Cambio de horario para la sesión de mañana',
      timestamp: '2 días',
      unread: 1,
      avatar: '📢',
      online: false
    },
    {
      id: '4',
      type: 'support',
      name: 'Soporte Técnico',
      subject: 'Sistema',
      lastMessage: 'Tu consulta ha sido resuelta',
      timestamp: '3 días',
      unread: 0,
      avatar: '🛠️',
      online: true
    }
  ];

  const messages = [
    {
      id: '1',
      conversationId: '1',
      sender: 'teacher',
      senderName: 'María Elena Torres',
      content: 'Hola Carlos, espero que estés bien. Quería preguntarte si tienes alguna duda sobre la sesión de Docker que vimos ayer.',
      timestamp: '10:25 AM',
      read: true
    },
    {
      id: '2',
      conversationId: '1',
      sender: 'student',
      senderName: 'Carlos Miguel',
      content: 'Hola profesora, sí tengo una duda sobre los volúmenes en Docker. ¿Podría explicarme mejor cómo funcionan?',
      timestamp: '10:28 AM',
      read: true
    },
    {
      id: '3',
      conversationId: '1',
      sender: 'teacher',
      senderName: 'María Elena Torres',
      content: '¿Tienes alguna duda sobre la sesión de Docker?',
      timestamp: '10:30 AM',
      read: false
    }
  ];

  const currentConversation = conversations.find(c => c.id === selectedConversation);
  const conversationMessages = messages.filter(m => m.conversationId === selectedConversation);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || conv.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-[calc(100vh-200px)] bg-white rounded-xl shadow-sm border border-gray-200 flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Mensajes</h2>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          {/* Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos</option>
              <option value="teacher">Docentes</option>
              <option value="announcement">Anuncios</option>
              <option value="support">Soporte</option>
            </select>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                    {conversation.avatar}
                  </div>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {conversation.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {conversation.unread > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unread}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{conversation.subject}</p>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                      {currentConversation.avatar}
                    </div>
                    {currentConversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{currentConversation.name}</h3>
                    <p className="text-sm text-gray-500">
                      {currentConversation.subject} • {currentConversation.online ? 'En línea' : 'Desconectado'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Star className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Archive className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversationMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'student'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <div className={`flex items-center justify-between mt-1 ${
                      message.sender === 'student' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">{message.timestamp}</span>
                      {message.sender === 'student' && (
                        <div className="text-xs">
                          {message.read ? '✓✓' : '✓'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Selecciona una conversación</h3>
              <p className="text-gray-500">Elige una conversación para comenzar a chatear</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};