import React, { useState } from 'react';
import { Copy, Check, Download, Split, Columns } from 'lucide-react';

interface CodeDiffViewerProps {
  originalCode: string;
  refactoredCode: string;
  language: string;
}

export const CodeDiffViewer: React.FC<CodeDiffViewerProps> = ({
  originalCode,
  refactoredCode,
  language
}) => {
  const [copied, setCopied] = useState(false);
  const [viewStyle, setViewStyle] = useState<'side-by-side' | 'refactored-only'>('side-by-side');

  const handleCopy = () => {
    navigator.clipboard.writeText(refactoredCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = language === 'sql' ? 'sql' : language === 'python' ? 'py' : 'ts';
    const blob = new Blob([refactoredCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `greencode-optimized.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const originalLines = originalCode.split('\n');
  const refactoredLines = refactoredCode.split('\n');

  return (
    <div className="border border-slate-800 rounded-xl bg-slate-950 overflow-hidden flex flex-col">
      {/* Diff Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono text-slate-300 font-medium">Refactored Output</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span className="text-emerald-400 font-mono text-[11px]">{language.toUpperCase()}</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span className="text-slate-400 text-[11px]">{refactoredLines.length} lines</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center p-0.5 bg-slate-950 border border-slate-800 rounded-md">
            <button
              onClick={() => setViewStyle('side-by-side')}
              title="Side by side comparison"
              className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 cursor-pointer transition-colors ${
                viewStyle === 'side-by-side' ? 'bg-slate-800 text-slate-200' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <Columns className="w-3 h-3" />
              <span>Split</span>
            </button>
            <button
              onClick={() => setViewStyle('refactored-only')}
              title="Optimized code only"
              className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 cursor-pointer transition-colors ${
                viewStyle === 'refactored-only' ? 'bg-slate-800 text-slate-200' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <Split className="w-3 h-3" />
              <span>Optimized</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700/80 transition-colors cursor-pointer text-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700/80 transition-colors cursor-pointer text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      {viewStyle === 'side-by-side' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 font-mono text-xs overflow-x-auto max-h-[520px]">
          {/* Original Code */}
          <div className="flex flex-col bg-slate-950/70">
            <div className="px-4 py-1.5 bg-red-950/20 text-red-400 border-b border-slate-800/80 text-[11px] font-mono flex items-center justify-between">
              <span>BEFORE (High operational wattage & memory bloat)</span>
              <span className="text-red-400/80 text-[10px]">Unoptimized</span>
            </div>
            <div className="p-3 overflow-y-auto max-h-[480px]">
              {originalLines.map((line, idx) => (
                <div key={idx} className="flex gap-3 leading-relaxed hover:bg-slate-900/40">
                  <span className="select-none text-slate-600 text-right w-8 text-[11px]">{idx + 1}</span>
                  <span className="text-slate-300 whitespace-pre">{line || ' '}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Refactored Code */}
          <div className="flex flex-col bg-slate-950">
            <div className="px-4 py-1.5 bg-emerald-950/30 text-emerald-400 border-b border-slate-800/80 text-[11px] font-mono flex items-center justify-between">
              <span>AFTER (GreenCode Vectorized & Indexed)</span>
              <span className="text-emerald-400 text-[10px]">Energy Efficient</span>
            </div>
            <div className="p-3 overflow-y-auto max-h-[480px]">
              {refactoredLines.map((line, idx) => (
                <div key={idx} className="flex gap-3 leading-relaxed hover:bg-emerald-950/10">
                  <span className="select-none text-slate-600 text-right w-8 text-[11px]">{idx + 1}</span>
                  <span className="text-emerald-200 whitespace-pre">{line || ' '}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="font-mono text-xs overflow-y-auto max-h-[520px] p-4 bg-slate-950">
          {refactoredLines.map((line, idx) => (
            <div key={idx} className="flex gap-4 leading-relaxed hover:bg-emerald-950/10">
              <span className="select-none text-slate-600 text-right w-8 text-[11px]">{idx + 1}</span>
              <span className="text-emerald-200 whitespace-pre">{line || ' '}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
