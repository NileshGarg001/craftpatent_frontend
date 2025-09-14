"use client"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore?: number;
  description?: string;
  className?: string;
}

export function ScoreCard({ 
  title, 
  score, 
  maxScore = 10, 
  description,
  className 
}: ScoreCardProps) {
  const percentage = (score / maxScore) * 100;
  
  const getScoreColor = (score: number, max: number) => {
    const percent = (score / max) * 100;
    if (percent >= 70) return "text-green-600";
    if (percent >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number, max: number) => {
    const percent = (score / max) * 100;
    if (percent >= 70) return "bg-green-500";
    if (percent >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className={cn(
      "bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow",
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className={cn("text-2xl font-bold", getScoreColor(score, maxScore))}>
          {score}/{maxScore}
        </span>
      </div>
      
      <Progress 
        value={percentage} 
        className="h-2 mb-3"
      />
      
      {description && (
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
