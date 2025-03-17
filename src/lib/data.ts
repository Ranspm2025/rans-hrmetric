export interface Policy {
  id: string;
  title: string;
  category: string;
  description: string;
  lastUpdated: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  avatar: string;
  hireDate: string;
  performance: number;
  personality: number;
}

export interface EvaluationCriteria {
  id: string;
  name: string;
  category: 'performance' | 'personality';
  weight: number;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'karyawan' | 'pemimpin';
  avatar: string;
}

export interface Document {
  id: string;
  title: string;
  employeeId: string;
  uploadedAt: string;
  fileUrl: string;
  status: 'pending' | 'reviewed' | 'approved';
  comments?: string;
}

export interface Evaluation {
  id: string;
  employeeId: string;
  managerId: string;
  date: string;
  criteriaScores: {
    criteriaId: string;
    score: number;
    comment?: string;
  }[];
  overallComment?: string;
  approved?: boolean;
  approvedById?: string;
  approvedDate?: string;
}

export const policies: Policy[] = [
  {
    id: '1',
    title: 'Promosi Karyawan',
    category: 'SDM',
    description: 'Kebijakan promosi karyawan berdasarkan penilaian kinerja dan kepribadian yang selaras dengan nilai perusahaan.',
    lastUpdated: '2023-10-15',
  },
  {
    id: '2',
    title: 'Pengembangan Karir',
    category: 'SDM',
    description: 'Kebijakan pengembangan karir karyawan melalui pelatihan dan pendidikan lanjutan.',
    lastUpdated: '2023-09-22',
  },
  {
    id: '3',
    title: 'Penilaian Kinerja',
    category: 'Manajemen',
    description: 'Prosedur dan standar penilaian kinerja karyawan secara berkala.',
    lastUpdated: '2023-11-05',
  },
  {
    id: '4',
    title: 'Kode Etik',
    category: 'Umum',
    description: 'Kode etik dan perilaku karyawan dalam lingkungan kerja dan representasi perusahaan.',
    lastUpdated: '2023-08-30',
  },
  {
    id: '5',
    title: 'Target Perusahaan',
    category: 'Manajemen',
    description: 'Target strategis perusahaan untuk tahun berjalan dan indikator kesuksesan.',
    lastUpdated: '2024-01-10',
  },
  {
    id: '6',
    title: 'Insentif & Bonus',
    category: 'Keuangan',
    description: 'Kebijakan pemberian insentif dan bonus berdasarkan pencapaian target individual dan tim.',
    lastUpdated: '2023-12-12',
  },
];

export const employees: Employee[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    position: 'Manager Pemasaran',
    department: 'Pemasaran',
    avatar: 'https://i.pravatar.cc/150?img=1',
    hireDate: '2020-05-15',
    performance: 92,
    personality: 87,
  },
  {
    id: '2',
    name: 'Siti Rahayu',
    position: 'Analis Keuangan',
    department: 'Keuangan',
    avatar: 'https://i.pravatar.cc/150?img=5',
    hireDate: '2021-02-10',
    performance: 88,
    personality: 90,
  },
];

export const getPromotionScore = (employee: Employee): number => {
  return (employee.performance * 0.6) + (employee.personality * 0.4);
};

export const getPromotionCandidates = (): Employee[] => {
  return [...employees]
    .sort((a, b) => getPromotionScore(b) - getPromotionScore(a))
    .slice(0, 3);
};

export const getEmployeeById = (id: string): Employee | undefined => {
  return employees.find(employee => employee.id === id);
};

export const getPolicyById = (id: string): Policy | undefined => {
  return policies.find(policy => policy.id === id);
};
export const getPolicyById = (id: string): Policy | undefined => {
  return policies.find(policy => policy.id === id);
};

export const addEvaluationCriteria = (criteria: Omit<EvaluationCriteria, 'id'>): EvaluationCriteria => {
  const newCriteria: EvaluationCriteria = {
    ...criteria,
    id: (evaluationCriteria.length + 1).toString(),
  };
  evaluationCriteria.push(newCriteria);
  return newCriteria;
};

