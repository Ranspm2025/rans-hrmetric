
import { motion } from 'framer-motion';
import { Calendar, FileText } from 'lucide-react';
import { Policy } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

interface PolicyCardProps {
  policy: Policy;
  index: number;
}

const PolicyCard = ({ policy, index }: PolicyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge>{policy.category}</Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {policy.lastUpdated}
            </div>
          </div>
          <CardTitle className="mt-3 text-xl">{policy.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-muted-foreground">
            {policy.description.length > 120 
              ? `${policy.description.substring(0, 120)}...` 
              : policy.description}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                <span>Lihat Detail</span>
                <FileText className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge>{policy.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    Diperbarui: {policy.lastUpdated}
                  </span>
                </div>
                <DialogTitle className="mt-2">{policy.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground mt-2">
                  {policy.description}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PolicyCard;
