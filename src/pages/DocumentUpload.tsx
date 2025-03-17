
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const DocumentUpload = () => {
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { isAuthenticated, isKaryawan, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "File Diperlukan",
        description: "Silakan pilih file untuk diunggah",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would upload to the server
    toast({
      title: "Dokumen Berhasil Diunggah",
      description: `${documentTitle} telah diunggah dan menunggu review`,
    });
    
    navigate('/documents');
  };

  if (!isAuthenticated || !isKaryawan) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold">Akses Ditolak</h1>
          <p className="text-muted-foreground mt-2">
            Hanya karyawan yang dapat mengunggah dokumen penilaian.
          </p>
          <Button className="mt-6" asChild>
            <Link to="/documents">Kembali ke Dokumen</Link>
          </Button>
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
          className="mb-6"
        >
          <Button variant="outline" size="sm" asChild className="mb-6">
            <Link to="/documents">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Kembali ke Dokumen
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold">Unggah Dokumen Evaluasi</h1>
          <p className="text-muted-foreground">
            Unggah dokumen terkait evaluasi kinerja Anda
          </p>
        </motion.div>
        
        <div className="max-w-md mx-auto">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle>Formulir Unggah Dokumen</CardTitle>
                </div>
                <CardDescription>
                  Lengkapi informasi dokumen di bawah ini
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Dokumen</Label>
                  <Input
                    id="title"
                    placeholder="Masukkan judul dokumen"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    placeholder="Deskripsi singkat tentang dokumen ini"
                    value={documentDescription}
                    onChange={(e) => setDocumentDescription(e.target.value)}
                    className="min-h-24"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="file">Pilih File</Label>
                  <div className="border border-dashed border-input rounded-md p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Klik untuk memilih atau seret file ke sini
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Format yang didukung: PDF, DOCX, JPG, PNG (Maks. 10MB)
                    </p>
                    <Input
                      id="file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      required
                    />
                    <Button type="button" variant="outline" onClick={() => document.getElementById('file')?.click()}>
                      Pilih File
                    </Button>
                    {file && (
                      <p className="text-sm mt-2 text-primary font-medium">
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Unggah Dokumen
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
