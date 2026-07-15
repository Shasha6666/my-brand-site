import type { ReactNode } from "react";

type CalloutType = "info" | "tip" | "warning" | "success";

const STYLES: Record<CalloutType, { icon: string; bar: string; bg: string; text: string }> = {
  info: {
    icon: "ℹ️",
    bar: "border-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-900 dark:text-blue-200",
  },
  tip: {
    icon: "💡",
    bar: "border-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    text: "text-violet-900 dark:text-violet-200",
  },
  warning: {
    icon: "⚠️",
    bar: "border-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    text: "text-yellow-900 dark:text-yellow-200",
  },
  success: {
    icon: "✅",
    bar: "border-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-900 dark:text-emerald-200",
  },
};

interface Props {
  type?: CalloutType;
  title?: string;
  children?: ReactNode;
}

export function Callout({ type = "info", title, children }: Props) {
  const s = STYLES[type];
  return (
    <div className={`my-6 rounded-lg border-l-4 ${s.bar} ${s.bg} p-4`}>
      <div className={`mb-1 flex items-center gap-2 text-sm font-semibold ${s.text}`}>
        <span>{s.icon}</span>
        <span>{title ?? typeLabels[type]}</span>
      </div>
      <div className="text-sm leading-relaxed text-foreground/85">{children}</div>
    </div>
  );
}

const typeLabels: Record<CalloutType, string> = {
  info: "说明",
  tip: "技巧",
  warning: "警告",
  success: "成功",
};
