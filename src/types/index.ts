export type ScreenTab = 'beranda' | 'materi' | 'lkpd' | 'simulasi' | 'fenomena' | 'panduan';

export interface UserProfile {
  name: string;
  email: string;
  nisn: string;
  school: string;
  avatar: string;
  progressPercent: number;
  completedLkpd: number[];
  quizHighScore: number;
  badges: { id: string; name: string; icon: string; earned: boolean; date?: string }[];
}

export interface LessonUnit {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  formula: string;
  formulaExplanation: string;
  interactiveType: 'vector-work' | 'kinetic-energy' | 'potential-energy' | 'conservation';
  subtopics: { title: string; content: string; keyPoints: string[] }[];
}

export interface LkpdItem {
  id: number;
  number: string;
  title: string;
  objective: string;
  unit: string;
  estimatedMinutes: number;
  status: 'belum' | 'sedang' | 'selesai';
  score?: number;
  toolsNeeded: string[];
  inquiryStep: string;
  hypothesisGuide: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  context: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  hotsCategory: 'Menganalisis (C4)' | 'Mengevaluasi (C5)' | 'Mencipta (C6)';
}

export interface SimulationParams {
  mass: number;        // kg (10 - 100)
  friction: number;    // mu (0 - 0.5)
  gravity: number;     // m/s^2 (Earth: 9.8, Moon: 1.6, Jupiter: 24.8)
  initialHeight: number; // meters (1 - 8)
  rampAngle: number;   // degrees
  rampShape: 'curved' | 'straight' | 'loop';
  isPlaying: boolean;
  playbackSpeed: number; // 0.5x, 1x
}

export interface TelemetryData {
  time: number;
  position: number;
  height: number;
  velocity: number;
  kineticEnergy: number;
  potentialEnergy: number;
  thermalEnergy: number;
  totalEnergy: number;
}
