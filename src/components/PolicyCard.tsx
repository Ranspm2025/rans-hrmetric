
import { motion } from 'framer-motion';
import { Policy } from '@/lib/data';
import { CalendarIcon, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col border hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <Badge className="w-fit mb-2">{policy.category}</Badge>
          <CardTitle className="line-clamp-2">{policy.title}</CardTitle>
          <CardDescription className="flex items-center">
            <CalendarIcon className="h-3 w-3 mr-1" />
            {policy.lastUpdated}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-4">
            {policy.description}
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link to={`/policy/${policy.id}`} className="flex items-center justify-center">
              Detail Kebijakan
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PolicyCard;
