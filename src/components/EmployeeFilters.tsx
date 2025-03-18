import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EmployeeFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  departmentFilter: string;
  onDepartmentFilterChange: (value: string) => void;
  sortField: string;
  onSortFieldChange: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderToggle: () => void;
  onResetFilters: () => void;
  departments: string[];
  viewMode: 'card' | 'table';
  onViewModeChange: (mode: 'card' | 'table') => void;
}

const EmployeeFilters = ({
  searchTerm,
  onSearchChange,
  departmentFilter,
  onDepartmentFilterChange,
  sortField,
  onSortFieldChange,
  sortOrder,
  onSortOrderToggle,
  onResetFilters,
  departments,
  viewMode,
  onViewModeChange
}: EmployeeFiltersProps) => {
  
  const handleDepartmentFilterChange = (value: string) => {
    if (value === "all") {
      onDepartmentFilterChange("");
    } else {
      onDepartmentFilterChange(value);
    }
  };
  
  return (
    <div className="mb-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari karyawan..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-3">
          <Select value={departmentFilter || "all"} onValueChange={handleDepartmentFilterChange}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Departemen" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Departemen</SelectItem>
              {departments.map(department => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortField} onValueChange={onSortFieldChange}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <SelectValue placeholder="Urutkan berdasarkan" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nama</SelectItem>
              <SelectItem value="performance">Kinerja</SelectItem>
              <SelectItem value="personality">Kepribadian</SelectItem>
              <SelectItem value="promotionScore">Skor Promosi</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" onClick={onSortOrderToggle}>
            {sortOrder === 'asc' ? (
              <SortAsc className="h-4 w-4" />
            ) : (
              <SortDesc className="h-4 w-4" />
            )}
          </Button>
          
          <Button variant="outline" size="icon" onClick={onResetFilters}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </Button>
          
          <div className="flex border rounded-md overflow-hidden">
            <Button 
              variant={viewMode === 'card' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => onViewModeChange('card')}
              className="rounded-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </Button>
            <Button 
              variant={viewMode === 'table' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => onViewModeChange('table')}
              className="rounded-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFilters;