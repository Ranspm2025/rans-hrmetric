
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import EmployeeCard from '@/components/EmployeeCard';
import EmployeeList from '@/components/EmployeeList';
import EmployeeFilters from '@/components/EmployeeFilters';
import AddEmployeeDialog from '@/components/AddEmployeeDialog';
import { employees, getPromotionScore } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';

type SortField = 'name' | 'performance' | 'personality' | 'promotionScore';
type SortOrder = 'asc' | 'desc';
type ViewMode = 'card' | 'table';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('promotionScore');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const { isAdmin, isManager } = useAuth();

  const departments = [...new Set(employees.map(employee => employee.department))];

  const filteredEmployees = employees.filter(employee => {
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
    // This function will be called when a new employee is added
    // In a real app, you would fetch the updated list of employees
    console.log("Refreshing employee list");
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
              Lihat daftar karyawan dan profil penilaian kinerja dan kepribadian mereka
            </p>
          </div>
          
          {(isAdmin || isManager) && (
            <AddEmployeeDialog 
              departments={departments} 
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
          departments={departments}
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
              <EmployeeCard key={employee.id} employee={employee} index={index} />
            ))}
          </motion.div>
        ) : (
          <EmployeeList employees={sortedEmployees} />
        )}
      </div>
    </div>
  );
};

export default Employees;
