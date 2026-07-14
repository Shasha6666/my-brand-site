"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "首页", href: "#hero" },
  { label: "技能", href: "#skills" },
  { label: "服务", href: "#services" },
  { label: "案例", href: "#cases" },
  { label: "图书", href: "#books" },
  { label: "评价", href: "#reviews" },
  { label: "博客", href: "/#blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-background/80 backdrop-blur-lg transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* 品牌名 */}
        <a
          href="#hero"
          className="text-xl font-bold text-[hsl(var(--brand-primary))]"
        >
          MyBrandSite
        </a>

        {/* 桌面端导航链接 */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="切换菜单"
        >
          {open ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="5" x2="15" y2="15" />
              <line x1="15" y1="5" x2="5" y2="15" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
            </svg>
          )}
        </button>
      </nav>

      {/* 移动端展开菜单 */}
      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg">
          <ul className="flex flex-col px-6 pb-4 pt-2 gap-3 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-1 text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
