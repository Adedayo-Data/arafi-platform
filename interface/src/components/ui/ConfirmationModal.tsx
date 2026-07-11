

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
    onConfirm: () => void;
    onCancel?: () => void;
    isProcessing?: boolean;
    isAlert?: boolean;
}

export default function ConfirmationModal({
    isOpen,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = 'warning',
    onConfirm,
    onCancel,
    isProcessing = false,
    isAlert = false
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    const colors = {
        danger: 'bg-error text-on-error hover:bg-error/90',
        warning: 'bg-yellow-500 text-black hover:bg-yellow-600',
        info: 'bg-primary text-on-primary hover:bg-primary/90'
    };
    
    const icons = {
        danger: 'error',
        warning: 'warning',
        info: 'info'
    };
    
    const iconColors = {
        danger: 'text-error',
        warning: 'text-yellow-500',
        info: 'text-primary'
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="glass-card w-full max-w-sm rounded-2xl border border-on-surface/10 p-6 shadow-2xl relative flex flex-col gap-4">
                <div className="flex gap-3">
                    <span className={`material-symbols-outlined text-[28px] ${iconColors[type]}`}>
                        {icons[type]}
                    </span>
                    <div className="flex flex-col pt-0.5">
                        <h3 className="font-headline-md text-lg text-white font-bold">{title}</h3>
                        <p className="text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-2">
                    {!isAlert && onCancel && (
                        <button
                            onClick={onCancel}
                            disabled={isProcessing}
                            className="font-label-mono text-sm px-4 py-2 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-50"
                        >
                            {cancelText}
                        </button>
                    )}
                    <button
                        onClick={onConfirm}
                        disabled={isProcessing}
                        className={`font-label-mono text-sm px-4 py-2 rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center gap-2 ${colors[type]}`}
                    >
                        {isProcessing ? (
                            <>
                                <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                                Processing...
                            </>
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
