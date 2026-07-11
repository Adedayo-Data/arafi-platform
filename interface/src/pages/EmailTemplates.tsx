import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import EnvironmentBadge from "../components/ui/EnvironmentBadge";
import { getEmailTemplate,type EmailTemplateResponse } from "../lib/api/emails";

export default function EmailTemplates() {
  const [template, setTemplate] = useState<EmailTemplateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const data = await getEmailTemplate();
        if (data && (data.emailSubject || data.emailBodyTemplate)) {
          setTemplate(data);
        }
      } catch (error) {
        console.error("Failed to fetch template:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTemplate();
  }, []);

  return (
    <DashboardLayout>
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-up delay-0 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="font-headline-xl text-headline-xl text-on-surface">
              Email Templates
            </h2>
            <EnvironmentBadge />
          </div>
          <p className="text-on-surface-variant">
            Manage your transactional email configuration.
          </p>
        </div>
        <Link 
            to="/email/builder"
            className="bg-primary text-on-primary font-bold px-4 py-2 rounded-lg font-label-mono text-label-mono hover:brightness-110 transition-all active:scale-95 flex items-center gap-2 shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">edit</span>
          {template ? "Edit Template" : "Configure Template"}
        </Link>
      </header>
      
      <div className="surface-panel rounded-xl overflow-hidden animate-fade-up delay-60 border border-outline-variant/50">
        <div className="px-6 py-4 border-b border-outline-variant/30 bg-surface-container-low">
            <h3 className="font-headline-md text-headline-md text-on-surface">
                Active Configuration
            </h3>
        </div>
        
        <div className="overflow-x-auto min-h-[150px]">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-outline-variant bg-surface-container-high/30">
                        <th className="px-6 py-3 font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider w-1/3">
                            Template Type
                        </th>
                        <th className="px-6 py-3 font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
                            Subject Line
                        </th>
                        <th className="px-6 py-3 font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider text-right">
                            Status
                        </th>
                        <th className="px-6 py-3 font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider text-right">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="font-code-sm text-code-sm divide-y divide-outline-variant">
                    {isLoading ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-on-surface-variant animate-pulse">
                                Loading configuration...
                            </td>
                        </tr>
                    ) : template ? (
                        <tr className="hover:bg-surface-container-highest/30 transition-colors">
                            <td className="px-6 py-4">
                                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] uppercase tracking-wider border border-outline-variant/50 font-label-mono">
                                    Global Default
                                </span>
                            </td>
                            <td className="px-6 py-4 text-on-surface font-body-md font-medium truncate max-w-[250px]">
                                {template.emailSubject || "No subject defined"}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] uppercase tracking-wider border border-emerald-500/20">
                                    Active
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link 
                                    to="/email/builder" 
                                    className="text-primary hover:text-primary-container transition-colors font-label-mono text-[11px] uppercase tracking-wider"
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-12 text-center">
                                <div className="flex flex-col items-center gap-3">
                                    <span className="material-symbols-outlined text-4xl text-on-surface-variant/50">mail</span>
                                    <p className="text-on-surface-variant">No global email template configured yet.</p>
                                    <Link to="/email/builder" className="text-primary font-label-mono text-xs hover:underline mt-2">
                                        Configure now →
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
