import { Children, type ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export function Steps({ children }: Props) {
  const items = Children.toArray(children).filter(
    (c) => typeof c === "object" && c !== null && "type" in c && (c as any).type === StepItem
  );

  return (
    <div className="my-6 space-y-0">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          {/* 编号 + 连接线 */}
          <div className="flex flex-col items-center">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--brand-primary))] text-sm font-semibold text-white">
              {i + 1}
            </div>
            {i < items.length - 1 && (
              <div className="w-0.5 flex-1 bg-border" />
            )}
          </div>
          {/* 内容 */}
          <div className="pb-6 pt-1 text-sm leading-relaxed text-foreground/85">
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}

export function StepItem({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}
