"use client";

import { useState, type ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export function CodeBlock({ children, ...props }: Props & Record<string, unknown>) {
  const [copied, setCopied] = useState(false);

  const getText = (node: unknown): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(getText).join("");
    if (node && typeof node === "object" && "props" in (node as any)) {
      return getText((node as any).props.children);
    }
    return "";
  };

  const handleCopy = async () => {
    const text = getText(children);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6">
      <pre
        className="overflow-x-auto rounded-lg bg-[#1e1e2e] px-5 py-4 text-sm leading-relaxed text-[#cdd6f4]"
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-md bg-white/10 px-2 py-1 text-xs text-white/70 opacity-0 transition-opacity hover:bg-white/20 group-hover:opacity-100"
      >
        {copied ? "已复制" : "复制"}
      </button>
    </div>
  );
}
