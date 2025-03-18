
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { documents, employees } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { isAuthenticated, isKaryawan, isManager, isAdmin, isPemimpin, user } = useAuth();

  // Filter documents based on role and search term
  const filteredDocuments = documents.filter(doc => {
    // For karyawan, only show their own documents
    if (isKaryawan && user) {
      if (doc.employeeId !== user.id) return false;
    }
    
    // Apply text search
    const employee = employees.find(emp => emp.id === doc.employeeId);
    const employeeName = employee ? employee.name : '';
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter ? doc.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'reviewed': return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Menunggu Review</Badge>;
      case 'reviewed':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Sudah Direview</Badge>;
      case 'approved':
        return <Badge variant="outline" className="border-green-500 text-green-500">Disetujui</Badge>;
      default:
        return null;
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
            <h1 className="text-3xl font-bold">Dokumen Evaluasi</h1>
            <p className="text-muted-foreground">
              {isKaryawan 
                ? 'Kelola dokumen evaluasi kinerja Anda' 
                : 'Lihat dan review dokumen evaluasi karyawan'}
            </p>
          </div>
          
          {isKaryawan && (
            <Button asChild>
              <Link to="/upload-document">
                <Plus className="h-4 w-4 mr-1" />
                Unggah Dokumen
              </Link>
            </Button>
          )}
        </motion.div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari dokumen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu Review</SelectItem>
                <SelectItem value="reviewed">Sudah Direview</SelectItem>
                <SelectItem value="approved">Disetujui</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredDocuments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">Tidak ada dokumen yang ditemukan.</p>
            {isKaryawan && (
              <Button variant="link" asChild className="mt-2">
                <Link to="/upload-document">Unggah dokumen baru</Link>
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDocuments.map((doc, index) => {
              const employee = employees.find(emp => emp.id === doc.employeeId);
              
              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        {getStatusBadge(doc.status)}
                        <div className="text-xs text-muted-foreground">
                          {doc.uploadedAt}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                      </div>
                      <CardDescription>
                        Diupload oleh: {employee?.name || 'Unknown'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {doc.comments && (
                        <div className="text-sm bg-muted p-3 rounded-md">
                          <p className="font-medium mb-1">Komentar:</p>
                          <p className="text-muted-foreground">{doc.comments}</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t p-4 bg-muted/10">
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(doc.status)}
                          <span className="text-xs text-muted-foreground">
                            {doc.status === 'pending' ? 'Menunggu review' : 
                             doc.status === 'reviewed' ? 'Sudah direview' : 'Disetujui'}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Lihat</Button>
                          {(isManager || isAdmin || isPemimpin) && doc.status === 'pending' && (
                            <Button size="sm">Review</Button>
                          )}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
