
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { employees } from '@/lib/data';

const COLORS = ['#4f46e5', '#3b82f6', '#0ea5e9', '#06b6d4', '#14b8a6', '#10b981'];

const PerformanceChart = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const departmentData = employees.reduce((acc, employee) => {
    if (!acc[employee.department]) {
      acc[employee.department] = {
        name: employee.department,
        performanceAvg: 0,
        count: 0,
        personalityAvg: 0,
      };
    }
    
    acc[employee.department].performanceAvg += employee.performance;
    acc[employee.department].personalityAvg += employee.personality;
    acc[employee.department].count += 1;
    
    return acc;
  }, {} as Record<string, { name: string; performanceAvg: number; personalityAvg: number; count: number }>);
  
  const chartData = Object.values(departmentData).map(dept => ({
    name: dept.name,
    value: Math.round(dept.performanceAvg / dept.count),
    personality: Math.round(dept.personalityAvg / dept.count)
  }));

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm shadow p-3 rounded-lg border border-border text-xs">
          <p className="font-medium">{payload[0].name}</p>
          <p>Kinerja: <span className="font-semibold">{payload[0].value}</span></p>
          <p>Kepribadian: <span className="font-semibold">{payload[0].payload.personality}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Performa per Departemen</CardTitle>
          <CardDescription>
            Rata-rata nilai kinerja berdasarkan departemen
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke="transparent"
                      style={{ 
                        filter: activeIndex === index ? 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3))' : 'none',
                        opacity: activeIndex === null || activeIndex === index ? 1 : 0.6,
                        transition: 'opacity 0.3s, filter 0.3s',
                        transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                        transformOrigin: '50% 50%',
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span className="text-xs">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PerformanceChart;
