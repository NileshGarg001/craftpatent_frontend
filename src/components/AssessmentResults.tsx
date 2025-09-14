"use client"

import { PatentAssessment } from '@/types/patent';
import { ScoreCard } from './ScoreCard';
import { CheckCircle, XCircle, AlertTriangle, Lightbulb } from 'lucide-react';

interface AssessmentResultsProps {
  assessment: PatentAssessment;
}

export function AssessmentResults({ assessment }: AssessmentResultsProps) {
  const getStatusIcon = (status: string) => {
    if (status.toLowerCase().includes('rejected')) {
      return <XCircle className="h-6 w-6 text-red-500" />;
    }
    if (status.toLowerCase().includes('approved')) {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    }
    return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
  };

  const getStatusColor = (status: string) => {
    if (status.toLowerCase().includes('rejected')) {
      return 'bg-red-50 border-red-200 text-red-800';
    }
    if (status.toLowerCase().includes('approved')) {
      return 'bg-green-50 border-green-200 text-green-800';
    }
    return 'bg-yellow-50 border-yellow-200 text-yellow-800';
  };

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className={`rounded-lg p-4 border ${getStatusColor(assessment.patentability_assessment)}`}>
        <div className="flex items-center gap-3">
          {getStatusIcon(assessment.patentability_assessment)}
          <div>
            <h3 className="font-semibold text-lg">Patent Assessment Result</h3>
            <p className="text-sm opacity-90">{assessment.patentability_assessment}</p>
          </div>
        </div>
      </div>

      {/* Score Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <ScoreCard
          title="Novelty"
          score={assessment.novelty_score}
          description="Uniqueness and inventive step assessment"
        />
        <ScoreCard
          title="Clarity"
          score={assessment.clarity_score}
          description="Clear description and disclosure quality"
        />
        <ScoreCard
          title="Claims"
          score={assessment.claims_score}
          description="Claim construction and scope evaluation"
        />
        <ScoreCard
          title="Industrial Applicability"
          score={assessment.industrial_applicability_score}
          description="Commercial viability and practical use"
        />
      </div>

      {/* Overall Score */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Overall Score</h3>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {assessment.overall_score}/10
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {assessment.overall_summary}
          </p>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rationales */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
            Detailed Analysis
          </h3>
          
          <div className="space-y-3">
            <details className="bg-white rounded-lg border border-gray-200 p-4">
              <summary className="font-medium text-gray-900 cursor-pointer">
                Novelty Assessment ({assessment.novelty_score}/10)
              </summary>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {assessment.novelty_rationale}
              </p>
            </details>

            <details className="bg-white rounded-lg border border-gray-200 p-4">
              <summary className="font-medium text-gray-900 cursor-pointer">
                Clarity Assessment ({assessment.clarity_score}/10)
              </summary>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {assessment.clarity_rationale}
              </p>
            </details>

            <details className="bg-white rounded-lg border border-gray-200 p-4">
              <summary className="font-medium text-gray-900 cursor-pointer">
                Claims Assessment ({assessment.claims_score}/10)
              </summary>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {assessment.claims_rationale}
              </p>
            </details>

            <details className="bg-white rounded-lg border border-gray-200 p-4">
              <summary className="font-medium text-gray-900 cursor-pointer">
                Industrial Applicability ({assessment.industrial_applicability_score}/10)
              </summary>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {assessment.industrial_applicability_rationale}
              </p>
            </details>
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Improvement Suggestions
          </h3>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            {assessment.suggestions && assessment.suggestions.length > 0 ? (
              <ul className="space-y-3">
                {assessment.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {suggestion}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No specific suggestions provided.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
