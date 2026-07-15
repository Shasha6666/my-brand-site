import { getAllBlogPosts } from "@/lib/blogs";
import BlogListClient from "./blog-list-client";

export default function BlogSection() {
  const posts = getAllBlogPosts();

  return (
    <section id="blog" className="bg-[#edf0f5] px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
          技术博客
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          记录技术与成长的每一步
        </p>

        {posts.length === 0 ? (
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
          <BlogListClient posts={posts} />
        )}
      </div>
    </section>
  );
}
