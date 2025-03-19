
import { motion } from 'framer-motion';
import { Calendar, Star, User, Edit, Trash, Eye, Award } from 'lucide-react';
import { getPromotionScore } from '@/lib/data';
import { Employee } from '@/types';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface EmployeeCardProps {
  employee: Employee;
  index: number;
  onEvaluate?: (id: string) => void;
  onPromote?: (id: string) => void;
}

const EmployeeCard = ({ employee, index, onEvaluate, onPromote }: EmployeeCardProps) => {
  const promotionScore = getPromotionScore(employee);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();
  const { isAdmin, isManager, isPemimpin } = useAuth();
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleDelete = () => {
    // In a real app, this would delete from the database
    toast({
      title: "Karyawan dihapus",
      description: `${employee.name} telah dihapus dari sistem`,
    });
    setShowDeleteDialog(false);
  };

  const handleEvaluate = () => {
    if (onEvaluate) {
      onEvaluate(employee.id);
    }
  };

  const handlePromote = () => {
    if (onPromote) {
      onPromote(employee.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full transition-all duration-300 hover:shadow-md overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src={employee.avatar} alt={employee.name} />
                <AvatarFallback className="bg-primary/20">
                  <User className="h-5 w-5 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-base">{employee.name}</h3>
                <CardDescription className="text-xs">{employee.position}</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{employee.hireDate.split('-')[0]}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Kinerja</span>
                <span className={getScoreColor(employee.performance)}>{employee.performance}</span>
              </div>
              <Progress value={employee.performance} className="h-1.5" indicatorClassName={getProgressColor(employee.performance)} />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Kepribadian</span>
                <span className={getScoreColor(employee.personality)}>{employee.personality}</span>
              </div>
              <Progress value={employee.personality} className="h-1.5" indicatorClassName={getProgressColor(employee.personality)} />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">Skor Promosi</span>
              </div>
              <span className={`text-lg font-semibold ${getScoreColor(promotionScore)}`}>
                {promotionScore.toFixed(1)}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/20 px-3 py-2 flex flex-wrap gap-1 justify-between">
          <Button variant="ghost" size="sm" className="text-xs h-8" onClick={handleEvaluate}>
            <Eye className="h-3.5 w-3.5 mr-1" />
            {(isManager || isAdmin) ? "Nilai" : "Detail"}
          </Button>
          
          {(isAdmin || isManager) && (
            <>
              <Button variant="ghost" size="sm" className="text-xs h-8" asChild>
                <Link to={`/employees?edit=${employee.id}`}>
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Link>
              </Button>
              
              {!isPemimpin && promotionScore >= 85 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-green-600 h-8" 
                  onClick={handlePromote}
                >
                  <Award className="h-3.5 w-3.5 mr-1" />
                  Promosikan
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-destructive h-8" 
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash className="h-3.5 w-3.5 mr-1" />
                Hapus
              </Button>
            </>
          )}
          
          {isPemimpin && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-green-600 h-8" 
              onClick={() => toast({
                title: "Persetujuan",
                description: `Promosi ${employee.name} telah disetujui.`,
              })}
            >
              <Award className="h-3.5 w-3.5 mr-1" />
              Setujui Promosi
            </Button>
          )}
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Karyawan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus {employee.name}? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default EmployeeCard;
