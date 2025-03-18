import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import EmployeeCard from '@/components/EmployeeCard';
import EmployeeList from '@/components/EmployeeList';
import EmployeeFilters from '@/components/EmployeeFilters';
import AddEmployeeDialog from '@/components/AddEmployeeDialog';
import { employees, getPromotionScore, getEmployeeById } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [sortField, setSortField] = useState('promotionScore');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('card');
  const { user, isAdmin, isManager, isPemimpin, isKaryawan } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isRegularEmployee = isKaryawan && !isAdmin && !isManager && !isPemimpin;
  const departments = [...new Set(employees.map(employee => employee.department))];

  useEffect(() => {
    const editParam = searchParams.get('edit');
    const evaluateParam = searchParams.get('evaluate');
    
    if (isRegularEmployee) {
      const userEmployee = employees.find(emp => emp.name.toLowerCase() === user?.name?.toLowerCase());
      
      if (userEmployee) {
        navigate(`/evaluation?employeeId=${userEmployee.id}`);
      } else {
        toast({ title: "Profil tidak ditemukan", description: "Profil karyawan Anda tidak ditemukan dalam sistem", variant: "destructive" });
      }
    }
    
    if (editParam && (isAdmin || isManager)) {
      // Implementasi edit jika diperlukan
    }
    
    if (evaluateParam && (isAdmin || isManager || isPemimpin)) {
      navigate(`/evaluation?employeeId=${evaluateParam}`);
    }
  }, [isRegularEmployee, isAdmin, isManager, isPemimpin, user, navigate, searchParams, toast]);

  const filteredEmployees = employees.filter(employee => {
    if (isRegularEmployee) {
      return user && employee.name.toLowerCase() === user.name.toLowerCase();
    }
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    ) && (!departmentFilter || employee.department === departmentFilter);
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let valueA = sortField === 'promotionScore' ? getPromotionScore(a) : a[sortField];
    let valueB = sortField === 'promotionScore' ? getPromotionScore(b) : b[sortField];
    
    return sortOrder === 'asc' ? (typeof valueA === 'string' ? valueA.localeCompare(valueB) : valueA - valueB) :
                                 (typeof valueB === 'string' ? valueB.localeCompare(valueA) : valueB - valueA);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Karyawan</h1>
            <p className="text-muted-foreground">
              {isPemimpin ? "Pantau dan setujui rekomendasi promosi karyawan" :
               isAdmin || isManager ? "Kelola dan nilai karyawan berdasarkan kinerja dan kepribadian" :
               "Lihat daftar karyawan dan profil penilaian"}
            </p>
          </div>
          {(isAdmin || isManager) && <AddEmployeeDialog departments={departments} onEmployeeAdded={() => console.log("Refreshing employee list")} />}
        </motion.div>
        <EmployeeFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} departmentFilter={departmentFilter} onDepartmentFilterChange={setDepartmentFilter} sortField={sortField} onSortFieldChange={setSortField} sortOrder={sortOrder} onSortOrderToggle={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} onResetFilters={() => { setSearchTerm(''); setDepartmentFilter(''); setSortField('promotionScore'); setSortOrder('desc'); }} departments={departments} viewMode={viewMode} onViewModeChange={setViewMode} />
        {sortedEmployees.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center py-12 bg-card rounded-lg shadow p-8">
            <p className="text-muted-foreground">Tidak ada karyawan yang ditemukan.</p>
            <button onClick={() => { setSearchTerm(''); setDepartmentFilter(''); setSortField('promotionScore'); setSortOrder('desc'); }} className="mt-2 text-primary hover:underline">Reset filter</button>
          </motion.div>
        ) : viewMode === 'card' ? (
          <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEmployees.map(employee => <EmployeeCard key={employee.id} employee={employee} onEvaluate={() => navigate(`/evaluation?employeeId=${employee.id}`)} onPromote={isPemimpin ? undefined : () => { const emp = getEmployeeById(employee.id); if (emp) toast({ title: "Rekomendasi Promosi", description: `${emp.name} telah direkomendasikan untuk promosi.`, }); }} />)}
          </motion.div>
        ) : (
          <EmployeeList employees={sortedEmployees} onEvaluate={id => navigate(`/evaluation?employeeId=${id}`)} onPromote={isPemimpin ? undefined : id => { const emp = getEmployeeById(id); if (emp) toast({ title: "Rekomendasi Promosi", description: `${emp.name} telah direkomendasikan untuk promosi.`, }); }} />
        )}
      </div>
    </div>
  );
};

export default Employees;
