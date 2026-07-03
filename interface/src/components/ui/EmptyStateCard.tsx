import { useState } from "react";

interface EmptyStateCardProps {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  curlCommand: string;
}

export default function EmptyStateCard({
  icon,
  title,
  description,
  buttonText,
  curlCommand,
}: EmptyStateCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-surface/60 backdrop-blur-xl border border-on-surface/10 rounded-xl p-8 flex flex-col items-center text-center hover:border-inverse-primary/50 hover:bg-surface/80 transition-all duration-300 group">
      <div className="w-12 h-12 rounded-full bg-inverse-primary/10 flex items-center justify-center mb-6 border border-inverse-primary/30 shadow-[0_0_20px_rgba(73,75,214,0.15)] group-hover:shadow-[0_0_30px_rgba(73,75,214,0.3)] transition-shadow">
        <span
          className="material-symbols-outlined text-[32px] text-primary animate-float opacity-90"
          style={{ fontVariationSettings: "'wght' 300" }}
        >
          {icon}
        </span>
      </div>
      <h3 className="font-headline-md text-headline-md text-white mb-2">
        {title}
      </h3>
      <p className="text-on-surface-variant mb-8 max-w-sm">{description}</p>

      <button className="mb-8 px-6 py-2 rounded-md bg-inverse-primary text-white font-label-mono text-label-mono hover:bg-[#5a5ce0] shadow-[0_0_15px_rgba(73,75,214,0.4)] hover:shadow-[0_0_25px_rgba(73,75,214,0.6)] transition-all relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-white opacity-30"></div>
        {buttonText}
      </button>

      <div className="w-full bg-surface-container-lowest/80 backdrop-blur-md border border-on-surface/10 rounded-lg p-4 flex items-center justify-between group/code relative">
        <div className="flex items-center gap-3 w-full overflow-hidden">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/50"></div>
          </div>
          <code className="font-code-sm text-code-sm text-secondary-fixed-dim text-left block w-full overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-primary-fixed-dim font-medium">curl</span> -X
            POST {curlCommand} \
          </code>
        </div>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover/code:opacity-100 transition-opacity p-1.5 hover:bg-on-surface/10 rounded text-on-surface-variant shrink-0 ml-2"
          title="Copy to clipboard"
        >
          <span
            className={`material-symbols-outlined text-[16px] ${copied ? "text-primary" : ""}`}
          >
            {copied ? "check" : "content_copy"}
          </span>
        </button>
      </div>
    </div>
  );
}
