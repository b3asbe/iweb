export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  active: boolean;
  avatar?: string;
}

export interface Student extends User {
  studentCode: string;
  dni: string;
  career: string;
  shift: 'night';
  cycle: number;
  enrollmentStatus: 'active' | 'inactive' | 'suspended';
}

export interface Teacher extends User {
  dni: string;
  phone: string;
  subjects: string[];
  specialty: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  cycle: number;
  credits: number;
  competencies: string[];
  teacherId: string;
}

export interface MicrolearningSession {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  duration: number; // minutes (5-15)
  difficulty: 'basic' | 'intermediate' | 'advanced';
  objective: string;
  contentType: 'video' | 'text' | 'interactive';
  content: string;
  sequence: number;
  active: boolean;
  createdAt: Date;
}

export interface StudentProgress {
  studentId: string;
  sessionId: string;
  completed: boolean;
  completionPercentage: number;
  timeSpent: number; // minutes
  score?: number;
  completedAt?: Date;
}

export interface Gamification {
  studentId: string;
  points: number;
  level: number;
  badges: Badge[];
  streak: number;
  ranking: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface Evaluation {
  id: string;
  sessionId: string;
  questions: Question[];
  passingScore: number;
  timeLimit: number; // minutes
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'reminder' | 'achievement' | 'announcement';
  read: boolean;
  createdAt: Date;
}