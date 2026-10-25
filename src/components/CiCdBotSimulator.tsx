import React, { useState } from 'react';
import { RefactorResult, GridTelemetry } from '../types';
import { 
  GitPullRequest, 
  CheckCircle, 
  AlertTriangle, 
  GitCommit, 
  Copy, 
  Check, 
  ExternalLink, 
  Zap, 
  Leaf, 
  Terminal,
  Bot
} from 'lucide-react';

interface CiCdBotSimulatorProps {
  refactorResult: RefactorResult | null;
  telemetry: GridTelemetry | null;
}

export const CiCdBotSimulator: React.FC<CiCdBotSimulatorProps> = ({
  refactorResult,
  telemetry
}) => {
  const [copiedBadge, setCopiedBadge] = useState(false);
  const [prStatus, setPrStatus] = useState<'pending_refactor' | 'committed'>('pending_refactor');

  const energyPercent = refactorResult?.metrics.energyReductionPercent.toFixed(1) || '85.3';
  const kgCo2 = refactorResult?.metrics.annualKgCo2Saved.toFixed(1) || '112.4';
  const gridIntensity = refactorResult?.gridIntensityUsed || 135;

  const handleCopyBadge = () => {
    const badgeMarkdown = `[![GreenCode Energy Efficiency](https://img.shields.io/badge/GreenCode-Energy_Saved_${energyPercent}%25-10b981?style=flat-square&logo=leaf)](https://github.com/greencode)`;
    navigator.clipboard.writeText(badgeMarkdown);
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 2000);
  };

  const handleApplyCommit = () => {
    setPrStatus('committed');
  };

  return (
    <div className="space-y-6">
      {/* Intro Context Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 lg:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">GreenCode CI/CD Sentinel</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs text-slate-400">Automated GitHub Actions / GitLab Bot</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl">
              GreenCode intercepts pull requests during CI/CD, analyzes AST complexity and queries, estimates carbon impact at target deployment data centers, and generates ready-to-merge refactoring commits.
            </p>
          </div>

          <button
            onClick={handleCopyBadge}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            {copiedBadge ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy README Badge</span>
          </button>
        </div>
      </div>

      {/* Pull Request Card Container */}
      <div className="border border-slate-800 rounded-xl bg-slate-950 overflow-hidden">
        {/* GitHub PR Header */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <GitPullRequest className="w-3.5 h-3.5" />
                <span>Open</span>
              </span>
              <h2 className="text-sm font-semibold text-slate-100">
                feat(analytics): add order aggregation query and user lifetime stats <span className="text-slate-500 font-normal">#482</span>
              </h2>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Branch: <code className="text-slate-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">feature/order-stats</code> into <code className="text-slate-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">main</code>
            </div>
          </div>

          {/* Status Checks bar */}
          <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              {prStatus === 'committed' ? (
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium">All checks passed · GreenCode budget verified</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="font-medium">greencode/carbon-budget: Inefficient query detected (-{energyPercent}% Joules possible)</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
              <span>CI Pipeline #9421</span>
              <span>·</span>
              <span>Evaluated in 1.4s</span>
            </div>
          </div>
        </div>

        {/* PR Comment Thread from GreenCode Bot */}
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Bot className="w-4 h-4" />
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-200">greencode-bot</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">bot</span>
                  <span className="text-slate-500 text-[11px]">reviewed 14 minutes ago</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-mono">ISO/IEC 21031 (SCI) Certified</span>
              </div>

              {/* Bot Review Body */}
              <div className="border border-slate-800 rounded-lg bg-slate-900/50 p-4 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-slate-200 font-medium">
                    <Leaf className="w-4 h-4 text-emerald-400" />
                    <span>Automated Carbon Impact & Complexity Audit</span>
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    Live Grid: <strong>{gridIntensity} gCO2/kWh</strong>
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed">
                  GreenCode analyzed the operational compute and memory profile of this pull request. The incoming code contains nested quadratic full-table scans that will consume approximately <strong>{(refactorResult?.metrics.energyJoulesBefore || 0.082) * 1000} mJ per execution</strong>. 
                  Refactoring as suggested below reduces CPU thermal dissipation and database buffer pool churn by <strong>{energyPercent}%</strong>.
                </p>

                {/* Complexity Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-950 border-b border-slate-800 text-slate-400">
                      <tr>
                        <th className="py-2 px-3">Metric</th>
                        <th className="py-2 px-3">Current PR</th>
                        <th className="py-2 px-3">GreenCode Suggestion</th>
                        <th className="py-2 px-3 text-right">Operational Delta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-200">Time Complexity</td>
                        <td className="py-2 px-3 text-red-400">{refactorResult?.complexity.timeBefore || 'O(N^2) Nested Scans'}</td>
                        <td className="py-2 px-3 text-emerald-400">{refactorResult?.complexity.timeAfter || 'O(N) Hash Join CTE'}</td>
                        <td className="py-2 px-3 text-right text-emerald-400">⚡ 12x Faster</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-200">Energy Consumption</td>
                        <td className="py-2 px-3 text-slate-400">{((refactorResult?.metrics.energyJoulesBefore || 0.082) * 1000).toFixed(1)} mJ / query</td>
                        <td className="py-2 px-3 text-emerald-400">{((refactorResult?.metrics.energyJoulesAfter || 0.012) * 1000).toFixed(1)} mJ / query</td>
                        <td className="py-2 px-3 text-right text-emerald-400">📉 -{energyPercent}% Joules</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-200">Annual CO2e (Scope 2)</td>
                        <td className="py-2 px-3 text-slate-400">High carbon footprint</td>
                        <td className="py-2 px-3 text-emerald-400">Saved: {kgCo2} kg CO2e / yr</td>
                        <td className="py-2 px-3 text-right text-emerald-400">🌱 {refactorResult?.metrics.equivalentTreesPlanted || 5} Trees</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Diff Suggestion with 1-click commit */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">Suggested Refactor Commit</span>
                    <span className="text-slate-500 font-mono text-[11px]">query_analytics.sql</span>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs overflow-x-auto text-emerald-300 max-h-48">
                    <pre>{refactorResult?.refactoredCode || `-- [GreenCode Refactored Query]
WITH ActiveUserSummary AS (
  SELECT o.user_id, COUNT(o.id) AS total_orders, SUM(o.total_amount) AS lifetime_value
  FROM orders o WHERE o.status = 'completed'
  GROUP BY o.user_id
)
SELECT u.id, u.email, s.total_orders, s.lifetime_value
FROM users u
INNER JOIN ActiveUserSummary s ON u.id = s.user_id;`}</pre>
                  </div>

                  {prStatus === 'pending_refactor' ? (
                    <button
                      onClick={handleApplyCommit}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-2 mt-2"
                    >
                      <GitCommit className="w-3.5 h-3.5" />
                      <span>1-Click Apply & Commit Green Refactor</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 p-2 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Commit pushed to branch <code className="font-mono font-semibold text-white">feature/order-stats</code>. All energy checks passing.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
