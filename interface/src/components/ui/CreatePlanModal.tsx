import { useState } from "react";
import { usePlans } from "../../store/usePlans";

interface CreatePlanModalProps {
    onDismiss: () => void;
    onSuccess: () => void;
}

export default function CreatePlanModal({ onDismiss, onSuccess }: CreatePlanModalProps) {
    const { create, isLoading } = usePlans();
    const [name, setName] = useState("");
    const [interval, setInterval] = useState("monthly");
    const [amountStr, setAmountStr] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name || !interval || !amountStr) {
            setError("Please fill out all fields");
            return;
        }

        const amount = parseFloat(amountStr);
        if (isNaN(amount) || amount <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        // Convert the display amount to Kobo (multiply by 100)
        const amount_kobo = Math.round(amount * 100);

        try {
            await create({ name, interval, amount_kobo });
            onSuccess();
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to create billing plan");
        }
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
                            Create Billing Plan
                        </h2>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                            Define a recurring subscription plan template.
                        </p>
                    </div>
                    <button
                        onClick={onDismiss}
                        className="text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {error && (
                        <div className="bg-error-container text-on-error-container text-sm p-3 rounded-lg flex items-start gap-2">
                            <span className="material-symbols-outlined text-[16px] mt-0.5">error</span>
                            {error}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="font-label-mono text-xs text-on-surface-variant uppercase tracking-wider block">
                            Plan Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Pro Tier"
                            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/30"
                            autoFocus
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="font-label-mono text-xs text-on-surface-variant uppercase tracking-wider block">
                                Amount
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={amountStr}
                                onChange={(e) => setAmountStr(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-code-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/30"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="font-label-mono text-xs text-on-surface-variant uppercase tracking-wider block">
                                Interval
                            </label>
                            <select
                                value={interval}
                                onChange={(e) => setInterval(e.target.value)}
                                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>
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
                            className="px-5 py-2.5 rounded-lg font-label-mono text-label-mono bg-primary text-on-primary font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center min-w-[120px]"
                        >
                            {isLoading ? (
                                <span className="material-symbols-outlined animate-spin text-[18px]">
                                    progress_activity
                                </span>
                            ) : (
                                "Create Plan"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
