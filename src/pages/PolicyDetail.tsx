
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, CalendarIcon, Bookmark, Users, BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { getPolicyById, Policy } from '@/lib/data';

const PolicyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const foundPolicy = getPolicyById(id);
      setPolicy(foundPolicy || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-muted-foreground">Memuat...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl font-semibold mb-2">Kebijakan Tidak Ditemukan</h2>
            <p className="text-muted-foreground mb-6">Kebijakan yang Anda cari tidak ditemukan.</p>
            <Button onClick={() => navigate('/policies')}>Kembali ke Daftar Kebijakan</Button>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'SDM':
        return <Users className="h-4 w-4 mr-1" />;
      case 'Manajemen':
        return <Bookmark className="h-4 w-4 mr-1" />;
      default:
        return <BookText className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/policies')} className="pl-0">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Kembali ke Daftar Kebijakan
          </Button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border rounded-lg overflow-hidden shadow-sm">
            <CardHeader className="pb-4 border-b">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <Badge className="mb-2 flex items-center w-fit">
                    {getCategoryIcon(policy.category)}
                    {policy.category}
                  </Badge>
                  <CardTitle className="text-2xl">{policy.title}</CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Terakhir diperbarui: {policy.lastUpdated}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-medium">Deskripsi Kebijakan</h3>
                <p className="text-gray-700">{policy.description}</p>
                
                <div className="mt-8 p-4 bg-muted rounded-md">
                  <h4 className="font-medium mb-2">Catatan Penting</h4>
                  <p className="text-sm text-muted-foreground">
                    Kebijakan ini berlaku untuk semua karyawan perusahaan. Silakan hubungi departemen SDM
                    jika Anda memiliki pertanyaan lebih lanjut mengenai kebijakan ini.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PolicyDetail;
