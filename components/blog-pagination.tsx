"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function BlogPagination({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pageInput, setPageInput] = useState(String(currentPage));

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  const goToPage = (p: number) => {
    const clamped = Math.max(1, Math.min(p, totalPages));
    const params = new URLSearchParams(searchParams.toString());
    if (clamped === 1) {
      params.delete("page");
    } else {
      params.set("page", String(clamped));
    }
    const qs = params.toString();
    router.push(qs ? `/?${qs}#blog` : `/#blog`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const n = parseInt(pageInput, 10);
      if (!isNaN(n)) goToPage(n);
      else setPageInput(String(currentPage));
    }
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-[hsl(var(--brand-primary))] hover:text-[hsl(var(--brand-primary))] disabled:cursor-not-allowed disabled:opacity-40"
      >
        上一页
      </button>

      <input
        type="text"
        value={pageInput}
        onChange={(e) => setPageInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => setPageInput(String(currentPage))}
        className="w-14 rounded-lg border border-border bg-background px-3 py-2 text-center text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-primary)/0.4)]"
        aria-label="页码"
      />

      <span className="text-sm text-muted-foreground">/ {totalPages}</span>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-[hsl(var(--brand-primary))] hover:text-[hsl(var(--brand-primary))] disabled:cursor-not-allowed disabled:opacity-40"
      >
        下一页
      </button>
    </div>
  );
}
