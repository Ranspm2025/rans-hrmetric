
import { useAuth } from '@/contexts/AuthContext';

export const useNavLinks = () => {
  const { isAuthenticated, isAdmin, isManager, isPemimpin, isKaryawan } = useAuth();
  
  const getNavLinks = () => {
    const links = [
      { path: '/', label: 'Dashboard' },
      { path: '/policies', label: 'Kebijakan' },
    ];
    
    if (isAuthenticated) {
      // All authenticated users can see Employees link
      links.push({ path: '/employees', label: 'Karyawan' });
      
      if (isKaryawan) {
        links.push({ path: '/documents', label: 'Dokumen Saya' });
        links.push({ path: '/upload-document', label: 'Upload Dokumen' });
      } else {
        links.push({ path: '/documents', label: 'Dokumen' });
      }
      
      if (isManager || isAdmin) {
        links.push({ path: '/evaluation', label: 'Penilaian' });
      }
      
      if (isPemimpin) {
        links.push({ path: '/manager-evaluations', label: 'Evaluasi Manager' });
      }
      
      if (isManager || isAdmin) {
        links.push({ path: '/criteria', label: 'Kriteria' });
      }
    }
    
    return links;
  };

  return getNavLinks();
};
