import { useToast } from '../../store/useToast';

export default function ToastContainer() {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`animate-fade-up pointer-events-auto flex items-center gap-3 px-4 py-3 min-w-[300px] max-w-sm rounded-xl shadow-2xl border ${
                        toast.type === 'success' 
                            ? 'bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981]' 
                            : toast.type === 'error'
                            ? 'bg-error-container border-error/20 text-on-error-container'
                            : 'bg-surface-container-high border-outline-variant text-on-surface'
                    }`}
                >
                    <span className="material-symbols-outlined text-[20px]">
                        {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
                    </span>
                    <p className="font-body-md text-sm font-medium flex-grow">{toast.message}</p>
                    <button 
                        onClick={() => removeToast(toast.id)}
                        className="opacity-50 hover:opacity-100 transition-opacity"
                    >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                </div>
            ))}
        </div>
    );
}
