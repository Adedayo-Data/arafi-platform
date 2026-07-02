import { useState } from "react";

interface ApiKeyDisplayProps {
  apiKey: string;
  maskedKey: string;
}

export default function ApiKeyDisplay({
  apiKey,
  maskedKey,
}: ApiKeyDisplayProps) {
  const [keyCopied, setKeyCopied] = useState(false);
  const [isMasked, setIsMasked] = useState(true);

  const handleCopy = () => {
    // navigator.clipboard.writeText(isMasked ? maskedKey : apiKey);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 1000);
  };

  const toggleKey = () => {
    setIsMasked((prev) => !prev);
  };

  return (
    <div className="surface-panel rounded-lg p-2 flex items-center gap-3">
      <span className="font-label-mono text-label-mono text-on-surface-variant">
        Key:
      </span>
      <code className="font-code-sm text-code-sm text-primary tracking-wider transition-all">
        {isMasked ? maskedKey : apiKey}
      </code>
      <div className="flex items-center border-l border-outline-variant pl-2 ml-1">
        <button
          className="p-1.5 text-on-surface-variant hover:text-on-surface transition-colors rounded"
          onClick={toggleKey}
          title="Toggle Visibility"
        >
          <span className="material-symbols-outlined text-[16px]">
            {isMasked ? "visibility" : "visibility_off"}
          </span>
        </button>
        <button
          className="p-1.5 text-on-surface-variant hover:text-on-surface transition-colors rounded flex items-center justify-center"
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          <span
            className={`material-symbols-outlined text-[16px] ${
              keyCopied ? "copy-flash text-primary" : ""
            }`}
          >
            {keyCopied ? "check" : "content_copy"}
          </span>
        </button>
      </div>
    </div>
  );
}
