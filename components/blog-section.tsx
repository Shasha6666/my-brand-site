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
          <div className="mt-12 flex justify-center rounded-xl border-2 border-dashed border-border py-16">
            <span className="text-lg text-muted-foreground">暂无文章</span>
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
