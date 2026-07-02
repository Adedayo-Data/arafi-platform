import { useState, MouseEvent } from "react";

export default function EscrowTable() {
  const [rowFlashed, setRowFlashed] = useState(false);

  const handleRowClick = (e: MouseEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    setRowFlashed(false);
    setTimeout(() => setRowFlashed(true), 10);
  };

  return (
    <div className="surface-panel rounded-xl overflow-hidden animate-fade-up delay-120">
      <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
        <h3 className="font-headline-md text-headline-md text-on-surface">
          Active Escrow Transactions
        </h3>
        <button className="text-primary font-label-mono text-label-mono hover:text-on-surface transition-colors">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant bg-[#1a2133]/30">
              <th className="px-6 py-3 font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
                Txn ID
              </th>
              <th className="px-6 py-3 font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
                Escrow Status
              </th>
              <th className="px-6 py-3 font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="font-code-sm text-code-sm divide-y divide-outline-variant">
            {/* Row 1: Active Escrow */}
            <tr
              className={`hover:bg-surface-container-highest/30 transition-colors group cursor-pointer ${
                rowFlashed ? "update-flash" : ""
              }`}
              onClick={handleRowClick}
            >
              <td className="px-6 py-4 text-on-surface">txn_88291a</td>
              <td className="px-6 py-4 text-on-surface">$4,500.00</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-[10px] text-outline">
                    <span className="material-symbols-outlined text-[14px] text-[#10b981]">
                      check_circle
                    </span>
                    <div className="w-4 h-px bg-[#10b981] mx-1"></div>
                    {/* Current Node: Amber Breathing Glow */}
                    <div className="relative flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary z-10"></span>
                      <span className="absolute w-2.5 h-2.5 rounded-full bg-tertiary glow-amber"></span>
                    </div>
                    <div className="w-4 h-px bg-outline-variant mx-1"></div>
                    <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                    <div className="w-4 h-px bg-outline-variant mx-1"></div>
                    <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                  </div>
                  <span className="font-label-mono text-[11px] text-tertiary ml-2">
                    Held in Escrow
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                  <span className="material-symbols-outlined text-[18px]">
                    more_horiz
                  </span>
                </button>
              </td>
            </tr>

            {/* Row 2: Settled */}
            <tr className="hover:bg-surface-container-highest/30 transition-colors group">
              <td className="px-6 py-4 text-on-surface">txn_7f9b2c</td>
              <td className="px-6 py-4 text-on-surface">$12,050.50</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-[10px]">
                    <span className="material-symbols-outlined text-[14px] text-[#10b981]">
                      check_circle
                    </span>
                    <div className="w-4 h-px bg-[#10b981] mx-1"></div>
                    <span className="material-symbols-outlined text-[14px] text-[#10b981]">
                      check_circle
                    </span>
                    <div className="w-4 h-px bg-[#10b981] mx-1"></div>
                    <span className="material-symbols-outlined text-[14px] text-[#10b981]">
                      check_circle
                    </span>
                    <div className="w-4 h-px bg-[#10b981] mx-1"></div>
                    <span className="material-symbols-outlined text-[14px] text-[#10b981]">
                      check_circle
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#10b981]/10 text-[#10b981] text-[10px] ml-2">
                    Payout Settled
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                  <span className="material-symbols-outlined text-[18px]">
                    more_horiz
                  </span>
                </button>
              </td>
            </tr>

            {/* Row 3: Pending Capture */}
            <tr className="hover:bg-surface-container-highest/30 transition-colors group">
              <td className="px-6 py-4 text-on-surface">txn_3e4a11</td>
              <td className="px-6 py-4 text-on-surface">$850.00</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-[10px]">
                    <div className="relative flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary z-10"></span>
                      <span className="absolute w-2.5 h-2.5 rounded-full bg-primary animate-ping opacity-20"></span>
                    </div>
                    <div className="w-4 h-px bg-outline-variant mx-1"></div>
                    <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                    <div className="w-4 h-px bg-outline-variant mx-1"></div>
                    <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                    <div className="w-4 h-px bg-outline-variant mx-1"></div>
                    <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] ml-2">
                    Pending Capture
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                  <span className="material-symbols-outlined text-[18px]">
                    more_horiz
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
