import React from 'react';
import { Target } from 'lucide-react';

export const StudentProgress: React.FC = () => {
  const progress = [
    { subject: 'Desarrollo Web', completed: 80 },
    { subject: 'Base de Datos', completed: 70 },
    { subject: 'Infraestructura TI', completed: 60 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mi Progreso</h1>
        <p className="mt-1 text-sm text-gray-600">Revisa tu avance en cada asignatura</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          {progress.map((p, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-gray-900">{p.subject}</h3>
                <span className="text-sm text-gray-600">{p.completed}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${p.completed}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;
