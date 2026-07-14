"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const REVIEWED_KEY = "mybrand_reviewed";
const MAX_CONTENT = 500;
const MIN_CONTENT = 10;

export default function ReviewForm() {
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // 客户端初始化：检查 localStorage
  useEffect(() => {
    setHydrated(true);
    if (localStorage.getItem(REVIEWED_KEY)) {
      setAlreadyReviewed(true);
    }
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    const trimmed = name.trim();
    if (!trimmed) {
      e.name = "请输入姓名";
    } else if (trimmed.length < 2 || trimmed.length > 20) {
      e.name = "姓名需要 2-20 个字";
    }
    if (rating === 0) {
      e.rating = "请选择评分";
    }
    if (!content.trim()) {
      e.content = "请输入评价内容";
    } else if (content.trim().length < MIN_CONTENT) {
      e.content = `评价内容至少 ${MIN_CONTENT} 个字`;
    } else if (content.length > MAX_CONTENT) {
      e.content = `评价内容不能超过 ${MAX_CONTENT} 个字`;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    const { error } = await supabase.from("reviews").insert({
      name: name.trim(),
      rating,
      content: content.trim(),
    });

    if (error) {
      setStatus("error");
      return;
    }

    localStorage.setItem(REVIEWED_KEY, "1");
    setStatus("success");
    setTimeout(() => window.location.reload(), 1000);
  };

  // SSR / 未水合前不渲染，避免水合错误
  if (!hydrated) return null;

  // 已评价过
  if (alreadyReviewed) {
    return (
      <section id="reviews" className="bg-background px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            客户评价
          </h2>
          <p className="mt-3 text-muted-foreground">来自客户的真实反馈</p>
          <div className="mt-12 rounded-xl border-2 border-dashed border-border py-16">
            <span className="text-lg text-muted-foreground">
              💚 感谢你的评价！你已经提交过评价了
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="bg-background px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-xl">
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
          客户评价
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          来自客户的真实反馈
        </p>

        {/* 表单卡片 */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-12 overflow-hidden rounded-xl bg-card shadow-md"
        >
          {/* 顶部渐变装饰线 */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-accent))]" />

          <div className="flex flex-col gap-5 px-6 py-8">
            {/* 姓名 */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                姓名 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                }}
                maxLength={20}
                placeholder="你的名字"
                className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-primary)/0.4)] ${
                  errors.name ? "border-red-400" : "border-border"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            {/* 评分 */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                评分 <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setRating(star);
                      if (errors.rating) setErrors((p) => ({ ...p, rating: "" }));
                    }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-2xl leading-none transition-colors"
                    aria-label={`${star} 星`}
                  >
                    <span
                      className={
                        star <= (hoverRating || rating)
                          ? "text-amber-400"
                          : "text-border"
                      }
                    >
                      ★
                    </span>
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-sm font-medium text-amber-400">
                    {rating} 分
                  </span>
                )}
              </div>
              {errors.rating && (
                <p className="mt-1 text-xs text-red-400">{errors.rating}</p>
              )}
            </div>

            {/* 评价内容 */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                评价内容 <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    if (errors.content) setErrors((p) => ({ ...p, content: "" }));
                  }}
                  maxLength={MAX_CONTENT}
                  rows={4}
                  placeholder="写下你的真实评价（至少 10 个字）"
                  className={`w-full resize-none rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-primary)/0.4)] ${
                    errors.content ? "border-red-400" : "border-border"
                  }`}
                />
                <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
                  {content.length}/{MAX_CONTENT}
                </span>
              </div>
              {errors.content && (
                <p className="mt-1 text-xs text-red-400">{errors.content}</p>
              )}
            </div>

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-1 w-full rounded-lg bg-gradient-to-r from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-accent))] py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "提交中..." : "提交评价"}
            </button>

            {/* 状态提示 */}
            {status === "success" && (
              <p className="text-center text-sm font-medium text-emerald-500">
                ✅ 评价提交成功！
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm font-medium text-red-400">
                ❌ 提交失败，请重试
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
