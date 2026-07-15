"use client";

import { useState, type ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
}

export function Accordion({ title, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-3 overflow-hidden rounded-lg border border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
      >
        {title}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-border px-4 py-3 text-sm leading-relaxed text-foreground/85">
          {children}
        </div>
      )}
    </div>
  );
}
