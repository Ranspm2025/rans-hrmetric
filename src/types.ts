
// Define all types used in the application

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'karyawan' | 'pemimpin';
  avatar: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  hireDate: string;
  avatar: string;
  performance: number;
  personality: number;
}

export interface EvaluationCriteria {
  id: string;
  name: string;
  description: string;
  category: 'performance' | 'personality';
  weight: number;
}

export interface Department {
  id: string;
  name: string;
  description: string;
}

export interface Policy {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  lastUpdated?: string;
}

export interface CriteriaScore {
  criteriaId: string;
  score: number;
}

export interface Evaluation {
  id: string;
  employeeId: string;
  managerId: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  overallComment?: string;
  criteriaScores: CriteriaScore[];
  approvedBy?: string;
  approvedDate?: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  uploadedBy: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected' | 'reviewed';
  employeeId: string; // Changed from optional to required
  fileUrl?: string;
  uploadedAt?: string;
  comments?: string; // Added missing comments field
}

export interface PerformanceData {
  name: string;
  performanceAvg: number;
  personalityAvg: number;
  count: number;
}
