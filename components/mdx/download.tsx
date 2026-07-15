interface Props {
  href: string;
  name?: string;
  size?: string;
}

export function Download({ href, name, size }: Props) {
  const filename = name ?? href.split("/").pop() ?? "下载文件";

  return (
    <a
      href={href}
      download
      className="my-4 inline-flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--brand-primary))/0.1]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[hsl(var(--brand-primary))]"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </div>
      <div>
        <div className="text-sm font-medium text-foreground">{filename}</div>
        {size && (
          <div className="text-xs text-muted-foreground">{size}</div>
        )}
      </div>
      <span className="ml-auto text-xs font-medium text-[hsl(var(--brand-primary))]">
        下载
      </span>
    </a>
  );
}
