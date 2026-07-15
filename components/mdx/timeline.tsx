import { Children, isValidElement, type ReactNode } from "react";

interface TimelineItemProps {
  time?: string;
  title?: string;
  children?: ReactNode;
}

export function TimelineItem({ time, title, children }: TimelineItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="mt-1 h-3 w-3 flex-shrink-0 rounded-full border-2 border-[hsl(var(--brand-primary))] bg-card" />
        <div className="w-0.5 flex-1 bg-border" />
      </div>
      <div className="pb-6 pt-0">
        {time && (
          <span className="text-xs font-medium text-muted-foreground">
            {time}
          </span>
        )}
        {title && (
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        )}
        <div className="mt-1 text-sm leading-relaxed text-foreground/85">
          {children}
        </div>
      </div>
    </div>
  );
}

interface TimelineProps {
  children?: ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  const items = Children.toArray(children).filter(
    (c) => isValidElement(c) && c.type === TimelineItem
  );

  return <div className="my-6">{items}</div>;
}
