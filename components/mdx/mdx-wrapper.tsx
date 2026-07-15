import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";

/* ── 基础组件 ── */

/** 引用块 */
function Blockquote({ children, ...props }: { children?: ReactNode } & Record<string, unknown>) {
  return (
    <blockquote
      className="my-6 border-l-4 border-[hsl(var(--brand-primary))] bg-muted/50 py-3 pl-5 pr-4 text-muted-foreground italic"
      {...props}
    >
      {children}
    </blockquote>
  );
}

function H2({ children, ...props }: { children?: ReactNode } & Record<string, unknown>) {
  return <h2 className="mt-10 mb-4 text-2xl font-bold text-foreground" {...props}>{children}</h2>;
}

function H3({ children, ...props }: { children?: ReactNode } & Record<string, unknown>) {
  return <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground" {...props}>{children}</h3>;
}

function P({ children, ...props }: { children?: ReactNode } & Record<string, unknown>) {
  return <p className="my-4 leading-relaxed text-foreground/85" {...props}>{children}</p>;
}

function Ul({ children, ...props }: { children?: ReactNode } & Record<string, unknown>) {
  return <ul className="my-4 list-disc space-y-1.5 pl-6 text-foreground/85" {...props}>{children}</ul>;
}

function A({ children, href, ...props }: { children?: ReactNode; href?: string } & Record<string, unknown>) {
  return (
    <a href={href} className="text-[hsl(var(--brand-primary))] underline underline-offset-2 hover:no-underline" {...props}>
      {children}
    </a>
  );
}

/* ── 互动组件 ── */
import { Callout } from "./callout";
import { Tabs, TabPanel } from "./tabs";
import { Accordion } from "./accordion";
import { Steps, StepItem } from "./steps";
import { CodeBlock } from "./code-block";
import { BilibiliVideo } from "./bilibili-video";
import { Quote } from "./quote";
import { Kbd } from "./kbd";
import { Diff, DiffLine } from "./diff";
import { Timeline, TimelineItem } from "./timeline";
import { Download } from "./download";

const components: MDXRemoteProps["components"] = {
  /* 基础 */
  blockquote: Blockquote,
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  a: A,
  /* 代码块（带复制按钮） */
  pre: CodeBlock,
  /* 11 个互动组件 */
  Callout,
  Tabs,
  TabPanel,
  Accordion,
  Steps,
  StepItem,
  BilibiliVideo,
  Quote,
  Kbd,
  Diff,
  DiffLine,
  Timeline,
  TimelineItem,
  Download,
};

export default function MDXWrapper({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
