"use client"

import { Progress } from "@/components/ui/progress"
import { Loader2, Brain, FileSearch, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

interface LoadingStateProps {
  currentStep: string;
  progress: number;
}

export function LoadingState({ currentStep, progress }: LoadingStateProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  const getStepIcon = (step: string) => {
    if (step.toLowerCase().includes('draft')) {
      return <FileSearch className="h-5 w-5" />;
    }
    if (step.toLowerCase().includes('rate') || step.toLowerCase().includes('assess')) {
      return <Star className="h-5 w-5" />;
    }
    return <Brain className="h-5 w-5" />;
  };

  const steps = [
    { id: 'drafting', label: 'Drafting Patent', icon: FileSearch },
    { id: 'rating', label: 'Quality Assessment', icon: Star },
    { id: 'improving', label: 'Iterative Improvement', icon: Brain },
  ];

  return (
    <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Processing Patent Assessment
        </h2>
        <p className="text-gray-600">
          Our AI agents are analyzing your patent disclosure through multiple iterations
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {getStepIcon(currentStep)}
          <span className="font-medium text-gray-900">{currentStep}</span>
        </div>
        <Progress value={displayProgress} className="h-3" />
        <p className="text-sm text-gray-500 mt-1">{Math.round(displayProgress)}% Complete</p>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-gray-900 mb-3">Processing Steps:</h3>
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = currentStep.toLowerCase().includes(step.id);
          const isCompleted = displayProgress > (index + 1) * 30;
          
          return (
            <div 
              key={step.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-50 border border-blue-200' : 
                isCompleted ? 'bg-green-50 border border-green-200' : 
                'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                isActive ? 'bg-blue-100 text-blue-600' :
                isCompleted ? 'bg-green-100 text-green-600' :
                'bg-gray-200 text-gray-500'
              }`}>
                <StepIcon className="h-4 w-4" />
              </div>
              <span className={`font-medium ${
                isActive ? 'text-blue-900' :
                isCompleted ? 'text-green-900' :
                'text-gray-600'
              }`}>
                {step.label}
              </span>
              {isActive && (
                <Loader2 className="h-4 w-4 text-blue-600 animate-spin ml-auto" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          This process typically takes 30-60 seconds
        </p>
      </div>
    </div>
  );
}
