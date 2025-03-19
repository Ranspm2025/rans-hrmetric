
import type { User, Employee, EvaluationCriteria, Department, Policy, Evaluation, Document, PerformanceData } from '@/types';

// User accounts for the login system
export const users: User[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@hrmetric.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=68',
  },
  {
    id: '2',
    name: 'Manager',
    email: 'manager@hrmetric.com',
    password: 'manager123',
    role: 'manager',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id: '3',
    name: 'User',
    email: 'user@hrmetric.com',
    password: 'user123',
    role: 'karyawan',
    avatar: 'https://i.pravatar.cc/150?img=16',
  },
  {
    id: '4',
    name: 'Pemimpin',
    email: 'leader@hrmetric.com',
    password: 'leader123',
    role: 'pemimpin',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
];

export const policies: Policy[] = [
  {
    id: '1',
    title: 'Kebijakan Cuti',
    content: `
      # Kebijakan Cuti Karyawan

      ## Ketentuan Umum
      1. Setiap karyawan berhak mendapatkan cuti tahunan sebanyak 12 hari kerja.
      2. Cuti tidak dapat diakumulasikan ke tahun berikutnya.
      3. Pengajuan cuti harus dilakukan minimal 3 hari kerja sebelumnya.

      ## Prosedur Pengajuan
      1. Isi formulir pengajuan cuti yang tersedia di sistem HRIS.
      2. Dapatkan persetujuan dari atasan langsung.
      3. Serahkan formulir yang telah disetujui ke departemen HR.

      ## Ketentuan Khusus
      - Cuti pada masa peak season perusahaan akan dibatasi.
      - Cuti sakit lebih dari 2 hari harus disertai surat keterangan dokter.
    `,
    category: 'Cuti & Absensi',
    createdAt: '2023-07-15',
    updatedAt: '2023-08-20',
  },
  {
    id: '2',
    title: 'Kebijakan Kompensasi & Benefit',
    content: `
      # Kebijakan Kompensasi & Benefit

      ## Struktur Gaji
      1. Gaji pokok sesuai dengan grade dan jabatan
      2. Tunjangan transportasi
      3. Tunjangan makan
      4. Tunjangan kesehatan

      ## Benefit Karyawan
      - BPJS Kesehatan dan Ketenagakerjaan
      - Asuransi kesehatan tambahan
      - Program dana pensiun
      - Reimbursement biaya pendidikan dan pelatihan

      ## Review Kompensasi
      - Dilakukan evaluasi kinerja setiap 6 bulan
      - Penyesuaian gaji tahunan berdasarkan inflasi dan kinerja
      - Bonus tahunan berdasarkan performa perusahaan dan individu
    `,
    category: 'Kompensasi',
    createdAt: '2023-05-10',
    updatedAt: '2023-06-15',
  },
  {
    id: '3',
    title: 'Kebijakan Kode Etik Perusahaan',
    content: `
      # Kode Etik Perusahaan

      ## Prinsip Dasar
      1. Integritas dalam setiap tindakan
      2. Profesionalisme dalam bekerja
      3. Menghormati keberagaman
      4. Tanggung jawab sosial dan lingkungan

      ## Etika Kerja
      - Menjaga kerahasiaan informasi perusahaan
      - Menghindari konflik kepentingan
      - Tidak menerima gratifikasi dari pihak ketiga
      - Menjaga perilaku profesional di tempat kerja

      ## Sanksi Pelanggaran
      - Peringatan tertulis
      - Skorsing
      - Pemutusan hubungan kerja
      - Tindakan hukum jika diperlukan
    `,
    category: 'Etika & Kepatuhan',
    createdAt: '2023-04-20',
    updatedAt: '2023-05-05',
  },
];

export const employees: Employee[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    position: 'Senior Developer',
    department: 'Engineering',
    hireDate: '2020-05-15',
    avatar: 'https://i.pravatar.cc/150?img=1',
    performance: 95,
    personality: 87,
  },
  {
    id: '2',
    name: 'Dewi Anggraini',
    position: 'HR Specialist',
    department: 'Human Resources',
    hireDate: '2021-03-20',
    avatar: 'https://i.pravatar.cc/150?img=5',
    performance: 89,
    personality: 92,
  },
  {
    id: '3',
    name: 'Ahmad Rizal',
    position: 'Marketing Manager',
    department: 'Marketing',
    hireDate: '2019-11-08',
    avatar: 'https://i.pravatar.cc/150?img=12',
    performance: 91,
    personality: 88,
  },
  {
    id: '4',
    name: 'Siti Nurhaliza',
    position: 'Finance Analyst',
    department: 'Finance',
    hireDate: '2022-01-10',
    avatar: 'https://i.pravatar.cc/150?img=20',
    performance: 88,
    personality: 85,
  },
  {
    id: '5',
    name: 'Rudi Hermawan',
    position: 'Product Manager',
    department: 'Product',
    hireDate: '2020-08-22',
    avatar: 'https://i.pravatar.cc/150?img=30',
    performance: 93,
    personality: 89,
  },
];

