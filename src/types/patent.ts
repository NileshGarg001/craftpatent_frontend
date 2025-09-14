export interface PatentAssessment {
  patentability_assessment: string;
  novelty_score: number;
  novelty_rationale: string;
  clarity_score: number;
  clarity_rationale: string;
  claims_score: number;
  claims_rationale: string;
  industrial_applicability_score: number;
  industrial_applicability_rationale: string;
  overall_score: number;
  overall_summary: string;
  suggestions: string[];
}

export interface ProcessingState {
  status: 'idle' | 'processing' | 'completed' | 'error';
  currentStep: string;
  progress: number;
}

export interface PatentSession {
  id: string;
  input: string;
  assessment?: PatentAssessment;
  iterations: number;
  createdAt: Date;
  state: ProcessingState;
}
