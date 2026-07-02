export default function WebhookTable() {
  return (
    <div className="surface-panel rounded-xl overflow-hidden animate-fade-up delay-180">
      <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
        <h3 className="font-headline-md text-headline-md text-on-surface">
          Webhook Endpoints
        </h3>
        <button className="border border-outline-variant text-on-surface font-label-mono text-label-mono px-3 py-1 rounded hover:bg-surface-variant transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">add</span> Add
          Endpoint
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant bg-[#1a2133]/30">
              <th className="px-6 py-3 font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-3 font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
                Events
              </th>
              <th className="px-6 py-3 font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="font-code-sm text-code-sm divide-y divide-outline-variant">
            <tr className="hover:bg-surface-container-highest/30 transition-colors">
              <td className="px-6 py-4 text-on-surface">
                https://api.merchant.com/webhooks/arafi
              </td>
              <td className="px-6 py-4 text-outline">
                escrow.*, account.created
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-0.5 rounded-full bg-[#10b981]/10 text-[#10b981] text-[10px] flex w-fit items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>{" "}
                  Active
                </span>
              </td>
            </tr>
            <tr className="hover:bg-surface-container-highest/30 transition-colors">
              <td className="px-6 py-4 text-on-surface">
                https://test.merchant.com/wh/failsafe
              </td>
              <td className="px-6 py-4 text-outline">
                payment.failed, dispute.opened
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-0.5 rounded-full bg-error/10 text-error text-[10px] flex w-fit items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span>{" "}
                  Failing
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