export const evaluationCriteria: EvaluationCriteria[] = [
  {
    id: '1',
    name: 'Kualitas Kerja',
    description: 'Akurasi, ketelitian, dan kualitas hasil pekerjaan',
    category: 'performance',
    weight: 20,
  },
  {
    id: '2',
    name: 'Produktivitas',
    description: 'Volume pekerjaan yang diselesaikan dan efisiensi waktu',
    category: 'performance',
    weight: 15,
  },
  {
    id: '3',
    name: 'Pengetahuan Pekerjaan',
    description: 'Pemahaman tentang prosedur, kebijakan, dan teknik kerja',
    category: 'performance',
    weight: 15,
  },
  {
    id: '4',
    name: 'Keandalan',
    description: 'Konsistensi, kehadiran, dan tanggung jawab',
    category: 'performance',
    weight: 10,
  },
  {
    id: '5',
    name: 'Komunikasi',
    description: 'Kemampuan berkomunikasi secara efektif dengan rekan kerja dan atasan',
    category: 'personality',
    weight: 10,
  },
  {
    id: '6',
    name: 'Kerja Tim',
    description: 'Kemampuan bekerja secara kolaboratif dan berkontribusi dalam tim',
    category: 'personality',
    weight: 10,
  },
  {
    id: '7',
    name: 'Inisiatif',
    description: 'Proaktif mengidentifikasi masalah dan mencari solusi',
    category: 'personality',
    weight: 10,
  },
  {
    id: '8',
    name: 'Adaptabilitas',
    description: 'Kemampuan beradaptasi dengan perubahan dan mempelajari hal baru',
    category: 'personality',
    weight: 10,
  },
];

// User departments
export const departments: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    description: 'Departemen pengembangan perangkat lunak dan infrastruktur IT',
  },
  {
    id: '2',
    name: 'Human Resources',
    description: 'Departemen pengelolaan sumber daya manusia',
  },
  {
    id: '3',
    name: 'Marketing',
    description: 'Departemen pemasaran dan promosi produk',
  },
  {
    id: '4',
    name: 'Finance',
    description: 'Departemen keuangan dan akuntansi',
  },
  {
    id: '5',
    name: 'Product',
    description: 'Departemen pengembangan dan manajemen produk',
  },
];

// Evaluations data
export const evaluations: Evaluation[] = [
  {
    id: '1',
    employeeId: '1',
    managerId: '2',
    date: '2023-10-15',
    status: 'pending',
    criteriaScores: [
      { criteriaId: '1', score: 85 },
      { criteriaId: '2', score: 90 },
      { criteriaId: '3', score: 80 },
      { criteriaId: '4', score: 95 },
    ],
    overallComment: 'Karyawan menunjukkan kinerja yang baik dalam proyek-proyek yang ditangani.'
  },
  {
    id: '2',
    employeeId: '2',
    managerId: '2',
    date: '2023-11-20',
    status: 'pending',
    criteriaScores: [
      { criteriaId: '1', score: 75 },
      { criteriaId: '2', score: 80 },
      { criteriaId: '3', score: 85 },
      { criteriaId: '4', score: 70 },
    ],
    overallComment: 'Perlu meningkatkan keterampilan komunikasi dan kolaborasi dalam tim.'
  },
  {
    id: '3',
    employeeId: '3',
    managerId: '2',
    date: '2023-12-05',
    status: 'approved',
    criteriaScores: [
      { criteriaId: '1', score: 95 },
      { criteriaId: '2', score: 90 },
      { criteriaId: '3', score: 85 },
      { criteriaId: '4', score: 90 },
    ],
    overallComment: 'Karyawan menunjukkan dedikasi dan inovasi yang tinggi dalam pekerjaannya.',
    approvedBy: '4',
    approvedDate: '2023-12-10'
  }
];

