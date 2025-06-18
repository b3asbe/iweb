import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Check, Clock, Target, ChevronLeft } from 'lucide-react';

interface MicrolearningSessionProps {
  onBack: () => void;
}

export const MicrolearningSession: React.FC<MicrolearningSessionProps> = ({ onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10 * 60); // 10 minutes in seconds
  const [currentSlide, setCurrentSlide] = useState(0);

  const sessionData = {
    title: 'Docker y Contenedores',
    objective: 'Comprender los conceptos básicos de containerización y Docker',
    duration: 10,
    difficulty: 'Intermedio',
    slides: [
      {
        type: 'intro',
        title: '¿Qué es Docker?',
        content: 'Docker es una plataforma de contenedores que permite empaquetar aplicaciones con todas sus dependencias.',
        media: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        type: 'concept',
        title: 'Ventajas de los Contenedores',
        content: 'Los contenedores ofrecen portabilidad, escalabilidad y eficiencia en el uso de recursos.',
        media: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        type: 'practical',
        title: 'Comandos Básicos',
        content: 'Aprende los comandos esenciales: docker run, docker build, docker push, docker pull.',
        media: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        type: 'quiz',
        title: 'Evaluación Rápida',
        content: '¿Cuál es la principal ventaja de usar contenedores?',
        options: [
          'Mayor velocidad de desarrollo',
          'Portabilidad entre entornos',
          'Menor uso de memoria',
          'Todas las anteriores'
        ],
        correct: 3
      }
    ]
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          setProgress(((10 * 60 - newTime) / (10 * 60)) * 100);
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentSlide < sessionData.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Session completed
      alert('¡Sesión completada! +10 puntos ganados');
      onBack();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentSlideData = sessionData.slides[currentSlide];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-black bg-opacity-50 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Volver
          </button>
          
          <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{formatTime(timeRemaining)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span className="text-sm">{sessionData.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mt-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / sessionData.slides.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Slide {currentSlide + 1} de {sessionData.slides.length}</span>
            <span>{Math.round(((currentSlide + 1) / sessionData.slides.length) * 100)}% completado</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Session Info */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <h1 className="text-2xl font-bold mb-2">{sessionData.title}</h1>
            <p className="text-blue-100">{sessionData.objective}</p>
          </div>

          {/* Content Area */}
          <div className="p-8">
            {currentSlideData.type !== 'quiz' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {currentSlideData.title}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {currentSlideData.content}
                  </p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePlayPause}
                      className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                      {isPlaying ? 'Pausar' : 'Reproducir'}
                    </button>
                    <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reiniciar
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={currentSlideData.media}
                    alt={currentSlideData.title}
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-xl">
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <Play className="h-6 w-6 text-blue-600 ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentSlideData.title}
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  {currentSlideData.content}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {currentSlideData.options?.map((option, index) => (
                    <button
                      key={index}
                      className="p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                      <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="bg-gray-50 px-8 py-4 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentSlide === 0}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>
            
            <div className="flex items-center space-x-2">
              {sessionData.slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-600' : 
                    index < currentSlide ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {currentSlide === sessionData.slides.length - 1 ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Completar
                </>
              ) : (
                'Siguiente'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};