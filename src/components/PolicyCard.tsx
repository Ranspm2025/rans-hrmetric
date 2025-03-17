
import { motion } from 'framer-motion';
import { Calendar, ExternalLink } from 'lucide-react';
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
            {policy.description}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            <span>Lihat Detail</span>
            <ExternalLink className="h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PolicyCard;
