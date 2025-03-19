
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import EmployeeCard from '@/components/EmployeeCard';
import EmployeeList from '@/components/EmployeeList';
import EmployeeFilters from '@/components/EmployeeFilters';
import AddEmployeeDialog from '@/components/AddEmployeeDialog';
import { 
  getEmployees, 
  getPromotionScore, 
  getEmployeeById, 
  getDepartments 
} from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

type SortField = 'name' | 'performance' | 'personality' | 'promotionScore';
type SortOrder = 'asc' | 'desc';
type ViewMode = 'card' | 'table';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('promotionScore');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [employeesList, setEmployeesList] = useState(getEmployees());
  const { user, isAdmin, isManager, isPemimpin, isKaryawan } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const departmentsList = getDepartments().map(dept => dept.name);

  useEffect(() => {
    const editParam = searchParams.get('edit');
    const evaluateParam = searchParams.get('evaluate');

    // Handle evaluate parameter if present
    if (evaluateParam) {
      if (isAdmin || isManager || isPemimpin) {
        navigate(`/evaluation?employeeId=${evaluateParam}`);
        return;
      } else if (isKaryawan && user) {
        // Allow employees to view any evaluation in read-only mode
        navigate(`/evaluation?employeeId=${evaluateParam}&view=true`);
        return;
      }
    }

    // Handle edit parameter if present
    if (editParam) {
      if (isAdmin || isManager) {
        navigate(`/manage-employees?edit=${editParam}`);
        return;
      } else {
        toast({
          title: "Akses Ditolak",
          description: "Anda tidak memiliki akses untuk mengedit data karyawan",
          variant: "destructive"
        });
        navigate('/');
        return;
      }
    }

    // Regular employees can view all employee evaluations
    if (isKaryawan && !isAdmin && !isManager && !isPemimpin && user) {
      // No redirection, allow viewing all employees
      return;
    }
    
    // Refresh employee list
    setEmployeesList(getEmployees());
  }, [isKaryawan, isAdmin, isManager, isPemimpin, user, navigate, searchParams, toast]);

  const filteredEmployees = employeesList.filter(employee => {
    // All users can view employee list
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter ? employee.department === departmentFilter : true;
    return matchesSearch && matchesDepartment;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortField) {
      case 'name':
        valueA = a.name;
        valueB = b.name;
        break;
      case 'performance':
        valueA = a.performance;
        valueB = b.performance;
        break;
      case 'personality':
        valueA = a.personality;
        valueB = b.personality;
        break;
      case 'promotionScore':
        valueA = getPromotionScore(a);
        valueB = getPromotionScore(b);
        break;
      default:
        valueA = a.name;
        valueB = b.name;
    }
    
    if (sortOrder === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('');
    setSortField('promotionScore');
    setSortOrder('desc');
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const handleRefresh = () => {
    // Refresh employee list
    setEmployeesList(getEmployees());
  };

  const handleEvaluateEmployee = (id: string) => {
    // If this is just a refresh call, refresh the data
    if (id === 'refresh') {
      handleRefresh();
      return;
    }
    
    if (!isManager) {
      // Only managers can evaluate employees
      navigate(`/evaluation?employeeId=${id}&view=true`);
      return;
    }
    navigate(`/evaluation?employeeId=${id}`);
  };

  const handlePromoteEmployee = (id: string) => {
    const employee = getEmployeeById(id);
    if (employee) {
      toast({
        title: "Rekomendasi Promosi",
        description: `${employee.name} telah direkomendasikan untuk promosi. Menunggu persetujuan dari pimpinan.`,
      });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold">Karyawan</h1>
            <p className="text-muted-foreground">
              {isPemimpin 
                ? "Pantau dan setujui rekomendasi promosi karyawan"
                : isAdmin || isManager 
                ? "Kelola dan nilai karyawan berdasarkan kinerja dan kepribadian" 
                : "Lihat daftar karyawan dan profil penilaian"}
            </p>
          </div>
          
          {(isAdmin || isManager) && (
            <AddEmployeeDialog 
              departments={departmentsList} 
              onEmployeeAdded={handleRefresh} 
            />
          )}
        </motion.div>
        
        <EmployeeFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={setDepartmentFilter}
          sortField={sortField}
          onSortFieldChange={(value) => setSortField(value as SortField)}
          sortOrder={sortOrder}
          onSortOrderToggle={toggleSortOrder}
          onResetFilters={resetFilters}
          departments={departmentsList}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />
        
        {sortedEmployees.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 bg-card rounded-lg shadow p-8"
          >
            <p className="text-muted-foreground">Tidak ada karyawan yang ditemukan.</p>
            <button onClick={resetFilters} className="mt-2 text-primary hover:underline">
              Reset filter
            </button>
          </motion.div>
        ) : viewMode === 'card' ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sortedEmployees.map((employee, index) => (
              <EmployeeCard 
                key={employee.id} 
                employee={employee} 
                index={index} 
                onEvaluate={handleEvaluateEmployee}
                onPromote={isPemimpin ? undefined : handlePromoteEmployee}
              />
            ))}
          </motion.div>
        ) : (
          <EmployeeList 
            employees={sortedEmployees} 
            onEvaluate={handleEvaluateEmployee}
            onPromote={isPemimpin ? undefined : handlePromoteEmployee}
          />
        )}
      </div>
    </div>
  );
};

export default Employees;