export const addEmployee = (employee: Omit<Employee, 'id'>): Employee => {
  const newEmployee: Employee = {
    ...employee,
    id: (employees.length + 1).toString(),
  };
  employees.push(newEmployee);
  return newEmployee;
};

export const getUserByEmailAndPassword = (email: string, password: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const getCurrentUser = (): User | null => {
  const storedUser = localStorage.getItem('currentUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};

export const getEvaluationsByEmployeeId = (employeeId: string): Evaluation[] => {
  return evaluations.filter(eval => eval.employeeId === employeeId);
};

export const getEvaluationsPendingApproval = (): Evaluation[] => {
  return evaluations.filter(eval => !eval.approved);
};

export const approveEvaluation = (evaluationId: string, approverId: string): void => {
  const evaluation = evaluations.find(eval => eval.id === evaluationId);
  if (evaluation) {
    evaluation.approved = true;
    evaluation.approvedById = approverId;
    evaluation.approvedDate = new Date().toISOString().split('T')[0];
  }
};

export const addDocument = (doc: Omit<Document, 'id' | 'status' | 'uploadedAt'>): Document => {
  const newDoc: Document = {
    ...doc,
    id: (documents.length + 1).toString(),
    status: 'pending',
    uploadedAt: new Date().toISOString().split('T')[0],
  };
  documents.push(newDoc);
  return newDoc;
};

export const updateDocument = (id: string, updates: Partial<Document>): Document | undefined => {
  const docIndex = documents.findIndex(doc => doc.id === id);
  if (docIndex >= 0) {
    documents[docIndex] = { ...documents[docIndex], ...updates };
    return documents[docIndex];
  }
  return undefined;
};
export const getPolicyById = (id: string): Policy | undefined => {
  return policies.find(policy => policy.id === id);
};

export const addEvaluationCriteria = (criteria: Omit<EvaluationCriteria, 'id'>): EvaluationCriteria => {
  const newCriteria: EvaluationCriteria = {
    ...criteria,
    id: (evaluationCriteria.length + 1).toString(),
  };
  evaluationCriteria.push(newCriteria);
  return newCriteria;
};

export const addEmployee = (employee: Omit<Employee, 'id'>): Employee => {
  const newEmployee: Employee = {
    ...employee,
    id: (employees.length + 1).toString(),
  };
  employees.push(newEmployee);
  return newEmployee;
};

export const getUserByEmailAndPassword = (email: string, password: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const getCurrentUser = (): User | null => {
  const storedUser = localStorage.getItem('currentUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};

export const getEvaluationsByEmployeeId = (employeeId: string): Evaluation[] => {
  return evaluations.filter(eval => eval.employeeId === employeeId);
};

export const getEvaluationsPendingApproval = (): Evaluation[] => {
  return evaluations.filter(eval => !eval.approved);
};

export const approveEvaluation = (evaluationId: string, approverId: string): void => {
  const evaluation = evaluations.find(eval => eval.id === evaluationId);
  if (evaluation) {
    evaluation.approved = true;
    evaluation.approvedById = approverId;
    evaluation.approvedDate = new Date().toISOString().split('T')[0];
  }
};

export const addDocument = (doc: Omit<Document, 'id' | 'status' | 'uploadedAt'>): Document => {
  const newDoc: Document = {
    ...doc,
    id: (documents.length + 1).toString(),
    status: 'pending',
    uploadedAt: new Date().toISOString().split('T')[0],
  };
  documents.push(newDoc);
  return newDoc;
};

export const updateDocument = (id: string, updates: Partial<Document>): Document | undefined => {
  const docIndex = documents.findIndex(doc => doc.id === id);
  if (docIndex >= 0) {
    documents[docIndex] = { ...documents[docIndex], ...updates };
    return documents[docIndex];
  }
  return undefined;
};