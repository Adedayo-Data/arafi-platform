import { useState } from "react";
import { useWorkspace } from "../../store/useWorkspace";
import type { Workspace } from "../../types";

interface CreateAppModalProps {
    onSuccess: () => void;
    onDismiss: () => void;
}

export default function CreateAppModal({ onSuccess, onDismiss }: CreateAppModalProps) {
    const { create, isLoading, error } = useWorkspace();
    const [name, setName] = useState("");
    const [createdWorkspace, setCreatedWorkspace] = useState<Workspace | null>(null);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const workspace = await create({ name });
            setCreatedWorkspace(workspace);
        } catch {
            // error is shown via store
        }
    };

    const handleCopy = (keyStr: string) => {
        navigator.clipboard.writeText(keyStr);
        setCopiedKey(keyStr);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onDismiss}
            />

            {/* Modal Card */}
            <div className="relative z-10 w-full max-w-md bg-surface-container rounded-2xl border border-outline-variant shadow-2xl shadow-black/40 p-8 flex flex-col gap-6 animate-fade-scale">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />

                <header className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-[20px]">
                                {createdWorkspace ? "verified" : "add_box"}
                            </span>
                        </div>
                        {!createdWorkspace && (
                            <button
                                onClick={onDismiss}
                                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-on-surface/5 transition-colors"
                                aria-label="Dismiss"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        )}
                    </div>
                    <h2 id="modal-title" className="font-headline-md text-xl font-bold text-on-surface mt-2">
                        {createdWorkspace ? "App Created Successfully!" : "Create Your First App"}
                    </h2>
                    <p className="font-body-md text-on-surface/60 text-sm">
                        {createdWorkspace 
                            ? "Your app's initial API keys are below. Please copy them now as they will not be shown again."
                            : "Apps are isolated environments. Each generates its own API keys and manages its own data."}
                    </p>
                </header>

                {createdWorkspace ? (
                    <div className="flex flex-col gap-5 mt-4">
                        <div className="flex flex-col gap-3">
                            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 group-hover:border-primary/50 transition-colors">
                                <span className="font-label-mono text-[10px] text-emerald-400 uppercase tracking-wider block mb-1">Live Key</span>
                                <div className="flex justify-between items-center">
                                    <code className="font-code-sm text-code-sm text-on-surface tracking-wider truncate mr-2">
                                        {createdWorkspace.live_key}
                                    </code>
                                    <button
                                        onClick={() => handleCopy(createdWorkspace.live_key)}
                                        className={`transition-colors p-2 rounded shrink-0 ${
                                            copiedKey === createdWorkspace.live_key
                                                ? "text-emerald-400 bg-emerald-500/10"
                                                : "text-on-surface-variant hover:text-primary hover:bg-primary/10"
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            {copiedKey === createdWorkspace.live_key ? "check" : "content_copy"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 group-hover:border-primary/50 transition-colors">
                                <span className="font-label-mono text-[10px] text-tertiary-fixed-dim uppercase tracking-wider block mb-1">Sandbox Key</span>
                                <div className="flex justify-between items-center">
                                    <code className="font-code-sm text-code-sm text-on-surface tracking-wider truncate mr-2">
                                        {createdWorkspace.sandbox_key}
                                    </code>
                                    <button
                                        onClick={() => handleCopy(createdWorkspace.sandbox_key)}
                                        className={`transition-colors p-2 rounded shrink-0 ${
                                            copiedKey === createdWorkspace.sandbox_key
                                                ? "text-emerald-400 bg-emerald-500/10"
                                                : "text-on-surface-variant hover:text-primary hover:bg-primary/10"
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            {copiedKey === createdWorkspace.sandbox_key ? "check" : "content_copy"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onSuccess}
                            className="w-full glow-button bg-primary text-on-primary font-label-mono text-label-mono py-3.5 rounded-xl hover:scale-[1.02] transition-all"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="font-label-mono text-label-mono text-on-surface/80 text-xs uppercase tracking-wider" htmlFor="app-name-input">
                                App Name
                            </label>
                            <input
                                id="app-name-input"
                                type="text"
                                required
                                placeholder="e.g. My eCommerce App"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-surface-container-lowest/50 border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg p-3 font-body-md text-on-surface custom-input placeholder:text-on-surface-variant/40 transition-colors outline-none"
                            />
                        </div>

                        {error && (
                            <div className="text-error font-body-md text-sm bg-error-container/20 border border-error/30 rounded-lg p-3">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !name.trim()}
                            className="w-full glow-button bg-inverse-primary text-on-primary font-label-mono text-label-mono py-3.5 rounded-xl border-t border-on-surface/20 shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Creating..." : "Create App →"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
