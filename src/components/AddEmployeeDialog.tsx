
import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addEmployee } from '@/lib/data';
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
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setNewEmployee(prev => ({
      ...prev,
      department: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add new employee
    const employee = addEmployee(newEmployee);
    
    toast({
      title: "Karyawan Berhasil Ditambahkan",
      description: `${employee.name} telah ditambahkan sebagai ${employee.position}`,
    });
    
    setIsDialogOpen(false);
    setNewEmployee({
      name: '',
      position: '',
      department: '',
      avatar: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70),
      hireDate: new Date().toISOString().split('T')[0],
      performance: 80,
      personality: 80,
    });
    
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
            
            <div className="space-y-2">
              <Label htmlFor="department">Departemen</Label>
              <Select value={newEmployee.department} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih departemen" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                  <SelectItem value="Departemen Baru">Departemen Baru</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {newEmployee.department === 'Departemen Baru' && (
              <div className="space-y-2">
                <Label htmlFor="customDepartment">Nama Departemen Baru</Label>
                <Input
                  id="customDepartment"
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Masukkan nama departemen"
                  required
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
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
