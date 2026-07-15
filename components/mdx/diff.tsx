import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export function Diff({ children }: Props) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg bg-[#1e1e2e] px-5 py-4 font-mono text-sm leading-relaxed">
      <pre className="whitespace-pre-wrap">{children}</pre>
    </div>
  );
}

interface DiffLineProps {
  type: "add" | "del";
  children?: ReactNode;
}

export function DiffLine({ type, children }: DiffLineProps) {
  return (
    <div
      className={`px-2 py-0.5 ${
        type === "add"
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-red-500/10 text-red-400"
      }`}
    >
      {type === "add" ? "+ " : "- "}
      {children}
    </div>
  );
}
