import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  subtext: string;
  trend?: string;
  trendPositive?: boolean;
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  trend,
  trendPositive = true,
  icon
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
        <span>{label}</span>
        {icon && <span className="text-slate-500">{icon}</span>}
      </div>

      <div className="my-1.5 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tracking-tight text-slate-100 font-mono">
          {value}
        </span>
        {trend && (
          <span className={`text-xs font-mono ${trendPositive ? 'text-emerald-400' : 'text-amber-400'}`}>
            {trend}
          </span>
        )}
      </div>

      <div className="text-[11px] text-slate-400">
        {subtext}
      </div>
    </div>
  );
};
