"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function WeixinFloat() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref}>
      {/* 微信按钮 */}
      <button
        onClick={() => setOpen(!open)}
        title="微信联系"
        className="fixed bottom-[136px] right-6 z-50 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="微信联系"
      >
        <Image
          src="/weixin/weixin-logo.png"
          alt="微信"
          width={44}
          height={44}
          className="h-full w-full object-cover"
        />
      </button>

      {/* 二维码卡片 */}
      {open && (
        <div className="fixed bottom-[196px] right-6 z-50 w-56 overflow-hidden rounded-xl bg-card shadow-2xl ring-1 ring-black/5">
          <div className="border-b border-black/5 px-4 py-3 text-center text-sm font-medium text-foreground">
            微信：99157935
          </div>
          <div className="p-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src="/weixin/weixin-qr.png"
                alt="微信二维码"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
