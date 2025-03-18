
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, PenLine, Trash, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
}

const EmployeeList = ({ employees }: EmployeeListProps) => {
  const { isAdmin, isManager } = useAuth();
  const { toast } = useToast();

  const handleEditEmployee = (id: string) => {
    toast({
      title: "Edit Karyawan",
      description: "Fitur edit karyawan akan segera tersedia",
    });
  };

  const handleDeleteEmployee = (id: string) => {
    toast({
      title: "Hapus Karyawan",
      description: "Fitur hapus karyawan akan segera tersedia",
    });
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
                {(isAdmin || isManager) && (
                  <TableHead className="text-right">Aksi</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
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
                  {(isAdmin || isManager) && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditEmployee(employee.id)}>
                          <PenLine className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteEmployee(employee.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default EmployeeList;
