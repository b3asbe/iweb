import React from 'react';
import { Trophy, Star, Flame, Award, Target, TrendingUp } from 'lucide-react';

export const GamificationPanel: React.FC = () => {
  const playerStats = {
    level: 8,
    points: 890,
    nextLevelPoints: 1000,
    streak: 7,
    ranking: 3,
    totalStudents: 42
  };

  const badges = [
    {
      id: 1,
      name: 'Estudiante Constante',
      description: '7 días consecutivos estudiando',
      icon: '🔥',
      earned: true,
      earnedDate: '2024-01-15',
      rarity: 'common'
    },
    {
      id: 2,
      name: 'Perfeccionista',
      description: '100% en 5 evaluaciones consecutivas',
      icon: '⭐',
      earned: true,
      earnedDate: '2024-01-12',
      rarity: 'rare'
    },
    {
      id: 3,
      name: 'Madrugador',
      description: 'Completar sesión antes de las 7 AM',
      icon: '🌅',
      earned: true,
      earnedDate: '2024-01-10',
      rarity: 'uncommon'
    },
    {
      id: 4,
      name: 'Explorador',
      description: 'Completar 10 contenidos opcionales',
      icon: '🗺️',
      earned: false,
      progress: 7,
      maxProgress: 10,
      rarity: 'rare'
    },
    {
      id: 5,
      name: 'Maestro del Tiempo',
      description: 'Completar 50 sesiones en tiempo récord',
      icon: '⚡',
      earned: false,
      progress: 23,
      maxProgress: 50,
      rarity: 'epic'
    },
    {
      id: 6,
      name: 'Sabio',
      description: 'Alcanzar nivel 15',
      icon: '🎓',
      earned: false,
      progress: 8,
      maxProgress: 15,
      rarity: 'legendary'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Ana García', points: 1250, level: 12, avatar: '👩‍💻' },
    { rank: 2, name: 'Miguel Torres', points: 1100, level: 10, avatar: '👨‍💻' },
    { rank: 3, name: 'Carlos Miguel', points: 890, level: 8, avatar: '👨‍🎓', isCurrentUser: true },
    { rank: 4, name: 'Laura Vega', points: 780, level: 7, avatar: '👩‍🎓' },
    { rank: 5, name: 'Diego Ruiz', points: 720, level: 7, avatar: '👨‍💼' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 border-gray-300';
      case 'uncommon': return 'bg-green-100 border-green-300';
      case 'rare': return 'bg-blue-100 border-blue-300';
      case 'epic': return 'bg-purple-100 border-purple-300';
      case 'legendary': return 'bg-yellow-100 border-yellow-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const levelProgress = ((playerStats.points % 1000) / 1000) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mis Logros</h1>
        <p className="mt-1 text-sm text-gray-600">
          Sigue aprendiendo y desbloquea nuevos logros
        </p>
      </div>

      {/* Player Stats */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">Nivel {playerStats.level}</div>
            <div className="text-purple-200">Progreso al siguiente nivel</div>
            <div className="w-full bg-purple-700 rounded-full h-2 mt-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>
            <div className="text-sm text-purple-200 mt-1">
              {playerStats.points % 1000}/{1000 - (playerStats.points % 1000)} puntos restantes
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 mr-2" />
            </div>
            <div className="text-2xl font-bold">{playerStats.points}</div>
            <div className="text-purple-200">Puntos Totales</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Flame className="h-6 w-6 mr-2" />
            </div>
            <div className="text-2xl font-bold">{playerStats.streak}</div>
            <div className="text-purple-200">Días Consecutivos</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-6 w-6 mr-2" />
            </div>
            <div className="text-2xl font-bold">#{playerStats.ranking}</div>
            <div className="text-purple-200">en el Ranking</div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Insignias</h3>
          <div className="text-sm text-gray-500">
            {badges.filter(b => b.earned).length} de {badges.length} desbloqueadas
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                badge.earned 
                  ? `${getRarityColor(badge.rarity)} opacity-100` 
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-1">{badge.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                
                {badge.earned ? (
                  <div className="flex items-center justify-center text-green-600">
                    <Award className="h-4 w-4 mr-1" />
                    <span className="text-xs">Obtenida {badge.earnedDate}</span>
                  </div>
                ) : (
                  <div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${badge.progress && badge.maxProgress ? 
                            (badge.progress / badge.maxProgress) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                    {badge.progress && badge.maxProgress && (
                      <div className="text-xs text-gray-500">
                        {badge.progress}/{badge.maxProgress}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Rarity indicator */}
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                badge.rarity === 'common' ? 'bg-gray-500 text-white' :
                badge.rarity === 'uncommon' ? 'bg-green-500 text-white' :
                badge.rarity === 'rare' ? 'bg-blue-500 text-white' :
                badge.rarity === 'epic' ? 'bg-purple-500 text-white' :
                'bg-yellow-500 text-black'
              }`}>
                {badge.rarity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Ranking Semanal</h3>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-3">
          {leaderboard.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center p-4 rounded-lg border ${
                player.isCurrentUser 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                player.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                player.rank === 2 ? 'bg-gray-300 text-gray-700' :
                player.rank === 3 ? 'bg-orange-400 text-orange-900' :
                'bg-gray-200 text-gray-600'
              }`}>
                {player.rank}
              </div>
              
              <div className="ml-4 text-2xl">{player.avatar}</div>
              
              <div className="ml-3 flex-1">
                <div className="flex items-center">
                  <span className={`font-medium ${
                    player.isCurrentUser ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {player.name}
                  </span>
                  {player.isCurrentUser && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Tú
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  Nivel {player.level}
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-gray-900">{player.points}</div>
                <div className="text-sm text-gray-500">puntos</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};