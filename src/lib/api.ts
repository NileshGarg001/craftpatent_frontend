import { PatentAssessment } from '@/types/patent';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class PatentAPI {
  private static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static async assessPatent(patentText: string, userId: string = 'user'): Promise<PatentAssessment> {
    const sessionId = this.generateSessionId();
    const endpoint = `${API_BASE_URL}/apps/coordinator_agent/users/${userId}/sessions`;
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: patentText,
          session_id: sessionId
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Parse the response based on the expected format from your backend
      if (typeof data === 'string') {
        try {
          return JSON.parse(data);
        } catch (e) {
          throw new Error('Failed to parse API response as JSON');
        }
      }
      
      return data;
    } catch (error) {
      console.error('Patent assessment API error:', error);
      throw new Error(`Failed to assess patent: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
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
