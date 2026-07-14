import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogBySlug, getAllBlogs } from "@/lib/blogs";
import MDXWrapper from "@/components/mdx/mdx-wrapper";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllBlogs().map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogBySlug(params.slug);
  if (!post) notFound();

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0826] via-[#150e38] to-[#1e1050] px-6 py-20 sm:px-8">
        {/* 光斑装饰 */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[8%] -top-[16%] h-[40%] w-[40%] rounded-full bg-[hsl(var(--brand-primary))] blur-[100px] opacity-30" />
          <div className="absolute -right-[8%] top-[8%] h-[35%] w-[35%] rounded-full bg-[hsl(var(--brand-accent))] blur-[90px] opacity-30" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <h1 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-blue-200/70">
            <span>{post.date}</span>
            <span className="inline-block h-1 w-1 rounded-full bg-blue-200/40" />
            <span>{post.readingTime} 分钟阅读</span>
          </div>
        </div>
      </section>

      {/* 正文 */}
      <article className="bg-background px-6 py-12 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="prose-custom">
            <MDXWrapper source={post.content} />
          </div>

          {/* 返回链接 */}
          <div className="mt-16 border-t border-border pt-8">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--brand-primary))] transition-colors hover:opacity-80"
            >
              &larr; 返回博客列表
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
