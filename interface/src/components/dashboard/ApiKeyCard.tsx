import { useState } from "react";

interface ApiKeyCardProps {
  title: string;
  createdAt: string;
  status: "ACTIVE" | "TESTING";
  keyPrefix: string;
  maskedKey?: string;
  fullKey?: string;
}

export default function ApiKeyCard({
  title,
  createdAt,
  status,
  keyPrefix,
  maskedKey = "••••••••••••••••••••••••",
  fullKey
}: ApiKeyCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (fullKey) {
        navigator.clipboard.writeText(fullKey);
    } else {
        navigator.clipboard.writeText(keyPrefix + maskedKey);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card rounded-xl p-6 hover:border-[#334155] transition-colors group flex flex-col justify-between h-[180px]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-label-mono text-label-mono text-on-surface mb-1">
            {title}
          </h4>
          <p className="text-code-sm font-code-sm text-on-surface-variant">
            Created {createdAt}
          </p>
        </div>
        {status === "ACTIVE" ? (
          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-label-mono rounded flex items-center gap-1 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{" "}
            ACTIVE
          </span>
        ) : (
          <span className="px-2 py-1 bg-tertiary-container/10 text-tertiary-fixed-dim text-[10px] font-label-mono rounded flex items-center gap-1 border border-tertiary-container/20">
            TESTING
          </span>
        )}
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 flex justify-between items-center group-hover:border-[#6366F1]/50 transition-colors">
        <div className="font-code-sm text-code-sm text-on-surface tracking-wider flex items-center gap-2">
          <span className="text-on-surface-variant">{keyPrefix}</span>
          <span>{maskedKey}</span>
        </div>
        <button
          aria-label="Copy key"
          onClick={handleCopy}
          className={`transition-colors p-1 ${
            copied
              ? "text-emerald-400"
              : "text-on-surface-variant hover:text-[#6366F1]"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {copied ? "check" : "content_copy"}
          </span>
        </button>
      </div>
    </div>
  );
}
