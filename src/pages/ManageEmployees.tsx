
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, UserPlus, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { employees, addEmployee } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ManageEmployees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    avatar: 'https://i.pravatar.cc/150',
    hireDate: new Date().toISOString().split('T')[0],
  });
  const { isAuthenticated, isAdmin, isManager } = useAuth();
  const { toast } = useToast();

  const filteredEmployees = employees.filter(employee => {
    return employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
           employee.department.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const departments = [...new Set(employees.map(employee => employee.department))];

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
    
    const employee = addEmployee(newEmployee);
    
    toast({
      title: "Karyawan Berhasil Ditambahkan",
      description: `${employee.name} telah ditambahkan sebagai karyawan baru`,
    });
    
    setIsDialogOpen(false);
    setNewEmployee({
      name: '',
      position: '',
      department: '',
      avatar: 'https://i.pravatar.cc/150',
      hireDate: new Date().toISOString().split('T')[0],
    });
  };

  if (!isAuthenticated || (!isAdmin && !isManager)) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold">Akses Ditolak</h1>
          <p className="text-muted-foreground mt-2">
            Anda tidak memiliki izin untuk mengakses halaman ini.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold">Kelola Karyawan</h1>
            <p className="text-muted-foreground">
              Tambah, edit, atau hapus data karyawan
            </p>
          </div>
          
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
                  <DialogDescription>
                    Masukkan informasi untuk karyawan baru
                  </DialogDescription>
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
                    <Label htmlFor="position">Jabatan</Label>
                    <Input
                      id="position"
                      value={newEmployee.position}
                      onChange={handleInputChange}
                      placeholder="Masukkan jabatan"
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
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
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
                        placeholder="Masukkan nama departemen baru"
                        required
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="hireDate">Tanggal Bergabung</Label>
                    <Input
                      id="hireDate"
                      type="date"
                      value={newEmployee.hireDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
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
        </motion.div>
        
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari karyawan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Daftar Karyawan</CardTitle>
            </div>
            <CardDescription>
              Total {filteredEmployees.length} karyawan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEmployees.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Tidak ada karyawan yang ditemukan.</p>
                </div>
              ) : (
                filteredEmployees.map((employee, index) => (
                  <motion.div
                    key={employee.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-md border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={employee.avatar} alt={employee.name} />
                        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">{employee.position} • {employee.department}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Detail</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageEmployees;
