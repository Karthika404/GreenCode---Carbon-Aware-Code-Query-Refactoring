import React, { useState } from 'react';
import { GridTelemetry, RefactorResult } from '../types';
import { 
  Smartphone, 
  Wifi, 
  Battery, 
  Zap, 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  ArrowUpRight, 
  GitPullRequest, 
  Code2, 
  ChevronRight,
  Sparkles,
  RefreshCw,
  Sliders,
  Layers
} from 'lucide-react';

interface ReactNativeCompanionProps {
  telemetry: GridTelemetry | null;
  refactorResult: RefactorResult | null;
  onRefreshTelemetry: () => void;
  loadingTelemetry: boolean;
}

export const ReactNativeCompanion: React.FC<ReactNativeCompanionProps> = ({
  telemetry,
  refactorResult,
  onRefreshTelemetry,
  loadingTelemetry
}) => {
  const [activeTab, setActiveTab] = useState<'monitor' | 'approvals' | 'rn_code'>('monitor');
  const [approvedPrs, setApprovedPrs] = useState<Record<string, boolean>>({});

  const ukIntensity = telemetry?.ukNational?.intensity || 135;
  const bestRegion = telemetry?.bestWindow?.recommendedRegion;

  const prList = [
    {
      id: 'PR-108',
      repo: 'core-pricing-service',
      title: 'Optimize product price matrix loop',
      language: 'Python',
      energyDelta: '-89.5%',
      kgCo2Saved: '48.2 kg/yr',
      author: 'alex.dev',
      time: '12m ago',
      urgent: true,
      snippet: 'Vectorized pairwise matrix computation with NumPy broadcasting.'
    },
    {
      id: 'PR-109',
      repo: 'analytics-warehouse',
      title: 'Refactor orders user aggregation CTE',
      language: 'SQL',
      energyDelta: '-85.3%',
      kgCo2Saved: '112.4 kg/yr',
      author: 'maria.data',
      time: '34m ago',
      urgent: false,
      snippet: 'Replaced N+1 correlated subquery with covering indexed CTE.'
    },
    {
      id: 'PR-110',
      repo: 'notification-pipeline',
      title: 'Zero-copy telemetry buffer stream',
      language: 'TypeScript',
      energyDelta: '-76.0%',
      kgCo2Saved: '29.1 kg/yr',
      author: 'ken.ops',
      time: '1h ago',
      urgent: false,
      snippet: 'Eliminated heap spread object allocations inside loop.'
    }
  ];

  const handleApprove = (id: string) => {
    setApprovedPrs(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Overview Intro banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 lg:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">GreenCode Mobile</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-xs text-slate-400">React Native Telemetry & Approval Companion</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl">
              Engineered with React Native / Expo to monitor data center carbon spikes, stream live grid telemetry from external APIs, and review/approve GenAI code refactorings on mobile.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('monitor')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'monitor' ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              App View
            </button>
            <button
              onClick={() => setActiveTab('rn_code')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'rn_code' ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              React Native Code
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'rn_code' ? (
        /* React Native Code Export & Architecture Tab */
        <div className="border border-slate-800 rounded-xl bg-slate-950 overflow-hidden">
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-slate-200">GreenCodeApp.tsx (React Native / Expo Architecture)</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">TypeScript · React Native 0.76+</span>
          </div>
          <div className="p-4 overflow-x-auto max-h-[600px] font-mono text-xs text-slate-300 leading-relaxed bg-slate-950">
            <pre>{`/**
 * GreenCode Mobile - React Native & Expo Implementation
 * Fetches real-time carbon grid intensity from external national grid API
 * and enables on-call engineers to audit GenAI code refactorings.
 */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from 'react-native';

const GRID_API = 'https://api.carbonintensity.org.uk/intensity';

export default function GreenCodeMobileApp() {
  const [gridData, setGridData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Real-time external API polling hook
  useEffect(() => {
    async function fetchLiveGrid() {
      try {
        const response = await fetch(GRID_API);
        const json = await response.json();
        setGridData(json.data?.[0]);
      } catch (err) {
        console.error('Failed to fetch grid intensity', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveGrid();
    const interval = setInterval(fetchLiveGrid, 60000); // 1-minute real-time interval
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.headerTitle}>GreenCode Telemetry</Text>
        
        {/* Real-time Grid Card */}
        <View style={styles.card}>
          <Text style={styles.label}>UK Grid Carbon Intensity (Real-time)</Text>
          {loading ? (
            <ActivityIndicator color="#10B981" />
          ) : (
            <Text style={styles.intensityMetric}>
              {gridData?.intensity?.actual || 135} gCO2/kWh
            </Text>
          )}
          <Text style={styles.subtext}>Index: {gridData?.intensity?.index || 'Moderate'}</Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Approve Code Refactor (-84% Joules)</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0E14' },
  scroll: { padding: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#F8FAFC', marginBottom: 12 },
  card: { backgroundColor: '#0F1620', borderRadius: 12, padding: 16, borderColor: '#1E293B', borderWidth: 1 },
  label: { fontSize: 12, color: '#94A3B8', marginBottom: 4 },
  intensityMetric: { fontSize: 28, fontWeight: '800', color: '#10B981' },
  subtext: { fontSize: 11, color: '#64748B', marginTop: 4 },
  button: { marginTop: 16, backgroundColor: '#10B981', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#022C22', fontWeight: '700', fontSize: 13 }
});`}</pre>
          </div>
        </div>
      ) : (
        /* Interactive Mobile Device Simulator */
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-2">
          {/* Phone Frame */}
          <div className="w-[340px] sm:w-[380px] h-[720px] bg-slate-950 border-[10px] border-slate-800 rounded-[44px] shadow-2xl relative overflow-hidden flex flex-col ring-1 ring-slate-700/50">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2 inset-x-0 flex justify-center z-30 pointer-events-none">
              <div className="w-28 h-5 bg-slate-900 rounded-full flex items-center justify-center gap-1.5 px-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>
            </div>

            {/* Mobile Status Bar */}
            <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-mono text-slate-300 z-20 select-none bg-slate-950">
              <span>9:41</span>
              <div className="flex items-center gap-2">
                <Wifi className="w-3.5 h-3.5" />
                <span className="text-[10px]">5G</span>
                <Battery className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            {/* Mobile App Header */}
            <div className="px-5 py-3 border-b border-slate-800/80 flex items-center justify-between bg-slate-950">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                    <Zap className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-bold text-slate-100">GreenCode Native</span>
                </div>
                <span className="text-[10px] text-slate-400">Telemetry & PR Sentinel</span>
              </div>

              <button
                onClick={onRefreshTelemetry}
                className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                title="Refresh real-time API"
              >
                <RefreshCw className={`w-3 h-3 ${loadingTelemetry ? 'animate-spin text-emerald-400' : ''}`} />
              </button>
            </div>

            {/* Scrollable Mobile App Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {/* Real-time Grid Intensity Card */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    UK Grid Carbon (Live API)
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px] uppercase">
                    {telemetry?.ukNational?.index || 'Moderate'}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-100 font-mono">
                    {ukIntensity}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">gCO2/kWh</span>
                </div>

                <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Wind: <strong>44%</strong> · Solar: <strong>8%</strong></span>
                  <span className="text-emerald-400">Gas: 24%</span>
                </div>
              </div>

              {/* Recommended Low-Carbon Window Notification */}
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-2.5">
                <Bell className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-[11px] font-medium text-emerald-300">Clean Window Active</div>
                  <p className="text-[10px] text-slate-300 leading-tight">
                    Stockholm (24 gCO2/kWh) & London (off-peak) are emitting minimal carbon. Ideal for queued batch transforms.
                  </p>
                </div>
              </div>

              {/* Pending Refactor Approvals Queue */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">
                    Pending Code Audits ({prList.filter(p => !approvedPrs[p.id]).length})
                  </span>
                  <span className="text-[10px] text-slate-500">Live PR Bot</span>
                </div>

                {prList.map((pr) => {
                  const isApproved = approvedPrs[pr.id];
                  return (
                    <div
                      key={pr.id}
                      className={`p-3 rounded-xl border transition-all ${
                        isApproved
                          ? 'bg-slate-900/30 border-slate-800/50 opacity-60'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-mono text-emerald-400 font-medium">{pr.id}</span>
                        <span className="text-slate-500 text-[10px]">{pr.time}</span>
                      </div>

                      <div className="text-xs font-medium text-slate-200 line-clamp-1">{pr.title}</div>
                      <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{pr.snippet}</p>

                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800 text-[10px]">
                        <span className="font-mono text-emerald-400 font-semibold">{pr.energyDelta} Joules</span>
                        <span className="text-slate-400">{pr.kgCo2Saved}</span>
                      </div>

                      <div className="mt-2.5">
                        {isApproved ? (
                          <div className="flex items-center justify-center gap-1 py-1.5 bg-emerald-950/40 border border-emerald-500/30 rounded text-emerald-400 text-[11px] font-medium">
                            <CheckCircle className="w-3 h-3" />
                            <span>Refactor Approved</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleApprove(pr.id)}
                            className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>One-Tap Approve & Merge</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <div className="h-14 border-t border-slate-800 bg-slate-950 px-6 flex items-center justify-between text-slate-400">
              <button className="flex flex-col items-center gap-1 text-emerald-400">
                <Zap className="w-4 h-4" />
                <span className="text-[9px] font-medium">Live Grid</span>
              </button>
              <button className="flex flex-col items-center gap-1 hover:text-slate-200">
                <GitPullRequest className="w-4 h-4" />
                <span className="text-[9px] font-medium">PR Audits</span>
              </button>
              <button className="flex flex-col items-center gap-1 hover:text-slate-200">
                <Sliders className="w-4 h-4" />
                <span className="text-[9px] font-medium">Regions</span>
              </button>
            </div>

            {/* Home indicator bar */}
            <div className="pb-1 bg-slate-950 flex justify-center">
              <div className="w-32 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>

          {/* Side features explainer for React Native */}
          <div className="max-w-md space-y-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <Layers className="w-4 h-4" />
                <span>React Native Mobile Capabilities</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Modern engineering organizations need mobile observability when background workloads or machine learning pipelines trigger energy alerts.
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg space-y-1">
                  <div className="font-medium text-slate-200">1. Real-time External API Feed</div>
                  <div className="text-slate-400 text-[11px]">
                    Subscribes to live UK National Grid Carbon Intensity REST API with 60s background fetch cycles.
                  </div>
                </div>

                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg space-y-1">
                  <div className="font-medium text-slate-200">2. Low Carbon Push Triggers</div>
                  <div className="text-slate-400 text-[11px]">
                    Detects clean energy generation surges (wind/solar exceeding 50%) and triggers on-device alerts.
                  </div>
                </div>

                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg space-y-1">
                  <div className="font-medium text-slate-200">3. On-The-Go PR Approval</div>
                  <div className="text-slate-400 text-[11px]">
                    Reviews LLM-suggested code diffs, energy reductions, and merges refactored SQL & Python directly from iOS / Android.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
