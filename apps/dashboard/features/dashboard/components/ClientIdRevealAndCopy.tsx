"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff } from "lucide-react";

type ClientIdRevealAndCopyProps = {
  clientId: string;
  className?: string;
};

export function ClientIdRevealAndCopy({
  clientId,
  className = "",
}: ClientIdRevealAndCopyProps) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const masked = "••••••••••••" + clientId.slice(-6);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(clientId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className={`
        group relative flex items-center gap-3 px-4 py-2.5 
        bg-black/20 border border-white/10 rounded-lg
        hover:border-white/20 focus-within:border-indigo-500/50
        transition-all ${className}
      `}
    >
      <code className="font-mono text-sm text-gray-300 flex-1 truncate select-none">
        {revealed ? clientId : masked}
      </code>

      <button
        type="button"
        onClick={() => setRevealed(!revealed)}
        className="text-gray-500 hover:text-gray-300 transition-colors p-1 -mr-1"
        title={revealed ? "Hide" : "Reveal"}
      >
        {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>

      <button
        type="button"
        onClick={handleCopy}
        className="text-gray-500 hover:text-white transition-colors p-1"
        title="Copy client ID"
      >
        <Copy size={16} />
      </button>

      {/* Copied tooltip */}
      {copied && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-md shadow-lg animate-fade-out">
          Copied!
        </div>
      )}
    </div>
  );
}
