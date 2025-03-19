
import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addEmployee, addDepartment } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AddEmployeeDialogProps {
  departments: string[];
  onEmployeeAdded: () => void;
}

const AddEmployeeDialog = ({ departments, onEmployeeAdded }: AddEmployeeDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    avatar: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70),
    hireDate: new Date().toISOString().split('T')[0],
    performance: 80,
    personality: 80,
  });
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    if (value === 'new') {
      // Don't update department yet, wait for custom name
      return;
    }
    setNewEmployee(prev => ({
      ...prev,
      department: value
    }));
  };

  const resetForm = () => {
    setNewEmployee({
      name: '',
      position: '',
      department: '',
      avatar: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70),
      hireDate: new Date().toISOString().split('T')[0],
      performance: 80,
      personality: 80,
    });
    setNewDepartmentName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields
    if (!newEmployee.name.trim()) {
      toast({
        title: "Nama tidak boleh kosong",
        description: "Silakan isi nama karyawan",
        variant: "destructive"
      });
      return;
    }
    
    if (!newEmployee.position.trim()) {
      toast({
        title: "Posisi tidak boleh kosong",
        description: "Silakan isi posisi karyawan",
        variant: "destructive"
      });
      return;
    }
    
    let departmentToUse = newEmployee.department;
    
    // Handle new department
    if (newEmployee.department === 'new' && newDepartmentName.trim()) {
      // Add the new department
      addDepartment({
        name: newDepartmentName.trim(),
        description: `Departemen ${newDepartmentName.trim()}`
      });
      departmentToUse = newDepartmentName.trim();
    } else if (newEmployee.department === 'new' && !newDepartmentName.trim()) {
      toast({
        title: "Nama departemen tidak boleh kosong",
        description: "Silakan isi nama departemen baru",
        variant: "destructive"
      });
      return;
    }
    
    // Add new employee with the correct department
    const employee = addEmployee({
      ...newEmployee,
      department: departmentToUse
    });
    
    toast({
      title: "Karyawan Berhasil Ditambahkan",
      description: `${employee.name} telah ditambahkan sebagai ${employee.position}`,
    });
    
    setIsDialogOpen(false);
    resetForm();
    
    // Notify parent component
    onEmployeeAdded();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-1" />
          Tambah Karyawan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tambah Karyawan Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                value={newEmployee.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Posisi / Jabatan</Label>
              <Input
                id="position"
                value={newEmployee.position}
                onChange={handleInputChange}
                placeholder="Masukkan posisi"
                required
              />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="department">Departemen</Label>
                <Select value={newEmployee.department} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih departemen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">+ Tambah Departemen Baru</SelectItem>
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {newEmployee.department === 'new' && (
                <div className="space-y-2">
                  <Label htmlFor="newDepartment">Nama Departemen Baru</Label>
                  <Input
                    id="newDepartment"
                    placeholder="Masukkan nama departemen"
                    value={newDepartmentName}
                    onChange={(e) => {
                      setNewDepartmentName(e.target.value);
                    }}
                    required
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsDialogOpen(false);
                resetForm();
              }}
            >
              Batal
            </Button>
            <Button type="submit">Tambah Karyawan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
