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
  {
    id: '3',
    name: 'Ahmad Wijaya',
    position: 'Pengembang Software',
    department: 'Teknologi',
    avatar: 'https://i.pravatar.cc/150?img=3',
    hireDate: '2019-11-22',
    performance: 95,
    personality: 82,
  },
  {
    id: '4',
    name: 'Dewi Lestari',
    position: 'Spesialis HR',
    department: 'SDM',
    avatar: 'https://i.pravatar.cc/150?img=10',
    hireDate: '2022-01-05',
    performance: 85,
    personality: 93,
  },
  {
    id: '5',
    name: 'Agus Purnomo',
    position: 'Koordinator Operasional',
    department: 'Operasional',
    avatar: 'https://i.pravatar.cc/150?img=6',
    hireDate: '2020-09-18',
    performance: 90,
    personality: 85,
  },
  {
    id: '6',
    name: 'Maya Indah',
    position: 'Desainer Grafis',
    department: 'Kreatif',
    avatar: 'https://i.pravatar.cc/150?img=9',
    hireDate: '2021-07-30',
    performance: 87,
    personality: 89,
  },
];

export const evaluationCriteria: EvaluationCriteria[] = [
  {
    id: '1',
    name: 'Ketercapaian Target',
    category: 'performance',
    weight: 30,
    description: 'Sejauh mana karyawan mencapai target yang ditetapkan.'
  },
  {
    id: '2',
    name: 'Kualitas Kerja',
    category: 'performance',
    weight: 25,
    description: 'Kualitas output pekerjaan yang dihasilkan.'
  },
  {
    id: '3',
    name: 'Kehadiran & Ketepatan Waktu',
    category: 'performance',
    weight: 15,
    description: 'Tingkat kehadiran dan ketepatan waktu dalam bekerja.'
  },
  {
    id: '4',
    name: 'Kerja Sama Tim',
    category: 'personality',
    weight: 15,
    description: 'Kemampuan bekerja sama dan berkontribusi dalam tim.'
  },
  {
    id: '5',
    name: 'Inisiatif',
    category: 'personality',
    weight: 10,
    description: 'Kemampuan mengambil inisiatif dan menyelesaikan masalah.'
  },
  {
    id: '6',
    name: 'Adaptabilitas',
    category: 'personality',
    weight: 10,
    description: 'Kemampuan beradaptasi dengan perubahan dan situasi baru.'
  },
  {
    id: '7',
    name: 'Kepemimpinan',
    category: 'personality',
    weight: 15,
    description: 'Kemampuan memimpin dan menginspirasi orang lain.'
  },
  {
    id: '8',
    name: 'Komunikasi',
    category: 'personality',
    weight: 15,
    description: 'Efektivitas dalam berkomunikasi lisan dan tertulis.'
  },
  {
    id: '9',
    name: 'Inovasi',
    category: 'performance',
    weight: 20,
    description: 'Kemampuan menghasilkan ide dan solusi inovatif.'
  },
  {
    id: '10',
    name: 'Profesionalisme',
    category: 'personality',
    weight: 15,
    description: 'Sikap profesional dan etika kerja.'
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Admin Utama',
    email: 'admin@empscaler.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: '2',
    name: 'Budi Santoso',
    email: 'budi@empscaler.com',
    role: 'manager',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '3',
    name: 'Siti Rahayu',
    email: 'siti@empscaler.com',
    role: 'karyawan',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '4',
    name: 'Direktur Utama',
    email: 'direktur@empscaler.com',
    role: 'pemimpin',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
];

export const documents: Document[] = [
  {
    id: '1',
    title: 'Evaluasi Kinerja Q1 2024',
    employeeId: '3',
    uploadedAt: '2024-03-15',
    fileUrl: '/placeholder.svg',
    status: 'reviewed',
    comments: 'Dokumen sudah direview, perlu revisi minor',
  },
  {
    id: '2',
    title: 'Laporan Pencapaian Target',
    employeeId: '6',
    uploadedAt: '2024-03-10',
    fileUrl: '/placeholder.svg',
    status: 'approved',
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
    performance: 0,
    personality: 0,
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
