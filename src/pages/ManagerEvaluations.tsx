
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Search, CheckSquare, User, ClipboardCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { evaluations, getEmployeeById, approveEvaluation, getEvaluationsPendingApproval } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ManagerEvaluations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvaluation, setSelectedEvaluation] = useState<typeof evaluations[0] | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const { isAuthenticated, user, isPemimpin } = useAuth();
  const { toast } = useToast();
  
  // Get evaluations that need approval from pemimpin
  const pendingEvaluations = getEvaluationsPendingApproval();
  
  const filteredEvaluations = pendingEvaluations.filter(evaluation => {
    const employee = getEmployeeById(evaluation.employeeId);
    if (!employee) return false;
    
    return employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
           employee.department.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleApproveEvaluation = () => {
    if (!selectedEvaluation || !user) return;
    
    approveEvaluation(selectedEvaluation.id, user.id);
    
    toast({
      title: "Evaluasi Disetujui",
      description: "Anda telah menyetujui evaluasi ini",
    });
    
    setIsDetailDialogOpen(false);
  };

  const openDetailDialog = (evaluation: typeof evaluations[0]) => {
    setSelectedEvaluation(evaluation);
    setIsDetailDialogOpen(true);
  };

  if (!isAuthenticated || !isPemimpin) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold">Akses Ditolak</h1>
          <p className="text-muted-foreground mt-2">
            Hanya pemimpin yang dapat mengakses halaman ini.
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
            <h1 className="text-3xl font-bold">Evaluasi Dari Manager</h1>
            <p className="text-muted-foreground">
              Lihat dan setujui evaluasi yang dilakukan oleh para manager
            </p>
          </div>
        </motion.div>
        
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari evaluasi berdasarkan nama karyawan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              <CardTitle>Evaluasi Yang Perlu Persetujuan</CardTitle>
            </div>
            <CardDescription>
              Total {filteredEvaluations.length} evaluasi menunggu persetujuan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEvaluations.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">Tidak ada evaluasi yang perlu disetujui.</p>
                </div>
              ) : (
                filteredEvaluations.map((evaluation, index) => {
                  const employee = getEmployeeById(evaluation.employeeId);
                  
                  return (
                    <motion.div
                      key={evaluation.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-md border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={employee?.avatar} alt={employee?.name} />
                          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employee?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {employee?.position} • Evaluasi pada {evaluation.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Badge variant="outline" className="mr-2">Menunggu Persetujuan</Badge>
                        <Button onClick={() => openDetailDialog(evaluation)}>
                          <CheckSquare className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evaluation Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detail Evaluasi</DialogTitle>
            <DialogDescription>
              Review dan setujui evaluasi karyawan
            </DialogDescription>
          </DialogHeader>
          {selectedEvaluation && (
            <div className="space-y-4">
              {(() => {
                const employee = getEmployeeById(selectedEvaluation.employeeId);
                
                return (
                  <>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={employee?.avatar} alt={employee?.name} />
                        <AvatarFallback>{employee?.name?.charAt(0) || <User className="h-6 w-6" />}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{employee?.name}</h3>
                        <p className="text-sm text-muted-foreground">{employee?.position}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 bg-muted/30 p-4 rounded-md">
                      <h4 className="font-medium">Penilaian Kriteria</h4>
                      {selectedEvaluation.criteriaScores.map((score) => (
                        <div key={score.criteriaId} className="flex justify-between text-sm">
                          <span>Kriteria {score.criteriaId}</span>
                          <span className="font-medium">{score.score}/100</span>
                        </div>
                      ))}
                      
                      <div className="pt-2 border-t">
                        <p className="text-sm font-medium">Komentar Evaluasi:</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedEvaluation.overallComment || "Tidak ada komentar"}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Tutup
            </Button>
            <Button onClick={handleApproveEvaluation}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Setujui Evaluasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagerEvaluations;
