import { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useNavLinks = () => {
  const { isAuthenticated, isAdmin, isManager, isPemimpin, isKaryawan } = useAuth();

  const navLinks = useMemo(() => {
    let links = [
      { path: '/', label: 'Dashboard' },
      { path: '/policies', label: 'Kebijakan' },
    ];

    if (isAuthenticated) {
      links.push({ path: '/employees', label: 'Karyawan' });

      // Akses berdasarkan peran
      if (isKaryawan) {
        links.push(
          { path: '/documents', label: 'Dokumen Saya' },
          { path: '/upload-document', label: 'Upload Dokumen' }
        );
      } else {
        links.push({ path: '/documents', label: 'Dokumen' });
      }

      if (isManager || isAdmin) {
        links.push({ path: '/evaluation', label: 'Penilaian' });
        links.push({ path: '/criteria', label: 'Kriteria' });
      }

      if (isPemimpin) {
        links.push({ path: '/manager-evaluations', label: 'Evaluasi Manager' });
      }
    }

    return links;
  }, [isAuthenticated, isAdmin, isManager, isPemimpin, isKaryawan]);

  return navLinks;
};
