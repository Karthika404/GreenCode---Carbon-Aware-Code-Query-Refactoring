export interface CloudRegion {
  id: string;
  name: string;
  provider: 'AWS' | 'GCP' | 'Azure';
  baseIntensity: number;
  currentIntensity: number;
  cleanShare: number;
  renewableType: string;
  rating: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
  unit: string;
  lat: number;
  lon: number;
  lastUpdated: string;
}

export interface GridTelemetry {
  timestamp: string;
  ukNational: {
    intensity: number;
    index: string;
    generationMix: Array<{ fuel: string; perc: number }>;
  };
  cloudRegions: CloudRegion[];
  bestWindow: {
    recommendedRegion: CloudRegion;
    optimalUtcTime: string;
    currentDispatchAdvice: string;
  };
}

export interface CodeComplexity {
  timeBefore: string;
  timeAfter: string;
  spaceBefore: string;
  spaceAfter: string;
}

export interface CarbonMetrics {
  energyJoulesBefore: number;
  energyJoulesAfter: number;
  energyReductionPercent: number;
  computeFlopsReductionPercent: number;
  memoryIoReductionPercent: number;
  annualKwhSaved: number;
  annualKgCo2Saved: number;
  equivalentTreesPlanted: number;
  equivalentCarMilesAvoided: number;
  sciScoreBefore: number;
  sciScoreAfter: number;
}

export interface RefactorResult {
  refactoredCode: string;
  optimizationsApplied: string[];
  complexity: CodeComplexity;
  metrics: CarbonMetrics;
  explanation: string;
  prBotComment: string;
  gridIntensityUsed: number;
  cloudRegion: CloudRegion;
  monthlyRuns: number;
}

export interface CodePreset {
  id: string;
  title: string;
  language: 'python' | 'sql' | 'typescript' | 'cpp';
  category: string;
  problemSummary: string;
  originalCode: string;
  defaultMonthlyRuns: number;
}

export type ViewMode = 'ide' | 'mobile' | 'grid_map' | 'cicd_bot';
