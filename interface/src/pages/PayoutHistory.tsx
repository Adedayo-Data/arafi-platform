import { useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";

interface PayoutTx {
  id: string;
  bankName: string;
  accountNumber: string;
  amount: string;
  status: "SUCCESS" | "PROCESSING" | "FAILED";
  date: string;
}

export default function PayoutHistory() {
  const [payouts] = useState<PayoutTx[]>([
    { id: "pay_01j7h8", bankName: "Wema Bank", accountNumber: "0123456789", amount: "₦140,500", status: "SUCCESS", date: "2026-07-09 14:32" },
    { id: "pay_01j7k9", bankName: "Access Bank", accountNumber: "0234567890", amount: "₦250,000", status: "SUCCESS", date: "2026-07-08 11:20" },
    { id: "pay_01j7m2", bankName: "GTBank", accountNumber: "0112233445", amount: "₦50,000", status: "FAILED", date: "2026-07-07 09:15" }
  ]);

  return (
    <DashboardLayout>
      <header className="mb-10">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white drop-shadow-md">
          Payout Settlements
        </h2>
        <p className="text-secondary-fixed-dim mt-2 max-w-2xl text-lg">
          Monitor your platform settlement withdrawals and manual transfer payouts.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        {/* Payout Table */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="glass-card rounded-2xl border border-on-surface/10 p-6 shadow-2xl">
            <h3 className="font-headline-sm font-bold text-white text-base mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">history</span>
              Payout History (Sandbox Mode)
            </h3>

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
                  {payouts.map((pay) => (
                    <tr key={pay.id} className="border-b border-on-surface/5 hover:bg-on-surface/5 transition-colors">
                      <td className="py-4 pl-2 font-mono text-xs text-white font-semibold">{pay.id}</td>
                      <td className="py-4">
                        <span className="text-white block font-semibold">{pay.bankName}</span>
                        <span className="text-xs text-on-surface/50 font-mono">{pay.accountNumber}</span>
                      </td>
                      <td className="py-4 text-right font-mono text-white">{pay.amount}</td>
                      <td className="py-4 text-right text-on-surface/50 font-mono text-xs">{pay.date}</td>
                      <td className="py-4 text-right pr-2">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          pay.status === "SUCCESS" 
                            ? "bg-green-500/10 text-green-400 border-green-500/20" 
                            : pay.status === "PROCESSING" 
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            pay.status === "SUCCESS" ? "bg-green-400" : pay.status === "PROCESSING" ? "bg-yellow-400" : "bg-red-400"
                          }`}></span>
                          {pay.status}
                        </span>
                      </td>
                    </tr>
                  ))}
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
    </DashboardLayout>
  );
}
