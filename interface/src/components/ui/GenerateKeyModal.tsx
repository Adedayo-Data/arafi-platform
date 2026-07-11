import { useState } from "react";
import { regenerateWorkspaceApiKey } from "../../lib/api/workspaces";
import { useWorkspace } from "../../store/useWorkspace";

interface GenerateKeyModalProps {
    onDismiss: () => void;
    onSuccess: () => void;
}

export default function GenerateKeyModal({ onDismiss, onSuccess }: GenerateKeyModalProps) {
    const { activeWorkspace } = useWorkspace();
    const [environment, setEnvironment] = useState("test");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [generatedKey, setGeneratedKey] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!activeWorkspace?.app_id) {
            setError("No active workspace found.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await regenerateWorkspaceApiKey(activeWorkspace.app_id, environment);
            setGeneratedKey(res.key);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to regenerate API key");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        if (!generatedKey) return;
        navigator.clipboard.writeText(generatedKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
                onClick={onDismiss}
            ></div>
            <div className="relative z-10 w-full max-w-md bg-surface-container rounded-2xl border border-outline-variant shadow-2xl shadow-black/40 p-8 flex flex-col gap-6 animate-fade-scale">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                            Regenerate API Key
                        </h2>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                            Regenerate your restricted sandbox or full-access live key.
                        </p>
                    </div>
                    <button
                        onClick={onDismiss}
                        className="text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {generatedKey ? (
                    <div className="flex flex-col gap-5">
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 flex gap-3">
                            <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                            <div className="flex flex-col">
                                <span className="text-emerald-400 font-bold text-sm">Key successfully regenerated</span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                    Please copy this key and store it somewhere safe. You will not be able to view it again.
                                </span>
                            </div>
                        </div>
                        
                        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 flex justify-between items-center group-hover:border-primary/50 transition-colors">
                            <code className="font-code-sm text-code-sm text-on-surface tracking-wider">
                                {generatedKey}
                            </code>
                            <button
                                aria-label="Copy key"
                                onClick={handleCopy}
                                className={`transition-colors p-2 rounded ${
                                    copied
                                        ? "text-emerald-400 bg-emerald-500/10"
                                        : "text-on-surface-variant hover:text-primary hover:bg-primary/10"
                                }`}
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {copied ? "check" : "content_copy"}
                                </span>
                            </button>
                        </div>
                        
                        <div className="pt-2 flex justify-end">
                            <button
                                onClick={onSuccess}
                                className="px-5 py-2.5 rounded-lg font-label-mono text-label-mono bg-primary text-on-primary font-bold hover:brightness-110 active:scale-95 transition-all w-full"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {error && (
                            <div className="bg-error-container text-on-error-container text-sm p-3 rounded-lg flex items-start gap-2">
                                <span className="material-symbols-outlined text-[16px] mt-0.5">error</span>
                                {error}
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="font-label-mono text-xs text-on-surface-variant uppercase tracking-wider block">
                                Environment
                            </label>
                            <select
                                value={environment}
                                onChange={(e) => setEnvironment(e.target.value)}
                                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                            >
                                <option value="test">Test Mode</option>
                                <option value="live">Live Mode</option>
                            </select>
                        </div>

                        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex gap-3">
                            <span className="material-symbols-outlined text-tertiary">warning</span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                                Regenerating this key will immediately revoke the old key. Any applications using the old key will instantly lose access.
                            </p>
                        </div>

                        <div className="pt-2 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onDismiss}
                                className="px-5 py-2.5 rounded-lg font-label-mono text-label-mono text-on-surface-variant hover:bg-surface-container-high transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-5 py-2.5 rounded-lg font-label-mono text-label-mono bg-error text-on-error font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center min-w-[160px]"
                            >
                                {isLoading ? (
                                    <span className="material-symbols-outlined animate-spin text-[18px]">
                                        progress_activity
                                    </span>
                                ) : (
                                    "Regenerate Key"
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
