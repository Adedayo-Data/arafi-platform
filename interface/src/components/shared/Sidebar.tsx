import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      name: "Dashboard",
      icon: "dashboard",
      path: "/dashboard",
      // Match /dashboard or /dashboard/empty
      isActive:
        currentPath === "/dashboard" || currentPath.startsWith("/dashboard/"),
    },
    {
      name: "API Keys",
      icon: "vpn_key",
      path: "/apikeys",
      isActive: currentPath === "/apikeys",
    },
    {
      name: "Logs",
      icon: "list_alt",
      path: "/logs",
      isActive: currentPath === "/logs",
    },
    {
      name: "Webhooks",
      icon: "webhook",
      path: "/webhooks", // placeholder
      isActive: currentPath === "/webhooks",
    },
    {
      name: "Team",
      icon: "group",
      path: "/team", // placeholder
      isActive: currentPath === "/team",
    },
    {
      name: "Settings",
      icon: "settings",
      path: "/settings", // placeholder
      isActive: currentPath === "/settings",
    },
  ];

  return (
    <nav className="hidden md:flex flex-col h-full p-4 gap-2 bg-surface-container-low dark:bg-surface-container-low fixed left-0 top-0 w-64 border-r border-outline-variant dark:border-outline-variant z-40">
      <div className="mb-8 px-2 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-on-primary font-headline-md">
          A
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">
            Arafi Dev
          </h1>
          <p className="font-label-mono text-label-mono text-on-surface-variant text-[10px]">
            Production Environment
          </p>
        </div>
      </div>
      <div className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg active:scale-95 transition-transform ${
              item.isActive
                ? "bg-secondary-container dark:bg-secondary-container text-on-secondary-container font-bold"
                : "text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-container-highest transition-colors"
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={item.isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="font-label-mono text-label-mono">{item.name}</span>
          </Link>
        ))}
      </div>
      <Link
        to="/dashboard/empty"
        className="block text-center w-full mt-4 py-2 px-4 bg-primary text-on-primary font-label-mono text-label-mono rounded-lg hover:bg-primary-container transition-colors active:scale-95 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
      >
        Create API Key
      </Link>
      <div className="mt-8 pt-4 border-t border-outline-variant space-y-1">
        <a
          className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-highest transition-colors rounded-lg"
          href="#"
        >
          <span className="material-symbols-outlined text-[18px]">
            description
          </span>
          <span className="font-label-mono text-label-mono">Docs</span>
        </a>
        <a
          className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-highest transition-colors rounded-lg"
          href="#"
        >
          <span className="material-symbols-outlined text-[18px]">help</span>
          <span className="font-label-mono text-label-mono">Support</span>
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;
