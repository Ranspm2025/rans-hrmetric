
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import CriteriaManagement from '@/components/CriteriaManagement';
import { useAuth } from '@/contexts/AuthContext';

const CriteriaPage = () => {
  const { isAuthenticated, isAdmin, isManager } = useAuth();
  
  if (!isAuthenticated || (!isAdmin && !isManager)) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold">Akses Ditolak</h1>
          <p className="text-muted-foreground mt-2">
            Anda tidak memiliki izin untuk mengakses halaman ini.
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
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Kriteria Penilaian</h1>
          <p className="text-muted-foreground">
            Kelola kriteria penilaian untuk karyawan berdasarkan kinerja dan kepribadian
          </p>
        </motion.div>
        
        <CriteriaManagement />
      </div>
    </div>
  );
};

export default CriteriaPage;
