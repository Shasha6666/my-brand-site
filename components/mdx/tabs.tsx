"use client";

import { useState, type ReactNode, Children } from "react";

interface Props {
  labels: string; // 逗号分隔："标签1,标签2,标签3"
  children?: ReactNode;
}

export function Tabs({ labels, children }: Props) {
  const tabs = labels.split(",").map((s) => s.trim());
  const kids = Children.toArray(children).filter(
    (c) => typeof c === "object" && c !== null && "type" in c && (c as any).type === TabPanel
  );
  const [active, setActive] = useState(0);

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <div className="flex border-b border-border bg-muted/50">
        {tabs.map((label, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              i === active
                ? "border-b-2 border-[hsl(var(--brand-primary))] bg-card text-[hsl(var(--brand-primary))]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="p-4 text-sm leading-relaxed text-foreground/85">
        {kids[active] ?? null}
      </div>
    </div>
  );
}

export function TabPanel({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}
