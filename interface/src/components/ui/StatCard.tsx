import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: ReactNode;
  trendText: string;
  trendIcon?: string;
  trendColorClass?: string;
  statusDotClass?: string;
}

export default function StatCard({
  title,
  value,
  trendText,
  trendIcon,
  trendColorClass = "text-primary",
  statusDotClass,
}: StatCardProps) {
  return (
    <div className="surface-panel rounded-xl p-4 flex-1 flex flex-col justify-center">
      <span className="text-on-surface-variant text-sm mb-1">{title}</span>
      <div className="font-code-sm text-[28px] text-on-surface leading-none">
        {value}
      </div>
      <div
        className={`mt-2 font-label-mono text-xs flex items-center ${trendColorClass}`}
      >
        {statusDotClass && (
          <span
            className={`w-2 h-2 rounded-full mr-2 ${statusDotClass}`}
          ></span>
        )}
        {trendIcon && (
          <span className="material-symbols-outlined text-[14px] mr-1">
            {trendIcon}
          </span>
        )}
        {trendText}
      </div>
    </div>
  );
}
