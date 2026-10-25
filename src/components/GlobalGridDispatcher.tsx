import React, { useState } from 'react';
import { GridTelemetry, CloudRegion } from '../types';
import { 
  Globe, 
  Wind, 
  Sun, 
  Atom, 
  Flame, 
  Leaf, 
  CheckCircle, 
  ArrowRight,
  TrendingDown,
  Clock,
  Compass
} from 'lucide-react';

interface GlobalGridDispatcherProps {
  telemetry: GridTelemetry | null;
  onSelectRegion?: (regionId: string) => void;
}

export const GlobalGridDispatcher: React.FC<GlobalGridDispatcherProps> = ({
  telemetry,
  onSelectRegion
}) => {
  const [filterProvider, setFilterProvider] = useState<'ALL' | 'AWS' | 'GCP' | 'Azure'>('ALL');
  const [simulatedQueryJoules, setSimulatedQueryJoules] = useState<number>(50); // Joules per query
  const [simulatedExecutions, setSimulatedExecutions] = useState<number>(1000000); // 1M runs

  const regions = telemetry?.cloudRegions || [];
  const filteredRegions = filterProvider === 'ALL' 
    ? regions 
    : regions.filter(r => r.provider === filterProvider);

  // Sorted by cleanest to dirtiest
  const sortedRegions = [...filteredRegions].sort((a, b) => a.currentIntensity - b.currentIntensity);

  const cleanGenerationMix = telemetry?.ukNational?.generationMix || [];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 lg:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Carbon-Aware Workload Dispatcher</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs text-slate-400">Real-Time Grid Telemetry Integration</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl">
              Software Carbon Intensity (SCI) is a product of energy consumed multiplied by location-based marginal carbon intensity: 
              <code className="text-emerald-400 font-mono ml-1">SCI = (Energy × Grid Carbon) + Embodied Emissions</code>.
              Refactoring code combined with spatial dispatching to low-carbon grids yields up to 96% emissions reduction.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs">
            {(['ALL', 'AWS', 'GCP', 'Azure'] as const).map(p => (
              <button
                key={p}
                onClick={() => setFilterProvider(p)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  filterProvider === p 
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Energy Mix & Optimal Dispatch Window Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Live UK Generation Mix from external API */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-200 flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-400" />
              Live UK Grid Generation Mix (External API)
            </span>
            <span className="text-[11px] font-mono text-emerald-400">
              {telemetry?.ukNational?.intensity || 135} gCO2/kWh
            </span>
          </div>

          <div className="space-y-2 pt-1">
            {cleanGenerationMix.slice(0, 5).map((fuel, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="capitalize">{fuel.fuel}</span>
                  <span className="font-mono text-slate-400">{fuel.perc.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      fuel.fuel === 'wind' || fuel.fuel === 'solar' || fuel.fuel === 'nuclear'
                        ? 'bg-emerald-500'
                        : fuel.fuel === 'gas'
                        ? 'bg-amber-500'
                        : 'bg-slate-500'
                    }`}
                    style={{ width: `${fuel.perc}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            {telemetry?.bestWindow?.currentDispatchAdvice}
          </div>
        </div>

        {/* Right: Spatial Carbon Multiplier Calculator */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-200 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-400" />
              Spatial Carbon Impact Multiplier
            </span>
            <span className="text-[11px] text-slate-400">Simulate 1M runs of current workload</span>
          </div>

          <p className="text-xs text-slate-300">
            Compare carbon generated by the exact same compute workload in a high-carbon fossil grid vs clean hydro/nuclear grid:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg space-y-1">
              <div className="text-[11px] text-red-400 font-medium">Unoptimized Cloud Region</div>
              <div className="text-base font-bold text-slate-100 font-mono">
                AWS us-east-1 (360 gCO2/kWh)
              </div>
              <div className="text-xs text-slate-300 font-mono pt-1">
                Emissions: <strong>18.0 kg CO2e</strong> / 1M runs
              </div>
              <div className="text-[11px] text-red-400/80">
                15x higher emissions than Stockholm
              </div>
            </div>

            <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg space-y-1">
              <div className="text-[11px] text-emerald-400 font-medium">Cleanest Cloud Region (Live)</div>
              <div className="text-base font-bold text-slate-100 font-mono">
                AWS eu-north-1 (24 gCO2/kWh)
              </div>
              <div className="text-xs text-slate-300 font-mono pt-1">
                Emissions: <strong>1.2 kg CO2e</strong> / 1M runs
              </div>
              <div className="text-[11px] text-emerald-400">
                93.3% emissions avoided instantly
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cloud Regions Leaderboard Table */}
      <div className="border border-slate-800 rounded-xl bg-slate-950 overflow-hidden">
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-200">Global Cloud Region Carbon Leaderboard</div>
            <div className="text-[11px] text-slate-400">Ranked in real time by marginal grid carbon intensity</div>
          </div>
          <span className="text-[11px] font-mono text-emerald-400">
            {sortedRegions.length} Regions Monitored
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
              <tr>
                <th className="py-2.5 px-4">Cloud Region</th>
                <th className="py-2.5 px-4">Provider</th>
                <th className="py-2.5 px-4">Live Carbon Intensity</th>
                <th className="py-2.5 px-4">Clean Fuel Mix</th>
                <th className="py-2.5 px-4">Primary Renewable</th>
                <th className="py-2.5 px-4 text-right">Dispatch Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              {sortedRegions.map((region) => {
                const isCleanest = region.id === 'aws-eu-north-1';
                return (
                  <tr key={region.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 text-slate-200 font-medium font-sans flex items-center gap-2">
                      {isCleanest && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      <span>{region.name}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {region.provider}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${
                        region.currentIntensity < 100 
                          ? 'text-emerald-400' 
                          : region.currentIntensity < 250 
                          ? 'text-emerald-300' 
                          : region.currentIntensity < 400 
                          ? 'text-amber-400' 
                          : 'text-red-400'
                      }`}>
                        {region.currentIntensity} gCO2/kWh
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="w-8">{region.cleanShare}%</span>
                        <div className="w-16 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full" 
                            style={{ width: `${region.cleanShare}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-sans text-[11px]">
                      {region.renewableType}
                    </td>
                    <td className="py-3 px-4 text-right font-sans">
                      <span className={`text-[11px] font-medium ${
                        region.currentIntensity < 150 
                          ? 'text-emerald-400' 
                          : region.currentIntensity < 350 
                          ? 'text-slate-300' 
                          : 'text-amber-400'
                      }`}>
                        {region.currentIntensity < 150 ? 'Optimal' : region.currentIntensity < 350 ? 'Moderate' : 'High Carbon'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
