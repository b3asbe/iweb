import React, { useState } from 'react';
import { Plus, Edit, Trash2, Award, Clock, Target, CheckCircle, Search, Filter } from 'lucide-react';

export const EvaluationManagement: React.FC = () => {
  const [evaluations, setEvaluations] = useState([
    {
      id: '1',
      title: 'Evaluación Docker Básico',
      contentId: '1',
      contentTitle: 'Introducción a Docker',
      subject: 'Infraestructura TI',
      questions: 5,
      timeLimit: 10,
      passingScore: 70,
      attempts: 142,
      averageScore: 85.2,
      passRate: 92,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Quiz NoSQL vs SQL',
      contentId: '2',
      contentTitle: 'Bases de Datos NoSQL',
      subject: 'Base de Datos',
      questions: 8,
      timeLimit: 15,
      passingScore: 75,
      attempts: 98,
      averageScore: 78.5,
      passRate: 87,
      status: 'active',
      createdAt: '2024-01-12'
    },
    {
      id: '3',
      title: 'Evaluación API REST',
      contentId: '3',
      contentTitle: 'API REST con Node.js',
      subject: 'Desarrollo Web',
      questions: 6,
      timeLimit: 12,
      passingScore: 80,
      attempts: 0,
      averageScore: 0,
      passRate: 0,
      status: 'draft',
      createdAt: '2024-01-10'
    }
  ]);

  const [questions, setQuestions] = useState([
    {
      id: '1',
      evaluationId: '1',
      text: '¿Qué es Docker?',
      type: 'multiple-choice',
      options: [
        'Una plataforma de contenedores',
        'Un sistema operativo',
        'Un lenguaje de programación',
        'Una base de datos'
      ],
      correctAnswer: 0,
      explanation: 'Docker es una plataforma de contenedores que permite empaquetar aplicaciones.'
    },
    {
      id: '2',
      evaluationId: '1',
      text: 'Docker permite la portabilidad de aplicaciones',
      type: 'true-false',
      options: ['Verdadero', 'Falso'],
      correctAnswer: 0,
      explanation: 'Docker facilita la portabilidad al encapsular aplicaciones en contenedores.'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingEvaluation, setEditingEvaluation] = useState<any>(null);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [selectedEvaluationId, setSelectedEvaluationId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    contentId: '',
    questions: 5,
    timeLimit: 10,
    passingScore: 70,
    status: 'draft'
  });

  const [questionFormData, setQuestionFormData] = useState({
    text: '',
    type: 'multiple-choice',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });

  const contents = [
    { id: '1', title: 'Introducción a Docker', subject: 'Infraestructura TI' },
    { id: '2', title: 'Bases de Datos NoSQL', subject: 'Base de Datos' },
    { id: '3', title: 'API REST con Node.js', subject: 'Desarrollo Web' }
  ];

  const subjects = ['Desarrollo Web', 'Base de Datos', 'Infraestructura TI', 'Seguridad'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedContent = contents.find(c => c.id === formData.contentId);
    
    if (editingEvaluation) {
      setEvaluations(evaluations.map(ev => 
        ev.id === editingEvaluation.id 
          ? { 
              ...formData, 
              id: editingEvaluation.id,
              contentTitle: selectedContent?.title || '',
              subject: selectedContent?.subject || '',
              attempts: editingEvaluation.attempts,
              averageScore: editingEvaluation.averageScore,
              passRate: editingEvaluation.passRate,
              createdAt: editingEvaluation.createdAt
            }
          : ev
      ));
    } else {
      const newEvaluation = {
        ...formData,
        id: Date.now().toString(),
        contentTitle: selectedContent?.title || '',
        subject: selectedContent?.subject || '',
        attempts: 0,
        averageScore: 0,
        passRate: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setEvaluations([...evaluations, newEvaluation]);
    }
    
    resetForm();
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingQuestion) {
      setQuestions(questions.map(q => 
        q.id === editingQuestion.id 
          ? { ...questionFormData, id: editingQuestion.id, evaluationId: selectedEvaluationId }
          : q
      ));
    } else {
      const newQuestion = {
        ...questionFormData,
        id: Date.now().toString(),
        evaluationId: selectedEvaluationId
      };
      setQuestions([...questions, newQuestion]);
    }
    
    resetQuestionForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      contentId: '',
      questions: 5,
      timeLimit: 10,
      passingScore: 70,
      status: 'draft'
    });
    setEditingEvaluation(null);
    setShowModal(false);
  };

  const resetQuestionForm = () => {
    setQuestionFormData({
      text: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    });
    setEditingQuestion(null);
    setShowQuestionModal(false);
  };

  const handleEdit = (evaluation: any) => {
    setFormData(evaluation);
    setEditingEvaluation(evaluation);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta evaluación?')) {
      setEvaluations(evaluations.filter(ev => ev.id !== id));
      setQuestions(questions.filter(q => q.evaluationId !== id));
    }
  };

  const handleEditQuestion = (question: any) => {
    setQuestionFormData(question);
    setEditingQuestion(question);
    setSelectedEvaluationId(question.evaluationId);
    setShowQuestionModal(true);
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta pregunta?')) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const getEvaluationQuestions = (evaluationId: string) => {
    return questions.filter(q => q.evaluationId === evaluationId);
  };

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = evaluation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.contentTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || evaluation.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Evaluaciones</h1>
          <p className="mt-1 text-sm text-gray-600">
            Crea y administra evaluaciones formativas para tus contenidos
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nueva Evaluación
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-lg p-3">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Evaluaciones</p>
              <p className="text-2xl font-semibold text-gray-900">{evaluations.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-lg p-3">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Activas</p>
              <p className="text-2xl font-semibold text-gray-900">
                {evaluations.filter(ev => ev.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 rounded-lg p-3">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Promedio General</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(evaluations.reduce((sum, ev) => sum + ev.averageScore, 0) / evaluations.length)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-orange-500 rounded-lg p-3">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tasa Aprobación</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(evaluations.reduce((sum, ev) => sum + ev.passRate, 0) / evaluations.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar evaluaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todas las asignaturas</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Evaluations List */}
      <div className="space-y-4">
        {filteredEvaluations.map((evaluation) => (
          <div key={evaluation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-900">{evaluation.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    evaluation.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {evaluation.status === 'active' ? 'Activa' : 'Borrador'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Contenido: {evaluation.contentTitle} • {evaluation.subject}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedEvaluationId(evaluation.id);
                    setShowQuestionModal(true);
                  }}
                  className="px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Agregar Pregunta
                </button>
                <button
                  onClick={() => handleEdit(evaluation)}
                  className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(evaluation.id)}
                  className="px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Evaluation Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{evaluation.questions}</div>
                <div className="text-sm text-gray-600">Preguntas</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{evaluation.timeLimit} min</div>
                <div className="text-sm text-gray-600">Tiempo límite</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{evaluation.attempts}</div>
                <div className="text-sm text-gray-600">Intentos</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">{evaluation.averageScore}%</div>
                <div className="text-sm text-gray-600">Promedio</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">{evaluation.passRate}%</div>
                <div className="text-sm text-gray-600">Aprobación</div>
              </div>
            </div>

            {/* Questions List */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Preguntas</h4>
              <div className="space-y-2">
                {getEvaluationQuestions(evaluation.id).map((question, index) => (
                  <div key={question.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {index + 1}. {question.text}
                        </span>
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {question.type === 'multiple-choice' ? 'Opción múltiple' : 
                           question.type === 'true-false' ? 'Verdadero/Falso' : 'Completar'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditQuestion(question)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {getEvaluationQuestions(evaluation.id).length === 0 && (
                  <p className="text-sm text-gray-500 italic">No hay preguntas creadas aún</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Evaluation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingEvaluation ? 'Editar Evaluación' : 'Nueva Evaluación'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título de la Evaluación *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contenido Asociado *
                </label>
                <select
                  required
                  value={formData.contentId}
                  onChange={(e) => setFormData({...formData, contentId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Seleccionar contenido</option>
                  {contents.map(content => (
                    <option key={content.id} value={content.id}>
                      {content.title} - {content.subject}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Preguntas
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.questions}
                    onChange={(e) => setFormData({...formData, questions: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiempo Límite (min)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="60"
                    value={formData.timeLimit}
                    onChange={(e) => setFormData({...formData, timeLimit: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Puntaje Mínimo (%)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={formData.passingScore}
                    onChange={(e) => setFormData({...formData, passingScore: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="draft">Borrador</option>
                  <option value="active">Activa</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingEvaluation ? 'Actualizar' : 'Crear'} Evaluación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingQuestion ? 'Editar Pregunta' : 'Nueva Pregunta'}
            </h2>
            
            <form onSubmit={handleQuestionSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pregunta *
                </label>
                <textarea
                  required
                  value={questionFormData.text}
                  onChange={(e) => setQuestionFormData({...questionFormData, text: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Pregunta
                </label>
                <select
                  value={questionFormData.type}
                  onChange={(e) => setQuestionFormData({...questionFormData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="multiple-choice">Opción múltiple</option>
                  <option value="true-false">Verdadero/Falso</option>
                </select>
              </div>
              
              {questionFormData.type === 'multiple-choice' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opciones de Respuesta
                  </label>
                  {questionFormData.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={questionFormData.correctAnswer === index}
                        onChange={() => setQuestionFormData({...questionFormData, correctAnswer: index})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...questionFormData.options];
                          newOptions[index] = e.target.value;
                          setQuestionFormData({...questionFormData, options: newOptions});
                        }}
                        placeholder={`Opción ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {questionFormData.type === 'true-false' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Respuesta Correcta
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={questionFormData.correctAnswer === 0}
                        onChange={() => setQuestionFormData({...questionFormData, correctAnswer: 0})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Verdadero</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={questionFormData.correctAnswer === 1}
                        onChange={() => setQuestionFormData({...questionFormData, correctAnswer: 1})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Falso</span>
                    </label>
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Explicación de la Respuesta
                </label>
                <textarea
                  value={questionFormData.explanation}
                  onChange={(e) => setQuestionFormData({...questionFormData, explanation: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Explica por qué esta es la respuesta correcta..."
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetQuestionForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingQuestion ? 'Actualizar' : 'Crear'} Pregunta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};