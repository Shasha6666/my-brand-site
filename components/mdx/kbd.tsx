import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export function Kbd({ children }: Props) {
  return (
    <kbd className="inline-flex items-center rounded-md border border-b-2 border-border bg-muted px-2 py-0.5 text-xs font-mono font-medium text-foreground/80 shadow-sm">
      {children}
    </kbd>
  );
}
