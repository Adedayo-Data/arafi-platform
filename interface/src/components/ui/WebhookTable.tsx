import { useState, useEffect } from "react";
import { useWorkspace } from "../../store/useWorkspace";
import { updateWebhookSettings } from "../../lib/api/workspaces";

export default function WebhookTable() {
  const { activeWorkspace, fetch } = useWorkspace();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (activeWorkspace) {
      setWebhookUrl(activeWorkspace.webhook_url || "");
      setRedirectUrl(activeWorkspace.redirect_url || "");
    }
  }, [activeWorkspace]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeWorkspace) return;

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await updateWebhookSettings(activeWorkspace.app_id, {
        webhook_url: webhookUrl,
        redirect_url: redirectUrl,
      });
      setSaveSuccess(true);
      await fetch(); // refresh active workspace details in store
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save webhook settings", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopySecret = () => {
    if (!activeWorkspace?.webhook_secret) return;
    navigator.clipboard.writeText(activeWorkspace.webhook_secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!activeWorkspace) {
    return (
      <div className="surface-panel p-8 text-center text-on-surface-variant rounded-xl border border-outline-variant/30">
        No active app workspace found. Create a workspace to configure webhooks.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Configure Settings Card */}
      <form onSubmit={handleSave} className="surface-panel rounded-xl overflow-hidden border border-outline-variant/30 animate-fade-up delay-60">
        <div className="px-6 py-4 border-b border-outline-variant/30 bg-surface-container-low flex justify-between items-center">
          <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">settings_input_antenna</span>
            Webhook Settings
          </h3>
          <button
            type="submit"
            disabled={isSaving}
            className="bg-primary text-on-primary font-bold px-4 py-2 rounded-lg font-label-mono text-label-mono hover:brightness-110 transition-all active:scale-95 flex items-center gap-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isSaving ? "sync" : saveSuccess ? "check" : "save"}
            </span>
            {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-1.5">
            <label className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">
              Webhook Endpoint URL
            </label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://yourserver.com/api/webhooks"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/30"
              required
            />
            <p className="text-[11px] text-on-surface-variant/70 leading-relaxed">
              We will send POST requests containing state update payloads to this URL when escrow transactions, payouts, or subscription renewals update.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">
              Default Success Redirect URL
            </label>
            <input
              type="url"
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              placeholder="https://yourapp.com/checkout/success"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/30"
            />
            <p className="text-[11px] text-on-surface-variant/70 leading-relaxed">
              Fall back landing page where subscribers will be sent after completing checkout if no custom redirect url is supplied during checkout initialization.
            </p>
          </div>
        </div>
      </form>

      {/* Webhook Signing Secret Card */}
      {activeWorkspace.webhook_secret && (
        <div className="surface-panel rounded-xl overflow-hidden border border-outline-variant/30 animate-fade-up delay-120 bg-[#0A0A0C]">
          <div className="p-6 space-y-4">
            <h4 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[18px]">vpn_key</span>
              Webhook Signing Secret
            </h4>
            <p className="text-body-md text-on-surface-variant">
              Every webhook request is signed with a Hex-encoded HmacSHA256 signature calculated using your secret and sent in the <code className="font-mono bg-surface-container-high px-1 py-0.5 rounded text-primary text-[12px]">arafi-signature</code> header. Use this secret to verify requests originate from Arafi.
            </p>
            
            <div className="flex gap-2 items-center bg-surface-container-low border border-outline-variant/35 rounded-lg p-3 max-w-lg">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant/40 shrink-0">key</span>
              <input
                type={showSecret ? "text" : "password"}
                readOnly
                value={activeWorkspace.webhook_secret}
                className="bg-transparent border-none text-on-surface font-code-sm text-[13px] flex-1 outline-none select-all min-w-0"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="p-1 hover:bg-surface-variant text-on-surface-variant hover:text-on-surface rounded transition-all shrink-0 cursor-pointer"
                title={showSecret ? "Hide Secret" : "Show Secret"}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showSecret ? "visibility_off" : "visibility"}
                </span>
              </button>
              <button
                type="button"
                onClick={handleCopySecret}
                className="bg-secondary text-on-secondary font-bold px-3 py-1.5 rounded font-label-mono text-[10px] uppercase hover:brightness-110 active:scale-95 transition-all shrink-0 cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[13px]">
                  {copied ? "check" : "content_copy"}
                </span>
                {copied ? "Copy" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Webhook Configuration Summary Card */}
      <div className="surface-panel rounded-xl overflow-hidden border border-outline-variant/30 animate-fade-up delay-180 bg-[#0c0e12]/40">
        <div className="px-6 py-4 border-b border-outline-variant/30 bg-surface-container-low flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-400 text-[20px]">verified_user</span>
            Active Integration Status
          </h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Webhook URL Visual Card */}
          <div className="bg-[#050608] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Outbound Webhooks</span>
              <span className={`text-[9px] px-2 py-0.5 rounded font-mono uppercase font-semibold ${
                activeWorkspace.webhook_url
                  ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                  : "text-amber-400 bg-amber-500/10 border border-amber-500/20"
              }`}>
                {activeWorkspace.webhook_url ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-white truncate font-mono">
                {activeWorkspace.webhook_url || "Not configured"}
              </span>
              <p className="text-[11px] text-zinc-400 leading-normal mt-1">
                Arafi dispatches event payloads to this API endpoint on state transitions.
              </p>
            </div>
          </div>

          {/* Success Redirect Visual Card */}
          <div className="bg-[#050608] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Redirect Landing Page</span>
              <span className={`text-[9px] px-2 py-0.5 rounded font-mono uppercase font-semibold ${
                activeWorkspace.redirect_url
                  ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                  : "text-amber-400 bg-amber-500/10 border border-amber-500/20"
              }`}>
                {activeWorkspace.redirect_url ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-white truncate font-mono">
                {activeWorkspace.redirect_url || "Not configured"}
              </span>
              <p className="text-[11px] text-zinc-400 leading-normal mt-1">
                Subscribers land on this success screen after completing their hosted checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
