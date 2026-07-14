"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="relative bg-[#0a101e] px-6 py-10">
      {/* 版权信息 */}
      <p className="text-center text-sm text-white/40">
        &copy; 2026 MyBrandSite. All rights reserved.
      </p>

      {/* 返回顶部按钮 */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-accent))] text-lg text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="返回顶部"
      >
        &uarr;
      </button>
    </footer>
  );
}
