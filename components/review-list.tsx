"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const PAGE_SIZE = 6;

const GRADIENTS = [
  { bar: "from-blue-500 to-cyan-400", avatar: "from-blue-500 to-cyan-400" },
  {
    bar: "from-violet-500 to-purple-400",
    avatar: "from-violet-500 to-purple-400",
  },
  {
    bar: "from-emerald-500 to-teal-400",
    avatar: "from-emerald-500 to-teal-400",
  },
  {
    bar: "from-orange-500 to-amber-400",
    avatar: "from-orange-500 to-amber-400",
  },
  { bar: "from-cyan-500 to-blue-400", avatar: "from-cyan-500 to-blue-400" },
  { bar: "from-pink-500 to-rose-400", avatar: "from-pink-500 to-rose-400" },
];

interface Review {
  id: number;
  name: string;
  rating: number;
  content: string;
  created_at: string;
}

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageInput, setPageInput] = useState("1");

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const fetchReviews = useCallback(async (p: number) => {
    setLoading(true);
    const from = (p - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, count, error } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: false })
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (!error) {
      setReviews((data as Review[]) ?? []);
      if (count !== null) setTotal(count);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReviews(page);
  }, [page, fetchReviews]);

  const goToPage = (p: number) => {
    const clamped = Math.max(1, Math.min(p, totalPages));
    setPage(clamped);
    setPageInput(String(clamped));
  };

  const handlePageInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const n = parseInt(pageInput, 10);
      if (!isNaN(n)) goToPage(n);
      else setPageInput(String(page));
    }
  };

  return (
    <div>
      <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
        客户评价
      </h2>
      <p className="mt-3 text-center text-muted-foreground">
        听听合作过的客户怎么说
      </p>

      {/* 加载中 */}
      {loading && (
        <div className="mt-12 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-muted border-t-[hsl(var(--brand-primary))]" />
        </div>
      )}

      {/* 空态 */}
      {!loading && reviews.length === 0 && (
        <div className="mt-12 flex flex-col items-center gap-2 text-muted-foreground">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>暂无评价，来做第一个评价的人吧！</span>
        </div>
      )}

      {/* 评价卡片 */}
      {!loading && reviews.length > 0 && (
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {reviews.map((r, i) => {
            const g = GRADIENTS[((page - 1) * PAGE_SIZE + i) % GRADIENTS.length];
            return (
              <div
                key={r.id}
                className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* 顶部渐变线 */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${g.bar}`} />

                <div className="flex gap-4 px-5 py-4">
                  {/* 渐变圆形头像 */}
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${g.avatar} text-sm font-bold text-white`}
                  >
                    {r.name.charAt(0)}
                  </div>

                  {/* 评价内容 */}
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {r.name}
                      </span>
                      <span className="flex gap-0.5">
                        {Array.from({ length: r.rating }, (_, s) => (
                          <span key={s} className="text-xs text-amber-400">
                            ★
                          </span>
                        ))}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {r.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 分页 */}
      {!loading && total > PAGE_SIZE && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-[hsl(var(--brand-primary))] hover:text-[hsl(var(--brand-primary))] disabled:cursor-not-allowed disabled:opacity-40"
          >
            上一页
          </button>

          <input
            type="text"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            onKeyDown={handlePageInputKey}
            onBlur={() => setPageInput(String(page))}
            className="w-14 rounded-lg border border-border bg-background px-3 py-2 text-center text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-primary)/0.4)]"
            aria-label="页码"
          />

          <span className="text-sm text-muted-foreground">/ {totalPages}</span>

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page >= totalPages}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-[hsl(var(--brand-primary))] hover:text-[hsl(var(--brand-primary))] disabled:cursor-not-allowed disabled:opacity-40"
          >
            下一页
          </button>
        </div>
      )}
    </div>
  );
}
