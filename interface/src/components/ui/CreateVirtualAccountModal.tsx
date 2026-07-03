import { useState } from "react";
import { useVirtualAccounts } from "../../store/useVirtualAccounts";

interface CreateVirtualAccountModalProps {
    onDismiss: () => void;
    onSuccess: () => void;
}

export default function CreateVirtualAccountModal({ onDismiss, onSuccess }: CreateVirtualAccountModalProps) {
    const { create, isLoading } = useVirtualAccounts();
    const [customerRef, setCustomerRef] = useState("");
    const [accountName, setAccountName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!customerRef || !accountName) {
            setError("Please fill out all fields");
            return;
        }

        try {
            await create({ customer_ref: customerRef, account_name: accountName });
            onSuccess();
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to create virtual account");
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
                            Create Virtual Account
                        </h2>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                            Provision a new dedicated NUBAN for a customer.
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
                            Account Name
                        </label>
                        <input
                            type="text"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            placeholder="e.g. Jane Doe"
                            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/30"
                            autoFocus
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="font-label-mono text-xs text-on-surface-variant uppercase tracking-wider block">
                            Customer Reference (ID)
                        </label>
                        <input
                            type="text"
                            value={customerRef}
                            onChange={(e) => setCustomerRef(e.target.value)}
                            placeholder="e.g. cust_987654321"
                            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-code-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/30"
                        />
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
                                "Provision"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
