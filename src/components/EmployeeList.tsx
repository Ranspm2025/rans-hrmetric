
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, PenLine, Trash, Building, Eye, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getPromotionScore } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface EmployeeListProps {
  employees: Array<{
    id: string;
    name: string;
    position: string;
    department: string;
    hireDate: string;
    avatar: string;
    performance: number;
    personality: number;
  }>;
  onEvaluate?: (id: string) => void;
  onPromote?: (id: string) => void;
}

const EmployeeList = ({ employees, onEvaluate, onPromote }: EmployeeListProps) => {
  const { isAdmin, isManager, isPemimpin, isKaryawan } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);

  const handleEvaluate = (id: string) => {
    if (isKaryawan) {
      // For regular employees, directly navigate to view evaluation
      navigate(`/evaluation?employeeId=${id}&view=true`);
    } else if (onEvaluate) {
      onEvaluate(id);
    }
  };

  const handlePromote = (id: string) => {
    if (onPromote) {
      onPromote(id);
    }
  };

  const handleEditEmployee = (id: string) => {
    toast({
      title: "Edit Karyawan",
      description: "Fitur edit karyawan akan segera tersedia",
    });
  };

  const handleDeleteEmployee = () => {
    if (employeeToDelete) {
      toast({
        title: "Hapus Karyawan",
        description: "Karyawan berhasil dihapus dari sistem",
      });
      setEmployeeToDelete(null);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <>
      {employees.length === 0 ? (
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
                <TableHead>Skor Promosi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => {
                const promotionScore = getPromotionScore(employee);
                const isPromotable = promotionScore >= 85;
                
                return (
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
                    <TableCell>
                      <Badge className={getScoreColor(promotionScore)}>
                        {promotionScore.toFixed(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEvaluate(employee.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {(isAdmin || isManager) && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditEmployee(employee.id)}
                            >
                              <PenLine className="h-4 w-4" />
                            </Button>
                            
                            {isPromotable && !isPemimpin && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-green-600"
                                onClick={() => handlePromote(employee.id)}
                              >
                                <Award className="h-4 w-4" />
                              </Button>
                            )}
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-destructive"
                              onClick={() => setEmployeeToDelete(employee.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        
                        {isPemimpin && isPromotable && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-green-600"
                            onClick={() => toast({
                              title: "Persetujuan",
                              description: `Promosi ${employee.name} telah disetujui.`,
                            })}
                          >
                            <Award className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
      
      <AlertDialog 
        open={!!employeeToDelete} 
        onOpenChange={(isOpen) => !isOpen && setEmployeeToDelete(null)}
      >
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
              onClick={handleDeleteEmployee} 
              className="bg-destructive text-destructive-foreground"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EmployeeList;
