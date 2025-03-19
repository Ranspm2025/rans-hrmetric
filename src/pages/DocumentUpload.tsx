
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, Check, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { addDocument } from '@/lib/data';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const DocumentUpload = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file || !user) return;

    setIsUploading(true);

    // Simulating upload delay
    setTimeout(() => {
      try {
        // In a real app, we would upload the file to a server
        // Here we just add a record to our mock data
        addDocument({
          title,
          description: `Uploaded by ${user.name}`,
          fileName: file.name,
          fileType: file.type,
          uploadedBy: user.id,
          employeeId: user.id,
          category: 'User Upload',
          fileUrl: URL.createObjectURL(file), // In a real app, this would be the URL returned by the server
        });

        toast({
          title: "Dokumen berhasil diunggah",
          description: "Dokumen Anda telah berhasil diunggah dan menunggu peninjauan.",
        });
        
        navigate('/documents');
      } catch (error) {
        toast({
          title: "Gagal mengunggah dokumen",
          description: "Terjadi kesalahan saat mengunggah dokumen Anda. Silakan coba lagi.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
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
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-2">Upload Dokumen</h1>
          <p className="text-muted-foreground mb-8">
            Upload dokumen penilaian atau laporan kinerja Anda untuk ditinjau oleh manager.
          </p>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Formulir Upload Dokumen</CardTitle>
                <CardDescription>
                  Dokumen yang Anda upload akan ditinjau oleh manager Anda.
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
                  <Label htmlFor="file">Unggah File</Label>
                  <div className="border-2 border-dashed rounded-md p-6 bg-muted/30">
                    <div className="flex flex-col items-center gap-3">
                      {file ? (
                        <>
                          <div className="p-2 bg-primary/10 rounded-full">
                            <File className="h-6 w-6 text-primary" />
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setFile(null)}
                          >
                            Ubah File
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Upload className="h-6 w-6 text-primary" />
                          </div>
                          <div className="text-center">
                            <p className="font-medium">Klik untuk upload file</p>
                            <p className="text-xs text-muted-foreground">
                              Mendukung format PDF, DOCX, dan XLSX (max. 10MB)
                            </p>
                          </div>
                          <Input
                            id="file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".pdf,.docx,.xlsx"
                            required
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('file')?.click()}
                          >
                            Pilih File
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Perhatian</AlertTitle>
                  <AlertDescription>
                    Dokumen yang telah diunggah tidak dapat dihapus. Pastikan dokumen yang Anda unggah sudah benar.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/documents')}
                  disabled={isUploading}
                >
                  Batal
                </Button>
                <Button 
                  type="submit" 
                  disabled={!title || !file || isUploading}
                  className="gap-2"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent"></div>
                      <span>Mengunggah...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Upload Dokumen</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentUpload;
