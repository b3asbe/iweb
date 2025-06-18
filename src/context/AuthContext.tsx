import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Student, Teacher } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'system' | 'student') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration
const mockUsers: (User | Student | Teacher)[] = [
  {
    id: '1',
    name: 'Juan Carlos Admin',
    email: 'admin@iestp.edu.pe',
    role: 'admin',
    active: true,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '2',
    name: 'María Elena Docente',
    email: 'maria.docente@iestp.edu.pe',
    role: 'teacher',
    active: true,
    dni: '12345678',
    phone: '987654321',
    subjects: ['Desarrollo Web', 'Base de Datos'],
    specialty: 'Tecnologías de Información',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  } as Teacher,
  {
    id: '3',
    name: 'Carlos Miguel Estudiante',
    email: 'carlos.estudiante@iestp.edu.pe',
    role: 'student',
    active: true,
    studentCode: 'EST001',
    dni: '87654321',
    career: 'Arquitectura de Plataformas y Servicios de TI',
    shift: 'night',
    cycle: 3,
    enrollmentStatus: 'active',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  } as Student
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, userType: 'system' | 'student'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let foundUser: User | undefined;
    
    if (userType === 'student') {
      // For students, email is actually student code
      foundUser = mockUsers.find(u => 
        u.role === 'student' && 
        (u as Student).studentCode === email && 
        (u as Student).shift === 'night' &&
        (u as Student).career === 'Arquitectura de Plataformas y Servicios de TI'
      );
    } else {
      // For system users (admin/teacher)
      foundUser = mockUsers.find(u => 
        (u.role === 'admin' || u.role === 'teacher') && 
        u.email === email
      );
    }
    
    if (foundUser && password === '123456') { // Mock password validation
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};