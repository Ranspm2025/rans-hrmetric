
import { motion } from 'framer-motion';
import { FileText, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { employees } from '@/lib/data';

interface DocumentCardProps {
  doc: {
    id: string;
    employeeId: string;
    title: string;
    uploadedAt: string;
    status: string;
    comments?: string;
  };
  index: number;
  isManager: boolean;
  isAdmin: boolean;
  isPemimpin: boolean;
}

const DocumentCard = ({ doc, index, isManager, isAdmin, isPemimpin }: DocumentCardProps) => {
  const employee = employees.find(emp => emp.id === doc.employeeId);

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
    <motion.div
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
};

export default DocumentCard;
