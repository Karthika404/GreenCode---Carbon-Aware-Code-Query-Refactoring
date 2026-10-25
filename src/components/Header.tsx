import React from 'react';
import { ViewMode, GridTelemetry } from '../types';
import { Terminal, Smartphone, Globe, GitPullRequest, Zap, Sparkles } from 'lucide-react';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  telemetry: GridTelemetry | null;
  loadingTelemetry: boolean;
  onRefreshTelemetry: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  telemetry,
  loadingTelemetry,
  onRefreshTelemetry
}) => {
  const currentUkIntensity = telemetry?.ukNational?.intensity;
  const currentRegion = telemetry?.bestWindow?.recommendedRegion;

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Live status */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-100 text-sm tracking-tight">GreenCode</span>
                  <span className="text-[10px] font-mono text-emerald-400/80">v2.4·SCI</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span>Carbon-Aware Code & Query Refactoring</span>
                </div>
              </div>
            </div>

            {/* Live Grid Indicator - unboxed metadata */}
            <div className="hidden lg:flex items-center gap-2 text-xs border-l border-slate-800 pl-4 py-1 text-slate-400">
              <button 
                onClick={onRefreshTelemetry} 
                title="Click to refresh live grid intensity"
                className="flex items-center gap-1.5 hover:text-slate-200 transition-colors cursor-pointer group"
              >
                <span className={`w-2 h-2 rounded-full ${loadingTelemetry ? 'bg-amber-400 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
                <span className="font-mono text-slate-300">
                  {currentUkIntensity !== undefined ? `${currentUkIntensity} gCO2/kWh` : 'Live Grid'}
                </span>
                <span className="text-slate-500 text-[11px]">UK Grid (Live)</span>
              </button>
              <span className="text-slate-700" aria-hidden="true">·</span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Gemini 3.8 Flash
              </span>
            </div>
          </div>

          {/* View Modes Navigation */}
          <nav className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-lg">
            <button
              onClick={() => setViewMode('ide')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                viewMode === 'ide'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>IDE Studio</span>
            </button>

            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>React Native App</span>
            </button>

            <button
              onClick={() => setViewMode('grid_map')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                viewMode === 'grid_map'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Global Dispatcher</span>
            </button>

            <button
              onClick={() => setViewMode('cicd_bot')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                viewMode === 'cicd_bot'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <GitPullRequest className="w-3.5 h-3.5" />
              <span>CI/CD Bot</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
