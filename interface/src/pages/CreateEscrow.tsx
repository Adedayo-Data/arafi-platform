import { useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";

export default function CreateEscrow() {
  const [buyer, setBuyer] = useState("");
  const [sellerSubId, setSellerSubId] = useState("");
  const [amount, setAmount] = useState("");
  const [milestone, setMilestone] = useState("shipping");

  const [simulating, setSimulating] = useState(false);
  const [simulatedDetails, setSimulatedDetails] = useState<any | null>(null);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyer || !amount) return;

    setSimulating(true);
    setTimeout(() => {
      setSimulatedDetails({
        escrowId: "esc_" + Math.random().toString(36).substring(2, 10),
        holdingAccount: "99" + Math.floor(10000000 + Math.random() * 90000000),
        status: "HELD_PENDING_DELIVERY",
        amount: `₦${parseFloat(amount).toLocaleString()}`,
        milestone: milestone === "shipping" ? "Courier Shipping Delivery Confirmation" : "Freelancer Code Sign-off"
      });
      setSimulating(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <header className="mb-10">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white drop-shadow-md">
          Initialize Milestone Escrow
        </h2>
        <p className="text-secondary-fixed-dim mt-2 max-w-2xl text-lg">
          Configure secure milestone holds using Nomba virtual sub-accounts. Safe operational flows for P2P delivery platforms and event organizers.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Mock Config Form */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-2xl border border-on-surface/10 p-8 shadow-2xl relative">
            <h3 className="font-headline-sm font-bold text-white text-base mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">add_moderator</span>
              Mock Escrow Planner
            </h3>

            <form onSubmit={handleSimulate} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-on-surface/60 font-label-mono uppercase tracking-wider">Buyer Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. buyer@example.com"
                  value={buyer}
                  onChange={(e) => setBuyer(e.target.value)}
                  className="bg-surface/50 border border-on-surface/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-on-surface/60 font-label-mono uppercase tracking-wider">Seller Target Sub-Account ID (Nomba Target)</label>
                <input
                  type="text"
                  placeholder="e.g. ca1c9568-c875-4c76-a410-a68ae306fa30"
                  value={sellerSubId}
                  onChange={(e) => setSellerSubId(e.target.value)}
                  className="bg-surface/50 border border-on-surface/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-on-surface/60 font-label-mono uppercase tracking-wider">Escrow Hold Amount (NGN)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 5000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-surface/50 border border-on-surface/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-on-surface/60 font-label-mono uppercase tracking-wider">Milestone Condition</label>
                  <select
                    value={milestone}
                    onChange={(e) => setMilestone(e.target.value)}
                    className="bg-surface/80 border border-on-surface/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                  >
                    <option value="shipping">Courier Shipping Delivery</option>
                    <option value="manual">Manual Buyer Sign-off</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={simulating}
                className="font-label-mono text-label-mono bg-inverse-primary text-on-primary py-4 rounded-xl shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {simulating ? "Generating Escrow Hold..." : "Simulate Escrow Generation"}
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </button>
            </form>
          </div>
        </div>

        {/* Visualizer Panel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {simulatedDetails ? (
            <div className="glass-card rounded-2xl border border-primary/20 p-6 shadow-2xl bg-linear-to-b from-primary/10 to-transparent flex flex-col gap-4 animate-fade-in">
              <h4 className="font-headline-sm font-bold text-white text-base">Generated Mock Escrow</h4>
              
              <div className="flex flex-col gap-3 text-sm text-on-surface/85">
                <div className="flex justify-between border-b border-on-surface/5 pb-2">
                  <span className="text-on-surface/55">Escrow ID</span>
                  <span className="font-mono text-white font-semibold">{simulatedDetails.escrowId}</span>
                </div>
                <div className="flex justify-between border-b border-on-surface/5 pb-2">
                  <span className="text-on-surface/55">Holding Account (VBAN)</span>
                  <span className="font-mono text-white font-semibold">{simulatedDetails.holdingAccount}</span>
                </div>
                <div className="flex justify-between border-b border-on-surface/5 pb-2">
                  <span className="text-on-surface/55">Status</span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    {simulatedDetails.status}
                  </span>
                </div>
                <div className="flex justify-between border-b border-on-surface/5 pb-2">
                  <span className="text-on-surface/55">Amount</span>
                  <span className="font-mono text-white font-semibold">{simulatedDetails.amount}</span>
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  <span className="text-on-surface/55 text-xs">Milestone Trigger</span>
                  <span className="text-xs text-white bg-surface/50 border border-on-surface/10 rounded-lg p-2.5 mt-1 leading-normal">
                    {simulatedDetails.milestone}
                  </span>
                </div>
              </div>

              <div className="mt-4 border-t border-on-surface/10 pt-4 flex flex-col gap-3">
                <h5 className="text-xs uppercase font-label-mono tracking-widest text-on-surface/50">Next Step: Trigger Release</h5>
                <button
                  onClick={() => {
                    setSimulatedDetails((prev: any) => ({ ...prev, status: "RELEASED_TO_SELLER" }));
                  }}
                  disabled={simulatedDetails.status === "RELEASED_TO_SELLER"}
                  className="font-label-mono text-label-mono bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">lock_open</span>
                  {simulatedDetails.status === "RELEASED_TO_SELLER" ? "Funds Settle Completed" : "Trigger Payout Release"}
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl border border-on-surface/10 p-6 shadow-2xl flex flex-col items-center justify-center text-center py-16">
              <span className="material-symbols-outlined text-on-surface/30 text-5xl mb-4">account_balance_wallet</span>
              <h4 className="font-headline-sm font-semibold text-white text-base">Escrow Ledger Visualizer</h4>
              <p className="text-xs text-on-surface/50 max-w-xs mt-2 leading-relaxed">
                Fill the configuration form on the left to simulate a milestone escrow generation on Nomba Sub-Accounts.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
