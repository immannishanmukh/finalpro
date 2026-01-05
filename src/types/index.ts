export type UserRole = 'student' | 'mentor';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  mentorSince?: string;
  rating?: number;
}

export interface Skill {
  language: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  selected: boolean;
}

export interface ErrorSubmission {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  image?: string;
  status: 'pending' | 'ai_solved' | 'mentor_assigned' | 'resolved';
  aiSolution?: string;
  createdAt: string;
}

export interface Session {
  id: string;
  studentId: string;
  mentorId?: string;
  errorId: string;
  status: 'pending' | 'active' | 'completed';
  startTime?: string;
  endTime?: string;
  rating?: number;
  feedback?: string;
}
