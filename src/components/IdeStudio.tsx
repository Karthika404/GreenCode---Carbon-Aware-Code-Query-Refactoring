import React, { useState } from 'react';
import { GridTelemetry, RefactorResult, CodePreset } from '../types';
import { CODE_PRESETS } from '../data/presets';
import { CodeDiffViewer } from './CodeDiffViewer';
import { MetricCard } from './MetricCard';
import { 
  Play, 
  RotateCcw, 
  Zap, 
  Cpu, 
  Database, 
  TreePine, 
  Car, 
  Flame, 
  CheckCircle2, 
  ArrowRight,
  Info,
  Clock,
  ExternalLink
} from 'lucide-react';

interface IdeStudioProps {
  telemetry: GridTelemetry | null;
  refactorResult: RefactorResult | null;
  isRefactoring: boolean;
  onRefactor: (params: {
    code: string;
    language: string;
    targetCloud: string;
    monthlyRuns: number;
    optimizationFocus: string;
  }) => void;
}

export const IdeStudio: React.FC<IdeStudioProps> = ({
  telemetry,
  refactorResult,
  isRefactoring,
  onRefactor
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(CODE_PRESETS[0].id);
  const [code, setCode] = useState<string>(CODE_PRESETS[0].originalCode);
  const [language, setLanguage] = useState<string>(CODE_PRESETS[0].language);
  const [targetCloud, setTargetCloud] = useState<string>('gcp-europe-west2');
  const [monthlyRuns, setMonthlyRuns] = useState<number>(CODE_PRESETS[0].defaultMonthlyRuns);
  const [optimizationFocus, setOptimizationFocus] = useState<string>('balanced');

  const handleSelectPreset = (preset: CodePreset) => {
    setSelectedPresetId(preset.id);
    setCode(preset.originalCode);
    setLanguage(preset.language);
    setMonthlyRuns(preset.defaultMonthlyRuns);
  };

  const handleRunRefactor = () => {
    onRefactor({
      code,
      language,
      targetCloud,
      monthlyRuns,
      optimizationFocus
    });
  };

  const currentRegion = telemetry?.cloudRegions.find(r => r.id === targetCloud) || telemetry?.cloudRegions[0];

  return (
    <div className="space-y-6">
      {/* Top Banner / Problem & Solution context */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 lg:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">GreenCode Studio</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs text-slate-400">Carbon-Aware AST & Query Refactoring Engine</span>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl">
              Unvectorized nested loops, unindexed SQL joins, and unbounded memory allocations silently waste megawatts across cloud data centers.
              GreenCode couples LLM compilation with real-time electrical grid intensity to generate provably lower-power code.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunRefactor}
              disabled={isRefactoring}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600/50 text-slate-950 font-medium text-xs rounded-lg transition-all shadow-sm cursor-pointer"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${isRefactoring ? 'animate-spin' : ''}`} />
              <span>{isRefactoring ? 'Analyzing Operational Complexity...' : 'Analyze & Green Refactor'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preset selector bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/40 border border-slate-800/80 rounded-lg p-2.5 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="font-medium text-slate-300">Preset Scenarios:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {CODE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors cursor-pointer ${
                selectedPresetId === preset.id
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700/80'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Workspace: Configuration + Code Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Code Editor & Configuration controls */}
        <div className="lg:col-span-6 space-y-4">
          <div className="border border-slate-800 rounded-xl bg-slate-950 overflow-hidden flex flex-col">
            {/* Header bar of editor */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-300 font-medium">Source Input</span>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-slate-950 text-slate-300 border border-slate-800 rounded px-2 py-0.5 text-xs font-mono focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="sql">SQL Query</option>
                  <option value="python">Python</option>
                  <option value="typescript">TypeScript</option>
                  <option value="cpp">C++</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const preset = CODE_PRESETS.find(p => p.id === selectedPresetId);
                    if (preset) setCode(preset.originalCode);
                  }}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 cursor-pointer"
                  title="Reset to preset original"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={16}
              spellCheck={false}
              className="w-full bg-slate-950 text-slate-200 font-mono text-xs p-4 focus:outline-none resize-none leading-relaxed border-none focus:ring-0"
              placeholder="Paste SQL query, Python loop, or TypeScript workload to refactor..."
            />
          </div>

          {/* Operational Profiling Configuration */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
              <span className="font-medium text-slate-300">Deployment & Grid Telemetry Parameters</span>
              <span className="text-slate-500">SCI Scope 2 Integration</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Cloud Region */}
              <div className="space-y-1.5">
                <label className="text-slate-400">Target Cloud Data Center</label>
                <select
                  value={targetCloud}
                  onChange={(e) => setTargetCloud(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {telemetry?.cloudRegions.map((reg) => (
                    <option key={reg.id} value={reg.id}>
                      {reg.name} ({reg.currentIntensity} gCO2/kWh)
                    </option>
                  )) || (
                    <option value="gcp-europe-west2">GCP europe-west2 (London, UK)</option>
                  )}
                </select>
                {currentRegion && (
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                    <span>Live carbon: <strong className="text-slate-200">{currentRegion.currentIntensity} gCO2/kWh</strong></span>
                    <span>Clean mix: <strong className="text-emerald-400">{currentRegion.cleanShare}%</strong></span>
                  </div>
                )}
              </div>

              {/* Execution Volume */}
              <div className="space-y-1.5">
                <label className="text-slate-400">Estimated Executions / Month</label>
                <select
                  value={monthlyRuns}
                  onChange={(e) => setMonthlyRuns(parseInt(e.target.value, 10))}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value={100000}>100,000 runs / mo (Low tier)</option>
                  <option value={500000}>500,000 runs / mo (Production service)</option>
                  <option value={1200000}>1,200,000 runs / mo (High-volume API)</option>
                  <option value={10000000}>10,000,000 runs / mo (Data platform)</option>
                  <option value={50000000}>50,000,000 runs / mo (Hyperscale)</option>
                </select>
                <div className="text-[11px] text-slate-500 pt-0.5">
                  Calculates cumulative Scope 2 data center emissions saved
                </div>
              </div>

              {/* Optimization Focus */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-slate-400">Optimization Goal</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'balanced', label: 'Balanced Green' },
                    { id: 'max_energy', label: 'Min Watt-Hours' },
                    { id: 'memory_io', label: 'Zero-Copy / IO' },
                    { id: 'vector_tensor', label: 'SIMD / Vectorize' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setOptimizationFocus(opt.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                        optimizationFocus === opt.id
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Refactoring Output & Metrics */}
        <div className="lg:col-span-6 space-y-4">
          {refactorResult ? (
            <>
              {/* Summary Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <MetricCard
                  label="Energy Saved / Run"
                  value={`-${refactorResult.metrics.energyReductionPercent.toFixed(1)}%`}
                  subtext={`${(refactorResult.metrics.energyJoulesBefore * 1000).toFixed(1)}mJ → ${(refactorResult.metrics.energyJoulesAfter * 1000).toFixed(1)}mJ`}
                  trend="Lower Joules"
                  trendPositive={true}
                  icon={<Zap className="w-3.5 h-3.5" />}
                />

                <MetricCard
                  label="Annual CO2e Saved"
                  value={`${refactorResult.metrics.annualKgCo2Saved.toFixed(1)} kg`}
                  subtext={`@ ${refactorResult.gridIntensityUsed} gCO2/kWh`}
                  trend="Scope 2"
                  trendPositive={true}
                  icon={<Flame className="w-3.5 h-3.5" />}
                />

                <MetricCard
                  label="Time Complexity"
                  value={refactorResult.complexity.timeAfter}
                  subtext={`Was ${refactorResult.complexity.timeBefore}`}
                  trend="Speedup"
                  trendPositive={true}
                  icon={<Clock className="w-3.5 h-3.5" />}
                />

                <MetricCard
                  label="Offset Equivalent"
                  value={`${refactorResult.metrics.equivalentTreesPlanted} trees`}
                  subtext={`${refactorResult.metrics.equivalentCarMilesAvoided} car miles`}
                  trend="Eco Equiv"
                  trendPositive={true}
                  icon={<TreePine className="w-3.5 h-3.5" />}
                />
              </div>

              {/* Code Diff Output */}
              <CodeDiffViewer
                originalCode={code}
                refactoredCode={refactorResult.refactoredCode}
                language={language}
              />

              {/* Optimizations Applied Breakdown */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Applied Carbon & Computational Optimizations
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    SCI Rating: {refactorResult.metrics.sciScoreBefore} → {refactorResult.metrics.sciScoreAfter}/100
                  </span>
                </div>

                <div className="space-y-1.5">
                  {refactorResult.optimizationsApplied.map((opt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-emerald-400 select-none mt-0.5">•</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                  <strong className="text-slate-300">Architectural Rationale: </strong>
                  {refactorResult.explanation}
                </div>
              </div>
            </>
          ) : (
            <div className="h-full min-h-[460px] border border-slate-800/80 rounded-xl bg-slate-950/50 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
                <Zap className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h3 className="text-sm font-medium text-slate-200">Awaiting Carbon Refactoring</h3>
                <p className="text-xs text-slate-400">
                  Select a preset code snippet or paste your queries/functions on the left, then click <strong>Analyze & Green Refactor</strong>.
                </p>
              </div>
              <button
                onClick={handleRunRefactor}
                disabled={isRefactoring}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer border border-slate-700"
              >
                Run Default Refactor Test
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
