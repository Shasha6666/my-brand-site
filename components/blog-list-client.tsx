"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blogs";

const PAGE_SIZE = 6;

const GRADIENTS = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-purple-400",
  "from-emerald-500 to-teal-400",
  "from-orange-500 to-amber-400",
  "from-cyan-500 to-blue-400",
  "from-pink-500 to-rose-400",
];

interface Props {
  posts: BlogPost[];
}

export default function BlogListClient({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
      );
    });
  }, [posts, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.max(1, Math.min(page, totalPages));
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  // 搜索时重置到第一页
  const handleQueryChange = (val: string) => {
    setQuery(val);
    setPage(1);
    setPageInput("1");
  };

  const goToPage = (p: number) => {
    const clamped = Math.max(1, Math.min(p, totalPages));
    setPage(clamped);
    setPageInput(String(clamped));
  };

  const handlePageKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const n = parseInt(pageInput, 10);
      if (!isNaN(n)) goToPage(n);
      else setPageInput(String(safePage));
    }
  };

  return (
    <>
      {/* 搜索框 */}
      <div className="relative mx-auto mt-12 max-w-md">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="搜索文章..."
          className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-primary)/0.4)] dark:bg-card"
        />
      </div>

      {/* 无结果 */}
      {query.trim() && filtered.length === 0 && (
        <div className="mt-12 flex flex-col items-center gap-3 text-muted-foreground">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <span>没有找到相关文章</span>
        </div>
      )}

      {/* 文章列表 */}
      {filtered.length > 0 && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {paged.map((post, i) => {
            const g = GRADIENTS[i % GRADIENTS.length];
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-card"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${g}`} />
                <div className="flex flex-1 flex-col gap-2 px-5 py-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {post.summary}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span>{post.date}</span>
                      <span>{post.readingTime} 分钟阅读</span>
                    </div>
                    <span className="flex items-center gap-1 text-[hsl(var(--brand-primary))] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      阅读全文 &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* 分页 */}
      {filtered.length > PAGE_SIZE && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => goToPage(safePage - 1)}
            disabled={safePage <= 1}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-[hsl(var(--brand-primary))] hover:text-[hsl(var(--brand-primary))] disabled:cursor-not-allowed disabled:opacity-40"
          >
            上一页
          </button>

          <input
            type="text"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            onKeyDown={handlePageKeyDown}
            onBlur={() => setPageInput(String(safePage))}
            className="w-14 rounded-lg border border-border bg-background px-3 py-2 text-center text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-primary)/0.4)]"
            aria-label="页码"
          />

          <span className="text-sm text-muted-foreground">/ {totalPages}</span>

          <button
            onClick={() => goToPage(safePage + 1)}
            disabled={safePage >= totalPages}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-[hsl(var(--brand-primary))] hover:text-[hsl(var(--brand-primary))] disabled:cursor-not-allowed disabled:opacity-40"
          >
            下一页
          </button>
        </div>
      )}
    </>
  );
}
