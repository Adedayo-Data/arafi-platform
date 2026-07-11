import { useState, useEffect } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { getPayouts, requestPayout } from "../lib/api/payouts";
import type { Payout } from "../types";
import { useWorkspace } from "../store/useWorkspace";
import EnvironmentBadge from "../components/ui/EnvironmentBadge";
import ConfirmationModal from "../components/ui/ConfirmationModal";

export default function PayoutHistory() {
  const { activeWorkspace } = useWorkspace();
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Request Payout Modal State
  const [showModal, setShowModal] = useState(false);
  const [reqAmount, setReqAmount] = useState("");
  const [reqBankName, setReqBankName] = useState("");
  const [reqBankCode, setReqBankCode] = useState("");
  const [reqAccountNo, setReqAccountNo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<any>(null);

  const fetchPayoutsList = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPayouts();
      setPayouts(data);
    } catch (err: any) {
      setError("Failed to fetch payouts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeWorkspace) {
      fetchPayoutsList();
    }
  }, [activeWorkspace?.app_id]);

  const handleRequestPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqAmount || !reqBankName || !reqBankCode || !reqAccountNo) return;
    setSubmitting(true);
    try {
      await requestPayout({
        amount: Math.round(parseFloat(reqAmount) * 100), // Assuming amount expects kobo equivalent or base units
        bankName: reqBankName,
        bankCode: reqBankCode,
        bankAccountNumber: reqAccountNo
      });
      setShowModal(false);
      setReqAmount("");
      setReqBankName("");
      setReqBankCode("");
      setReqAccountNo("");
      fetchPayoutsList();
    } catch (err: any) {
      setConfirmConfig({
        isOpen: true,
        isAlert: true,
        title: "Error",
        message: err?.response?.data?.message || "Failed to request payout.",
        type: "danger",
        confirmText: "OK",
        onConfirm: () => setConfirmConfig(null)
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white drop-shadow-md">
              Payout Settlements
            </h2>
            <EnvironmentBadge />
          </div>
          <p className="text-secondary-fixed-dim mt-2 max-w-2xl text-lg">
            Monitor your platform settlement withdrawals and manual transfer payouts.
          </p>
        </div>
      </header>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        {/* Payout Table */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="glass-card rounded-2xl border border-on-surface/10 p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm font-bold text-white text-base flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">history</span>
                Payout History
              </h3>
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary text-on-primary font-label-mono text-[11px] px-3 py-1.5 rounded hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[14px]">payments</span> Request Payout
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-on-surface/10 text-on-surface/50 text-xs font-label-mono uppercase tracking-wider">
                    <th className="pb-3 pl-2">Payout ID</th>
                    <th className="pb-3">Bank Details</th>
                    <th className="pb-3 text-right">Amount</th>
                    <th className="pb-3 text-right">Settled At</th>
                    <th className="pb-3 text-right pr-2">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {loading && payouts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-on-surface/50 font-mono text-xs animate-pulse">
                        Loading payouts...
                      </td>
                    </tr>
                  ) : payouts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-on-surface/50 font-mono text-xs">
                        No payout history found.
                      </td>
                    </tr>
                  ) : (
                    payouts.map((pay) => (
                      <tr key={pay.id} className="border-b border-on-surface/5 hover:bg-on-surface/5 transition-colors">
                        <td className="py-4 pl-2 font-mono text-xs text-white font-semibold">
                          {pay.id ? pay.id.substring(0, 12) + "..." : "N/A"}
                        </td>
                        <td className="py-4">
                          <span className="text-white block font-semibold">{pay.bankName}</span>
                          <span className="text-xs text-on-surface/50 font-mono">{pay.bankAccountNumber}</span>
                        </td>
                        <td className="py-4 text-right font-mono text-white">
                          {(pay.amount / 100).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                        </td>
                        <td className="py-4 text-right text-on-surface/50 font-mono text-xs">
                          {pay.createdAt ? new Date(pay.createdAt).toLocaleString() : "Just now"}
                        </td>
                        <td className="py-4 text-right pr-2">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border uppercase tracking-wider ${
                            pay.status?.toUpperCase() === "SUCCESS" || pay.status?.toUpperCase() === "COMPLETED" 
                              ? "bg-green-500/10 text-green-400 border-green-500/20" 
                              : pay.status?.toUpperCase() === "PROCESSING" || pay.status?.toUpperCase() === "PENDING"
                              ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              : "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              pay.status?.toUpperCase() === "SUCCESS" || pay.status?.toUpperCase() === "COMPLETED" ? "bg-green-400" : pay.status?.toUpperCase() === "PROCESSING" || pay.status?.toUpperCase() === "PENDING" ? "bg-yellow-400" : "bg-red-400"
                            }`}></span>
                            {pay.status || "UNKNOWN"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="glass-card rounded-2xl border border-on-surface/10 p-6 shadow-2xl bg-linear-to-b from-primary/10 to-transparent">
            <h3 className="font-headline-sm font-bold text-white text-base mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">info</span>
              Unified Settlements
            </h3>
            <p className="text-on-surface/70 text-sm leading-relaxed mb-4">
              Arafi utilizes <strong>Nomba Payout Transfers</strong> to settle balances from your platform ledger. Withdrawals can be triggered programmatically via API or scheduled for auto-settlement.
            </p>
            <div className="rounded-xl border border-on-surface/10 bg-surface/90 overflow-hidden relative mb-4">
              <div className="flex items-center px-4 py-2 bg-on-surface/5 border-b border-on-surface/10 gap-2">
                <span className="text-[10px] uppercase font-bold text-primary font-mono">POST</span>
                <span className="font-mono text-xs text-on-surface/40">/v1/payouts</span>
              </div>
              <pre className="p-3 text-[11px] font-mono text-on-surface/80 overflow-x-auto leading-relaxed">
{`{
  "amount_kobo": 14050000,
  "bank_code": "050",
  "account_number": "0123456789"
}`}
              </pre>
            </div>
            <p className="text-xs text-on-surface/50 leading-relaxed">
              Sandbox payouts automatically simulate instant credit. Live mode settlements route real funds via Nomba's bank network rails.
            </p>
          </div>
        </div>
      </div>

      {/* Request Payout Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="glass-card w-full max-w-md rounded-2xl border border-on-surface/10 p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-lg text-white font-bold">Request Payout</h3>
              <button onClick={() => setShowModal(false)} className="text-on-surface/50 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleRequestPayout} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-on-surface/60 font-label-mono uppercase">Amount (NGN)</label>
                <input
                  type="number"
                  required
                  min="100"
                  placeholder="e.g. 50000"
                  value={reqAmount}
                  onChange={(e) => setReqAmount(e.target.value)}
                  className="bg-surface/50 border border-on-surface/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 font-mono"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-on-surface/60 font-label-mono uppercase">Bank Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wema Bank"
                  value={reqBankName}
                  onChange={(e) => setReqBankName(e.target.value)}
                  className="bg-surface/50 border border-on-surface/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50"
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-on-surface/60 font-label-mono uppercase">Bank Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 035"
                  value={reqBankCode}
                  onChange={(e) => setReqBankCode(e.target.value)}
                  className="bg-surface/50 border border-on-surface/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 font-mono"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-on-surface/60 font-label-mono uppercase">Account Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 0123456789"
                  value={reqAccountNo}
                  onChange={(e) => setReqAccountNo(e.target.value)}
                  className="bg-surface/50 border border-on-surface/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="font-label-mono bg-inverse-primary text-on-primary py-3 rounded-xl hover:scale-[1.01] transition-transform disabled:opacity-50 mt-2 flex justify-center items-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin-custom text-[16px]">sync</span>
                    Processing...
                  </>
                ) : (
                  "Submit Withdrawal"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {confirmConfig && (
        <ConfirmationModal {...confirmConfig} />
      )}
    </DashboardLayout>
  );
}
