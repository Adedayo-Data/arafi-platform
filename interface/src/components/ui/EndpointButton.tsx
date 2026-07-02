interface EndpointButtonProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

export default function EndpointButton({
  method,
  path,
  description,
  isActive,
  onClick,
}: EndpointButtonProps) {
  const getMethodColor = (m: string) => {
    switch (m) {
      case "POST":
        return "bg-primary-container/20 text-primary-container";
      case "GET":
      default:
        return "bg-secondary-fixed/20 text-secondary-fixed";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-start gap-3 p-2 rounded-lg border-tech border-tech-hover transition-colors ${
        isActive
          ? "bg-surface-container-high"
          : "bg-[#0B0F19] hover:bg-surface-container-low"
      }`}
    >
      <span
        className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${getMethodColor(
          method
        )}`}
      >
        {method}
      </span>
      <div>
        <div className="font-label-mono text-label-mono text-on-surface">
          {path}
        </div>
        <div className="text-[12px] text-on-surface-variant mt-1 line-clamp-1">
          {description}
        </div>
      </div>
    </button>
  );
}
