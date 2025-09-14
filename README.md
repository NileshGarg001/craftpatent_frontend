# CraftPatent Frontend

Modern React/Next.js dashboard for the CraftPatent AI patent assessment platform.

## 🚀 Live Demo

**Frontend URL:** [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/your-username/craft-patent-frontend)  
**Backend API:** https://craftpatent-176187988301.us-central1.run.app

## Features

- 🎯 **Real-time Patent Assessment** - Submit patent disclosures and get comprehensive analysis
- 📊 **Interactive Score Dashboard** - Visual representation of novelty, clarity, claims, and applicability scores
- 🔄 **State-driven Progress Tracking** - Watch your patent improve through AI iterations
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Modern UI/UX** - Built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI primitives
- **Icons:** Lucide React
- **Deployment:** Vercel

## Architecture

```
Frontend (Next.js) ←→ Backend API (Google Cloud Run)
     │                        │
     ├─ Patent Input          ├─ Coordinator Agent
     ├─ Progress Tracking     ├─ Draft Agent  
     ├─ Score Visualization   └─ Rating Agent
     └─ Results Dashboard
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd craft-patent-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your backend URL
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open http://localhost:3000**

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://craftpatent-176187988301.us-central1.run.app
```

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/                # Base UI components
│   ├── AssessmentResults.tsx
│   ├── LoadingState.tsx
│   ├── PatentInput.tsx
│   └── ScoreCard.tsx
├── lib/                   # Utilities
│   ├── api.ts            # Backend API integration
│   └── utils.ts          # Helper functions
└── types/                # TypeScript definitions
    └── patent.ts         # Patent-related types
```

## API Integration

The frontend communicates with the backend through RESTful API calls:

```typescript
// Submit patent for assessment
POST /apps/coordinator_agent/users/{userId}/sessions
{
  "input": "patent disclosure text...",
  "session_id": "generated-session-id"
}

// Response: PatentAssessment object
{
  "patentability_assessment": "APPROVED/REJECTED...",
  "novelty_score": 8,
  "clarity_score": 9,
  "claims_score": 7,
  "industrial_applicability_score": 8,
  "overall_score": 8,
  "suggestions": ["improvement 1", "improvement 2"]
}
```

## Components

### Core Components

- **`PatentInput`** - Text area for patent disclosure input with sample data
- **`LoadingState`** - Animated progress indicator during AI processing  
- **`AssessmentResults`** - Comprehensive display of patent scores and analysis
- **`ScoreCard`** - Individual metric visualization with progress bars

### UI Components  

- **`Progress`** - Radix UI progress bar with custom styling
- Utility functions for consistent styling and state management

## Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard:**
   ```
   NEXT_PUBLIC_API_URL=https://craftpatent-176187988301.us-central1.run.app
   ```
3. **Deploy:** Automatic deployment on git push

### Manual Build

```bash
npm run build
npm start
```

## Usage

1. **Submit Patent:** Paste your invention disclosure in the text area
2. **Processing:** Watch real-time progress as AI agents analyze your patent
3. **Results:** Review comprehensive scores, detailed rationales, and improvement suggestions
4. **Iterate:** Use suggestions to improve your patent and resubmit

## Development

### Adding New Components

```bash
# Create component file
touch src/components/NewComponent.tsx

# Add to exports if needed
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the existing color scheme (blue primary, gray neutral)
- Maintain responsive design patterns
- Use consistent spacing and typography

### API Integration

The `PatentAPI` class in `src/lib/api.ts` handles all backend communication:

```typescript
import { PatentAPI } from '@/lib/api';

const assessment = await PatentAPI.assessPatent(patentText);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with tests
4. Submit a pull request

## License

MIT License - see LICENSE file for details

---

Built with ❤️ for modern patent assessment
