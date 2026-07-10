import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useState, useEffect } from "react";
import { useAuth } from "../store/useAuth";
import { useWorkspace } from "../store/useWorkspace";

export default function Settings() {
  const { user } = useAuth();
  const { activeWorkspace } = useWorkspace();
  const [workspaceName, setWorkspaceName] = useState(activeWorkspace?.app_name || "");

  useEffect(() => {
    if (activeWorkspace?.app_name) {
      setWorkspaceName(activeWorkspace.app_name);
    }
  }, [activeWorkspace]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <DashboardLayout>
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-glow"></div>

      <div className="relative z-10 w-full max-w-3xl mx-auto pb-10">
        {/* Header */}
        <header className="mb-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">
              Settings
            </h2>
            <p className="text-on-surface-variant text-body-lg max-w-2xl">
              Manage your workspace preferences, profile, and team settings.
            </p>
          </div>
        </header>

        {/* General Settings */}
        <section className="mb-10 bg-surface-container rounded-2xl border border-outline-variant p-6 lg:p-8">
          <div className="mb-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
              General Information
            </h3>
            <p className="text-body-md text-on-surface-variant">
              Update your workspace details and basic information.
            </p>
          </div>

          <div className="space-y-6 max-w-lg">
            <div>
              <label className="block text-label-lg font-bold text-on-surface mb-2">
                Workspace Name
              </label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-on-surface font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Enter workspace name"
              />
            </div>
            
            <div>
              <label className="block text-label-lg font-bold text-on-surface mb-2">
                Owner Email
              </label>
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

        {/* Appearance Settings */}
        <section className="mb-10 bg-surface-container rounded-2xl border border-outline-variant p-6 lg:p-8">
          <div className="mb-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
              Appearance
            </h3>
            <p className="text-body-md text-on-surface-variant">
              Customize how the dashboard looks. Use the theme toggle in the sidebar to change the active theme.
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-on-surface">
            <span className="material-symbols-outlined text-4xl text-primary">palette</span>
            <div>
              <p className="font-bold text-body-lg">Theme Switcher</p>
              <p className="text-body-md text-on-surface-variant">Toggle between Light, Dark, or System themes using the switcher at the bottom left of the screen.</p>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-error-container/10 rounded-2xl border border-error/20 p-6 lg:p-8">
          <div className="mb-6">
            <h3 className="font-headline-sm text-headline-sm text-error mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined">warning</span>
              Danger Zone
            </h3>
            <p className="text-body-md text-on-surface-variant">
              Destructive actions that cannot be undone.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-error/20 rounded-xl bg-error-container/5">
            <div>
              <p className="font-bold text-on-surface">Delete Workspace</p>
              <p className="text-sm text-on-surface-variant mt-1">
                Permanently delete this workspace and all its data.
              </p>
            </div>
            <button className="bg-error text-on-error font-bold px-4 py-2 rounded-lg font-label-mono text-label-mono hover:brightness-110 transition-all active:scale-95 whitespace-nowrap">
              Delete Workspace
            </button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
