import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";

/** 代码块 */
function Pre({ children, ...props }: { children?: ReactNode } & Record<string, unknown>) {
  return (
    <pre
      className="my-6 overflow-x-auto rounded-lg bg-[#1e1e2e] px-5 py-4 text-sm leading-relaxed text-[#cdd6f4]"
      {...props}
    >
      {children}
    </pre>
  );
}

/** 引用块 */
function Blockquote({
  children,
  ...props
}: { children?: ReactNode } & Record<string, unknown>) {
  return (
    <blockquote
      className="my-6 border-l-4 border-[hsl(var(--brand-primary))] bg-muted/50 py-3 pl-5 pr-4 text-muted-foreground italic"
      {...props}
    >
      {children}
    </blockquote>
  );
}

/** 标题 */
function H2({ children, ...props }: { children?: ReactNode } & Record<string, unknown>) {
  return (
    <h2 className="mt-10 mb-4 text-2xl font-bold text-foreground" {...props}>
      {children}
    </h2>
  );
}

function H3({ children, ...props }: { children?: ReactNode } & Record<string, unknown>) {
  return (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground" {...props}>
      {children}
    </h3>
  );
}

/** 段落 */
function P({ children, ...props }: { children?: ReactNode } & Record<string, unknown>) {
  return (
    <p className="my-4 leading-relaxed text-foreground/85" {...props}>
      {children}
    </p>
  );
}

/** 列表 */
function Ul({ children, ...props }: { children?: ReactNode } & Record<string, unknown>) {
  return (
    <ul className="my-4 list-disc space-y-1.5 pl-6 text-foreground/85" {...props}>
      {children}
    </ul>
  );
}

/** 链接 */
function A({
  children,
  href,
  ...props
}: { children?: ReactNode; href?: string } & Record<string, unknown>) {
  return (
    <a
      href={href}
      className="text-[hsl(var(--brand-primary))] underline underline-offset-2 hover:no-underline"
      {...props}
    >
      {children}
    </a>
  );
}

const components: MDXRemoteProps["components"] = {
  pre: Pre,
  blockquote: Blockquote,
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  a: A,
};

export default function MDXWrapper({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
