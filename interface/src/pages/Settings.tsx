import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../store/useAuth";
import { useWorkspace } from "../store/useWorkspace";
import ApiKeyCard from "../components/dashboard/ApiKeyCard";
import GenerateKeyModal from "../components/ui/GenerateKeyModal";
import ApiExplorer from "../components/shared/ApiExplorer";

type SettingsTab = "general" | "api-keys" | "preferences" | "logs";

export default function Settings() {
  const { user } = useAuth();
  const { activeWorkspace } = useWorkspace();
  const location = useLocation();
  
  // Default to general tab, but allow passing a tab via state/hash if needed
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  
  useEffect(() => {
    if (location.hash === "#api-keys") setActiveTab("api-keys");
    else if (location.hash === "#preferences") setActiveTab("preferences");
    else if (location.hash === "#logs") setActiveTab("logs");
    else setActiveTab("general");
  }, [location]);

  // General state
  const [workspaceName, setWorkspaceName] = useState(activeWorkspace?.app_name || "");
  const [isSaving, setIsSaving] = useState(false);

  // API Keys state
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  useEffect(() => {
    if (activeWorkspace?.app_name) {
      setWorkspaceName(activeWorkspace.app_name);
    }
  }, [activeWorkspace]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="relative z-10 w-full max-w-[1200px] mx-auto pb-10">
        {/* Header */}
        <header className="mb-8 border-b border-outline-variant pb-6">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">
            Settings
          </h2>
          <p className="text-on-surface-variant text-body-lg">
            Manage your workspace preferences, api keys, and team settings.
          </p>
        </header>

        {/* Layout Grid: Sidebar + Content */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Settings Sidebar */}
          <aside className="w-full md:w-64 shrink-0 flex flex-col gap-1">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-label-mono ${
                activeTab === "general"
                  ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/20"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">storefront</span>
              General
            </button>
            <button
              onClick={() => setActiveTab("api-keys")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-label-mono ${
                activeTab === "api-keys"
                  ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/20"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">vpn_key</span>
              API Keys
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-label-mono ${
                activeTab === "logs"
                  ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/20"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">list_alt</span>
              Developer Logs
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-label-mono ${
                activeTab === "preferences"
                  ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/20"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
              Preferences
            </button>
          </aside>

          {/* Settings Content Area */}
          <div className={`flex-1 w-full bg-surface-container rounded-3xl border border-outline-variant shadow-sm ${activeTab === 'logs' ? 'overflow-hidden flex flex-col h-[700px]' : 'p-6 lg:p-10 min-h-[500px]'}`}>
            
            {/* ─── GENERAL TAB ───────────────────────────────────────────── */}
            {activeTab === "general" && (
              <div className="animate-fade-in flex flex-col gap-10">
                <section>
                  <div className="mb-6 border-b border-outline-variant pb-4">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Workspace Profile</h3>
                    <p className="text-body-md text-on-surface-variant mt-1">Update your workspace details and basic information.</p>
                  </div>
                  <div className="space-y-6 max-w-lg">
                    <div>
                      <label className="block text-label-lg font-bold text-on-surface mb-2">Workspace Name</label>
                      <input
                        type="text"
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-on-surface font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="Enter workspace name"
                      />
                    </div>
                    <div>
                      <label className="block text-label-lg font-bold text-on-surface mb-2">Owner Email</label>
                      <input
                        type="email"
                        value={user?.email || "developer@example.com"}
                        disabled
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-on-surface-variant font-body-lg cursor-not-allowed opacity-70"
                      />
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl font-label-lg hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center min-w-[120px]"
                      >
                        {isSaving ? (
                          <span className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="mb-6 border-b border-error/20 pb-4">
                    <h3 className="font-headline-sm text-headline-sm text-error flex items-center gap-2">
                      <span className="material-symbols-outlined">warning</span>
                      Danger Zone
                    </h3>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border border-error/20 rounded-2xl bg-error-container/5">
                    <div>
                      <p className="font-bold text-on-surface">Delete Workspace</p>
                      <p className="text-sm text-on-surface-variant mt-1 max-w-md">
                        Permanently delete this workspace and all its data. This action cannot be undone.
                      </p>
                    </div>
                    <button className="bg-error text-on-error font-bold px-6 py-2.5 rounded-lg font-label-mono text-label-mono hover:brightness-110 transition-all active:scale-95 whitespace-nowrap">
                      Delete Workspace
                    </button>
                  </div>
                </section>
              </div>
            )}

            {/* ─── API KEYS TAB ──────────────────────────────────────────── */}
            {activeTab === "api-keys" && (
              <div className="animate-fade-in flex flex-col gap-10">
                <section>
                  <div className="mb-6 border-b border-outline-variant pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">API Credentials</h3>
                      <p className="text-body-md text-on-surface-variant mt-1">Manage your environment-specific credentials and access tokens.</p>
                    </div>
                    <button 
                      onClick={() => setShowGenerateModal(true)}
                      className="bg-primary text-on-primary font-bold px-5 py-2.5 rounded-lg font-label-mono text-label-mono hover:brightness-110 transition-all active:scale-95 flex items-center gap-2 shrink-0"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      Generate Key
                    </button>
                  </div>

                  {/* Live Keys Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <h4 className="font-headline-sm text-base text-on-surface font-bold">Live Keys</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ApiKeyCard title="Production Default" createdAt="Oct 24, 2023" status="ACTIVE" keyPrefix="sk_live_" />
                      <ApiKeyCard title="Mobile App Auth" createdAt="Nov 12, 2023" status="ACTIVE" keyPrefix="sk_live_" />
                    </div>
                  </div>

                  {/* Test Keys Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
                      <h4 className="font-headline-sm text-base text-on-surface font-bold">Test Keys</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ApiKeyCard title="Staging Env Default" createdAt="Oct 24, 2023" status="TESTING" keyPrefix="sk_test_" />
                      <ApiKeyCard title="Local Dev (Alice)" createdAt="Jan 05, 2024" status="TESTING" keyPrefix="sk_test_" />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ─── PREFERENCES TAB ───────────────────────────────────────── */}
            {activeTab === "preferences" && (
              <div className="animate-fade-in flex flex-col gap-10">
                <section>
                  <div className="mb-6 border-b border-outline-variant pb-4">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Appearance</h3>
                    <p className="text-body-md text-on-surface-variant mt-1">Customize how the dashboard looks.</p>
                  </div>
                  <div className="flex items-center gap-4 text-on-surface bg-surface-container-high p-4 rounded-2xl border border-outline-variant">
                    <span className="material-symbols-outlined text-4xl text-primary">palette</span>
                    <div>
                      <p className="font-bold text-body-lg">Theme Switcher</p>
                      <p className="text-body-md text-on-surface-variant">Toggle between Light, Dark, or System themes using the switcher at the bottom left of the sidebar menu.</p>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ─── LOGS TAB ───────────────────────────────────────── */}
            {activeTab === "logs" && (
              <div className="animate-fade-in flex flex-col h-full w-full">
                <ApiExplorer />
              </div>
            )}

          </div>
        </div>
      </div>

      {showGenerateModal && (
        <GenerateKeyModal
          onDismiss={() => setShowGenerateModal(false)}
          onSuccess={() => setShowGenerateModal(false)}
        />
      )}
    </DashboardLayout>
  );
}
