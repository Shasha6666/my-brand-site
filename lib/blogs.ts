import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  readingTime: number; // 分钟
}

export interface BlogPost extends BlogMeta {
  content: string;
}

const BLOGS_DIR = path.join(process.cwd(), "public/blogs");

/** 获取所有文章元数据，按日期倒序 */
export function getAllBlogs(): BlogMeta[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];

  const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOGS_DIR, file), "utf-8");
    const { data } = matter(raw);
    const wordCount = raw.replace(/---[\s\S]*?---/, "").trim().length;

    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title ?? "无标题",
      date: data.date ?? "",
      summary: data.summary ?? "",
      readingTime: Math.max(1, Math.ceil(wordCount / 500)),
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** 获取所有文章（含完整内容），按日期倒序 */
export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];

  const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOGS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const wordCount = content.trim().length;

    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title ?? "无标题",
      date: data.date ?? "",
      summary: data.summary ?? "",
      readingTime: Math.max(1, Math.ceil(wordCount / 500)),
      content,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** 根据 slug 读取单篇文章完整内容 */
export function getBlogBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const wordCount = content.trim().length;

  return {
    slug,
    title: data.title ?? "无标题",
    date: data.date ?? "",
    summary: data.summary ?? "",
    readingTime: Math.max(1, Math.ceil(wordCount / 500)),
    content,
  };
}
