import { motion } from "framer-motion";
import {
  Award,
  ChevronRight,
  Medal,
  TrendingUp,
  User,
  Calendar,
} from "lucide-react";
import { getPromotionCandidates, getPromotionScore, employees } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PromotionCandidates = () => {
  const monthCandidates = getPromotionCandidates();

  // Sorting berdasarkan skor (65% performance, 35% personality)
  const yearCandidates = [...employees]
    .sort((a, b) => {
      const scoreA = (a.performance ?? 0) * 0.65 + (a.personality ?? 0) * 0.35;
      const scoreB = (b.performance ?? 0) * 0.65 + (b.personality ?? 0) * 0.35;
      return scoreB - scoreA;
    })
    .slice(0, 3);

  const getPositionIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Medal className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <Award className="h-5 w-5 text-primary" />;
    }
  };

  const CandidateList = ({
    candidates,
    type,
  }: {
    candidates: typeof employees;
    type: string;
  }) => (
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
                {candidate.avatar ? (
                  <AvatarImage src={candidate.avatar} alt={candidate.name} />
                ) : (
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="absolute -top-1 -right-1 bg-background rounded-full p-0.5">
                {getPositionIcon(index)}
              </div>
            </div>
            <div>
              <p className="font-medium text-sm">{candidate.name}</p>
              <p className="text-xs text-muted-foreground">
                {candidate.position}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Skor</p>
              <p className="font-semibold">
                {type === "month"
                  ? (getPromotionScore(candidate) ?? 0).toFixed(1)
                  : (
                      (candidate.performance ?? 0) * 0.65 +
                      (candidate.personality ?? 0) * 0.35
                    ).toFixed(1)}
              </p>
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
  );

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
            <CardTitle>Karyawan Terbaik</CardTitle>
          </div>
          <CardDescription>
            Karyawan dengan skor tertinggi berdasarkan penilaian
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="month">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="month" className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>Bulan Ini</span>
              </TabsTrigger>
              <TabsTrigger value="year" className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>Tahun Ini</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="month">
              <CandidateList candidates={monthCandidates} type="month" />
            </TabsContent>
            <TabsContent value="year">
              <CandidateList candidates={yearCandidates} type="year" />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link to="/employees">Lihat Semua Karyawan</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PromotionCandidates;
