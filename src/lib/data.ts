import type { User, Employee, EvaluationCriteria, Department, Policy, Evaluation, Document, PerformanceData, CriteriaScore } from '@/types';

// User accounts for the login system
export const users: User[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@hrmetric.com',
    password: 'admin123', // Already matches what's shown on login page
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=68',
  },
  {
    id: '2',
    name: 'Budi',
    email: 'budi@hrmetric.com',
    password: 'password', // Already updated to match login page
    role: 'manager',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id: '3',
    name: 'Siti',
    email: 'siti@hrmetric.com',
    password: 'password', // Already updated to match login page
    role: 'karyawan',
    avatar: 'https://i.pravatar.cc/150?img=16',
  },
  {
    id: '4',
    name: 'Ahmad',
    email: 'ahmad@hrmetric.com',
    password: 'password', // Already updated to match login page
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

// Initial employee data
const initialEmployees: Employee[] = [
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

// Create mutable data structures for runtime changes
let employeesData: Employee[] = [...initialEmployees];
let departmentsData: Department[] = [
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
let evaluationsData: Evaluation[] = [
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

// EMPLOYEE OPERATIONS
export const getEmployees = (): Employee[] => {
  return [...employeesData];
};

export const getEmployeeById = (id: string): Employee | undefined => {
  return employeesData.find(emp => emp.id === id);
};

export const addEmployee = (newEmployeeData: Omit<Employee, 'id'>): Employee => {
  const newId = (Math.max(...employeesData.map(e => parseInt(e.id)), 0) + 1).toString();
  const newEmployee = {
    id: newId,
    ...newEmployeeData,
  };
  employeesData.push(newEmployee);

  // Update department list if it's a new department
  const departmentExists = departmentsData.some(dept => dept.name === newEmployee.department);
  if (!departmentExists) {
    addDepartment({
      name: newEmployee.department,
      description: `Departemen ${newEmployee.department}`
    });
  }

  return newEmployee;
};

export const updateEmployee = (id: string, updatedData: Partial<Employee>): Employee | null => {
  const index = employeesData.findIndex(emp => emp.id === id);
  if (index === -1) return null;
  
  employeesData[index] = {
    ...employeesData[index],
    ...updatedData
  };

  // Update department list if it's a new department
  if (updatedData.department) {
    const departmentExists = departmentsData.some(dept => dept.name === updatedData.department);
    if (!departmentExists) {
      addDepartment({
        name: updatedData.department,
        description: `Departemen ${updatedData.department}`
      });
    }
  }

  return employeesData[index];
};

export const deleteEmployee = (id: string): boolean => {
  const initialLength = employeesData.length;
  employeesData = employeesData.filter(emp => emp.id !== id);
  
  // Also delete any evaluations for this employee
  evaluationsData = evaluationsData.filter(evaluation => evaluation.employeeId !== id);
  
  return employeesData.length < initialLength;
};

// DEPARTMENT OPERATIONS
export const getDepartments = (): Department[] => {
  return [...departmentsData];
};

export const getDepartmentByName = (name: string): Department | undefined => {
  return departmentsData.find(dep => dep.name === name);
};

export const getDepartmentById = (id: string): Department | undefined => {
  return departmentsData.find(dep => dep.id === id);
};

export const addDepartment = (departmentData: Omit<Department, 'id'>): Department => {
  const newId = (Math.max(...departmentsData.map(d => parseInt(d.id)), 0) + 1).toString();
  const newDepartment = {
    id: newId,
    ...departmentData,
  };
  departmentsData.push(newDepartment);
  return newDepartment;
};

export const updateDepartment = (id: string, updatedData: Partial<Department>): Department | null => {
  const index = departmentsData.findIndex(dept => dept.id === id);
  if (index === -1) return null;
  
  departmentsData[index] = {
    ...departmentsData[index],
    ...updatedData
  };
  
  // Update employee department names if department name changed
  if (updatedData.name && updatedData.name !== departmentsData[index].name) {
    const oldName = departmentsData[index].name;
    employeesData = employeesData.map(emp => {
      if (emp.department === oldName) {
        return { ...emp, department: updatedData.name as string };
      }
      return emp;
    });
  }
  
  return departmentsData[index];
};

export const deleteDepartment = (id: string): boolean => {
  // Check if there are employees in this department
  const department = getDepartmentById(id);
  if (!department) return false;
  
  const employeesInDepartment = employeesData.some(emp => emp.department === department.name);
  if (employeesInDepartment) {
    // Cannot delete department with employees
    return false;
  }
  
  const initialLength = departmentsData.length;
  departmentsData = departmentsData.filter(dept => dept.id !== id);
  return departmentsData.length < initialLength;
};

// EVALUATION OPERATIONS
export const getEvaluations = (): Evaluation[] => {
  return [...evaluationsData];
};

export const getEvaluationById = (id: string): Evaluation | undefined => {
  return evaluationsData.find(evaluation => evaluation.id === id);
};

export const getEmployeeEvaluations = (employeeId: string): Evaluation[] => {
  return evaluationsData.filter(evaluation => evaluation.employeeId === employeeId);
};

export const addEvaluation = (evaluationData: Omit<Evaluation, 'id'>): Evaluation => {
  const newId = (Math.max(...evaluationsData.map(e => parseInt(e.id)), 0) + 1).toString();
  const newEvaluation = {
    id: newId,
    ...evaluationData,
  };
  evaluationsData.push(newEvaluation);
  
  // Update employee performance and personality scores based on evaluation
  const employee = getEmployeeById(evaluationData.employeeId);
  if (employee) {
    const performanceCriteria = evaluationCriteria.filter(c => c.category === 'performance');
    const personalityCriteria = evaluationCriteria.filter(c => c.category === 'personality');
    
    // Calculate new scores
    let performanceScore = 0;
    let performanceWeight = 0;
    let personalityScore = 0; 
    let personalityWeight = 0;
    
    evaluationData.criteriaScores.forEach(criteriaScore => {
      const criteria = evaluationCriteria.find(c => c.id === criteriaScore.criteriaId);
      if (criteria) {
        if (criteria.category === 'performance') {
          performanceScore += criteriaScore.score * criteria.weight;
          performanceWeight += criteria.weight;
        } else {
          personalityScore += criteriaScore.score * criteria.weight;
          personalityWeight += criteria.weight;
        }
      }
    });
    
    // Update employee with calculated scores
    const updatedEmployee: Partial<Employee> = {
      performance: performanceWeight > 0 ? Math.round(performanceScore / performanceWeight) : employee.performance,
      personality: personalityWeight > 0 ? Math.round(personalityScore / personalityWeight) : employee.personality
    };
    
    updateEmployee(employee.id, updatedEmployee);
  }
  
  return newEvaluation;
};

export const updateEvaluation = (id: string, updatedData: Partial<Evaluation>): Evaluation | null => {
  const index = evaluationsData.findIndex(evaluation => evaluation.id === id);
  if (index === -1) return null;
  
  // Keep track of old and new criteria scores for employee update
  const oldEvaluation = evaluationsData[index];
  const newCriteriaScores = updatedData.criteriaScores || oldEvaluation.criteriaScores;
  
  // Update the evaluation
  evaluationsData[index] = {
    ...evaluationsData[index],
    ...updatedData,
    criteriaScores: newCriteriaScores
  };
  
  // Update employee performance and personality if criteria scores changed
  if (updatedData.criteriaScores && updatedData.criteriaScores.length > 0) {
    const employee = getEmployeeById(oldEvaluation.employeeId);
    if (employee) {
      const performanceCriteria = evaluationCriteria.filter(c => c.category === 'performance');
      const personalityCriteria = evaluationCriteria.filter(c => c.category === 'personality');
      
      // Calculate new scores
      let performanceScore = 0;
      let performanceWeight = 0;
      let personalityScore = 0; 
      let personalityWeight = 0;
      
      newCriteriaScores.forEach(criteriaScore => {
        const criteria = evaluationCriteria.find(c => c.id === criteriaScore.criteriaId);
        if (criteria) {
          if (criteria.category === 'performance') {
            performanceScore += criteriaScore.score * criteria.weight;
            performanceWeight += criteria.weight;
          } else {
            personalityScore += criteriaScore.score * criteria.weight;
            personalityWeight += criteria.weight;
          }
        }
      });
      
      // Update employee with calculated scores
      const updatedEmployee: Partial<Employee> = {
        performance: performanceWeight > 0 ? Math.round(performanceScore / performanceWeight) : employee.performance,
        personality: personalityWeight > 0 ? Math.round(personalityScore / personalityWeight) : employee.personality
      };
      
      updateEmployee(employee.id, updatedEmployee);
    }
  }
  
  return evaluationsData[index];
};

export const deleteEvaluation = (id: string): boolean => {
  const initialLength = evaluationsData.length;
  evaluationsData = evaluationsData.filter(evaluation => evaluation.id !== id);
  return evaluationsData.length < initialLength;
};

export const getEvaluationsPendingApproval = (): Evaluation[] => {
  return evaluationsData.filter(evaluation => evaluation.status === 'pending');
};

export const approveEvaluation = (evaluationId: string, approverId: string): Evaluation | null => {
  const index = evaluationsData.findIndex(evaluation => evaluation.id === evaluationId);
  if (index === -1) return null;
  
  evaluationsData[index] = {
    ...evaluationsData[index],
    status: 'approved',
    approvedBy: approverId,
    approvedDate: new Date().toISOString().split('T')[0]
  };
  
  return evaluationsData[index];
};

export const rejectEvaluation = (evaluationId: string, approverId: string): Evaluation | null => {
  const index = evaluationsData.findIndex(evaluation => evaluation.id === evaluationId);
  if (index === -1) return null;
  
  evaluationsData[index] = {
    ...evaluationsData[index],
    status: 'rejected',
    approvedBy: approverId,
    approvedDate: new Date().toISOString().split('T')[0]
  };
  
  return evaluationsData[index];
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

// Reset data to initial state (useful for tests and demos)
export const resetData = (): void => {
  employeesData = [...initialEmployees];
  evaluationsData = [
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
  departmentsData = [
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

// Add function to get policy by id
export const getPolicyById = (id: string): Policy | undefined => {
  return policies.find(policy => policy.id === id);
};

// Expose employees for other files
export const employees = employeesData;
export const departments = departmentsData;
