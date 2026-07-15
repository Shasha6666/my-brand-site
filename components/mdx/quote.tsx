import type { ReactNode } from "react";

interface Props {
  author?: string;
  children?: ReactNode;
}

export function Quote({ author, children }: Props) {
  return (
    <div className="my-8 border-l-4 border-[hsl(var(--brand-primary))] py-2 pl-6">
      <blockquote className="text-xl font-medium italic leading-relaxed text-foreground">
        {children}
      </blockquote>
      {author && (
        <p className="mt-3 text-sm font-medium text-muted-foreground">
          — {author}
        </p>
      )}
    </div>
  );
}