// Documents data
export const documents: Document[] = [
  {
    id: '1',
    title: 'Laporan Kinerja Q1 2023',
    description: 'Laporan kinerja departemen untuk kuartal pertama 2023',
    fileName: 'laporan_q1_2023.pdf',
    fileType: 'application/pdf',
    uploadDate: '2023-04-10',
    uploadedBy: '1',
    employeeId: '1',
    category: 'Laporan',
    status: 'approved'
  },
  {
    id: '2',
    title: 'Dokumen Pelatihan Karyawan',
    description: 'Materi pelatihan untuk karyawan baru',
    fileName: 'materi_pelatihan.pptx',
    fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    uploadDate: '2023-06-15',
    uploadedBy: '3',
    employeeId: '3',
    category: 'Pelatihan',
    status: 'pending'
  },
  {
    id: '3',
    title: 'SOP Departemen HR',
    description: 'Standard Operating Procedure untuk departemen HR',
    fileName: 'sop_hr.docx',
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    uploadDate: '2023-07-22',
    uploadedBy: '2',
    employeeId: '2',
    category: 'SOP',
    status: 'approved'
  }
];

// Performance data for charts
export const performanceData: PerformanceData[] = [
  { name: 'Engineering', performanceAvg: 88, personalityAvg: 85, count: 10 },
  { name: 'HR', performanceAvg: 92, personalityAvg: 88, count: 5 },
  { name: 'Marketing', performanceAvg: 86, personalityAvg: 90, count: 8 },
  { name: 'Finance', performanceAvg: 89, personalityAvg: 84, count: 6 },
  { name: 'Product', performanceAvg: 91, personalityAvg: 87, count: 9 }
];

// Helper functions
export const getPromotionScore = (employee: Employee): number => {
  return (employee.performance * 0.6) + (employee.personality * 0.4);
};

// Employee CRUD operations
let employeesData = [...employees];

export const getEmployeeById = (id: string): Employee | undefined => {
  return employeesData.find(emp => emp.id === id);
};

export const addEmployee = (newEmployeeData: Omit<Employee, 'id'>): Employee => {
  const newId = (employeesData.length + 1).toString();
  const newEmployee = {
    id: newId,
    ...newEmployeeData,
  };
  employeesData.push(newEmployee);
  return newEmployee;
};

export const updateEmployee = (id: string, updatedData: Partial<Employee>): Employee | null => {
  const index = employeesData.findIndex(emp => emp.id === id);
  if (index === -1) return null;
  
  employeesData[index] = {
    ...employeesData[index],
    ...updatedData
  };
  return employeesData[index];
};

export const deleteEmployee = (id: string): boolean => {
  const initialLength = employeesData.length;
  employeesData = employeesData.filter(emp => emp.id !== id);
  return employeesData.length < initialLength;
};

// Policy functions
export const getPolicyById = (id: string): Policy | undefined => {
  return policies.find(policy => policy.id === id);
};

// User authentication functions
let currentUser: User | null = null;

export const getCurrentUser = (): User | null => {
  return currentUser;
};

export const setCurrentUser = (user: User | null): void => {
  currentUser = user;
};

export const getUserByEmailAndPassword = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

// Evaluation functions
export const getEvaluationsPendingApproval = (): Evaluation[] => {
  return evaluations.filter(evaluation => evaluation.status === 'pending');
};

export const approveEvaluation = (evaluationId: string, approverId: string): Evaluation | null => {
  const index = evaluations.findIndex(evaluation => evaluation.id === evaluationId);
  if (index === -1) return null;
  
  evaluations[index] = {
    ...evaluations[index],
    status: 'approved',
    approvedBy: approverId,
    approvedDate: new Date().toISOString().split('T')[0]
  };
  
  return evaluations[index];
};

// Criteria management
export const addEvaluationCriteria = (criteria: Omit<EvaluationCriteria, 'id'>): EvaluationCriteria => {
  const newId = (evaluationCriteria.length + 1).toString();
  const newCriteria: EvaluationCriteria = {
    id: newId,
    ...criteria
  };
  
  evaluationCriteria.push(newCriteria);
  return newCriteria;
};

// Document management
export const addDocument = (document: Partial<Document>): Document => {
  const newId = (documents.length + 1).toString();
  const newDocument: Document = {
    id: newId,
    title: document.title || '',
    description: document.description || '',
    fileName: document.fileName || '',
    fileType: document.fileType || '',
    uploadDate: new Date().toISOString().split('T')[0],
    uploadedBy: document.uploadedBy || '',
    employeeId: document.employeeId || '', // Must be provided
    category: document.category || '',
    status: 'pending',
    fileUrl: document.fileUrl || '',
    uploadedAt: new Date().toISOString()
  };
  
  documents.push(newDocument);
  return newDocument;
};

// Get promotion candidates
export const getPromotionCandidates = (): Employee[] => {
  return employeesData.filter(emp => {
    const score = getPromotionScore(emp);
    return score >= 85; // Threshold for promotion eligibility
  });
};
