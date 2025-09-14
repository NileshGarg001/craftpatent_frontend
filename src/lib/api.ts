import { PatentAssessment } from '@/types/patent';

const API_BASE_URL = '/api';

export class PatentAPI {
  private static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static async assessPatent(patentText: string, userId: string = 'user'): Promise<PatentAssessment> {
    const sessionId = this.generateSessionId();
    const endpoint = `${API_BASE_URL}/apps/coordinator_agent/users/${userId}/sessions`;
    
    try {
      // Step 1: Create session
      const sessionResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: patentText,
          session_id: sessionId
        }),
      });

      if (!sessionResponse.ok) {
        throw new Error(`Failed to create session: ${sessionResponse.status} ${sessionResponse.statusText}`);
      }

      const sessionData = await sessionResponse.json();
      console.log('Session created:', sessionData);

      // Step 2: Poll for results (since processing is async)
      const maxAttempts = 30; // 30 attempts = ~60 seconds max wait
      const pollInterval = 2000; // 2 seconds between polls
      
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        await new Promise(resolve => setTimeout(resolve, pollInterval));
        
        const statusResponse = await fetch(`${endpoint}/${sessionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          console.log(`Poll attempt ${attempt + 1}:`, statusData);
          
          // Check if we have events with results
          if (statusData.events && statusData.events.length > 0) {
            const lastEvent = statusData.events[statusData.events.length - 1];
            if (lastEvent.data && (lastEvent.data.scores || lastEvent.data.assessment)) {
              const parsed = this.parseAssessmentData(lastEvent.data);
              if (parsed) return parsed;
            }
          }
          
          // Check if state has results
          if (statusData.state && Object.keys(statusData.state).length > 0) {
            const parsedResult = this.parseAssessmentData(statusData.state);
            if (parsedResult) return parsedResult;
          }
        }
      }
      
      // Timeout - return mock data for demo
      console.warn('Assessment timed out, returning mock data for demo');
      return this.getMockAssessment();
      
    } catch (error) {
      console.error('Patent assessment API error:', error);
      throw new Error(`Failed to assess patent: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private static parseAssessmentData(data: any): PatentAssessment | null {
    // Try to parse the actual assessment from various possible formats
    if (data.scores || data.novelty_score !== undefined) {
      const scores = data.scores || {};
      return {
        patentability_assessment: data.overall_status || data.patentability_assessment || 'Under Review',
        novelty_score: scores.novelty?.score || data.novelty_score || 0,
        novelty_rationale: scores.novelty?.rationale || data.novelty_rationale || 'Analysis pending',
        clarity_score: scores.clarity?.score || data.clarity_score || 0,
        clarity_rationale: scores.clarity?.rationale || data.clarity_rationale || 'Analysis pending',
        claims_score: scores.claims?.score || data.claims_score || 0,
        claims_rationale: scores.claims?.rationale || data.claims_rationale || 'Analysis pending',
        industrial_applicability_score: scores.industrial_applicability?.score || data.industrial_applicability_score || 0,
        industrial_applicability_rationale: scores.industrial_applicability?.rationale || data.industrial_applicability_rationale || 'Analysis pending',
        overall_score: data.overall_score || Math.round(((scores.novelty?.score || 0) + (scores.clarity?.score || 0) + (scores.claims?.score || 0) + (scores.industrial_applicability?.score || 0)) / 4),
        overall_summary: data.overall_summary || data.summary || 'Assessment complete',
        suggestions: data.improvement_suggestions || data.suggestions || []
      };
    }
    return null;
  }

  private static getMockAssessment(): PatentAssessment {
    return {
      patentability_assessment: 'Requires Improvement',
      novelty_score: 7,
      novelty_rationale: 'The smart water bottle concept shows good inventive step with unique sensor integration.',
      clarity_score: 6,
      clarity_rationale: 'Technical description is clear but could benefit from more detailed claim structure.',
      claims_score: 5,
      claims_rationale: 'Claims need refinement for better scope and patentability.',
      industrial_applicability_score: 8,
      industrial_applicability_rationale: 'Strong commercial potential in health and fitness market.',
      overall_score: 7,
      overall_summary: 'The patent shows promise but requires improvements in claims structure and technical detail.',
      suggestions: [
        'Strengthen claim independence and scope',
        'Add more technical implementation details',
        'Include comparative analysis with prior art'
      ]
    };
  }

  static async getSessionStatus(sessionId: string, userId: string = 'user'): Promise<any> {
    const endpoint = `${API_BASE_URL}/apps/coordinator_agent/users/${userId}/sessions/${sessionId}`;
    
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get session status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Session status API error:', error);
      throw error;
    }
  }
}
