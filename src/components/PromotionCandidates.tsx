
import { motion } from 'framer-motion';
import { Award, ChevronRight, Medal, TrendingUp, User } from 'lucide-react';
import { getPromotionCandidates, getPromotionScore } from '@/lib/data';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PromotionCandidates = () => {
  const candidates = getPromotionCandidates();
  
  const getPositionIcon = (index: number) => {
    switch (index) {
      case 0: return <Medal className="h-5 w-5 text-yellow-500" />;
      case 1: return <Medal className="h-5 w-5 text-gray-400" />;
      case 2: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <Award className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Kandidat Promosi</CardTitle>
          </div>
          <CardDescription>
            Karyawan dengan skor tertinggi untuk pertimbangan promosi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {candidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage src={candidate.avatar} alt={candidate.name} />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-background rounded-full p-0.5">
                      {getPositionIcon(index)}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{candidate.name}</p>
                    <p className="text-xs text-muted-foreground">{candidate.position}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Skor</p>
                    <p className="font-semibold">{getPromotionScore(candidate).toFixed(1)}</p>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/evaluation?employeeId=${candidate.id}`}>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PromotionCandidates;
