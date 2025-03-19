import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { documents, employees } from '@/lib/data';
import { Button } from '@/components/ui/button';
import DocumentCard from '@/components/DocumentCard';
import DocumentFilters from '@/components/DocumentFilters';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
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
    const matchesStatus = statusFilter === 'all' ? true : doc.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-20">
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
        
        <DocumentFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
        
        {filteredDocuments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 bg-card rounded-lg shadow p-8"
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
            {filteredDocuments.map((doc, index) => (
              <DocumentCard 
                key={doc.id} 
                doc={doc} 
                index={index}
                isManager={isManager}
                isAdmin={isAdmin}
                isPemimpin={isPemimpin}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
