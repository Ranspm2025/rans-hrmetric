
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, UserPlus, Mail, Phone, Building, User, Trash, PenLine } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { employees, addEmployee, getEmployeeById, deleteEmployee } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ManageEmployees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
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

  const [departments, setDepartments] = useState([...new Set(employees.map(employee => employee.department))]);
  const [newDepartmentName, setNewDepartmentName] = useState('');

  const handleDeleteDepartment = (departmentToDelete: string) => {
    const employeesInDepartment = employees.filter(emp => emp.department === departmentToDelete);
    if (employeesInDepartment.length > 0) {
      toast({
        title: "Tidak dapat menghapus departemen",
        description: "Pindahkan semua karyawan ke departemen lain terlebih dahulu.",
        variant: "destructive"
      });
      return;
    }
    setDepartments(prev => prev.filter(dept => dept !== departmentToDelete));
    toast({
      title: "Departemen Dihapus",
      description: `Departemen ${departmentToDelete} telah dihapus.`
    });
  };

  const handleAddNewDepartment = (newDepartment: string) => {
    const trimmedDepartment = newDepartment.trim();
    if (!trimmedDepartment) {
      toast({
        title: "Nama Departemen Kosong",
        description: "Silakan masukkan nama departemen.",
        variant: "destructive"
      });
      return;
    }
    if (departments.includes(trimmedDepartment)) {
      toast({
        title: "Departemen sudah ada",
        description: "Silakan gunakan nama departemen yang berbeda.",
        variant: "destructive"
      });
      return;
    }
    setDepartments(prev => [...prev, trimmedDepartment]);
    setNewDepartmentName('');
    toast({
      title: "Departemen Ditambahkan",
      description: `Departemen ${trimmedDepartment} telah ditambahkan.`
    });
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter ? employee.department === departmentFilter : true;
    return matchesSearch && matchesDepartment;
  });

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
  };

  const handleEditEmployee = (id: string) => {
    toast({
      title: "Edit Karyawan",
      description: "Fitur edit karyawan akan segera tersedia",
    });
  };

  const handleDeleteEmployee = (id: string) => {
    const employee = getEmployeeById(id);
    if (employee) {
      if (deleteEmployee(id)) {
        toast({
          title: "Karyawan Berhasil Dihapus",
          description: `${employee.name} telah dihapus dari sistem`,
        });
      } else {
        toast({
          title: "Gagal Menghapus Karyawan",
          description: "Terjadi kesalahan saat menghapus karyawan",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
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
              Tambah, edit, dan kelola data karyawan
            </p>
          </div>
          
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Building className="h-4 w-4 mr-1" />
                  Kelola Departemen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Kelola Departemen</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex gap-2">
                    <Input
                      value={newDepartmentName}
                      onChange={(e) => setNewDepartmentName(e.target.value)}
                      placeholder="Nama departemen baru"
                    />
                    <Button onClick={() => handleAddNewDepartment(newDepartmentName)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Daftar Departemen</Label>
                    <div className="space-y-2">
                      {departments.map((dept) => (
                        <div key={dept} className="flex items-center justify-between p-2 border rounded-md">
                          <span>{dept}</span>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Departemen</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Apakah Anda yakin ingin menghapus departemen {dept}? Pastikan tidak ada karyawan yang masih terdaftar di departemen ini.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteDepartment(dept)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Hapus
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
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
                              if (e.target.value.trim()) {
                                setNewEmployee(prev => ({ ...prev, department: e.target.value.trim() }));
                              }
                            }}
                            required
                          />
                        </div>
                      )}
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
          </div>
        </motion.div>
        
        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari karyawan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter Departemen" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua Departemen</SelectItem>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Kelola Departemen</CardTitle>
              <CardDescription>Tambah atau hapus departemen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Nama departemen baru"
                    value={newDepartmentName}
                    onChange={(e) => setNewDepartmentName(e.target.value)}
                  />
                  <Button onClick={() => {
                    if (newDepartmentName.trim()) {
                      handleAddNewDepartment(newDepartmentName.trim());
                      setNewDepartmentName('');
                    }
                  }}>
                    <Plus className="h-4 w-4 mr-1" />
                    Tambah
                  </Button>
                </div>
                {departments.map((department) => (
                  <div key={department} className="flex items-center justify-between p-2 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{department}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteDepartment(department)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {filteredEmployees.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <User className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">Tidak ada karyawan yang ditemukan.</p>
          </motion.div>
        ) : (
          <div className="bg-card rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Karyawan</TableHead>
                  <TableHead>Posisi</TableHead>
                  <TableHead>Departemen</TableHead>
                  <TableHead>Tanggal Bergabung</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                          <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{employee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        {employee.department}
                      </div>
                    </TableCell>
                    <TableCell>{employee.hireDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditEmployee(employee.id)}>
                          <PenLine className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Karyawan</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus karyawan ini? Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteEmployee(employee.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEmployees;
