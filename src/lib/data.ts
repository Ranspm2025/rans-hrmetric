
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

export const evaluationCriteria: EvaluationCriteria[] = [
  {
    id: '1',
    name: 'Kedisiplinan',
    category: 'performance',
    weight: 20,
    description: 'Ketepatan waktu dan kepatuhan pada aturan',
  },
  {
    id: '2',
    name: 'Kualitas Kerja',
    category: 'performance',
    weight: 30,
    description: 'Ketelitian dan hasil pekerjaan',
  },
  {
    id: '3',
    name: 'Kerjasama Tim',
    category: 'personality',
    weight: 25,
    description: 'Kemampuan bekerja dengan rekan',
  },
  {
    id: '4',
    name: 'Inisiatif',
    category: 'personality',
    weight: 25,
    description: 'Kemampuan mengambil inisiatif dan solusi',
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@hrmetric.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=67',
  },
  {
    id: '2',
    name: 'Budi Santoso',
    email: 'budi@hrmetric.com',
    role: 'manager',
    avatar: 'https://i.pravatar.cc/150?img=68',
  },
  {
    id: '3',
    name: 'Siti Rahayu',
    email: 'siti@hrmetric.com',
    role: 'karyawan',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id: '4',
    name: 'Ahmad Direktur',
    email: 'ahmad@hrmetric.com',
    role: 'pemimpin',
    avatar: 'https://i.pravatar.cc/150?img=60',
  },
];

export const documents: Document[] = [
  {
    id: '1',
    title: 'Laporan Kinerja Q1 2023',
    employeeId: '2',
    uploadedAt: '2023-04-15',
    fileUrl: '/documents/report1.pdf',
    status: 'approved',
    comments: 'Laporan lengkap dan terperinci',
  },
  {
    id: '2',
    title: 'Evaluasi Proyek Marketing',
    employeeId: '1',
    uploadedAt: '2023-06-22',
    fileUrl: '/documents/eval1.pdf',
    status: 'pending',
  },
];

export const evaluations: Evaluation[] = [
  {
    id: '1',
    employeeId: '2',
    managerId: '2',
    date: '2023-12-15',
    criteriaScores: [
      { criteriaId: '1', score: 85 },
      { criteriaId: '2', score: 90 },
      { criteriaId: '3', score: 88 },
      { criteriaId: '4', score: 92 },
    ],
    overallComment: 'Kinerja sangat baik, perlu peningkatan kedisiplinan',
    approved: false,
  },
  {
    id: '2',
    employeeId: '1',
    managerId: '2',
    date: '2023-11-20',
    criteriaScores: [
      { criteriaId: '1', score: 95 },
      { criteriaId: '2', score: 88 },
      { criteriaId: '3', score: 90 },
      { criteriaId: '4', score: 85 },
    ],
    overallComment: 'Kemampuan kepemimpinan yang baik',
    approved: true,
    approvedById: '4',
    approvedDate: '2023-11-25',
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
  return evaluations.filter(evaluation => evaluation.employeeId === employeeId);
};

export const getEvaluationsPendingApproval = (): Evaluation[] => {
  return evaluations.filter(evaluation => !evaluation.approved);
};

export const approveEvaluation = (evaluationId: string, approverId: string): void => {
  const evaluation = evaluations.find(evaluation => evaluation.id === evaluationId);
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
