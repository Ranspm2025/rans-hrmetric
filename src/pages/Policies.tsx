
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, FileText, Clock, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { policies } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Policies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPolicy, setNewPolicy] = useState({
    title: '',
    category: '',
    description: '',
  });
  const { toast } = useToast();
  const { isAdmin, isManager } = useAuth();

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? policy.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(policies.map(policy => policy.category))];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewPolicy(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setNewPolicy(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would add to the database
    toast({
      title: "Kebijakan Berhasil Ditambahkan",
      description: `${newPolicy.title} telah ditambahkan ke daftar kebijakan`,
    });
    
    setIsDialogOpen(false);
    setNewPolicy({
      title: '',
      category: '',
      description: '',
    });
  };

  // Helper function to get the color for the category badge
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'SDM':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Manajemen':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Umum':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Keuangan':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

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
            <h1 className="text-3xl font-bold">Kebijakan Perusahaan</h1>
            <p className="text-muted-foreground">
              Panduan dan regulasi untuk seluruh karyawan
            </p>
          </div>
          
          {(isAdmin || isManager) && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-1" />
                  Tambah Kebijakan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Tambah Kebijakan Baru</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Judul Kebijakan</Label>
                      <Input
                        id="title"
                        value={newPolicy.title}
                        onChange={handleInputChange}
                        placeholder="Masukkan judul kebijakan"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Select value={newPolicy.category} onValueChange={handleSelectChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                          <SelectItem value="Kategori Baru">Kategori Baru</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {newPolicy.category === 'Kategori Baru' && (
                      <div className="space-y-2">
                        <Label htmlFor="customCategory">Nama Kategori Baru</Label>
                        <Input
                          id="customCategory"
                          onChange={(e) => setNewPolicy(prev => ({ ...prev, category: e.target.value }))}
                          placeholder="Masukkan nama kategori baru"
                          required
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Deskripsi</Label>
                      <Textarea
                        id="description"
                        value={newPolicy.description}
                        onChange={handleInputChange}
                        placeholder="Masukkan deskripsi kebijakan"
                        className="min-h-32"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Batal
                    </Button>
                    <Button type="submit">Tambah Kebijakan</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </motion.div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari kebijakan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter Kategori" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Tidak ada kebijakan yang ditemukan.</p>
            </div>
          ) : (
            filteredPolicies.map((policy, index) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{policy.title}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getCategoryColor(policy.category)}`}
                      >
                        {policy.category}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1 text-xs">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Terakhir diperbarui: {policy.lastUpdated}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {policy.description}
                    </p>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      Baca Selengkapnya
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Policies;
