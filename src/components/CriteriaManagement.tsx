
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { evaluationCriteria, addEvaluationCriteria } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const CriteriaManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [criteriaName, setCriteriaName] = useState('');
  const [criteriaDescription, setCriteriaDescription] = useState('');
  const [criteriaCategory, setCriteriaCategory] = useState<'performance' | 'personality'>('performance');
  const [criteriaWeight, setCriteriaWeight] = useState(10);
  const { toast } = useToast();

  const resetForm = () => {
    setCriteriaName('');
    setCriteriaDescription('');
    setCriteriaCategory('performance');
    setCriteriaWeight(10);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate weights
    const currentCategoryItems = evaluationCriteria.filter(c => c.category === criteriaCategory);
    const currentTotalWeight = currentCategoryItems.reduce((sum, item) => sum + item.weight, 0);
    
    if (currentTotalWeight + criteriaWeight > 100) {
      toast({
        title: "Gagal Menambahkan Kriteria",
        description: `Total bobot untuk kategori ${criteriaCategory === 'performance' ? 'Kinerja' : 'Kepribadian'} tidak boleh melebihi 100%`,
        variant: "destructive",
      });
      return;
    }
    
    // Add the criteria
    addEvaluationCriteria({
      name: criteriaName,
      description: criteriaDescription,
      category: criteriaCategory,
      weight: criteriaWeight,
    });
    
    toast({
      title: "Kriteria Berhasil Ditambahkan",
      description: `${criteriaName} telah ditambahkan sebagai kriteria baru`,
    });
    
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Kelola Kriteria Penilaian</h2>
          <p className="text-muted-foreground">Tambah, edit, atau hapus kriteria penilaian karyawan</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-1" />
              Tambah Kriteria
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Tambah Kriteria Penilaian</DialogTitle>
                <DialogDescription>
                  Tambahkan kriteria baru untuk penilaian karyawan
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Kriteria</Label>
                  <Input 
                    id="name"
                    value={criteriaName}
                    onChange={(e) => setCriteriaName(e.target.value)}
                    placeholder="Masukkan nama kriteria"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea 
                    id="description"
                    value={criteriaDescription}
                    onChange={(e) => setCriteriaDescription(e.target.value)}
                    placeholder="Deskripsi kriteria ini"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <RadioGroup 
                    value={criteriaCategory} 
                    onValueChange={(value) => setCriteriaCategory(value as 'performance' | 'personality')}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="performance" id="performance" />
                      <Label htmlFor="performance">Kinerja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="personality" id="personality" />
                      <Label htmlFor="personality">Kepribadian</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Bobot (%)</Label>
                  <Input 
                    id="weight"
                    type="number"
                    min="5"
                    max="30"
                    value={criteriaWeight}
                    onChange={(e) => setCriteriaWeight(Number(e.target.value))}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Bobot total untuk setiap kategori harus 100%
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit">Tambah Kriteria</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Kriteria Kinerja</CardTitle>
            <CardDescription>
              Kriteria untuk menilai kinerja karyawan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {evaluationCriteria
                .filter(c => c.category === 'performance')
                .map((criteria) => (
                  <div 
                    key={criteria.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:border-primary/50 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium">{criteria.name}</h3>
                      <p className="text-xs text-muted-foreground">{criteria.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{criteria.weight}%</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Kriteria Kepribadian</CardTitle>
            <CardDescription>
              Kriteria untuk menilai kepribadian karyawan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {evaluationCriteria
                .filter(c => c.category === 'personality')
                .map((criteria) => (
                  <div 
                    key={criteria.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:border-primary/50 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium">{criteria.name}</h3>
                      <p className="text-xs text-muted-foreground">{criteria.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{criteria.weight}%</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CriteriaManagement;
