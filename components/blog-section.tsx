import Link from "next/link";
import { getAllBlogs } from "@/lib/blogs";

const GRADIENTS = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-purple-400",
  "from-emerald-500 to-teal-400",
  "from-orange-500 to-amber-400",
  "from-cyan-500 to-blue-400",
  "from-pink-500 to-rose-400",
];

export default function BlogSection() {
  const blogs = getAllBlogs();

  return (
    <section id="blog" className="bg-[#edf0f5] px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
          技术博客
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          记录技术与成长的每一步
        </p>

        {blogs.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border py-16">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/50">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className="text-muted-foreground">暂无文章，敬请期待</span>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {blogs.map((post, i) => {
              const g = GRADIENTS[i % GRADIENTS.length];
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* 顶部渐变线 */}
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
      </div>
    </section>
  );
}
