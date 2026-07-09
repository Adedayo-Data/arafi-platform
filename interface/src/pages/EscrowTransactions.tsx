import { useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";

interface EscrowTx {
  id: string;
  buyer: string;
  amount: string;
  status: "HELD_PENDING_DELIVERY" | "RELEASED" | "DISPUTED";
  milestone: string;
  updatedAt: string;
}

export default function EscrowTransactions() {
  const [txs] = useState<EscrowTx[]>([
    { id: "esc_f8a92b", buyer: "alice@example.com", amount: "₦15,000", status: "RELEASED", milestone: "Freelancer Design Phase 1", updatedAt: "2026-07-09" },
    { id: "esc_c1039e", buyer: "bob@example.com", amount: "₦25,000", status: "HELD_PENDING_DELIVERY", milestone: "Courier Shipping Track #9284", updatedAt: "2026-07-09" },
    { id: "esc_d9921f", buyer: "charlie@example.com", amount: "₦10,000", status: "DISPUTED", milestone: "Event ticket transfer override", updatedAt: "2026-07-08" }
  ]);

  return (
    <DashboardLayout>
      <header className="mb-10">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white drop-shadow-md">
          Escrow Transactions
        </h2>
        <p className="text-secondary-fixed-dim mt-2 max-w-2xl text-lg">
          Track escrow holdings, payouts, release logs, and arbitration statuses.
        </p>
      </header>

      <div className="glass-card rounded-2xl border border-on-surface/10 p-6 shadow-2xl">
        <h3 className="font-headline-sm font-bold text-white text-base mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-primary">history_edu</span>
          Escrow Ledger List
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-on-surface/10 text-on-surface/50 text-xs font-label-mono uppercase tracking-wider">
                <th className="pb-3 pl-2">Escrow ID</th>
                <th className="pb-3">Buyer Email</th>
                <th className="pb-3">Milestone Description</th>
                <th className="pb-3 text-right">Amount</th>
                <th className="pb-3 text-right">Last Updated</th>
                <th className="pb-3 text-right pr-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {txs.map((tx) => (
                <tr key={tx.id} className="border-b border-on-surface/5 hover:bg-on-surface/5 transition-colors">
                  <td className="py-4 pl-2 font-mono text-xs text-white font-semibold">{tx.id}</td>
                  <td className="py-4 text-on-surface/80">{tx.buyer}</td>
                  <td className="py-4 text-on-surface/60 max-w-xs truncate">{tx.milestone}</td>
                  <td className="py-4 text-right font-mono text-white">{tx.amount}</td>
                  <td className="py-4 text-right text-on-surface/50 font-mono text-xs">{tx.updatedAt}</td>
                  <td className="py-4 text-right pr-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      tx.status === "RELEASED" 
                        ? "bg-green-500/10 text-green-400 border-green-500/20" 
                        : tx.status === "HELD_PENDING_DELIVERY" 
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        tx.status === "RELEASED" ? "bg-green-400" : tx.status === "HELD_PENDING_DELIVERY" ? "bg-yellow-400" : "bg-red-400"
                      }`}></span>
                      {tx.status.replace(/_/g, " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
