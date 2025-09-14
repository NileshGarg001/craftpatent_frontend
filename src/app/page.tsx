"use client"

import { useState } from 'react';
import { PatentInput } from '@/components/PatentInput';
import { AssessmentResults } from '@/components/AssessmentResults';
import { LoadingState } from '@/components/LoadingState';
import { PatentAPI } from '@/lib/api';
import { PatentAssessment, ProcessingState } from '@/types/patent';
import { Brain, Zap, Shield } from 'lucide-react';

export default function HomePage() {
  const [assessment, setAssessment] = useState<PatentAssessment | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>({
    status: 'idle',
    currentStep: '',
    progress: 0
  });
  const [error, setError] = useState<string | null>(null);

  const handlePatentSubmit = async (patentText: string) => {
    setError(null);
    setAssessment(null);
    setProcessingState({
      status: 'processing',
      currentStep: 'Initializing analysis...',
      progress: 10
    });

    try {
      // Simulate processing steps for better UX
      const steps = [
        { step: 'Drafting patent application...', progress: 30 },
        { step: 'Running quality assessment...', progress: 60 },
        { step: 'Generating improvement suggestions...', progress: 80 },
        { step: 'Finalizing results...', progress: 95 }
      ];

      for (const { step, progress } of steps) {
        setProcessingState(prev => ({ ...prev, currentStep: step, progress }));
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const result = await PatentAPI.assessPatent(patentText);
      
      setAssessment(result);
      setProcessingState({
        status: 'completed',
        currentStep: 'Analysis complete',
        progress: 100
      });
    } catch (err) {
      console.error('Assessment error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setProcessingState({
        status: 'error',
        currentStep: 'Error occurred',
        progress: 0
      });
    }
  };

  const handleReset = () => {
    setAssessment(null);
    setProcessingState({
      status: 'idle',
      currentStep: '',
      progress: 0
    });
    setError(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CraftPatent</h1>
                <p className="text-xs text-gray-500">AI Patent Assessment Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap className="h-4 w-4 text-blue-500" />
                <span>Powered by Multi-Agent AI</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Live on Google Cloud</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {processingState.status === 'idle' && !assessment && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Patent Assessment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get comprehensive patent quality analysis using our advanced multi-agent AI system. 
              Receive detailed scores, rationales, and improvement suggestions in minutes.
            </p>
          </div>
        )}

        {/* Content Based on State */}
        <div className="space-y-8">
          {processingState.status === 'idle' && !assessment && (
            <PatentInput 
              onSubmit={handlePatentSubmit} 
              isLoading={false} 
            />
          )}

          {processingState.status === 'processing' && (
            <LoadingState 
              currentStep={processingState.currentStep}
              progress={processingState.progress}
            />
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-900">Assessment Error</h3>
                  <p className="text-red-700 mt-1">{error}</p>
                  <button
                    onClick={handleReset}
                    className="mt-3 text-red-600 hover:text-red-800 font-medium text-sm"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {assessment && processingState.status === 'completed' && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Patent Assessment Results
                </h2>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Analyze Another Patent
                </button>
              </div>
              <AssessmentResults assessment={assessment} />
            </>
          )}
        </div>

        {/* Features Section (only show when idle) */}
        {processingState.status === 'idle' && !assessment && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Agent Analysis</h3>
              <p className="text-gray-600 text-sm">
                Coordinator, Drafting, and Rating agents work together through iterative improvement cycles
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Processing</h3>
              <p className="text-gray-600 text-sm">
                Get comprehensive assessment results in 30-60 seconds with live progress tracking
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Professional Grade</h3>
              <p className="text-gray-600 text-sm">
                USPTO-compliant analysis with detailed scores and actionable improvement suggestions
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 CraftPatent. Powered by Google ADK and Vertex AI.</p>
            <p className="mt-1">
              Backend API: <span className="font-mono text-blue-600">craftpatent-176187988301.us-central1.run.app</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
