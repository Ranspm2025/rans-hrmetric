
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { documents } from '@/lib/data';

const DocumentUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    // Simulate uploading
    setTimeout(() => {
      // Add to documents array (in a real app, this would be an API call)
      const newDocument = {
        id: (documents.length + 1).toString(),
        title,
        employeeId: user?.id || '0',
        uploadedAt: new Date().toISOString().split('T')[0],
        fileUrl: '/placeholder.svg',
        status: 'pending' as const,
      };
      
      documents.push(newDocument);
      
      toast({
        title: "Dokumen Berhasil Diunggah",
        description: "Dokumen Anda telah berhasil diunggah dan menunggu review",
      });
      
      setUploading(false);
      navigate('/documents');
    }, 1500);
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
            <h1 className="text-3xl font-bold">Unggah Dokumen Evaluasi</h1>
            <p className="text-muted-foreground">
              Unggah dokumen evaluasi kinerja dan hasil pencapaian Anda
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Form Unggah Dokumen</CardTitle>
                <CardDescription>
                  Lengkapi informasi dan unggah dokumen evaluasi kinerja Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Dokumen</Label>
                  <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan judul dokumen" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Deskripsi singkat tentang dokumen ini" 
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  {!file ? (
                    <div className="border-2 border-dashed border-border rounded-md p-6 text-center hover:border-primary/50 transition-colors">
                      <Input 
                        id="file" 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                        required
                      />
                      <Label htmlFor="file" className="cursor-pointer block">
                        <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm font-medium">Klik untuk memilih file</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX, XLS, XLSX (Maks. 10MB)</p>
                      </Label>
                    </div>
                  ) : (
                    <div className="flex items-center p-3 border rounded-md">
                      <File className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm flex-1 truncate">{file.name}</span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => setFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t p-6 bg-muted/20">
                <div className="flex justify-end w-full gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/documents')}
                  >
                    Batal
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={uploading || !file}
                  >
                    {uploading ? 'Mengunggah...' : 'Unggah Dokumen'}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentUpload;
