
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import EvaluationForm from '@/components/EvaluationForm';
import { employees } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Evaluation = () => {
  const [searchParams] = useSearchParams();
  const employeeId = searchParams.get('employeeId') || undefined;
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>(employeeId);

  // Reset the selected employee when the URL param changes
  useEffect(() => {
    setSelectedEmployee(employeeId);
  }, [employeeId]);

  const handleEmployeeSelect = (id: string) => {
    setSelectedEmployee(id);
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
            <div className="flex items-center gap-2 mb-2">
              {selectedEmployee ? (
                <Button variant="ghost" size="sm" asChild className="pl-0 -ml-3">
                  <Link to="/evaluation">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Kembali
                  </Link>
                </Button>
              ) : null}
              <h1 className="text-3xl font-bold">
                {selectedEmployee
                  ? 'Penilaian Karyawan'
                  : 'Form Penilaian Kinerja & Kepribadian'
                }
              </h1>
            </div>
            <p className="text-muted-foreground">
              {selectedEmployee
                ? 'Nilai karyawan berdasarkan kinerja dan kepribadian'
                : 'Pilih karyawan atau mulai penilaian baru'
              }
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {!selectedEmployee && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle>Pilih Karyawan</CardTitle>
                  </div>
                  <CardDescription>
                    Pilih karyawan untuk melakukan penilaian
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                    {employees.map((employee) => (
                      <motion.div
                        key={employee.id}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center gap-3 p-3 rounded-md border border-border hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors"
                        onClick={() => handleEmployeeSelect(employee.id)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">{employee.position}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`${selectedEmployee ? "lg:col-span-3" : "lg:col-span-2"}`}
          >
            <EvaluationForm employeeId={selectedEmployee} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
